# Current local foundation audit - 2026-10-04

## Common startup and portal flow - 2026-10-05

- Passed: authenticated strict MCP verification before changes.
- Passed: all five applications use identical development launcher implementations and startup commands.
- Passed: frontend-only startup now checks the reserved port before Vite starts.
- Passed: consistent startup banner text and documented portal flow.
- Passed: `npm run verify` after alignment, including lint, types, tests, build, frontend smoke, and compiled identity checks.
- Passed: portal sessions, role/tenant denial, logout, password change, resources, and restart-persistent login limits.
- Untested: interactive development modes and full browser acceptance in this change.

Evidence: `.cache/startup-alignment-verify.log`. Production deployment and real SMTP acceptance remain separate work.

## Package reference cleanup - 2026-10-05

- [x] Retrieve authenticated cloud governance.
- [x] Remove superseded package identifiers from source, fixtures and current documents.
- [x] Use Framework and UI names consistently.
- [x] Scan repository files for remaining superseded identifiers.

Static cleanup only. No test suite, publication or deployment ran in this step.

## Package migration - 2026-10-05

- [x] Retrieve authenticated cloud governance before this migration.
- [x] Update active package imports, helpers and manifests to the shorter public names.
- [x] Install and verify the published registry packages.
- [x] Commit and push the reviewed migration.

## Cxsun review corrections - 2026-10-04

- Passed: fresh authenticated cloud MCP retrieval before edits.
- Fixed: malformed encoded IDs previously threw URIError during resource rendering.
- Refactored: identity.resource-location.ts owns resource path parsing. Invalid paths never render forms or request records.
- Passed: regression tests cover list, create, detail, edit, default desk, invalid encodings, separators, controls, and unsupported suffixes.
- Fixed: package checks now require installed manifests and report first-party versions that differ from the lockfile.
- Corrected: README package requirements and the historical scope of STANDALONE.md.
- Passed: full local verification with 41 tests, lint, typechecks, build, production smoke, and compiled identity checks.
- Passed: the interrupted final rerun completed in the background. Its log confirms 41 passed tests, zero failures, build, and identity smoke completion.
- Partial: installed Framework 0.1.8, UI 0.2.0, and Tools 0.1.8 differ from locked registry versions 0.1.7.
- Verified: npm registry metadata still reports 0.1.7 for these three packages during this review.
- Untested: complete authenticated browser mutation, screen-reader, and viewport acceptance during this correction.
- Open: registry-only installation and deployed governance acceptance. Production and real delivery remain deferred.
- Scope: local corrections only. No publication, cloud deployment, commit, or push was performed by this review.

## Scope and decisions

The user selected local foundation first. Production deployment is deferred.
Real SMTP provider and recipient acceptance is also deferred by the user.
These items remain unchecked. No production or real delivery readiness is claimed.
Authenticated live owner MCP retrieval succeeded before implementation and review.
Earlier sections below are historical evidence, not the current identity implementation state.

## Verified changes

- Framework startup now has a total deadline and cancellation signal; failed startup rolls back. Seven tests pass.
- Platform uses persisted SQLite tests for concurrent invitation/recovery claims and token expiry. Four suites pass.
- Platform's local list benchmark uses 1,000 persisted synthetic records. Maximum of five reads: 16.6 ms against a 1,000 ms budget.
- UI compiles 122 public export paths and passes 61 tests. Domain implementation stays with its owner.
- UIUX passes lint, two independently validated fixture-form tests, build and enforced gzip budgets.
- Tools passes 32 tests, including an actual killed CLI process, preserved unrelated files and safe retry.
- Email and Platform now have package maintenance and release scripts; Email's two tests and package checks pass.
- Cxsun final verify passes 39 tests, lint, typechecks, build, production frontend routes and compiled three-portal identity checks.
- Compiled checks verify role/tenant denial, password mutation and durable sessions. Package checks pass for all 30 direct dependencies.
- Cxsun startup failures name the failing configuration stage without exposing credentials or misleading database advice.
- Operational SQLite reads pass across user, admin and super-admin portals. Local backup/restored-copy evidence remains recorded below.

## Browser acceptance

An isolated, persisted SQLite database contains synthetic accounts only. It does not change the operational database.
Browser checks pass for admin user editing, required name errors, filtered query preservation, custom role creation,
super-admin organization creation/editing, ordinary-user restricted navigation and administrator-route denial,
wrong-portal sign-in denial, correct super-admin sign-in, organization settings, application presentation and logout.
Settings remain saved after a server restart. The desk footer now uses the saved organization presentation name.
Enter opens the profile dialog; Escape closes it and returns focus to its trigger.
UIUX's form browser checks pass for required-name errors, duplicate-name save errors and successful fixture saving.
This gallery example is presentation evidence; Cxsun's SQLite/API checks establish persistence.

Browser proof: .cache/browser-acceptance/organizations-proof.jpg and settings-final-proof.jpg.
Full browser CRUD, screen-reader and supported viewport coverage are still pending.
Browser password changes were not performed; API tests cover credential mutation.

## Resource contracts and consumer corrections

The actual supported portal/resource/action matrix is recorded in shared/platform/agent/RESOURCE-CONTRACTS.md.
It includes immutable fields, revisions, scoped mutation permissions and explicit unsupported capabilities.
Generated-consumer verification exposed a vendor-path-only assertion in the compiled identity smoke.
It now accepts an exact numeric Platform version or the approved local vendor tarball pattern.
The corrected Cxsun compiled identity check and all three artifact-export tests pass.
The rehearsal preserves existing third-party lock entries and computes first-party integrity from actual tarballs.
It does not relax npm's remote-package restrictions or claim registry release acceptance.

## Deeper extension audit

A read-only public-contract review found two real reuse gaps: fixed permission registration and identity-specific app composition.
Future modules must not write identity tables or import private owner files. Public namespaced declarations, neutral provider
contributions and a disposable diagnostic-module regression now pass under tasks 02.02.4, 02.04.3 and 07.05.3.
The diagnostic uses real file-backed SQLite, public permission declarations and labels/catalogs.
It proves initial denial with no automatic grant, authorized custom-role/membership grant, fresh authenticated success and anonymous denial.
Migration 006 applied to the operational database after an integrity-verified backup. Repeated db:setup made no migration changes.
Live SQLite checks pass across all three portals after migration 006.
Full final verification passes 39 tests and production/compiled identity checks.
The final generated-consumer rerun passes for two independent local packed-artifact applications.
Each passes clean npm ci, 36 tests, lint/types/build, production/compiled identity, package checks and live SQLite.
The generated apps exclude three app-owned exporter tests, so their 36 tests correspond to Cxsun's 39.
Separate databases and cross-app cookie denial pass.
Evidence: .cache/local-consumers-f90c173f-5ae8-44bd-bea2-a56ccac8e68e/results.json.
Fresh browser checks pass profile save and declared permission label display, mandatory desk permission protection,
and custom-role create/edit with persisted selection. Screenshot: .cache/browser-acceptance/module-role-proof.jpg.
Unverified browser and registry acceptance gates stay open.
The final local consumer rehearsal now passes after these changes. Registry-only consumer acceptance remains open.
Evidence: .cache/local-consumers-ce9b2eca-b0f6-42c3-afbd-417b7d08333b/results.json.
Both apps passed npm ci, lint/typechecks/tests/build, compiled identity, package boundaries, live SQLite and cross-app denial.

## Release limits

First-party versions remain unchanged; proposed exact versions are in agent/RELEASE-CANDIDATE.md.
Local tarballs are development artifacts. Registry generation, remote CI and current deployed governance acceptance remain open.
Authenticated cloud drift diagnostics confirm that the deployed snapshot lacks the new discovery tool.
Email distribution licensing remains unresolved. No publication, deployment, commit or push was performed.

## Earlier audit records

# Verification evidence

## Numbered phase checklist revision - 2026-10-04

- Prepared: master CHECKLIST.md with all 54 existing task IDs across seven phases.
- Prepared: owner TASK.md phase checklists and PLAN.md links across eleven planning locations.
- Preserved: earlier task records and continuous global task numbers.
- Status: seven baseline parent tasks are accepted. Other parents remain open with checked evidence substeps and unchecked acceptance substeps.
- Passed: master checklist IDs exactly match the master plan's 54 unique task IDs.
- Passed: authenticated owner MCP connections before edits, Cxsun LF check and Git whitespace check.
- Scope: documentation and status tracking. Implementation tests were not repeated for this documentation change.

## Independent cross-owner review - 2026-10-04

Scope: Framework, Platform, UI, UIUX, Cxsun, Tools, Governance, Email and template records.
Frappe and Tally remain future integration boundaries outside this identity release.

- Passed: fresh authenticated Cxsun MCP retrieval. Deployed instructions still describe the older preview state.
- Passed: fresh Cxsun verification before review corrections. All 24 tests, lint, types, production build and compiled identity checks passed.
- Passed: fresh configured-database reads for all three portals and 30 direct package checks.
- Found and corrected: generated artifact omitted tools referenced by test:live and email:check. Three exporter tests now pass.
- Found and corrected: recovery completion now revalidates current scoped role access and password permission within the token transaction.
- Passed: Platform file-backed regressions deny recovery after role disable or permission removal, without changing passwords or consuming tokens.
- Found and corrected: frontend locale, checkbox and permission-group errors now have accessibility attributes. Unsupported optional provider buttons were removed.
- Passed: focused frontend tests include a permission-group markup regression. Complete browser accessibility acceptance remains open.
- Found and corrected: Governance cloud smoke expected three tools after a fourth tool was added. Corrected local Worker protocol/discovery smoke passes.
- Open: clean npm install cannot yet provide all unpublished Framework/UI/Tools contracts. Current local checks do not prove registry release readiness.
- Open: Platform and Email need complete owner maintenance/release checks. UI legacy export removal requires compatible release versioning.
- Revised: master current state, ordered release dependencies, evidence matrix, task states and README installation limitations.
- Limits: authenticated browser CRUD/accessibility, real email delivery, independent generated apps, remote CI, provenance and production operational gates remain open.
- No commit, push, publication or deployment occurred.

### Remaining review findings

| Severity        | Finding                                                                                                                        | Owner task and acceptance                                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| Release blocker | Registry dependencies do not contain all current source contracts.                                                             | 05.01/06.09/07.03: compatible artifacts and independent clean-install evidence. |
| Release blocker | Deployed MCP snapshot remains stale and owner metadata is incomplete.                                                          | 01.07/07.04: authorized refresh and live lookup verification.                   |
| Release blocker | Email delivery and invitation/recovery recipient acceptance are unverified.                                                    | 05.05/06.07: configured provider and actual delivery evidence.                  |
| Required gap    | Platform and Email lack complete owner release/maintenance scripts.                                                            | 06.11/07.03: version, LF, package contents and release checks.                  |
| Required gap    | UI all-export compilation/component tests and UIUX form contract examples remain incomplete.                                   | 04.04/06.03/06.04: public consumer and real form/error coverage.                |
| Required gap    | Browser accessibility and UIUX bundle budgets remain unverified or undefined.                                                  | 06.03/06.04/06.08: accepted budgets and measured critical flows.                |
| P2              | Cxsun startup catch reports every initialization failure as a database readiness error, including invalid email configuration. | 03.01/05.01: safe stage-specific diagnostic and failure test.                   |
| Required gap    | Remote CI, operating limits, provenance, production recovery and two generated apps remain unverified.                         | 06.08-06.11/07.05: exact environment and reproducible evidence.                 |

### Final integrated check after review corrections

Refreshed the Platform bundled artifact and Framework/UI/Tools local snapshots in sequence.
`npm run verify` passed with 26 tests, lint, type checks, production build, route/assets smoke and compiled identity checks.
`npm run test:live` passed for all three portals against the configured operational SQLite database after artifact refresh.
`npm run packages:check` passed for 30 direct dependencies.
`git diff --check` passed. No migrations or operational configuration changed during this review.
UIUX guidance duplication and its contradictory connection policy were corrected.
Governance local execution cache is now ignored by Git. Review did not print cache payloads or credentials.
The required local development artifact refresh remains an explicit clean-install limitation.

## Integrated role wave and recovery - 2026-10-04

- Passed: Cxsun full verification with 24 tests, lint, frontend/server types, production build, production smoke and compiled identity checks.
- Passed: latest compiled application login, desk and permitted resource reads for user, admin and super-admin against the configured SQLite database.
- Passed: migration004 for scoped custom roles and membership revisions. Its rollback now refuses states that could broaden access.
- Passed: post-role backup integrity and three-portal reads against a restored copy of that backup.
- Passed: four independent SQLite writers committed 80 updates in the concurrency test.
- Passed: Platform four expanded file-backed tests and Tools 28 tests. App-owned artifact exporter tests passed.
- Changed: Cxsun direct dependencies reduced from 49 to 30 after source import review.
- Implemented: custom roles, permission selection, membership edits and stale-delete protection; public sign-in configuration and authenticated presentation settings.
- Open: authenticated browser CRUD, accessibility, real email delivery, approved registry artifacts and independent generated apps, remote CI and production operational checks.
- Release constraint: removed legacy UI identity exports require an explicit compatible version decision. Installed local artifacts are development evidence, not published availability.
- No commit, push, publication or cloud deployment occurred.

## Coordinated implementation and live persistence - 2026-10-04

- Passed: Framework six runtime/HTTP tests, including handler and shutdown deadlines.
- Passed: Platform build and three expanded file-backed acceptance tests, including persistence, stale writes, scope, and lifecycle.
- Passed: Tools 26 tests and release checks, including the narrow browser-safe public schema exception.
- Passed: Governance nine tests, type checks, versions, line endings, and build.
- Passed: Email build and two input/configuration tests. Real SMTP delivery remains unverified.
- Passed: UIUX verification after the public resource presentation example.
- Passed: integrated Cxsun lint, types, 16 tests, build, static production checks, and compiled identity smoke.
- Passed: 49 direct package checks against the installed local development artifacts.
- Passed: backup of the configured SQLite database before administration migration003.
- Passed: migration003 on the configured database, repeat migration, seed, and connection check.
- Passed: normal configured-account login, desk access, and permitted resource reads in all three portals.
- Passed: consistent post-migration backup, restored-copy startup, and the same three-portal reads.
- Passed: browser administrator login page, recovery navigation, and truthful disabled-email feedback.
- Limitation: authenticated browser master CRUD and accessibility acceptance are not complete.
- Limitation: registry Framework/UI/Tools versions do not contain these unpublished source changes.
- Corrected: initial strict-schema create bugs, unsupported invitation sorts, audit tenant scope, error envelopes, readiness, and request cancellation.
- Installation: one Windows native-file lock interrupted refresh. A later refresh completed successfully.
- Packaging: npm package-lock-only hit EALLOWREMOTE. The local Platform tarball lock integrity was aligned from its SHA-512 bytes.
- Current next wave: custom roles, membership editing, and clean app artifact generation remain active.
- No commit, push, package publication, or cloud deployment occurred.

Backups and the restored rehearsal file remain inside ignored storage directories.
Checks do not print operational credentials or personal record contents.

## Owner verification and plan loading - 2026-10-04

- Passed: fresh Cxsun verify, five tests, build, compiled identity smoke and 48 direct package checks.
- Passed: db:check against the configured file-backed Cxsun SQLite database.
- Passed: existing cloud connection commands from all twelve established roots, plus added Platform command.
- Partial: Veyrezio delegates connection to Intergrid. Platform cloud repository metadata remains null.
- Gap: Platform package integration tests use :memory:. Their success is not file-backed release evidence.
- Prepared: owner plans/tasks with shared phase IDs and honest baseline states.
- Limits: complete live identity master/settings flows are not implemented. Fresh browser and production recovery checks were not repeated.

## Standard release master-plan revision - 2026-10-04

- Passed: authenticated Cxsun MCP connection before planning edits.
- Prepared: complete release scope, seven continuous phases, globally numbered tasks, identity resource matrix and live SQLite acceptance.
- Confirmed: user requires master review before owner plans are split.
- Scope: documentation only. Live database operations, implementation and owner delegation were not performed.
- Validation: documentation diff whitespace check passed.

## Expanded master requirements review - 2026-10-04

- Passed: authenticated Cxsun MCP retrieval before documentation refinement.
- Added: explicit security, data integrity, concurrency, accessibility, supply-chain, upgrade, and operational acceptance requirements.
- Added: profile priorities and requirement coverage mapped to readiness gates.
- Scope: master-plan documentation. Complete package source audits remain pending.
- Implementation tests were not repeated for this documentation change.

## Master plan preparation - 2026-10-04

- Passed: authenticated Cxsun MCP retrieval before documentation work.
- Prepared: consolidated foundation tasks, owner boundaries, dependency gates, and future delegation workflow in agent/PLAN.md.
- Scope: documentation only. Package implementation and complete owner audits remain pending.
- Pending: user review before owner plans and implementation delegation.

## Cxsun shared foundation readiness review - 2026-10-04

- Passed: authenticated live MCP connection from Cxsun before inspection.
- Passed: npm run verify, including maintenance, lint, types, five tests, build, and production HTTP checks.
- Passed: compiled identity checks for three portals, role and tenant denial, durable sessions, logout, password changes, and validation.
- Passed: npm run packages:check verified 48 direct packages.
- Confirmed: the app imports Framework, UI, and Platform through public package exports.
- Confirmed: Framework, UI, and Tools resolve registry packages. Platform resolves the bundled vendor development package.
- Confirmed: the server composes database and identity providers. The frontend owns identity forms and uses shared UI components.
- Partial: live MCP metadata still describes preview identity and says Platform is absent. The local app now implements Platform identity.
- Partial: Platform publication and independent governance registration remain pending.
- Partial: current implementation changes remain uncommitted. Current GitHub CI has not been verified for this working tree.
- Untested in this review: browser interaction, fresh-clone installation, production deployment, TLS proxies, backups, and restore.
- Readiness: business module development can start against the verified local foundation.
- Before broad reuse: publish Platform, update deployed governance metadata, and verify a clean Cxsun checkout through CI.
- Before production: verify deployment storage, TLS, proxy behavior, backup, restore, and required identity operations.
- Future business endpoints must authenticate through Platform, enforce module permissions, and scope database queries to the trusted tenant.

## Database identity connection â€” 2026-10-04

Passed: authenticated live Cxsun MCP retrieval before edits and development startup.
The user approved a local development package connection. Cxsun consumes the bundled `@devxcrew/platform@0.1.0` artifact through public exports.
Normal installs use `vendor/devxcrew-platform-0.1.0.tgz` and require no sibling package checkout.
Tools permits the approved local dependency. Package verification rejects local shared dependencies outside this explicit artifact exception.
The earlier unpublished name `@devxcrew/platform-core` was replaced because Tools marks that legacy name obsolete.

Passed: identity migration, repeated seed, and database connection checks.
The normal SQLite database has three bootstrap users and three explicit memberships.
Their generated passwords remain in ignored `.env`. Database records contain only salted password hashes.
The seed preserves existing passwords and does not elevate existing users.

Passed: Platform Core three tests and TypeScript build.
Passed: Cxsun maintenance checks, lint, types, five tests, build, and 48 direct package checks.
Passed: compiled Cxsun identity HTTP smoke using a temporary database and generated test credentials.
The smoke checks three portals, anonymous desk redirects, role and tenant denial, session persistence across restart, scoped logout, password change, validation, malformed JSON, content type, body size, and database integrity.
Platform tests also verify cross-app denial, multi-tenant membership, expired sessions, disabled accounts, throttling, password change preservation, and HTTPS cookie flags.

Passed: browser home to login, three role logins, desk refresh, wrong-role denial, scoped logout, and direct desk redirect.
The first browser pass found a React suspension error in the TanStack lazy route loader.
Replaced that loader with React `lazy` and `Suspense`. The fresh browser pass captured no console errors.
Password change was verified by HTTP, not through browser credential entry.

Passed: Tools reclaimed a verified Cxsun development supervisor on port 5173.
The normal app remains running against `storage/cxsun.sqlite`. The original abort port policy was restored afterward.
Normal database login, current-session lookup, and logout passed for each local bootstrap account.
The isolated browser audit server on port 5193 is stopped.

Partial: automatic approval review rejected audit database cleanup with "blocked by policy".
The stopped browser fixture remains in ignored `storage/identity-audit-c012b7258752401faa9601fe81d07ac2`.
Partial: the package is not published, independently registered with live MCP, or committed to a separate Git repository.
Live governance metadata is still the earlier deployment snapshot. Local capability metadata records the new foundation.
Untested: deployed TLS, proxy behavior, backups, restore, concurrent production load, MFA, recovery email, and identity administration screens.
Version remains 0.1.9. No publication, commit, push, or current GitHub CI run occurred.
Passed final scans: configured governance and bootstrap secrets were absent from source and frontend bundles.
The bundled Platform artifact matched package-lock integrity. `.env` and the normal database are ignored by Git.

## Earlier verification records

## Identity implementation preparation (historical)

Passed: live MCP guidance before work. It requires a shared Platform Core identity owner.
Passed: created shared/platform with public provider, owned identity migration, seed, password hashing, sessions, RBAC, and tenant membership.
Passed: Platform Core three tests and build, including real SQLite HTTP integration for three portals, role denial, app scope, tenancy, rotation, expiry, logout, password changes, validation, origin checks, and throttling.
Prepared: Cxsun frontend identity forms and desk components. Existing preview entry routes remain active until connection.
Pending: user choice for the unpublished package dependency. No local dependency exception is assumed.
Untested: Cxsun database identity runtime and browser flows. These require the package connection.
No identity accounts were seeded into the Cxsun database. No publication, commit, or push occurred.

## Passed

- Live MCP retrieval verified the foundation guide, audit/todo records, and application metadata
  where applicable.
- Release metadata checks passed.

## Untested

- New application generation was not run.

## Not applicable

- Shared package records do not imply an application login desk.

## Partial

- Existing home ÃƒÂ¢Ã¢â‚¬Â â€™ preview login ÃƒÂ¢Ã¢â‚¬Â â€™ desk flow is frontend-only.

## Blocked

- Shared Platform Core is absent. Authenticated user, administrator, and super-administrator desks
  are not implemented.
- MCP action approval and shared commit reservation services are absent.

## Cloud-only governance â€” 2026-10-03

- Passed: authenticated live instructions and required connection policy for this repository.
- Passed: local MCP endpoint rejected with exit code 1. No local guide fallback.
- Governance: seven protocol/client tests and cloud Worker checks passed.
- Cxsun: two development connection tests passed, including no process start on connection failure.
- Business features were not changed or tested. Source changes remain uncommitted.

## Live connection audit â€” 2026-10-03

- Passed: this repository retrieves all five cloud guidance documents with its configured app identity.
- Passed: environment secret files are ignored by Git.
- Fixed: imported clients now reject every endpoint except https://mcp.codexsun.com/mcp.
- Fixed: clients validate returned app identity and reject missing instruction content.
- Fixed: request timeout is 15 seconds. Cxsun no longer uses a two-second cloud timeout.
- Passed: official SDK initialization, five live resource reads, and all three live tools.
- Passed: missing/wrong secret, denied origin, and invalid identity HTTP checks.
- Passed: eight governance tests, two Cxsun failure tests, cloud checks, and successful live Cxsun startup.
- No current connection blocker was found. Cloud/network availability and valid secrets remain required.
- Cloud metadata is a deployment snapshot. Source changes require redeployment.
- App IDs identify caller context. The shared developer secret is not per-app authentication.
- Long-term uptime and external editor configuration were not tested. Source changes remain uncommitted.

## Live connection audit â€” 2026-10-03

- Passed: all six repositories retrieve five cloud guides with their configured app identities.
- Passed: environment secret files are ignored by Git.
- Fixed: imported clients reject every endpoint except https://mcp.codexsun.com/mcp.
- Fixed: clients validate returned app identity and reject missing instruction content.
- Fixed: request timeout is 15 seconds, including Cxsun development startup.
- Passed: official SDK initialization, five live resource reads, and all three live tools.
- Passed: missing/wrong secret, denied origin, and invalid identity HTTP checks.
- Passed: eight governance tests, two Cxsun failure tests, cloud checks, and successful live Cxsun startup.
- No current connection blocker was found. Network availability and valid secrets remain required.
- Cloud metadata is a deployment snapshot. Source changes require redeployment.
- App IDs identify caller context. The shared developer secret is not per-app authentication.
- Long-term uptime and external editor configuration were not tested. Source changes remain uncommitted.

## Release 0.1.7 â€” 2026-10-03

- Passed npm run verify: maintenance checks, lint, typechecks, three tests, production build, and production route/assets/API smoke checks.
- Passed authenticated live MCP connection, release metadata, LF, and configured-secret scans.
- Prepared commit subject: #7 - Require audited cloud MCP guidance.

## npm migration â€” 2026-10-03

- Passed public package preparation for Framework and UI version 0.1.7.
- Passed packed package consumption, Cxsun full verification, UIUX verification, and eight governance tests.
- npm CLI login and device authentication succeeded as devxcrew.
- Publication returned E409. Registry metadata records Framework unpublished at 2026-10-03 03:30:32 UTC and UI at 03:32:35 UTC.
- npm blocks the same package names for 24 hours. Both names should be eligible after October 4 at 09:03 IST.
- Blocked: registry publication, registry installation, and final project lockfile generation.
- Cxsun currently runs with explicitly installed local packed snapshots. Its manifest names the intended npm versions.
- Do not treat the current project lockfile as a completed registry migration.

## npm migration completion â€” 2026-10-03

- Passed: npm ci from the registry lockfile; npm audit found zero vulnerabilities.
- Passed: npm run verify (dependency boundaries, release metadata, LF, lint, frontend/backend typechecks, three tests, production build, and route/assets/API smoke checks).
- Passed: explicit local packed snapshots tested during development without changing release manifests. Registry packages are restored in the final installation.
- Passed: all project manifests and lockfiles have no shared Framework/UI file dependencies or old package names.
- Passed: UIUX local-source gallery typecheck and production build.
- Passed: updated live governance deployment and authenticated connections from all six repositories.
- Partial: the current UI flow uses preview sessions; real identity, RBAC, tenancy, and three authenticated desks remain separate foundation work.

## Live MCP access audit â€” 2026-10-03

- GREEN: authenticated live connection, matching repository metadata, five guidance resources, and all three MCP tools.
- Passed fresh live instruction retrieval through the project development startup hook.
- Central evidence: shared/mcp-governance/docs/mcp-access-audit.md.

## Release 0.1.9 â€” 2026-10-03

- Passed npm run verify and npm run packages:check.
- Passed Tools tests (21), version alignment, line-ending checks, and repository configuration review.
- GitHub CI now checks out the required sibling repositories and creates an environment file from the example.
- Authorized commit and push use github:now with no additional version bump.

## Standalone development audit â€” 2026-10-03

### Passed

- Authenticated live MCP connection from this repository.
- Workspace npm run verify: maintenance, lint, typechecks, three tests, build, and production HTTP smoke.
- npm run packages:check: all 45 direct packages resolved.
- Runtime Framework, UI, and Tools references resolve installed npm packages.
- Environment initialization preserves existing .env files by source inspection.

### Failed

- An isolated clone outside D:\codexsun cannot resolve ../../shared/mcp-governance/client/repository.mjs.
- Maintenance and the complete verify script require sibling Tools and MCP Governance repositories.
- Installed npm Tools 0.1.3 hardcodes assist/documentation/CHANGELOG.md. This app uses agent/CHANGELOG.md.
- Current CI checks out sibling repositories, so green CI does not prove standalone maintenance.

### Partial and untested

- Clean npm ci attempts in five independent clones were stopped during slow dependency extraction.
- No linked node_modules or dependency-copy workaround was used. These clean installs did not complete.
- Fresh-clone runtime startup and browser interaction remain untested. Workspace production HTTP smoke passed.
- Desktop and Docker commands have no Tauri scaffold or Compose configuration.
- Valid cloud credentials, live MCP availability, matching APP_PORT/APP_URL, and a free port remain prerequisites.
- UIUX is a separate source gallery with an intentional sibling UI dependency. It is not a standalone project app.

### Next correction

Publish the newer Tools package with agent changelog support. Replace sibling maintenance wrappers with installed package commands.
Change CI to check out only this app, then repeat clean installation, full verification, development startup, and browser checks.
Do not mark standalone development green until those checks pass.

README setup and limitations were corrected locally. No package version, commit, push, or npm publication was performed.

## Standalone implementation completed â€” 2026-10-03

This section resolves the earlier sibling-maintenance and incomplete runtime findings.

### Passed

- Published @devxcrew/tools@0.1.7 and installed its registry tarball in this app.
- Replaced all sibling maintenance wrappers with installed devxcrew-tools commands.
- Removed unsupported desktop and Docker scripts. Dependencies were preserved.
- CI now checks out only this app. Added setup for environment initialization and live MCP verification.
- Workspace and isolated npm run verify passed, including three tests, lint, types, build, and production HTTP smoke.
- Isolated direct package checks, development MCP retrieval, home/login/desk HTTP routes, and API 404 boundary passed.
- Browser home, preview login, desk, refresh, logout, and desk redirect after logout passed. No captured console errors.
- Occupied-port startup failed safely and preserved the running app. Owned test process shutdown released its port. Subsequent startup passed.
- Version checks, version-bump dry runs, LF checks, version display, and github:now dry runs passed outside the workspace.
- Missing optional source folders produced a clear error. CODEXSUN_SHARED_ROOT supports another source location.

### Installation evidence

- One clean npm ci completed in the isolated Cxsun clone. All five normalized dependency lock graphs were identical.
- That complete installation was moved into each app's own node_modules folder for sequential verification.
- There were no linked dependency directories and no workspace sibling package resolution.
- Five separate clean installs are not claimed. Earlier parallel attempts remain historical incomplete evidence.
- npm blocked optional core-js and msgpackr-extract install scripts. Full checks and development worked under that policy.
- Cxsun frontend hot reload passed after an isolated source edit and restoration. Hot reload was not repeated for the other apps.

### Limits

- Valid live MCP credentials, network access, matching APP_PORT/APP_URL, and an available port remain required.
- Real identity, RBAC, tenancy, and three authenticated desks remain pending Platform Core. Preview sessions are not authentication.
- UIUX retains its intentional sibling UI source dependency.
- The revised GitHub workflow was verified through equivalent isolated local commands. It has not run on GitHub yet.
- No Git commit or push was performed for these implementation changes. App versions remain unchanged.

Evidence: agent/STANDALONE.md in Cxsun and isolated logs at D:\codexsun-standalone-verification\2026-10-03\<app>.

## SQLite connection audit

Passed authenticated live MCP retrieval before implementation.
Passed `npm run db:setup` twice and `npm run db:check` on the local SQLite file.
Passed `npm run verify`: maintenance checks, lint, typechecks, five tests, build, and HTTP smoke.
Passed compiled server startup with SQLite and HTTP requests to `/`, `/login`, and `/desk`.
Passed database tests for migration history, repeat seeds, preserved edits, rollback, foreign keys, and persistence.
Passed Git ignore checks for `.env` and `storage/cxsun.sqlite`.

Database configuration is server-only. Node SQLite uses WAL, foreign keys, and a five-second busy timeout.
The adapter binds query parameters and preserves SQLite integers as bigint values.
Migrations and seeds run explicitly. Server startup only verifies the database connection.

Partial: this is database infrastructure. Platform Core identity, RBAC, tenancy, and real sessions are not implemented.
Untested: browser interaction and production disk, backup, concurrency, or multi-instance operation.
Version stays 0.1.9. No commit or push was requested.

# Workspace GitHub release - 2026-10-04

npm run verify passed: 39 tests, lint, types, build and compiled identity smoke. The local profile uses prepared shared source snapshots.
Configured-secret scan found no matches in Git release candidates.

User authorization: update versions and changelogs, then commit and push all workspace repositories.
Connect persisted SQLite, three identity portals, module-owned resource workflows, public provider composition, permission extensions and template rehearsal.
Authenticated MCP connection passed for this owner before release work.
This delivery covers GitHub source. Npm publication, production deployment and real email acceptance remain separate gates.

## Final GitHub release audit - 2026-10-04

Local npm run verify passed 41 tests, lint, types, build and compiled identity smoke after resource-location repairs. npm run packages:check found all 30 direct installations and reports local Framework 0.1.8, UI 0.2.0 and Tools 0.1.8 against registry 0.1.7 lock entries. This is local development acceptance, not clean registry acceptance.

GitHub run 37200330583 failed at the Tools 0.1.7 dependency check, which rejects the public Platform schema type import in identity.permissions.tsx. Publication and consumer dependency updates remain open. CI stays isolated. No npm publication, SMTP acceptance or production deployment was performed.

## Completion wave - 2026-10-04

Full verify passes 41 tests, lint, types, build, and expanded compiled identity acceptance. Resource checks cover list queries, create/update/delete, stale writes, safe field errors, role and tenant denial, settings persistence, and read-only audit routes. Live SQLite checks pass all three portals. Two newly generated local artifact consumers pass independent installation, full verify, separate SQLite databases, and cross-app session denial. Five MIT archives have SHA-512 receipts in RELEASE-PACKAGES.json. Publication was approved, but npm authentication returned E401. Browser acceptance remains blocked by browser tool policy; no new interactive browser result is claimed.

## Registry transition - 2026-10-04

Published MIT releases are Framework 0.1.8, Platform 0.1.2, Tools 0.1.8, UI 0.2.0 and Email 0.1.0. npm authentication and per-package browser approvals completed. Platform 0.1.1 returned E409 after an earlier unpublish; the user separately approved 0.1.2. All registry SHA-512 values match the approved archives. The app now pins all 30 direct dependencies and its lock contains only registry URLs and SHA-512 entries. npm ci succeeds with zero reported vulnerabilities. Full verify passes 41 tests and compiled identity resource acceptance. Registry export includes index.html and safe npm configuration; fixtures verify that an auth token in source npm configuration is not copied. Browser access remains blocked.

Two generated registry consumers passed on 2026-10-04. Each used its own exact registry installation and file-backed SQLite. Cross-app session denial passed. Receipts are in GENERATED-CONSUMERS.json. Cxsun CI run 37204145628 passed Windows, Linux and macOS against commit b8ecabc.

The optional local source refresh packs all five owners and preserves package.json and package-lock.json. Its actual installation and package boundary checks passed. The registry restoration command and repeated package checks also passed. These development commands do not replace the independent registry consumer and remote CI evidence above.

## Candidate upgrade acceptance - 2026-10-04

Two existing disposable local candidates passed installation against the released registry graph, full verify, package boundaries, existing database checks and three live portal reads. Source and configuration hashes match. A read-only comparison of the SQLite schema and every table row matches before and after verification. Physical WAL/SHM byte comparisons were replaced because checkpoints can change those files without data loss. No operational app was upgraded. The first fixture resumed an interrupted preparation with its manifest already at Platform 0.1.2; the second changed 0.1.1 to 0.1.2. Both originated from the verified local candidate receipt. The accepted run uses Node 26.10.0; an npm exec wrapper selecting Node 22 was stopped and provides no acceptance evidence. See UPGRADE-CONSUMERS.json. Future version compatibility requires its own release rehearsal.

## Final source delivery - 2026-10-04

Cxsun source commit 65b7fb2 passed all 41 tests, production and compiled identity checks locally and on Windows, Linux and macOS in run 37208049321. UIUX source commit 667c03f passed its three-OS matrix in run 37208052747 after the registry gallery proof. Framework 37208054528, Platform 37208057058, Tools 37208059252, UI 37208061748 and Email 37208065844 passed all three operating systems. Governance 37208063735 passed its configured Windows/Linux matrix. All affected source and owner task records were committed and pushed.

The other six application source heads retain their recorded successful CI. Separate concurrent Veyrezio commits e59220b and its untracked ZIP were left untouched; they are outside this delivery and have no new CI acceptance here. Browser access was rejected by the browser tool security policy; interactive acceptance remains pending. Deployed governance still serves the old snapshot. SMTP and production deployment remain deferred by the user. The checklist records 21 accepted parents and 33 pending parents.

## Next local workflow phase - 2026-10-04

- Passed authenticated npm run mcp:connect. The deployed snapshot still reports 2026-10-03 and Cxsun 0.1.9.
- Reviewed source routes, resources, account pages, navigation and contextual copy. No scaffold, preview, demo or TODO copy occurs in production frontend source.
- Corrected unsupported create/edit routes so they show safe feedback before record loading or form rendering. List return links retain query state.
- Corrected account data ownership across portal/page changes. Aborted responses cannot populate the account, and its form key resets changed-page state.
- Added module-owned static rendering coverage for unsupported actions across declared resources and portals.
- Added module-owned navigation coverage for all three portal menus, nested active routes, destination uniqueness and account permission links.
- Passed npm run verify: 43 tests, lint, types, build, production frontend routes and compiled SQLite identity/resource checks.
- Passed npm run packages:check for all 30 exact direct installations.
- Passed npm run db:check and npm run test:live against configured persisted SQLite for user, admin and super-admin reads.
- Updated current plan and TODO status. Preserved the pre-publication checkpoint under an explicit historical heading.
- Static source/rendering checks do not prove asynchronous React transitions, focus, screen-reader behavior or supported browser viewports. These remain pending in WORKFLOW-ACCEPTANCE.md.
- SMTP, production and deployed governance acceptance remain user-deferred. No business module was added.

Source commit 0c9fe42 passed Windows, Linux and macOS CI in run 37208693367. Each job passed clean registry installation, 43-test verification, production/compiled identity checks and package boundaries. Browser gates remain unchanged.

## Local security acceptance - 2026-10-04

Authenticated npm run mcp:connect passed. The deployed snapshot still reports 2026-10-03 and older Cxsun metadata.
The new identity-owned acceptance helper checks no-store/nosniff headers, known credential values, password hashes and nested internal fields.
Loopback sign-in cookies pass app/portal naming, opaque token, HttpOnly, SameSite=Strict, root path and positive lifetime checks.
Ten failed attempts for a disposable unknown account return the same safe 401. The next returns 429 without a cookie.
Restarting the compiled server preserves the rate limit in the same file-backed SQLite fixture.
Four helper regressions test safe field errors, response reuse, invalid cache/header policy, credential/internal field rejection and cookie safeguards.
Full npm run verify passes 47 tests, lint, types, build, frontend production checks and compiled identity/privacy/rate-limit acceptance.
LOCAL-SECURITY.md describes the actual data inventory and retention. Expiry does not imply physical deletion.
No operational rows were removed. No automatic retention, encryption, MFA, SMTP or production capability is claimed.
Browser accessibility/interaction remains blocked by the prior tool policy rejection. SMTP, production and live governance deployment stay deferred.
The master 06.08.2 entry now separates verified local evidence from pending browser and production acceptance.

Final local checks also passed all 30 package boundaries, configured SQLite connection and live reads for user, admin and super-admin. Configured-secret/private-key scans passed across all 14 release candidates. Credential scanning covers text responses as well as JSON.

Source commit d8ed9a9 passed CI run 37209853075 on Windows, Linux and macOS. Each isolated job passed clean registry installation, 47-test verification, compiled privacy/cookie/restart-persistent throttle checks and package boundaries. Browser, SMTP, production and deployed governance gates remain pending or deferred.

## Latest generated template acceptance - 2026-10-04

The worktree was clean and source ca2425d matched origin/main before work. git push reported everything up to date.
Authenticated live MCP retrieval passed. Cxsun CI 37210048868 passed for source ca2425d.
npm run test:consumers:registry passed two fresh generated apps against the exact published registry graph.
Each app passed clean installation, full verification, package boundaries, database setup and all three live portal reads.
The compiled security checks passed with generated app-qualified cookies, private response checks and restart-persistent account limits.
Repeated npm test confirmed 44 tests per generated app. Cxsun retains three additional exporter tests, for 47 total.
All 52 source files per app match source ca2425d after the generator's app ID/name/port/URL replacements.
Separate persisted SQLite and cross-app session denial passed.
GENERATED-CONSUMERS.json now records source commit, source version, runtime, individual lock hashes and the source comparison.
This evidence proves the current generated foundation. It does not replace browser/accessibility, SMTP or production acceptance.

## Operational package migration verification

SQLite connection and all three configured portal logins, desks and permitted resource reads passed.
The first live check ran before the rebuilt server was ready and failed to start.
After the production build completed, the repeated live check passed. No schema or seed changed.

## Dependency alignment - 2026-10-05

- [x] Align consumed shared packages and common direct dependency versions.
- [x] Install dependencies with lifecycle scripts disabled.
- [x] Keep app dependency ownership and public peer ranges.
- [x] Exclude Veyrezio from this change.

Source version: 0.2.2. Published package archives retain their existing versions.
The baseline is recorded in projects/cxsun/agent/DEPENDENCY-BASELINE.json.

## Phase 1 and 2 verification - 2026-10-05

Scope: Cxsun 0.2.2 working tree. No commit, push, publication, or production deployment ran.

Passed:

- Authenticated live MCP guidance retrieval.
- Root verification: 48 tests, lint, types, build, dependency boundaries, and compiled production identity checks.
- Browser: public-to-login-to-desk flow for user, administrator, and super-administrator.
- Browser: logout, wrong-portal denial, role-specific navigation, profile edits, and required-name errors.
- Browser: organization creation and application settings persisted in the isolated SQLite fixture.
- Browser: filters, edit links, Back/Forward navigation, and list query preservation.
- Browser: persisted session expiry redirected to login. The fixture expiry was forced, not timed.
- Browser: mobile navigation, Escape dismissal, focus return, desktop layout, and empty error console.
- Browser: saved application settings survived a server restart.

Corrections:

- Consumer isolation now selects free loopback ports and checks child process exit.
- Upgrade checks rename declared public package references and preserve unrelated source and SQLite rows.
- The template dependency record now matches the current registry lockfile. Alias records use exact resolved versions.
- Upgrade command failures now include process errors and exit details.
- Exported apps exclude the generator-owned upgrade-helper test.
- Disk exhaustion interrupted one attempt. Fresh registry reruns passed after disk space became available.

Partial, blocked, and untested:

- Current registry consumers passed installation, full verification, database setup, portal reads, and cross-app denial. See PHASE12-GENERATED-CONSUMERS.json. The older-consumer upgrade is blocked by a stalled fixture installation.
- Older-consumer installation stalled across retries. The final attempt was stopped after more than six minutes without reaching verification. Source, configuration, and SQLite remain preserved. Interrupted dependency folders were renamed inside their verified fixture paths.
- Browser session-revoke confirmation could not be accepted through the available dialog tool.
- The malformed browser URL was blocked by the browser tool. It was not retried through another channel.
- Browser password change requires user interaction under computer-use policy. Compiled API password checks passed.
- Real screen-reader testing and the complete resource, denial, pagination, and settings matrix remain untested.
- SMTP, production acceptance, and remote CI for this working tree remain separate tasks.

Evidence: .cache/phase12-verify.log, .cache/phase12-registry.log, .cache/phase12-registry-final.log,
.cache/phase12-upgrade.log, and .cache/phase12-upgrade-final.log.
Browser data used .cache/phase12-browser/identity.sqlite on port 5197. Operational application data was not used.

Resume verification limit: another Cxsun verification started at 09:30 while this run was active.
The repeated root check stopped at lint. The older-fixture upgrade did not reach verification.
Only this run's outstanding checks were stopped. The other process was not stopped.
The .cache watcher exclusion still needs final verification after concurrent work ends.
Earlier 48-test root verification and both fresh registry consumer results remain valid for their recorded snapshots.
The development server was stopped during diagnosis. Restore it after the working tree is stable.

## Resume result - 2026-10-05

Other work paused after advancing Cxsun to 0.2.3. That version change was preserved.
Live MCP retrieval passed. Lint configuration imported successfully.
Current lint, type checks, and 48 tests passed. The repeated production build stalled at Vite transformation and was stopped.
The older-consumer installer stalled again and was stopped before verification. No upgrade success is claimed.
Fresh generated consumer evidence remains the recorded 0.2.2 snapshot, not a 0.2.3 release acceptance.
Vite now ignores .cache to avoid fixture-triggered reloads. Final build acceptance of that change remains pending.
Development startup passed live governance and port preflight on 5173.
No commit, push, publication, or operational database migration ran in this work.

Final root retry: the 0.2.3 build passed after the stalled installer was stopped.
Compiled production smoke and identity acceptance passed. Together with current lint, type checks, and 48 passing tests, root verification is green.
The development server returned readiness 200 on port 5173. Fresh 0.2.3 generated-consumer verification is running separately.
The older-fixture upgrade remains blocked at installation. It did not reach verification, and no upgrade success is claimed.

Both current 0.2.3 registry consumers passed clean installation, full verification, package checks, database setup, and three live portals.
Separate SQLite files and cross-app session denial passed. PHASE12-GENERATED-CONSUMERS.json now records this newer snapshot.
The upgrade installer now uses the same prefer-offline option as the successful registry check. Exact lockfile integrity remains required.

## Consolidated foundation review - 2026-10-05

Reviewed Cxsun, five shared owners, Email, UIUX, and four preview project apps.
Authenticated MCP retrieval passed for all twelve repositories. Cxsun package boundaries passed.
Current Platform source passed six test cases and its build.
FOUNDATION-GAPS.md records package integration, stale deployed governance, preview app migration,
upgrade and browser acceptance, conflicting active records, and deferred production checks.
No implementation corrections, publication, deployment, version change, commit, or push ran during this review.

## Shared alignment audit - 2026-10-05

Full verification (48 tests), registry and fresh source consumers passed. Existing database upgrade and browser acceptance remain partial.

Authenticated live MCP verification passed. See the [alignment audit](D:/codexsun/projects/cxsun/agent/SHARED-ALIGNMENT.md). Version numbers remain unchanged. No release delivery was performed by this audit.

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
Connection lifecycle is private to the provider. Driver tests stay with their
driver; provider tests stay in tests/. CLI and import operations stay in operations/.
Updated development and compiled command paths. Backup dispatch uses the validated
driver, including the default MariaDB selection.

Passed: the earlier full verification ran 56 tests, lint, types, build and compiled
identity checks. Live MariaDB connection, migration 007 and SQL backup passed.
A later typecheck failed in the separately added database-connections repository:
its nullable driver is not narrowed to TenantDatabaseTarget. That concurrent work
is preserved. Live MariaDB portal acceptance remains untested.

## Settings and request-scoped tenant mappings - 2026-10-05

Added `settings` and `database-connections` backend modules. The settings provider
loads the app `.env`, applies centralized defaults, validates selected values, and
has an internal allowlisted writer that preserves unrelated lines. The API now
uses that normalized environment for application, database, email, and identity
configuration.

Migration 007 adds `cxsun_tenant_connections`, which stores tenant-to-database
targets without storing database credentials. MariaDB mappings inherit the
server credentials from `.env`; SQLite mappings store an app-side path. Each API
request reads tenant names and mappings from the master into async request-local
context. Dynamic lookup rejects absent or inactive mappings.

Not verified in this change: typecheck, tests, migration execution, live database
lookup, tenant database migration, or tenant isolation. Identity and session
storage remain on the master; no automatic mapping seed or HTTP settings editor
was added. The previous repository typecheck failure remains unconfirmed until a
new typecheck is run.

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

## Settings consolidation - 2026-10-05

Removed the settings business-module scaffolding. `src/api/settings.ts` now reads,
normalizes, and publishes environment settings and provides an optional allowlisted
`.env` writer. Tenant request-context handling and connection lookup are owned by
`src/api/database/database.connections.ts`; API requests continue to load tenant
details from the master registry. No verification commands were run for this edit.

## Settings to data connection final review - 2026-10-05

Reviewed and finalized the runtime chain: `.env` and process overrides are loaded
and normalized by `settings.ts`; `DatabaseConnections` receives those settings,
validates and owns the master and dynamic tenant connections; `database.provider.ts`
exposes the registry lifecycle and a `DatabaseExecution` bound to the master Kysely
connection; API requests reload tenant details into async-local request context
before module dispatch. Tenant resolution rejects absent and inactive mappings.

Removed duplicate tenant-context construction by sharing one request provider.
Database configuration consistently merges normalized settings with explicit
overrides. The SQLite integer fixture now declares INTEGER affinity so it checks
the adapter's BigInt read behavior on the supported runtime.

Passed: `npm run verify` (tools/line checks, lint, both TypeScript checks, 88 tests,
build, production frontend smoke, and compiled identity acceptance). One opt-in
live MariaDB test was skipped because live database credentials were not enabled.
No blocker remains in the reviewed application settings-to-data wiring. No live
MariaDB connection or tenant database isolation claim is made.

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
