# Cxsun

## Common startup and portal flow

1. Run `npm ci` from this application directory.
2. Configure the application, cloud governance, database, and bootstrap accounts in the ignored `.env`.
3. Run `npm run setup` to check governance, migrate the database, and seed configured accounts.
4. Run `npm run dev` for the combined frontend and API.

`dev:api` starts only the API. `dev:web` starts only the frontend.
Each mode checks live governance and its reserved port before startup.
Run one mode at a time on the application port.
Development restart replaces only a verified listener belonging to this application.
Production startup rejects occupied ports.

The public page leads to the appropriate login portal and its authorized desk:
`/login → /desk`, `/admin/login → /admin/desk`, or `/sa/login → /sa/desk`.
The server verifies the database, identity schema, and tenant connection registry before it accepts requests.
Restart preserves the application database and durable sessions.

For production, set `APP_MODE=production`, run `npm run build`, then `npm run start`.

An isolated application foundation with Framework, UI, and shared Platform Core identity.

## Current flow

Public home (`/`) → database login → authorized desk.

| Portal              | Login          | Desk          |
| ------------------- | -------------- | ------------- |
| User                | `/login`       | `/desk`       |
| Administrator       | `/admin/login` | `/admin/desk` |
| Super administrator | `/sa/login`    | `/sa/desk`    |

Platform Core verifies passwords, tenant membership, role permissions, and server-managed sessions.
Each portal uses a separate app-specific HttpOnly cookie. Browser storage does not authorize access.
Business features are not implemented.

Identity administration now includes owned resource pages, profile, settings, invitations, and recovery.
Editable records use version checks to reject stale changes.
These local changes remain under acceptance review. They are not the published standard foundation release.

## Development setup

Use Node 26.10.0 or newer and npm 12.2.0 or newer.

1. Run `npm ci` to install the locked packages.
2. Run `npm run tools:env` to create `.env`. Existing configuration is preserved.
3. Set `MCP_SERVER_SECRET` and bootstrap account values in the ignored `.env` file.
4. Run `npm run setup` to verify live guidance and run database migrations and seeds.
5. Run `npm run dev` to start this app.

The default URL is http://127.0.0.1:5173.
Set APP_PORT and APP_URL together in `.env` when the port is occupied.
Port preflight restarts a verified listener owned by this app and rejects unrelated listeners.
APP_NAME, APP_HOST, and APP_MODE configure the server. APP_ID is cxsun.

The API settings loader reads `.env` at startup, applies the documented fallback values,
then lets explicitly supplied process environment values override the file. The optional
`writeSettingsFile` helper updates only approved settings and keeps secrets on the server.
Changes are loaded after restart.

The master connection uses `DB_DRIVER`, `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`,
and `DB_MASTER_NAME` from `.env`. Migration 007 creates the CXSUN-owned
`cxsun_tenant_connections` mapping. Each API request reloads tenant names and active
connection mappings from the master. A mapped tenant database uses the configured driver
and database name or SQLite path; MariaDB tenants inherit the server credentials from
`.env`. Code must pass a tenant ID from an authenticated principal to the request-scoped
database provider. Missing or inactive mappings do not fall back to another database.

Development requires https://mcp.codexsun.com/mcp and a valid secret.
There is no offline or cached guidance fallback. Production startup does not retrieve MCP guidance.
Never place MCP_SERVER_SECRET in frontend code or Git.

## Verification

Run `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, and `npm run test:production`.
Run `npm run packages:check` to check the installed package boundaries.
After a build and database setup, `npm run start` serves the frontend and identity API.
Set APP_MODE=production in the server environment before production startup.

## Standalone commands

Runtime and maintenance use exact registry packages in the lockfile. Installation requires no shared source checkout.
Run `npm run setup` after setting the cloud secret to initialize configuration and verify MCP.
Run `npm run verify` for maintenance, lint, types, tests, build, and production smoke checks.
CI checks out only this app. Identity smoke tests use a temporary database and generated test credentials.
The release profile is a single Node server with React and persisted SQLite.
Desktop, alternate databases, and queue adapters require an explicit capability before adding dependencies.

## Shared package development

The lockfile uses MIT releases: Framework 0.1.11, Platform 0.1.2, UI 0.2.0, Tools 0.1.8 and Email 0.1.0.

- `npm ci`: install the exact registry release and integrity values.
- `npm run packages:local`: optionally install all five package source snapshots for package development.
- `npm run packages:npm`: restore all five registry package versions.
- `npm run packages:platform`: optionally refresh a local Platform artifact for development.

The optional source refresh commands require their matching shared package repositories.
`npm run packages:check` reports installed versions that differ from the lockfile.
Passing this check does not prove registry installation or release compatibility.
Set CODEXSUN_SHARED_ROOT when these repositories are outside the default shared directory.
UIUX is a separate gallery for shared UI source development.

## Repository records and maintenance

Read AGENTS.md and every Markdown record in agent before work.
Retrieve current rules through `npm run mcp:connect`.
Use version-bump, fix:line-endings, lines:check, and check:versions for release maintenance.
Maintain agent/CHANGELOG.md and use commit subjects `#<patch> - <release title>`.
Use github:now only for an authorized commit and push.

GitHub: https://github.com/devxcrew/cxsun.

## Database connections

Cxsun uses a named `master` Kysely connection. The active driver is MariaDB,
configured with `DB_DRIVER`, `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` and
`DB_MASTER_NAME` in ignored `.env`. Credentials are never included in connection lists.
SQLite is an explicitly selected driver for isolated tests and recovery work.
It uses `DB_DRIVER=sqlite` and `DB_SQLITE_PATH=storage/private/data/identity.sqlite`.
The `storage/` directory is private and ignored by Git.

```powershell
npm run db:setup
npm run db:check
npm run db:connections
```

`db:setup` runs migrations and the seed. Run `db:migrate` and `db:seed` separately when needed.
Both commands can run again safely. The seed preserves existing application metadata.
Server startup verifies the connection. It does not automatically migrate or seed the database.
Run migrations before starting a new release.

The database infrastructure lives in `src/api/database`, with public exports in `index.ts`.
Driver-owned connection setup, validation and backups live in `drivers/mariadb`
and `drivers/sqlite`. The provider owns operations; the connection registry owns
the reusable master connection and shutdown; the command entry delegates execution
to `database.service.ts`. See [database organization](agent/DATABASE.md).

### Backup and recovery

Create a consistent SQLite backup before migrations:

```powershell
npm run db:backup -- storage/private/data/backup/before-release.sqlite
npm run db:verify-backup -- storage/private/data/backup/before-release.sqlite
```

Backup refuses to overwrite an existing destination.
The backup includes committed WAL data and passes integrity and foreign-key checks.
Keep backups on protected storage outside the deployment disk.
To rehearse recovery, use a copied backup as DB_SQLITE_PATH in an isolated instance.
Verify login, resource reads, and migration history before restoring a production database.
Stop writers before replacing an operational database. Preserve the current database for rollback.

### Identity email delivery

Set EMAIL_ENABLED=1 and configure SMTP_HOST, SMTP_PORT, SMTP_SECURE, and EMAIL_FROM in the ignored environment.
Set SMTP_USER and SMTP_PASSWORD together when the provider requires authentication.
SMTP_SECURE=1 selects immediate TLS. SMTP_SECURE=0 requires STARTTLS.
Platform owns message templates and single-use lifecycle tokens.
Invitation and recovery requests return an unavailable error while delivery is disabled.
Real provider verification and recipient delivery remain required before release acceptance.
The initial migration creates `application_metadata`. Kysely maintains its own migration history tables.
The Platform migration creates owned users, tenants, memberships, roles, permissions, sessions, and login throttle tables.
The seed records application metadata, a default organization, roles, and permissions.
Optional bootstrap accounts are created only when both email and password values are configured.
Existing users, passwords, and memberships are preserved. Seeds do not elevate an existing account.

## Identity configuration

`IDENTITY_MODE=single-client` binds sessions to `IDENTITY_TENANT_ID` on the server.
`IDENTITY_MODE=multi-tenant` requires an organization ID at login and verifies its database membership.
`IDENTITY_SESSION_SECONDS` controls absolute session expiry, from 300 to 86400 seconds.
External origins require HTTPS. Loopback HTTP supports local development.

The local installation has three bootstrap accounts: `user@cxsun.local`, `admin@cxsun.local`, and `superadmin@cxsun.local`.
Their generated passwords are in the matching `IDENTITY_SEED_*_PASSWORD` fields of ignored `.env`.
Passwords are not printed in logs or saved in source. Fresh clones have empty bootstrap values.
Changing a password revokes all sessions for that account. Re-running the seed preserves the changed password.

The API prefix is `/api/v1/identity/<portal>`, where portal is `user`, `admin`, or `super-admin`.

| Method | Path                | Purpose                                     |
| ------ | ------------------- | ------------------------------------------- |
| POST   | `/sessions`         | Verify credentials and create a session     |
| GET    | `/sessions/current` | Read the verified principal                 |
| DELETE | `/sessions/current` | Revoke the current portal session           |
| PATCH  | `/password`         | Change password and revoke account sessions |

Run `npm run test:identity` after a build to verify the compiled server with an isolated test database.
The frontend identity owner is `src/web/modules/identity`. Backend identity belongs to `shared/platform/src/modules/identity`.
Identity administration screens connect to the public Platform resource APIs. Lists, details, authorized mutations,
settings and role-specific navigation are implemented. MFA is not part of the current local password-only profile.
Real email delivery testing and production deployment are deferred by the user. Coordinated package publication
and the remaining acceptance checks are tracked in [the foundation checklist](agent/CHECKLIST.md).

## Local generated-consumer rehearsal

Run `npm run packages:platform` first and wait for completion.
Then run `npm run packages:local` and wait for completion to refresh the remaining development tarballs.
Then run `npm run test:consumers`. The check packs the current owner sources into fresh archives. Use `npm run test:consumers -- --temporary` to run the source rehearsal outside the workspace. This creates two isolated applications under ignored `.cache` paths,
verifies clean installation from real packed artifacts, runs application checks, creates separate persisted SQLite
databases and checks that one application's session cannot authenticate in the other application.
Only synthetic bootstrap accounts are used. Operational environment values and database files are not copied.
The rehearsal inherits verified third-party lock entries and reads first-party metadata and integrity from the actual tarballs.
It does not prove published registry installation, remote CI or production readiness.

## Add an owned module

Follow [module extension contracts](agent/MODULE-EXTENSIONS.md) for public backend/frontend contributions,
permission declarations and the common authenticated workspace.

## Registry template verification

Run `npm run test:consumers:registry` to export the exact registry template from agent/FOUNDATION-RELEASE.json and generate two independent applications. The check runs clean installs, application verification, persisted SQLite setup, and cross-app session denial. Each app keeps its own data and configuration. Generation does not establish browser or production acceptance.

## Candidate upgrade verification

Run `npm run test:consumers:upgrade -- <local-consumer-results.json>` for two existing disposable local candidates. The check is restricted to this app's `.cache/local-consumers-*` fixtures. It installs the exact registry release, migrates the retired public Framework/UI package references, and records each changed file. It verifies unchanged unrelated source and configuration, compares the SQLite schema and every stored row, and checks existing portal logins. A new release requires its own migration review and verification.

## Reserved development port

`npm run dev` uses shared Tools preflight with `DEVXCREW_DEV_PORT_POLICY=restart`.
It checks this app and its configured port, stops the existing app process tree,
waits for the port to be free and starts on the same port. It preserves unrelated
listeners and never advances to another port. Set the policy to `abort` to disable
development reclaim. Production startup does not reclaim occupied ports.

# Generated file cleanup

Run `npm run clean` to remove build output, caches, coverage, test reports,
root `dump` and `dumps` folders, and generated cache logs. Preview targets with
`npm run clean -- --dry-run`. Source tests, dependencies, environment files and
application storage are preserved. Rebuild before a production start after cleanup.

## Private database storage - 2026-10-05

Database path: `storage/private/data/identity.sqlite` relative to this app.
Backup path: `storage/private/data/backup/`. `npm run db:backup` creates a
new timestamped backup here; explicit destinations are supported. Storage stays
private and ignored by Git. Cleanup preserves it. Existing identity data was
moved after a consistent safety backup and WAL checkpoint; integrity and foreign
key checks passed.

## Database verification

Run `npm run test:database` for isolated database tests, including app preflight and master migration acceptance.
Run Framework and Platform owner tests for execution, transfers and tenant context.
Run `npm run test:database:mariadb` for the opt-in live engine suite; it creates
and removes its own temporary database and needs create/drop permissions.
Run `npm run db:smoke` to check the configured master without changing data.
Backend development runs this smoke check before reserved-port restart.

See [database execution and test contracts](agent/DATABASE-TESTING.md).

## Separate tenant storage

Platform owns tenant scope in shared/platform/src/modules/tenant.
Database infrastructure only manages engines and leased connections. Tenant
requests use their selected storage; trusted master operations use masterData.
Run npm run tenant:provision after seeding identity, then npm run db:smoke.
Backups and isolated recovery checks have tenant:backup, tenant:verify-backup and
tenant:verify-restore scripts. See [tenancy ownership](agent/TENANCY.md).

## Shared foundation ownership

Framework owns generic database and settings providers. Platform owns identity and tenancy.
Cxsun keeps app configuration and historical migration composition.
Run npm run packages:foundation to refresh both shared development artifacts.
The recorded vendor packages allow npm ci without sibling source directories.
Run npm run test:foundation:standalone for a clean installation and complete verification.
See agent/TENANCY.md for the public boundaries. Registry adoption requires new shared package releases.
