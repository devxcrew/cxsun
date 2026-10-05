# Tenant ownership and package connection

## Current owners

| Owner | Code | Responsibility |
| --- | --- | --- |
| Framework | shared/framework/src/modules/database | Kysely drivers, connection leases, execution, transactions, checkpoints, imports and backups. |
| Framework | shared/framework/src/modules/settings | Environment file loading, isolated snapshots, validation and allowlisted file updates. |
| Platform | shared/platform/src/modules/tenant | Tenant mappings, authenticated scope, provisioning, readiness and tenant HTTP transport. |
| Platform | shared/platform/src/modules/identity | Identity records, sessions, memberships, RBAC and identity seeds. |
| Cxsun | src/api/application | App settings, module registration, server startup and operational command adapters. |
| Cxsun | src/api/database | App schema and migration order, identity seed composition and app readiness. |

Cxsun imports shared behavior through public package exports. It contains no copied database drivers or tenant implementation.
Business modules remain app-owned. This extraction adds no tenant administration UI or business features.

## Request flow

1. Cxsun registers the public Platform tenant provider after database and identity.
2. Platform routes each tenant request through its controller.
3. Tenant middleware validates the portal and optional tenant header.
4. Platform authenticates the session and returns its principal.
5. Tenant service checks the authorized tenant, runtime mode and active mapping.
   It reads tenant identity through the public identity organization directory.
6. Framework leases the selected connection for the request.
7. Tenant context supplies scoped database execution and resumable transfers.
8. The controller returns a safe response. The connection lease ends after the work finishes.

GET /api/v1/tenants/current returns data.tenantId and data.portal.
The response uses no-store and nosniff headers. It exposes no credentials or database paths.

The optional x-tenant-id must match the authenticated principal.
x-tenant-db is rejected. x-identity-portal selects the user, admin or super-admin authenticator.
It does not grant permissions. Super-admin does not bypass another tenant's data scope.

Missing sessions return 401. Foreign tenants return 403.
Invalid request context returns 422. Exhausted connection capacity returns 503.

Owner controllers wrap work with tenant.runRequest and use tenant.current().data or database.
Use masterData only for trusted master infrastructure and identity operations.
Do not retain a scope after its request finishes.

## Package development

Cxsun records Framework and Platform snapshots in vendor/*.tgz.
Its manifest and lockfile reference these artifacts. npm ci does not require shared source directories.

Run npm run packages:foundation after shared source changes.
This command builds both owners, packs them and updates the local package references.
Run npm run test:foundation:standalone to test a clean offline installation and the complete app verification.
Run npm run packages:check to verify installed package and lock entries.

These extracted contracts are local development changes. This task does not publish a package or change a release version.
Published registry pins need new releases before they can provide these contracts.
Do not restore older registry packages while expecting the extracted APIs to remain available.

## Existing data and operations

Cxsun preserves all nine master migration IDs and their existing order.
The legacy table name remains only in Cxsun's historical migration composition.
Platform receives compatibility names as arguments. Its runtime uses tenant_connections.

Use npm run tenant:provision after identity seeding. Reruns preserve existing mappings.
SQLite tenant files use the configured master's private data directory.
MariaDB tenant database names derive from the master prefix and a tenant ID hash.
Provisioning registers a mapping only after storage migrations pass.

Use npm run db:smoke before server startup. It checks the master and active tenant connections.
Unmapped tenants are reported separately. Master readiness does not authorize tenant data access.
Use tenant:backup, tenant:verify-backup and tenant:verify-restore for tenant recovery.
Backups remain in storage/private/data/backup by default.

Runtime database account privileges and production TLS remain deployment configuration.
No runtime account rotation or production network acceptance was performed.
