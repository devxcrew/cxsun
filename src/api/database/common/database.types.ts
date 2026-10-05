import type { DatabaseInfrastructureSchema } from "@devxcrew/framework";
import type { IdentitySchema, TenantRegistrySchema } from "@devxcrew/platform";
export interface DatabaseSchema
  extends DatabaseInfrastructureSchema, IdentitySchema, TenantRegistrySchema {}
