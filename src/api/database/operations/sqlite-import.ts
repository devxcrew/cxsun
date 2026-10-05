import { DatabaseSync } from "node:sqlite";
import { resolve } from "node:path";
import { SqliteDataTransfer } from "@devxcrew/framework";
import { createDatabaseProvider } from "../index.js";

export async function importSqliteIdentity(
  environment: NodeJS.ProcessEnv,
  allowedTables: readonly string[],
) {
  if (environment.DB_DRIVER !== "mariadb") throw new Error("Import destination must be MariaDB.");
  const source = new DatabaseSync(
    resolve(environment.DB_SQLITE_PATH ?? "storage/private/data/identity.sqlite"),
    {
      readOnly: true,
    },
  );
  let target: ReturnType<typeof createDatabaseProvider> | undefined;
  try {
    target = createDatabaseProvider(environment);
    const existing = await target.database
      .selectFrom("identity_users")
      .select("id")
      .limit(1)
      .execute();
    if (existing.length) throw new Error("Refusing import into a master with existing users.");
    const report = await new SqliteDataTransfer(source, allowedTables).execute(
      target.database,
      AbortSignal.timeout(300_000),
    );
    for (const [table, count] of Object.entries(report))
      console.info(`${table}: ${count} records verified.`);
  } finally {
    source.close();
    await target?.close();
  }
}
