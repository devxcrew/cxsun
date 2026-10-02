# Changelog

## Version State

Current version: 0.1.3

Release tag: v-0.1.3

Changelog label: v 0.1.3

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
