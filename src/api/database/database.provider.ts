import { createDatabaseProvider as createFrameworkDatabase } from "@devxcrew/framework";
import { seedIdentity } from "@devxcrew/platform";
import { applicationMigrations } from "./database.migration.js";
import type { DatabaseSchema } from "./common/database.types.js";
export function createDatabaseProvider(environment: NodeJS.ProcessEnv = process.env) {
  const provider = createFrameworkDatabase<DatabaseSchema>(environment, {
    migrations: applicationMigrations,
    seed: seedIdentity,
  });
  return {
    ...provider,
    async seedTenancy() {
      const tenancyEnvironment = Object.fromEntries(
        Object.entries(environment).filter(([key]) => !key.startsWith("IDENTITY_SEED_")),
      );
      await seedIdentity(provider.database, tenancyEnvironment);
    },
  };
}
