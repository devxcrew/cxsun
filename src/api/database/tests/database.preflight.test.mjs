import assert from "node:assert/strict";
import { test } from "node:test";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { databasePreflight } from "../../../../tools/database-preflight.mjs";

test("database preflight accepts a migrated database and rejects missing migrations", async () => {
  const directory = await mkdtemp(join(tmpdir(), "cxsun-preflight-db-"));
  try {
    const environment = {
      ...process.env,
      DB_DRIVER: "sqlite",
      DB_SQLITE_PATH: join(directory, "master.sqlite"),
    };
    await assert.rejects(
      databasePreflight(process.cwd(), environment),
      /Database preflight failed/,
    );
    const migration = spawnSync(
      process.execPath,
      ["--import", "tsx", "src/api/database/operations/database.command.ts", "migrate"],
      { env: environment, stdio: "ignore", windowsHide: true, timeout: 20_000 },
    );
    assert.equal(migration.status, 0);
    await databasePreflight(process.cwd(), environment);
    await assert.rejects(
      databasePreflight(process.cwd(), { ...environment, DB_DRIVER: "unsupported" }),
      /Database preflight failed/,
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
