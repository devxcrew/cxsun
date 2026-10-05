# Cxsun tasks

## Common startup and portal flow - 2026-10-05

- [x] Verify live authenticated governance before edits.
- [x] Align development launchers and startup banners with Cxsun.
- [x] Document setup, runtime modes, reserved ports, and the three portal flows.
- [x] Pass full application verification after startup alignment.

Evidence: `.cache/startup-alignment-verify.log`. Application identity, port, database, and session scope remain app-owned.

## Package reference cleanup - 2026-10-05

- [x] Retrieve authenticated cloud governance.
- [x] Remove superseded package identifiers from source, fixtures and current documents.
- [x] Use Framework and UI names consistently.
- [x] Scan repository files for remaining superseded identifiers.

Static cleanup only. No test suite, publication or deployment ran in this step.

Updated: 2026-10-05.
Status: phases 1 and 2 are in progress. See AUDIT.md for current evidence and limits.

## Settings and tenant connection modules - 2026-10-05

- [x] Consolidate environment loading, normalization, global settings and optional `.env` writing into `src/api/settings.ts`.
- [x] Add a CXSUN-owned tenant database mapping migration and request-scoped connection provider.
- [x] Load the master tenant registry for every API request and expose dynamic tenant connection lookup to composed modules.
- [x] Remove the business-module-shaped settings scaffolding and consolidate connection handling into `database.connections.ts`.
- [x] Verify the complete settings-to-data execution path and repository acceptance.

The request context reloads tenant mappings from the master for each API request.
The application data executor is wired to the provider's master Kysely connection.

Per-tenant credentials are inherited from the master `.env` connection. Tenant mapping provisioning and dynamic identity routing are not implemented by this task.

## 1. Package migration

Root verification and both fresh registry consumers passed. See AUDIT.md and PHASE12-GENERATED-CONSUMERS.json.

- [ ] Resolve the stalled older-fixture install and repeat its upgrade check. Fresh registry consumers already pass.

## 2. Browser acceptance

Public/login/desk flows, profile edits, organization creation, application settings, query navigation,
expiry redirects, mobile navigation, and focus return passed in an isolated fixture. See AUDIT.md.

- [ ] Complete resource mutations and denial combinations for each portal.
- [ ] Complete role, membership, organization, and security settings browser checks.
- [ ] Complete pagination, breadcrumb, and invalid-link browser checks.
- [ ] Complete session-revoke confirmation with an available dialog tool.
- [ ] Complete browser password change with user interaction.
- [ ] Complete real screen-reader and the remaining viewport checks.

## 3. Live governance

- [x] Retrieve authenticated live guidance and verify metadata; see SHARED-ALIGNMENT.md.
- [x] Confirm live guidance and discovery match the foundation; see SHARED-ALIGNMENT.md.

## 4. Release acceptance

- [ ] Align release records and repeat required checks, including the current remote CI matrix.
- [ ] Record passed, failed, blocked, partial, and untested results in AUDIT.md.
- [ ] Commit and push the reviewed changes only when authorized.

## Deferred

- [ ] Verify real SMTP invitation and recovery delivery when resumed.
- [ ] Verify production TLS/proxy, account policy, load limits, protected backups, and recovery when resumed.

Do not mark a task complete from older release evidence. Link new verification evidence before removing completed tasks.

## Dependency alignment - 2026-10-05

- [x] Align consumed shared packages and common direct dependency versions.
- [x] Install dependencies with lifecycle scripts disabled.
- [x] Keep app dependency ownership and public peer ranges.
- [x] Exclude Veyrezio from this change.

Source version: 0.2.2. Published package archives retain their existing versions.
The baseline is recorded in projects/cxsun/agent/DEPENDENCY-BASELINE.json.

## Shared alignment audit - 2026-10-05

Full verification (48 tests), registry and fresh source consumers passed. Existing database upgrade and browser acceptance remain partial.

Authenticated live MCP verification passed. See the consolidated [alignment audit](D:/codexsun/projects/cxsun/agent/SHARED-ALIGNMENT.md) for package versions, evidence and remaining gaps. No release delivery was performed by this audit.

## Cxsun foundation parity - 2026-10-05

Current source and exact dependencies match Cxsun after app-name and port substitutions.
This app keeps its own ID, release version, database, Git repository and history.
Verification passed: 50 tests, lint, types, build, compiled identity, package boundaries and authenticated live MCP.

See [foundation parity](D:/codexsun/projects/cxsun/agent/FOUNDATION-PARITY.md) for evidence and remaining acceptance work. Live inventory needs refresh after this change. No commit, push, publication or deployment was performed.

## Identity and RBAC verification - 2026-10-05

Passed against Cxsun 0.2.3 with installed npm Platform 0.1.2 and Framework 0.1.11.
Authenticated live governance retrieval passed before verification.

- Full verification passed: 50 tests, lint, types, build and compiled HTTP acceptance.
- The focused frontend permission and public module permission checks passed: four repeated tests.
- All three configured accounts signed in against the real local SQLite database.
  Their desks and permitted resource reads passed. Verification sessions were logged out.
- User requests for users, roles, permissions, organizations, memberships, audit events
  and invitations returned 403 against the configured database.
- All six attempts to reuse a token under another portal cookie returned 401.
  Anonymous current-session requests returned 401 in every portal.
- Disposable compiled acceptance passed role and tenant denial, resource permissions,
  membership revisions, validation, password change, logout, durable sessions,
  scoped cookie flags, response privacy and restart-persistent login limits.
- Public permission registration and enforcement passed. Frontend permission choices
  respect portal eligibility and accessible field errors.
- Package boundaries passed. Read-only SQLite integrity checks returned ok before
  and after the configured-account checks.

Evidence: `.cache/identity-rbac-verify.log`, `.cache/identity-rbac-packages.log`,
`.cache/identity-rbac-live.log`, `.cache/identity-rbac-live-denials.log`,
`.cache/identity-rbac-permissions.log` and `.cache/identity-rbac-mcp.log`.
The additional live denial harness is `.cache/live-rbac-verification.mjs`.

No identity or RBAC implementation correction was needed. Full interactive browser
acceptance and deployed production acceptance were not run. Real SMTP delivery
remains outside this verification. No version change, commit or push was performed.

## Development port recovery - 2026-10-05

Port 5173 belonged to an existing Cxsun development process. Local `.env` now
sets `DEVXCREW_DEV_PORT_POLICY=restart`. The installed Tools preflight verified
application ownership, stopped the old app supervisor and started Cxsun successfully.
Readiness, home and all three login pages returned 200. Anonymous desk access
redirected to login. The development server remains running on port 5173.
Shared defaults and other application configurations were not changed.

## Reserved-port restart verification - 2026-10-05

Development preflight uses `DEVXCREW_DEV_PORT_POLICY=restart`. Each app verifies
its configured host, reserved port and URL, validates listener ownership, stops
the existing app supervisor and descendants, waits for port release, then starts
on the same port. Unrelated listeners are preserved. Production does not reclaim.

Two actual starts passed for all five project apps on ports 5173 through 5177.
Every second start replaced the listener PID and returned readiness 200 on the
same port. Verification processes were stopped after each check.
Tools release checks passed with 32 tests, including foreign-listener protection.
Governance verification, cloud protocol checks and deployment dry run passed.

Evidence: projects/cxsun/.cache/port-restart-results.json and port-restart-check.log,
shared/tools/.cache-port-check.log, shared/mcp-governance/.cache-port-verify.log
and .cache-port-cloud-check.log. App environment examples carry the explicit policy,
so the currently published Tools 0.1.8 works without a sibling checkout.
Tools source now defaults to restart; its next npm release remains separate.

## Web development preflight - 2026-10-05

Fixed `dev:web` to run the installed shared Tools port preflight after live
governance connects and before Vite starts. It respects the configured restart
policy, verifies listener ownership and retains the reserved port.

Passed: two consecutive real `npm run dev:web` starts on port 5173, with the
existing app listener replaced each time. Home and login returned HTTP 200.
Passed: both governance connection failure tests. Backend identity checks were
not run for this frontend startup change. Web-only mode does not start the API.

## Generated file cleanup - 2026-10-05

Added `npm run clean` through `tools/clean.mjs`, with `--dry-run` preview.
Removes allowlisted build, cache, test report and dump output. Keeps source tests,
installed packages, environment files and application storage. Targets are bounded
to the app directory; linked ancestors outside the app are rejected.

Passed: real-app preview, syntax and diff checks, and isolated fixture verification
of deletion, preview, preserved source/data and repeat execution. Actual app output
was preserved during verification. No full application test run for this utility.

## Actual application cleanup - 2026-10-05

Executed the cleanup on Cxsun after live governance connected. Previous utility
verification used a preview and an isolated fixture, so existing application
cache output had remained. Added per-target progress and retries for locked files.

Cleanup completed successfully on the actual app. Verified `.cache`, `dist` and
both root cache logs are absent. Source `tests`, `storage`, `.env` and installed
`node_modules` remain. A second dry run reported zero generated paths.

## Private database storage - 2026-10-05

Database path: `storage/private/data/identity.sqlite` relative to this app.
Backup path: `storage/private/data/backup/`. `npm run db:backup` creates a
new timestamped backup here; explicit destinations are supported. Storage stays
private and ignored by Git. Cleanup preserves it. Existing identity data was
moved after a consistent safety backup and WAL checkpoint; integrity and foreign
key checks passed.

Verification passed: configured database connection, argument-free timestamped
backup creation, three focused database tests, frontend/backend TypeScript checks
and diff checks. Old root database paths are absent. Live login verification also
passed for all three Cxsun portals; other apps were not started for browser tests.

## Cxsun and CXApp table comparison - 2026-10-05

Created `agent/cxsun-table.md` with side-by-side foundation mappings, differences,
additional CXApp service tables and owner migration inventories for Core, Billing,
Accounts, DevKit and Mail. Confirmed Cxsun's 18 actual SQLite tables read-only.
CXApp review used source schemas and migrations; no live MariaDB checks or database
changes were performed. Markdown formatting and diff checks passed.

## Multi-tenant master foundation planning - 2026-10-05

Next work: confirm master engine, add server-only environment configuration,
connect the master and seed tenancy before identity/bootstrap accounts.
See `MULTI-TENANT-MASTER.md` and the updated `PLAN.md`. Current SQLite runtime and
single-client configuration remain active. Engine choice is pending; no master
connection or seed was executed. Live governance and installed source review passed.

## Live MCP and migration metadata refactor - 2026-10-05

Restored authenticated live MCP configuration in ignored `.env`. Renamed MariaDB
migration metadata to `migrations` and `migration_locks`; preserved all six applied
migration records. Timestamp is UTC `DATETIME(3)`, retaining millisecond precision.
The database boundary converts future Kysely ISO timestamps to MariaDB storage
format. Migration setup detects legacy internal tables and refuses conflicting
history. A MariaDB snapshot was created before the change.

Passed: strict live MCP verification, two repeat migration runs, five focused
database tests, server TypeScript checks and live timestamp round-trip in a rolled
back transaction. The probe left no extra migration record.

## Kysely database organization - 2026-10-05

Separated SQLite and MariaDB into driver-owned folders with public exports.
Moved connection validation, dialect setup, SQL compatibility and backups to
these owners. Root infrastructure now owns a reusable named master registry,
provider operations, safe connection listing and thin command dispatch.
Added `db:connections` and typed execution/transaction helpers. Existing master
records and migration metadata were preserved. See `agent/DATABASE.md`.

Passed: full verification with 56 tests, lint, types, build and compiled identity
checks using isolated SQLite fixtures. Real MariaDB master connection, repeat
migration, backup creation and restore rehearsal are checked separately.
This task does not claim live MariaDB identity acceptance or tenant provisioning.

## Database file consolidation - 2026-10-05

Reduced the database root from fourteen files to seven focused infrastructure files.
The provider owns its private connection registry. SQLite tests stay with their
driver; public provider tests stay in tests/. CLI and verified import operations
stay in operations/. Updated npm scripts and imports. Backup dispatch now uses
the validated driver, including the default MariaDB selection.

Passed: 56 tests, lint, TypeScript, production build and compiled identity checks
with isolated SQLite fixtures. Live MariaDB connection and repeat migrations
are verified separately. Live MariaDB portal acceptance remains untested.

## Database tests and common ownership - 2026-10-05

Moved every database test into database/tests. MariaDB and SQLite keep matching
index, schema, connection and backup filenames. Cross-driver configuration and
schema contracts live in database/common with public exports. Updated imports,
test discovery and structure notes. No database data or credentials changed.

Passed: TypeScript, lint and all ten database tests. Full verify stopped at the
LF check for the separately added database-connections files. Build and production frontend smoke passed independently. Compiled identity
acceptance failed because settings validation rejects its email-error fixture
before the expected email error. This fixture mismatch remains unresolved.

## Single database infrastructure owner - 2026-10-05

Consolidated database-connections into database. Removed empty HTTP/seed files
and forwarding wrappers. Request context and tenant lookup share database.requests.ts;
validation and types stay in common. Migration 007 and its table are unchanged.
No database deletion, migration renaming or data transfer was performed.

Passed: npm run check (57 tests, lint, TypeScript, tooling and LF checks)
and npm run build. Added concurrent request-context and inactive-mapping checks.
Identity production acceptance retains the earlier settings/email fixture mismatch.

## Database execution suites and preflight - 2026-10-05

Added DatabaseExecution for server-validated persistence, bounded fetch parameters
and streamed atomic transfers. Module-owned schemas and repository queries remain
with their callers. Validation fails before writes; late transfer errors roll back
all batches. Added safe field errors and explicit DTO/storage guidance.

All database tests now live in src/api/database/tests, including the subprocess
preflight test. Development all/API targets run read-only database smoke after
live governance and before port reclaim/server startup. Smoke rejects pending
migrations and does not create a missing SQLite file. Frontend-only start is exempt.

Refreshed verification passed: repository tooling, lint, TypeScript, 88 passing
tests (one opt-in live test skipped in the default suite), production build,
frontend smoke and compiled three-portal identity acceptance. Ran the opt-in
MariaDB suite separately: isolated 10,000-row transfer, rollback, validation,
pagination, repeat migrations and reopen persistence passed. Its temporary
schema was removed. Live master smoke passed with seven applied migrations.

Corrected the SQLite integer fixture affinity and the identity smoke expectation
for earlier settings validation. No application data, release version or Git
remote was changed. Universal volume guarantees, MariaDB stress throughput,
network partition/deadlock recovery and the legacy identity-import load profile
remain untested. See DATABASE-TESTING.md for execution contracts and commands.

## Separate tenant ownership and database hardening - 2026-10-05 18:38

Reviewed CXApp's tenant boundaries and adapted them through public Platform identity
contracts. Tenant now owns authenticated request scope, mapping validation,
provisioning, routes and readiness. Database owns generic Kysely execution,
connection leasing, migrations, transfers and backup operations. All canonical
tenant backend files are present. No business modules or tenant administration UI
were added. Framework and Platform package extraction is planned, not performed.

Added bounded leased pools, mapping-version retirement, validated response DTOs,
streamed SQLite imports, atomic cancellation and resumable transfer checkpoints.
Tenant headers cannot select a foreign tenant or an arbitrary database. Master
access is explicit. Migration history was preserved; migrations 008 and 009 renamed
the mapping table and added checkpoints after a master backup.

Provisioned separate MariaDB storage for the configured initial tenant. A repeat
provision preserved the existing mapping. Live smoke passed with nine master
migrations, one checked tenant connection and no tenant awaiting provisioning.
Master identity data remains in the master database.

Passed: npm run verify, including tooling, lint, TypeScript, 97 tests, build,
production smoke and compiled identity acceptance for all three portals. The one
live MariaDB test is skipped by the default suite and passed separately. Its fault
checks cover deadlock rollback, killed-connection recovery, in-flight cancellation
and streaming import. The separate stress run transferred 100,000 rows in 2,652 ms
with 85 MiB sampled heap growth. This is a workload measurement, not a capacity
or retained-memory guarantee.

Passed: isolated restore rehearsals for the master (20 tables) and tenant
(4 infrastructure tables), using temporary restore accounts restricted to their
temporary databases. Backup snapshots remain under storage/private/data/backup.

Untested: distributed network partitions, full process-crash recovery and
unbounded volume. Runtime account privileges and production TLS remain deployment
configuration. No package publication, release version change, commit or push was
performed. See TENANCY.md and DATABASE-TESTING.md for contracts and commands.

## Shared foundation extraction - 2026-10-05 19:21

Connect Cxsun to Framework database and settings providers and Platform tenancy through public package exports.
Remove copied engine and tenant implementations. Keep app configuration, seed composition, CLI startup and nine historical migration IDs in Cxsun.
Move engine tests to Framework and tenant tests to Platform. Keep consumer, preflight and live master checks in Cxsun.
Record Framework and Platform tarballs in vendor and package-lock.json. Package refresh is packages:foundation.
The standalone rehearsal uses .env.example and never copies local credentials.

Passed: app verification with 48 passing tests and one gated live test skipped, lint, TypeScript, production build and compiled identity/RBAC acceptance.
Passed separately: live MariaDB migrations, 10,000-row transfer, rollback, deadlock, killed-connection recovery, cancellation and import checks.
Live master smoke passed with nine migrations, one checked tenant connection and no tenant awaiting provisioning.
Repeated tenant provisioning preserved the current mapping. Tenant backup and isolated restore passed with four tables.
Package integrity matches the lockfile. All 31 direct package entries were verified.

Partial: test:live started the existing MariaDB-backed server but cannot test account login without configured verification credentials.
Fixture-based real HTTP login and tenant checks passed for all three portals. No default credentials were added.
The fresh offline consumer rehearsal passed. See final extraction evidence below.

No database or release version change was made by this extraction. No commit, push or npm publication was performed.
Other apps still need the new published shared versions before registry adoption.

### Final extraction evidence - 2026-10-05 19:23

Passed: Cxsun test:foundation:standalone completed offline npm ci in a new fixture.
The fixture uses recorded vendor artifacts and the secret-free environment example.
It passed tooling, lint, TypeScript, 48 app tests, production build, frontend smoke and compiled three-portal identity/RBAC acceptance.
The default suite skipped one gated MariaDB test. The separate live MariaDB command passed.
No sibling source import or linked shared runtime was required in the standalone consumer.

Passed: Framework 62 tests and Platform 27 tests.
Canonical database, settings and tenant files are present. All reviewed owner files remain below 700 lines.
Package lock integrity, dependency order, version alignment, LF checks and git diff --check passed.
Tenant backup and isolated restore checked four infrastructure tables through public package exports.

Partial: existing-account live login needs verification credentials. Server startup and master/tenant readiness passed.
Production TLS, privilege policy and distributed network recovery remain untested.
Versions remain Framework 0.1.11, Platform 0.1.6 and Cxsun 0.2.3 with unreleased source changes.
No commit, push or package publication was performed.

## Source delivery - 2026-10-05 19:34

Connect shared database and tenancy foundation.

Cxsun consumes recorded Framework and Platform packages. Verify passed: 48 tests and one gated skip, build, frontend smoke and compiled identity/RBAC. Prior live MariaDB and fresh offline standalone checks passed. Existing-account login needs verification credentials; production deployment remains untested.

Live authenticated governance connected. Local release checks passed. Commit and push authorized through github:now. Versions remain unchanged; npm publication is pending. GitHub Actions results must be checked after push. Secrets, runtime storage and caches are excluded.
