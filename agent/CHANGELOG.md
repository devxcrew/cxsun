# Changelog

## Version State

Current version: 0.2.3

Release tag: v-0.2.3

Changelog label: v 0.2.3

## v-0.2.3

### [v 0.2.3] 2026-10-05 9:30 am - Record consumer upgrade findings

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Document stalled fixture installation and ignore generated cache files.

## v-0.2.2

### [v 0.2.2] 2026-10-05 8:37 am - Align workspace packages

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Align maintenance tooling with @devxcrew/tools@0.1.8 and record the verified workspace package set.

## v-0.2.1

### [v 0.2.1] 2026-10-05 7:58 am - Adopt Framework and UI package names

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Use the public @devxcrew/framework and @devxcrew/ui packages. Preserve module ownership and existing behavior.

## v-0.2.0

### Latest generated template verification - 2026-10-04

- Reverify two fresh registry apps with the current workflow and security source.
- Confirm 44 tests per app, compiled security checks and separate live SQLite.
- Record the source commit and lock hashes. Match all 52 generated source files per app.

### Local security acceptance - 2026-10-04

- Add module-owned response privacy and portal-cookie acceptance checks.
- Verify persistent login limits through a compiled server restart and file-backed SQLite.
- Add four privacy/cookie verification regressions. Full verification passes 47 tests.
- Record actual retention behavior, local threat evidence and production policy limits.

### Local workflow review - 2026-10-04

- Return safe feedback for unsupported resource create/edit links and preserve list query state.
- Reset account data and forms when the portal or settings page changes.
- Add route and portal-navigation regressions. Full verification passes 43 tests.
- Reconcile current registry release records and document the remaining browser workflow matrix.

- Verify two fresh registry consumers and two existing candidate upgrades.
- Preserve owned source, configuration, SQLite schema and stored rows during upgrades.
- Record published package receipts and remove local-only commands from exported templates.

### Review corrections - 2026-10-04

- Validate resource links before rendering and preserve filtered list return links.
- Add path and malformed-link rendering regressions.
- Report installed shared-package versions that differ from the lockfile.
- Correct standalone development requirements and historical verification scope.
- Verify 41 tests, lint, types, build, production smoke, and persisted identity checks.

### [v 0.2.0] 2026-10-04 4:59 pm - Deliver reusable Cxsun foundation

#### Database Changes

- Database update: Yes (manual).

#### App Codebase Changes

- Connect persisted SQLite, three identity portals, module-owned resource workflows, public provider composition, permission extensions and template rehearsal.

## v-0.1.9

### [v 0.1.9] 2026-10-03 10:15 am - Publish npm package integration and MCP audit

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Release published Framework and UI integration, green live MCP audit, local package development commands, and working GitHub CI.

## v-0.1.8

### [v 0.1.8] 2026-10-03 9:17 am - Consume devxcrew npm packages

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Replace sibling Framework and UI dependencies with npm versions, remove sibling build/install hooks, scan installed UI styles, and add explicit local snapshot and registry restore commands.

## v-0.1.7

### [v 0.1.7] 2026-10-03 8:58 am - Require audited cloud MCP guidance

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Require cloud-only MCP instructions, reject alternate endpoints and mismatched responses, use a 15-second timeout, and verify development starts only after live guidance succeeds.

#### Verification

- Passed npm run verify: maintenance checks, lint, typechecks, three tests, production build, and production route/assets/API smoke checks.
- Authenticated live MCP retrieval passed. Configured-secret and Git whitespace scans passed.

## v-0.1.6

### [v 0.1.6] 2026-10-03 8:53 am - Use live governance for shared documentation and rules

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Updated package maintenance.

## v-0.1.5

### [v 0.1.5] 2026-10-03 8:38 am - Use live governance for shared documentation and rules

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Made the Cloudflare MCP endpoint the default client target and documented it in every repository
  README, AGENTS, and skills notes. Local guides remain editable source and offline fallback; only
  explicit local server/testing paths retain loopback URLs. Updated app manifests and verified cloud
  connections.

### [v 0.1.5] 2026-10-03 8:30 am - Connect Cloudflare-hosted governance

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Configured the HTTPS governance endpoint at mcp.codexsun.com/mcp while keeping secrets in ignored
  environment files. Cloudflare Workers serves authenticated read-only MCP from a deployment
  snapshot; local listener remains optional and advisory offline behavior is preserved.

### [v 0.1.5] 2026-10-02 10:39 pm - Align isolated application foundation instructions

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Adapted the supplied new-app prompt to actual shared package paths, advisory MCP policy, isolated
  app ownership, provider composition, and three role-specific identity portal/desk contracts. Added
  audit/todo records. Application manifests describe current capabilities; real identity remains
  pending shared Platform Core. Preserved current changelog and environment contracts.

### [v 0.1.5] 2026-10-02 10:34 pm - Define resource routes and browser navigation contracts

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Set versioned Laravel-style API resources, browser-to-API mappings, validated URL filters and
  pagination, resource response contracts, and module-owned breadcrumbs that preserve list state.
  Create/edit APIs are optional read-only metadata extensions. Updated standards only; existing app
  routes and UI behavior are unchanged.

### [v 0.1.5] 2026-10-02 10:29 pm - Define frontend and backend validation standards

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Required module-owned TanStack Form with Zod for frontend forms and independent server-side Zod
  validation for untrusted input. Defined schema ownership, parsed controller input, safe field
  errors, domain checks, and queue payload validation. No application forms, endpoints, or package
  dependencies were changed.

### [v 0.1.5] 2026-10-02 10:27 pm - Define provider and controller module roles

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Replaced the module registration filename with <module>.provider.ts and defined injected public
  provider contracts as the communication boundary. Added optional module-owned controllers for
  request orchestration while keeping routes declarative and business rules in services. Applied
  matching frontend ownership without mandatory extra layers.

### [v 0.1.5] 2026-10-02 10:21 pm - Define strict module ownership standards

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Set modular-monolith and practical DDD rules for matching frontend/backend modules, public
  contracts, owner-local persistence and UI, optional events and retryable queues, and a practical
  700Ã¢â‚¬“900-line source limit. Referenced the CXApp app module layout without changing application
  runtime.

### [v 0.1.5] 2026-10-02 10:02 pm - Improve Markdown readability

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Simplified active documentation, removed repeated wording, and organized instructions into clear
  sections, paragraphs, lists, and tables. Formatted Markdown with consistent spacing and LF while
  preserving historical content and release metadata.

### [v 0.1.5] 2026-10-02 9:56 pm - Consolidate root agent instructions

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Merged root agent instructions into AGENTS.md, removed the duplicate AGENT.md, and updated active
  documentation, MCP metadata, and fallback references. Historical logs and archives remain
  unchanged.

### [v 0.1.5] 2026-10-02 9:41 pm - Central governance and repository agent layout

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Added nonblocking central MCP startup guidance and repository agent records. Verified lint,
  typecheck, three tests, build, and production routes.

## v-0.1.4

### [v 0.1.4] 2026-10-02 9:30 pm - Central governance and repository agent layout

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Moved common guidance and audits to mcp-governance, preserved repository changelog history in
  agent/CHANGELOG.md, added local task and plan records, and wired centralized maintenance commands
  with legacy tools compatibility.

### [v 0.1.4] 2026-10-02 8:56 pm - Common MCP governance guidance

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Added optional authenticated MCP instruction retrieval, connection settings, app identity, and
  common offline repository and UI guides. Governance remains advisory and does not gate startup or
  builds. Verified all six live MCP connections, four MCP protocol tests, common offline fallback,
  and repository checks. Cxsun production routes and UIUX builds passed.

## v-0.1.3

### [v 0.1.3] 2026-10-02 8:32 pm - Published npm tools integration

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Replaced the local tools archive with the pinned npm package @devxcrew/tools@0.1.3. Updated shared
  maintenance commands and removed the bundled tools archive. Passed repository checks, production
  build, and frontend route smoke checks with the published tools package.

## v-0.1.2

### [v 0.1.2] 2026-10-02 8:26 pm - Shared tools maintenance wiring

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Connected shared version, changelog, line ending, and GitHub commands. Added tools checks to
  repository verification.

## v-0.1.1

### [v 0.1.1] 2026-10-02 8:05 pm - Shared platform foundation and developer tooling

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Refactored Cxsun into src/api and src/web; connected shared framework and UI; added public home,
  frontend login preview and MainWorkspace desk; moved UI-owned dependencies to shared/ui;
  integrated tools-managed single-server development, builds, environment setup, dependency
  boundaries and maintenance scripts. Verified tools regression tests, app checks, build, production
  serving and browser navigation. No database changes.

## v-0.1.0

### [v 0.1.0] 2026-10-02 8:00 pm - Cxsun base application

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Established the current frontend preview, shared framework and UI integration, and shared
  development tools.
- Initialized version tracking at the existing package version without a version bump.

## Cloud-only governance — 2026-10-03

- Require live authenticated MCP guidance. Remove local guide fallback and sibling client imports.
- Connection commands fail when cloud guidance is unavailable or another endpoint is configured.

## Live MCP audit — 2026-10-03

- Enforced the cloud endpoint for direct client imports and validated instruction identity.
- Extended cloud request timeouts to 15 seconds and verified all live resources and tools.

## Live MCP audit — 2026-10-03

- Enforced the cloud endpoint for direct client imports and validated instruction identity.
- Extended cloud request timeouts to 15 seconds and verified all live resources and tools.

## npm package names — 2026-10-03

- Updated public imports, package manifests, local development commands, and common guidance.

## npm migration completion — 2026-10-03

- Passed: npm ci from the registry lockfile; npm audit found zero vulnerabilities.
- Passed: npm run verify (dependency boundaries, release metadata, LF, lint, frontend/backend typechecks, three tests, production build, and route/assets/API smoke checks).
- Passed: explicit local packed snapshots tested during development without changing release manifests. Registry packages are restored in the final installation.
- Passed: all project manifests and lockfiles have no shared Framework/UI file dependencies or old package names.
- Passed: UIUX local-source gallery typecheck and production build.
- Passed: updated live governance deployment and authenticated connections from all six repositories.
- Partial: the current UI flow uses preview sessions; real identity, RBAC, tenancy, and three authenticated desks remain separate foundation work.

## Release verification 0.1.9 — 2026-10-03

- Passed maintenance checks, lint, typechecks, three tests, production build, smoke checks, and direct package verification.
- Tools passed all 21 tests. Version-bump and line-fixing commands completed successfully.
- Prepared GitHub repository and CI checkout paths for sibling maintenance tools.
- Commit subject: #9 - Publish npm package integration and MCP audit.

## Standalone development review — 2026-10-03

- Documented environment setup, intentional cloud requirements, and optional local package development.
- Recorded passing workspace checks and failing isolated maintenance checks in AUDIT.md.
- Recorded incomplete clean installs and unsupported desktop/Docker workflows.
- Preserved release version and history. No release was requested.

## Standalone implementation — 2026-10-03

- Consume published Tools 0.1.7 through installed commands and remove sibling maintenance script paths.
- Use a single-repository CI checkout and add environment/MCP setup.
- Remove unsupported desktop and Docker scripts while preserving dependencies.
- Add clear optional source errors and CODEXSUN_SHARED_ROOT support.
- Passed full workspace and isolated verification, browser preview flows, port handling, and restart checks.
- Document one clean install of the identical shared dependency graph, then sequential per-app ownership.
- Preserve this app's release version. No commit or push was performed.

## 0.1.9 - 2026-10-04 09:34

### Connect SQLite through Kysely

- Add a module-owned database provider and Node SQLite adapter.
- Add versioned metadata migration, repeatable seed, and db:migrate, db:seed, db:setup, and db:check commands.
- Verify the database during server startup and close it during shutdown.
- Configure ignored storage/cxsun.sqlite through DB_SQLITE_PATH.
- Passed five tests, lint, typechecks, build, production HTTP smoke, and compiled server startup.
- Passed repeated migrations and seeds, persistence, rollback, and foreign-key checks.
- Database identity remains pending Platform Core. No release bump, commit, or push was requested.

## 0.1.9 - 2026-10-04 09:56

### Prepare database identity through Platform Core

- Create shared Platform Core with public identity provider, migrations, seeds, scrypt passwords, sessions, permissions, and tenant membership.
- Prepare Cxsun identity frontend with TanStack Form, Zod, three portals, and password change.
- Passed three Platform Core tests and build. Correct a stale-password race during session creation.
- Passed Cxsun verification and package checks. Preserve active preview routes until the package source is approved.
- Pending local dependency exception or publication preparation. No Cxsun identity accounts or sessions are connected yet.
- No version bump, publication, commit, or push occurred.

## 0.1.9 - 2026-10-04 10:19

### Connect database identity to Cxsun

- Connect the user-approved bundled @devxcrew/platform@0.1.0 package through public exports.
- Register Platform-owned identity migration and repeatable seed in the SQLite lifecycle.
- Replace preview sessions with three authenticated portals, scoped cookies, RBAC, and trusted tenant membership.
- Add password change and account session revocation. Seed three local accounts with ignored generated credentials.
- Add compiled identity smoke tests for durable sessions, role and tenant denial, logout, validation, and database integrity.
- Fix a browser-discovered React suspension error by using React lazy and Suspense.
- Passed Platform tests/build, Cxsun verification, package checks, three-portal browser flows, and normal database login checks.
- Record retained ignored audit fixtures after cleanup was blocked by automatic approval review.
- Publication, live package registration, and production operational checks remain pending. No release, commit, or push occurred.

### 0.2.0 foundation completion checks

Add module-owned compiled identity resource acceptance. Refresh local Platform and Email artifacts with MIT licenses. Record checksums for five prepared public packages and two independent generated consumer checks.

### Package migration verification - 2026-10-05

- Passed 47 tests, owner verification and applicable package checks.
- All six application lockfiles use exact Framework 0.1.8 and UI 0.2.0 registry artifacts.
- Two fresh registry apps passed 44 tests each, live SQLite and cross-app session denial.
- The gallery passed source and isolated registry verification with bundle budgets.
- Browser, real SMTP and production deployment acceptance remain separate.

### Package reference cleanup - 2026-10-05

- Remove superseded package identifiers from source, fixtures and current documents.
- Current release receipts use verified registry checksums for Framework and UI.
- Original publication records remain in Git history.
- No test suite, publication or deployment ran in this cleanup.

## Dependency alignment - 2026-10-05

- [x] Align consumed shared packages and common direct dependency versions.
- [x] Install dependencies with lifecycle scripts disabled.
- [x] Keep app dependency ownership and public peer ranges.
- [x] Exclude Veyrezio from this change.

Source version: 0.2.2. Published package archives retain their existing versions.
The baseline is recorded in projects/cxsun/agent/DEPENDENCY-BASELINE.json.

### [v 0.2.2] 2026-10-05 9:15 am - Verify foundation phases

Phase 1 and 2 review: fix generated-consumer port isolation and public package-reference migration.
Align template dependency metadata with the current lockfile. Keep unrelated consumer code and SQLite data intact.
Root verification passed 48 tests. Browser acceptance has partial evidence in AUDIT.md.
Both fresh registry consumers passed. The older-consumer upgrade is blocked by a stalled fixture install. No release action ran.
