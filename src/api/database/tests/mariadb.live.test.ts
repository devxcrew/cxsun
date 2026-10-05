import { sql } from "kysely";
import { DatabaseSync } from "node:sqlite";
import { SqliteDataTransfer, readDatabaseConfiguration } from "@devxcrew/framework";
import assert from "node:assert/strict";
import { test } from "node:test";
import { randomBytes } from "node:crypto";
import mysql from "mysql2/promise";
import { z } from "zod";
import { createDatabaseProvider, smokeDatabase } from "../index.js";

test(
  "live MariaDB migrations, streamed transfer, validation, rollback and pagination",
  {
    skip: process.env.DB_TEST_MARIADB !== "1",
    timeout: 180_000,
  },
  async () => {
    const configuration = readDatabaseConfiguration(process.env);
    if (configuration.driver !== "mariadb") throw new Error("Live test requires MariaDB.");
    const config = configuration.options;
    const name = `database_test_${randomBytes(10).toString("hex")}`;
    const admin = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
    });
    let created = false;
    let provider: ReturnType<typeof createDatabaseProvider> | undefined;
    try {
      await admin.query(`CREATE DATABASE ${name} CHARACTER SET utf8mb4 COLLATE utf8mb4_bin`);
      created = true;
      const environment = { ...process.env, DB_DRIVER: "mariadb", DB_MASTER_NAME: name };
      provider = createDatabaseProvider(environment);
      const database = provider;
      await database.migrate();
      assert.deepEqual(await database.migrate(), []);
      const record = z.strictObject({ key: z.string().min(1).max(255), value: z.string() });
      const rowCount = z.coerce
        .number()
        .int()
        .min(10_000)
        .max(1_000_000)
        .parse(process.env.DB_TEST_ROWS ?? 10_000);
      const started = Date.now();
      const baseline = process.memoryUsage().heapUsed;
      let peak = baseline;
      async function* source() {
        for (let i = 0; i < rowCount; i++)
          yield { key: `row-${String(i).padStart(5, "0")}`, value: `தமிழ் 🚀 ${i}` };
      }
      assert.equal(
        await database.masterData.transfer(
          record,
          source(),
          async (db, rows) => {
            peak = Math.max(peak, process.memoryUsage().heapUsed);
            await db
              .insertInto("application_metadata")
              .values([...rows])
              .execute();
          },
          100,
          { timeoutMs: 120_000, maxRows: rowCount },
        ),
        rowCount,
      );
      console.info(
        `Transfer measurement: ${rowCount} rows, ${Date.now() - started} ms, ${Math.round((peak - baseline) / 1024 / 1024)} MiB sampled heap growth.`,
      );
      const page = await database.masterData.fetch(
        { page: 3, pageSize: 25 },
        (db, p) =>
          db
            .selectFrom("application_metadata")
            .selectAll()
            .orderBy("key")
            .limit(p.limit)
            .offset(p.offset)
            .execute(),
        record,
      );
      assert.equal(page.data.length, 25);
      assert.equal(page.data[0].value, "தமிழ் 🚀 50");
      await assert.rejects(
        database.masterData.persist(record, { key: "bad", value: null }, async () => {
          throw new Error("must not run");
        }),
        /validation/,
      );
      await assert.rejects(
        database.masterData.transfer(
          record,
          [
            { key: "rollback", value: "ok" },
            { key: "row-00000", value: "duplicate" },
          ],
          async (db, rows) => {
            await db
              .insertInto("application_metadata")
              .values([...rows])
              .execute();
          },
          1,
        ),
      );
      assert.equal(
        (
          await database.database
            .selectFrom("application_metadata")
            .selectAll()
            .where("key", "=", "rollback")
            .execute()
        ).length,
        0,
      );
      assert.equal((await smokeDatabase(environment)).status, "ready");

      const cancellationStarted = Date.now();
      await assert.rejects(
        database.masterData.transfer(
          record,
          [{ key: "cancelled-query", value: "rollback" }],
          async (transaction, rows, signal) => {
            await transaction
              .insertInto("application_metadata")
              .values([...rows])
              .execute({ signal, inflightQueryAbortStrategy: "kill session" });
            await sql`SELECT SLEEP(5)`.execute(transaction, {
              signal,
              inflightQueryAbortStrategy: "kill session",
            });
          },
          1,
          { timeoutMs: 50 },
        ),
      );
      assert.ok(
        Date.now() - cancellationStarted < 3000,
        "Cancellation must interrupt the five-second query.",
      );
      assert.equal(
        (
          await database.database
            .selectFrom("application_metadata")
            .selectAll()
            .where("key", "=", "cancelled-query")
            .execute()
        ).length,
        0,
      );
      // Competing row locks exercise real engine deadlock rollback in the isolated database.
      let locked = 0;
      let unlock!: () => void;
      const bothLocked = new Promise<void>((resolve) => {
        unlock = resolve;
      });
      const compete = (first: string, second: string, value: string) =>
        database.transaction(async (transaction) => {
          await transaction
            .updateTable("application_metadata")
            .set({ value })
            .where("key", "=", first)
            .execute();
          if (++locked === 2) unlock();
          await bothLocked;
          await transaction
            .updateTable("application_metadata")
            .set({ value })
            .where("key", "=", second)
            .execute();
        });
      const deadlock = await Promise.allSettled([
        compete("row-00000", "row-00001", "left"),
        compete("row-00001", "row-00000", "right"),
      ]);
      assert.equal(deadlock.filter((result) => result.status === "rejected").length, 1);
      const surviving = await database.database
        .selectFrom("application_metadata")
        .select("value")
        .where("key", "in", ["row-00000", "row-00001"])
        .execute();
      assert.equal(surviving[0].value, surviving[1].value);
      // Kill only this test transaction's connection; never the master or another application.
      await assert.rejects(
        database.transaction(async (transaction) => {
          await transaction
            .insertInto("application_metadata")
            .values({ key: "disconnected", value: "uncommitted" })
            .execute();
          const thread = await sql<{ id: number }>`SELECT CONNECTION_ID() AS id`.execute(
            transaction,
          );
          const id = Number(thread.rows[0].id);
          assert.ok(Number.isSafeInteger(id) && id > 0);
          await admin.query(`KILL CONNECTION ${id}`);
          await sql`SELECT 1`.execute(transaction);
        }),
      );
      assert.equal(
        (
          await database.database
            .selectFrom("application_metadata")
            .selectAll()
            .where("key", "=", "disconnected")
            .execute()
        ).length,
        0,
      );
      await database.verify();
      const sourceDatabase = new DatabaseSync(":memory:");
      try {
        sourceDatabase.exec(
          "CREATE TABLE application_metadata(key TEXT PRIMARY KEY,value TEXT NOT NULL); CREATE TABLE migrations(name TEXT); INSERT INTO migrations VALUES('must_not_transfer');",
        );
        sourceDatabase
          .prepare("INSERT INTO application_metadata VALUES(?, ?)")
          .run("row-09999", "தமிழ் 🚀 9999");
        // An incomplete sourceDatabase cannot overwrite a populated destination: mismatch rolls back.
        await assert.rejects(
          new SqliteDataTransfer(sourceDatabase, ["application_metadata"]).execute(
            database.database,
          ),
          /Destination records differ/,
        );
        assert.equal(
          (
            await database.database
              .selectFrom("application_metadata")
              .select("value")
              .where("key", "=", "row-09999")
              .executeTakeFirstOrThrow()
          ).value,
          "தமிழ் 🚀 9999",
        );
        await database.database.deleteFrom("application_metadata").execute();
        assert.deepEqual(
          await new SqliteDataTransfer(sourceDatabase, ["application_metadata"]).execute(
            database.database,
          ),
          { application_metadata: 1 },
        );
        assert.equal((await database.migrationStatus()).length, 9);
      } finally {
        sourceDatabase.close();
      }
      await database.close();
      provider = createDatabaseProvider(environment);
      assert.equal(
        (
          await provider.database
            .selectFrom("application_metadata")
            .select("value")
            .where("key", "=", "row-09999")
            .executeTakeFirstOrThrow()
        ).value,
        "தமிழ் 🚀 9999",
      );
    } finally {
      try {
        await provider?.close();
      } finally {
        try {
          if (created) await admin.query(`DROP DATABASE ${name}`);
        } finally {
          await admin.end();
        }
      }
    }
  },
);
