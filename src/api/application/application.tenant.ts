import { createTenantProvider } from "@devxcrew/platform";
import type { createDatabaseProvider } from "../database/index.js";
import type { createIdentityProvider } from "@devxcrew/platform";
import { contributeModule } from "./application.provider.js";
import type { DatabaseSchema } from "../database/index.js";
export function tenantModule(environment: NodeJS.ProcessEnv) {
  return contributeModule(
    {
      name: "tenant",
      dependencies: ["database", "identity"],
      create(dependencies) {
        return createTenantProvider<DatabaseSchema>(
          dependencies.get("database") as ReturnType<typeof createDatabaseProvider>,
          dependencies.get("identity") as ReturnType<typeof createIdentityProvider>,
          environment,
        );
      },
      start: (provider) => provider.verify(),
    },
    (provider, request, response, signal) => provider.handle(request, response, signal),
  );
}
