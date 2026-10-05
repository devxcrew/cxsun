import { databaseMetadataMigration, transferCheckpointsMigration } from "@devxcrew/framework";
import {
  identityMigration,
  identityAdministrationMigration,
  identityRolesMigration,
  identityPermissionDeclarationsMigration,
  identityPermissionLabelsMigration,
  createLegacyTenantConnectionsMigration,
  createTenantConnectionsMigration,
} from "@devxcrew/platform";
export const applicationMigrations = {
  "001_application_metadata": databaseMetadataMigration,
  "002_platform_identity": identityMigration,
  "003_platform_identity_administration": identityAdministrationMigration,
  "004_platform_identity_roles": identityRolesMigration,
  "005_platform_identity_permission_declarations": identityPermissionDeclarationsMigration,
  "006_platform_identity_permission_labels": identityPermissionLabelsMigration,
  "007_cxsun_tenant_connections": createLegacyTenantConnectionsMigration(
    "cxsun_tenant_connections",
  ),
  "008_tenant_connections": createTenantConnectionsMigration("cxsun_tenant_connections"),
  "009_transfer_checkpoints": transferCheckpointsMigration,
};
