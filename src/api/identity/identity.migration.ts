// Platform owns identity DDL. This explicit public data-transfer contract excludes runtime sessions.
export const identityTransferTables = [
  "identity_permission_declarations",
  "identity_app_settings",
  "identity_tokens",
  "identity_users",
  "identity_tenants",
  "identity_roles",
  "identity_permissions",
  "identity_role_permissions",
  "identity_memberships",
  "identity_custom_roles",
  "identity_custom_role_permissions",
  "identity_settings",
  "identity_audit_events",
] as const;
