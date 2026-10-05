import { verifyTenantReadiness } from "@devxcrew/platform";
import { access } from "node:fs/promises";
import { readDatabaseConfiguration } from "@devxcrew/framework";
import { createDatabaseProvider } from "../database.provider.js";

/** Read-only readiness check. Never migrate, seed, transfer or reclaim ports here. */
export async function smokeDatabase(environment: NodeJS.ProcessEnv = process.env) {
  const configuration = readDatabaseConfiguration(environment);
  if (configuration.driver === "sqlite") await access(configuration.path);
  const provider = createDatabaseProvider(environment);
  try {
    const pending = await provider.migrationStatus();
    if (pending.some((migration) => !migration.executedAt))
      throw new Error("Database has pending migrations; run npm run db:migrate.");
    await provider.verify();
    await provider.database.selectFrom("application_metadata").select("key").limit(1).execute();
    await provider.database.selectFrom("identity_users").select("id").limit(1).execute();
    const tenants = await verifyTenantReadiness(provider);
    return {
      driver: provider.driver,
      migrations: pending.length,
      status: "ready",
      tenants,
    } as const;
  } finally {
    await provider.close();
  }
}
