# Changelog

## Version State

Current version: 0.1.5

Release tag: v-0.1.5

Changelog label: v 0.1.5

## v-0.1.5

### [v 0.1.5] 2026-10-02 9:41 pm - Central governance and repository agent layout

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Added nonblocking central MCP startup guidance and repository agent records. Verified lint, typecheck, three tests, build, and production routes.

## v-0.1.4

### [v 0.1.4] 2026-10-02 9:30 pm - Central governance and repository agent layout

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Moved common guidance and audits to mcp-governance, preserved repository changelog history in agent/CHANGELOG.md, added local task and plan records, and wired centralized maintenance commands with legacy tools compatibility.

### [v 0.1.4] 2026-10-02 8:56 pm - Common MCP governance guidance

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Added optional authenticated MCP instruction retrieval, connection settings, app identity, and common offline repository and UI guides. Governance remains advisory and does not gate startup or builds. Verified all six live MCP connections, four MCP protocol tests, common offline fallback, and repository checks. Cxsun production routes and UIUX builds passed.

## v-0.1.3

### [v 0.1.3] 2026-10-02 8:32 pm - Published npm tools integration

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Replaced the local tools archive with the pinned npm package @devxcrew/tools@0.1.3. Updated shared maintenance commands and removed the bundled tools archive. Passed repository checks, production build, and frontend route smoke checks with the published tools package.

## v-0.1.2

### [v 0.1.2] 2026-10-02 8:26 pm - Shared tools maintenance wiring

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Connected shared version, changelog, line ending, and GitHub commands. Added tools checks to repository verification.

## v-0.1.1

### [v 0.1.1] 2026-10-02 8:05 pm - Shared platform foundation and developer tooling

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Refactored Cxsun into src/api and src/web; connected shared framework and UI; added public home, frontend login preview and MainWorkspace desk; moved UI-owned dependencies to shared/ui; integrated tools-managed single-server development, builds, environment setup, dependency boundaries and maintenance scripts. Verified tools regression tests, app checks, build, production serving and browser navigation. No database changes.

## v-0.1.0

### [v 0.1.0] 2026-10-02 8:00 pm - Cxsun base application

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Established the current frontend preview, shared framework and UI integration, and shared development tools.
- Initialized version tracking at the existing package version without a version bump.
