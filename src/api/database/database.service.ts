import { identityTransferTables } from "../identity/index.js";
import { smokeDatabase } from "./operations/database.smoke.js";
import { createDatabaseProvider } from "./database.provider.js";
import { createDatabaseBackup, verifyDatabaseBackup } from "@devxcrew/framework";
import { join } from "node:path";
import {
  createMariaDbBackup,
  verifyMariaDbBackup,
  rehearseMariaDbRestore,
} from "@devxcrew/framework";
import { importSqliteIdentity } from "./operations/sqlite-import.js";

import { databaseCommandSchema, readDatabaseConfiguration } from "@devxcrew/framework";

export async function executeDatabaseCommand(
  input: string,
  args: string[],
  environment: NodeJS.ProcessEnv = process.env,
) {
  const parsed = databaseCommandSchema.safeParse(input);
  if (!parsed.success) throw new Error(`Use one of: ${databaseCommandSchema.options.join(", ")}`);
  const command = parsed.data;
  const { driver } = readDatabaseConfiguration(environment);
  if (command === "smoke") {
    const result = await smokeDatabase(environment);
    console.info(
      `Database smoke passed: ${result.driver}, ${result.migrations} migrations; ${result.tenants.checked} tenant connections checked, ${result.tenants.unmapped} tenants await provisioning.`,
    );
  } else if (command === "import-sqlite") {
    await importSqliteIdentity(environment, ["application_metadata", ...identityTransferTables]);
  } else if (command === "backup" || command === "verify-backup" || command === "verify-restore") {
    const destination =
      args[0] ??
      (command === "backup"
        ? join(
            environment.DB_BACKUP_DIR ?? "storage/private/data/backup",
            `master-${new Date().toISOString().replace(/[:.]/g, "-")}.${driver === "mariadb" ? "sql" : "sqlite"}`,
          )
        : undefined);
    if (!destination) throw new Error("Supply a backup file path.");
    if (command === "verify-restore") {
      if (driver !== "mariadb") throw new Error("Restore rehearsal requires MariaDB.");
      await rehearseMariaDbRestore(environment, destination);
    } else if (driver === "mariadb") {
      if (command === "backup") await createMariaDbBackup(environment, destination);
      else await verifyMariaDbBackup(destination);
      console.info(
        `MariaDB backup ${command === "backup" ? "created" : "checksum verified"}: ${destination}`,
      );
    } else if (command === "backup") {
      await createDatabaseBackup(
        environment.DB_SQLITE_PATH ?? "storage/private/data/identity.sqlite",
        destination,
      );
      console.info("SQLite backup completed and integrity checks passed.");
    } else {
      verifyDatabaseBackup(destination);
      console.info("SQLite backup integrity checks passed.");
    }
  } else {
    const provider = createDatabaseProvider(environment);
    try {
      if (command === "connections") {
        await provider.verify();
        console.table(provider.connections());
      } else if (command === "migrate") {
        const results = await provider.migrate();
        for (const result of results) console.info(`${result.migrationName}: ${result.status}`);
        if (!results.length) console.info("Database migrations are current.");
      } else if (command === "seed:tenancy") {
        await provider.seedTenancy();
        console.info("Tenant registry and standard grants seeded; no accounts created.");
      } else if (command === "seed") {
        await provider.seed();
        console.info("Database seed completed.");
      } else {
        await provider.verify();
        console.info(`${provider.driver} master connection passed.`);
      }
    } finally {
      await provider.close();
    }
  }
}
