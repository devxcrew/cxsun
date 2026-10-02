# Cxsun

Cxsun hosts a React application shell and a Fastify TypeScript server.
The full external dependency set from CXApp is installed in this project.

## Start development

Use Node.js 26.10.0 and npm 12.2.0 or later. Run these commands from this folder:

```powershell
npm ci
npm run dev
```

Open http://127.0.0.1:5173. The API runs on http://127.0.0.1:4100.
Vite forwards `/api` requests to the server.

Copy `.env.example` to `.env` to change the host or ports. Restart development after configuration changes.

## Build and run

```powershell
npm run build
npm run check
npm run packages:check
npm start
```

Open http://127.0.0.1:4100. The Node.js server serves the built frontend and API together.

## Structure

- `src/server`: HTTP server, API routes, and shutdown.
- `src/web`: React application shell.
- `src/config`: environment validation and application catalog.
- `src/contracts`: types shared by the server and frontend.
- `tests`: HTTP and configuration checks.

The shell uses Tailwind 4, Radix controls, Lucide icons, and locally bundled Geist fonts.
TanStack Router owns navigation. TanStack Query fetches validated Zod API responses.
TanStack Table renders the dependency inventory. Tiptap powers the workspace note editor.

## Installed capabilities

The manifest includes database drivers, Kysely, BullMQ, Redis, mail clients, charting, drag-and-drop, and PDF export packages.
It also includes the published Blog and File Manager add-ons.
These packages are available for module implementation. Installation does not activate their workflows.
Private CXApp business packages are not copied into Cxsun.

The build uses TypeScript 7.0.2. ESLint uses the separate TypeScript 6 compiler API package.
Build scripts call the TypeScript 7 binary directly to avoid the lint package's `tsc` shortcut.
The dependency settings match CXApp's legacy peer resolution until its lint parser supports TypeScript 7.

## Optional infrastructure

Copy `.env.example` to `.env`. Set the database passwords before starting infrastructure.

```powershell
npm run infra:up
```

This command starts MariaDB and Redis. Docker Desktop must be running.
Service ports bind to loopback. Persistent data stays in Docker volumes.
The application does not create business tables or connect to these services yet.
The service page reports configuration, not a database or mail connectivity test.

Build the application container with `docker compose --profile app up --build -d`.
Add `--profile proxy` for Nginx. Add `--profile media` for File Browser.

## Desktop

```powershell
npm run desktop:dev
```

The Tauri host needs Rust, Windows build tools, and WebView2.
The desktop host uses the local Cxsun server. It does not bundle a standalone backend.
Run `npm start` before opening a production desktop build.
Updater dependencies are installed. Update signing and distribution are not configured.

## Quality and CI

`npm run check` runs lint, TypeScript checks, and API tests.
`npm run test:production` checks the built server, frontend assets, and route boundaries.
`npm run format` formats the source. `npm run packages:check` checks the installed package set.
The GitHub Actions workflow runs these checks and the production build.
Turborepo configuration is included for future workspace build orchestration.

`src/config/modules.ts` lists Cxsun as active. Other applications are planned catalog entries, not installed modules.
This base application has no authentication, database persistence, tenant isolation, or business workflows.
The next milestone adds reusable framework contracts and persistent identity with a fixed client context.
