# Multi-tenant master foundation

Status: planned. Database engine selection is pending.
Updated: 2026-10-05.

## First outcome

Cxsun connects to an explicitly configured master database through `.env`, applies
the tenancy schema and seeds the first tenant. This phase adds no business modules
and does not claim complete multi-tenant operation.

The master will hold the tenancy registry and platform-wide identity configuration.
Tenant operational databases will be introduced in a later phase if the selected
isolation model requires them. Each product app remains isolated and uses public
shared package contracts.

## Current state

| Area          | Current implementation                                                                                | Change needed                                                                                              |
| ------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Database      | App-local SQLite at `storage/private/data/identity.sqlite`                                            | Add an explicit master connection contract after engine selection.                                         |
| Identity mode | `.env.example` specifies `single-client`                                                              | Enable `multi-tenant` only with verified resolution and isolation.                                         |
| Tenant table  | `identity_tenants`                                                                                    | Reuse the public Platform tenancy contract; do not create a competing registry.                            |
| Seeder        | Public `seedIdentity` inserts tenant, roles, permissions, accounts and memberships in one transaction | Expose a supported tenancy-only seed operation before identity bootstrap.                                  |
| Dialect       | SQLite provider, migrations and seed queries                                                          | MariaDB or PostgreSQL requires compatible owner implementations and tests, not just an environment switch. |
| Backups       | Verified SQLite snapshots under `storage/private/data/backup/`                                        | Preserve these; implement engine-appropriate master backup and restore if the engine changes.              |

## Environment contract

Names below are proposed for implementation, not configured runtime features today.
Keep real credentials in ignored `.env`; publish blank placeholders in `.env.example`.

| Variable                        | Purpose                                                                        |
| ------------------------------- | ------------------------------------------------------------------------------ |
| `APP_TENANCY_MODE=multi-tenant` | Explicit app tenancy selection; keep identity mode consistent once verified.   |
| `MASTER_DB_CLIENT`              | Selected engine: SQLite, MariaDB or PostgreSQL.                                |
| `MASTER_DB_HOST`                | SQL server host, when a server engine is selected.                             |
| `MASTER_DB_PORT`                | SQL server port, when applicable.                                              |
| `MASTER_DB_NAME`                | Explicit master database name.                                                 |
| `MASTER_DB_USER`                | Dedicated application connection user.                                         |
| `MASTER_DB_PASSWORD`            | Server-only secret.                                                            |
| `MASTER_DB_SSL`                 | Validated transport configuration for a server database.                       |
| `MASTER_DB_SQLITE_PATH`         | `storage/private/data/master.sqlite` only if SQLite is selected.               |
| `DB_BACKUP_DIR`                 | App-relative `storage/private/data/backup/` for local backup output.           |
| `IDENTITY_TENANT_ID`            | Explicit bootstrap tenant identity; never an implicit runtime tenant fallback. |
| `IDENTITY_TENANT_NAME`          | Bootstrap tenant display name.                                                 |

Validate only the fields required by the selected engine. Fail clearly on missing
configuration or an unavailable master; do not silently switch to SQLite or a
default tenant. Remote SQL database files are managed by the database server;
the app-local storage rule applies to SQLite files and local backup output.

## Implementation order

| Step                  | Work                                                                                          | Acceptance                                                                                 |
| --------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| 1. Select engine      | Confirm engine, master name and credentials; preserve existing SQLite identity data.          | Document an explicit existing-data transition before switching runtime storage.            |
| 2. Master connection  | Add validated server configuration and an app-owned database provider.                        | Focused connection check passes; bad credentials and unavailable servers fail clearly.     |
| 3. Tenancy schema     | Use public Platform owner migrations. Add tenant metadata only when required by provisioning. | Fresh migration and repeat migration pass without duplicate schemas or records.            |
| 4. Tenancy-first seed | Add a public Platform tenancy-only seeder and an app command such as `db:seed:tenancy`.       | Initial tenant exists; rerunning preserves ID, user-owned name/status and related records. |
| 5. Identity bootstrap | Seed standard roles, permissions and authorized bootstrap accounts after tenancy.             | No membership refers to a missing tenant; existing credentials are preserved.              |
| 6. Recovery           | Create a consistent master backup and rehearse restoration into an isolated database.         | Restored tenancy data matches the original; backups remain private and out of Git.         |

The tenancy seeder must not create tenant business tables, user credentials or
product sample data. Do not invent tenant database credentials or domains when
those provisioning decisions have not been made.

## Ownership and tenant resolution

Platform owns tenancy, identity and their schema contracts. Cxsun owns environment
loading, database composition and application startup. Any new owner module follows
the canonical provider, controller, routes, service, repository, migration, seed,
schema and types structure from live governance.

Keep the three portals distinct. Establish tenant scope through validated host or
an explicitly validated selection and membership check. Once authenticated, use
trusted session context for tenant scope; never accept a request parameter as
authorization or route to a different tenant merely because it supplied an ID.

Do not enable the production multi-tenant mode until two tenant fixtures prove
that users, sessions, permissions and tenant data cannot cross scopes. Changing
`IDENTITY_MODE` alone is not that proof.

## Follow-up scope

| Phase                       | Scope                                                                      |
| --------------------------- | -------------------------------------------------------------------------- |
| First                       | Master connection, tenancy migration and tenancy-first seeding.            |
| Next                        | Identity bootstrap, tenant-aware login and isolation checks.               |
| Later                       | Tenant database provisioning/routing, tenant lifecycle and domain mapping. |
| After foundation acceptance | Module-owned business features.                                            |

## Verification status

Passed for planning: authenticated live governance connection and source review
of Cxsun database composition and installed Platform 0.1.2 seed/provider code.
No master database was configured, migrated or seeded in this planning task.
Connection, migration, seed-repeat, recovery and tenant isolation checks remain
implementation acceptance work.
