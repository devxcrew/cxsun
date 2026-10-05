import assert from "node:assert/strict";
import { test } from "node:test";
import { mkdtemp, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import {
  createTenantProvider,
  provisionTenant,
  verifyTenantReadiness,
  type Principal,
} from "@devxcrew/platform";
import { HttpError } from "@devxcrew/framework";
import { createDatabaseProvider, type DatabaseSchema } from "../src/api/database/index.js";

test("installed foundation packages provision isolated tenant storage and preserve the app migration ledger", async () => {
  const root = await mkdtemp(join(tmpdir(), "foundation-consumer-"));
  const environment = {
    DB_DRIVER: "sqlite",
    DB_SQLITE_PATH: join(root, "master.sqlite"),
    IDENTITY_TENANT_ID: "one",
  };
  const database = createDatabaseProvider(environment);
  try {
    await database.migrate();
    await database.database
      .insertInto("identity_tenants")
      .values([
        { id: "one", name: "One", active: 1 },
        { id: "two", name: "Two", active: 1 },
      ])
      .execute();
    // Existing app mappings are authoritative. Provisioning must preserve them.
    for (const id of ["one", "two"]) {
      const path = join(root, `${id}.sqlite`);
      await database.provisionConnection({
        key: id,
        driver: "sqlite",
        databaseName: null,
        sqlitePath: path,
        version: 1,
      });
      await database.database
        .insertInto("tenant_connections")
        .values({
          tenant_id: id,
          driver: "sqlite",
          sqlite_path: path,
          database_name: null,
          active: 1,
        })
        .execute();
    }
    assert.deepEqual(await provisionTenant(database, environment), {
      tenantId: "one",
      status: "existing",
    });
    assert.equal((await database.migrationStatus()).length, 9);
    assert.deepEqual(await database.migrate(), []);
    assert.deepEqual(await verifyTenantReadiness(database), {
      checked: 2,
      unmapped: 0,
      status: "ready",
    });
    const actor = (id: string): Principal => ({
      appId: "consumer",
      user: { id, name: id, email: `${id}@example.test` },
      tenant: { id, name: id },
      portal: "user",
      permissions: [],
    });
    const tenant = createTenantProvider<DatabaseSchema>(
      database,
      { authenticateRequest: async () => actor("one") },
      { IDENTITY_MODE: "multi-tenant" },
    );
    await Promise.all(
      ["one", "two"].map((id) =>
        tenant.withPrincipal(actor(id), undefined, async () => {
          await tenant
            .current()
            .database.insertInto("application_metadata")
            .values({ key: "owner", value: id })
            .execute();
        }),
      ),
    );
    for (const id of ["one", "two"])
      await tenant.withPrincipal(actor(id), undefined, async () => {
        const row = await tenant
          .current()
          .database.selectFrom("application_metadata")
          .selectAll()
          .executeTakeFirstOrThrow();
        assert.equal(row.value, id);
      });
    assert.equal(
      (await database.database.selectFrom("application_metadata").selectAll().execute()).length,
      0,
    );
    await assert.rejects(
      tenant.withPrincipal(actor("one"), "two", async () => undefined),
      (error) => error instanceof HttpError && error.status === 403,
    );
    assert.throws(() => tenant.current(), /authenticated tenant context/);
  } finally {
    await database.close();
    await rm(root, { recursive: true, force: true });
  }
});
