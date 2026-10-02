# Cxsun

Cxsun is the base application for the Codexsun platform.

## Structure

- `../../shared/framework`: environment validation and HTTP server primitives.
- `../../shared/ui`: common React components, LoginPage, and MainWorkspace backed by mdi-main.
- `src/api`: application startup and frontend serving.
- `src/web/public`: public home page.
- `src/web/auth`: frontend login preview and session flag.
- `src/web/desk`: shared MainWorkspace integration.

The flow is home (`/`) → login (`/login`) → desk (`/desk`). Sign out returns to login. Login is a frontend preview: credentials are not sent, stored, or verified. No authentication, database, or business API is connected.

## Run

Use Node 26.10 or newer and npm 12.2 or newer. Copy `.env.example` to `.env` if needed.

```powershell
npm install
npm run dev
```

The API entry point starts one server at `http://127.0.0.1:5173`. In development it loads the frontend through Vite middleware. `.env` sets `APP_NAME`, `APP_PORT`, `APP_URL`, `APP_MODE`, and `APP_HOST`. Keep the URL port equal to APP_PORT. The frontend receives only app name, URL, and mode.

```powershell
npm run check
npm run build
npm run test:production
```

For the built frontend, set `APP_MODE=production` before `npm start`. The server serves `dist/frontend` and supports direct frontend route loads.

UI component dependencies belong to shared/ui. Cxsun keeps React, routing, its icons and font, and build tools, plus the retained backend packages. `npm install` also installs shared/ui dependencies through the preinstall script. Shared packages use local file links. Legacy desktop and infrastructure commands remain unbound while those features are rebuilt. Source repository: https://github.com/devxcrew/cxsun.

## Shared tools

Development and builds use @devxcrew/tools, installed from npm at the pinned version 0.1.3. .devxcrew-tools.json declares this app's single-server layout, preparation script, environment file, and dependency boundaries. npm run tools:env preserves existing local settings; npm run tools:check verifies imports and package ownership. github:now is wired for explicit commit and push operations.

Tools 0.1.3 includes the audited compatibility changes. The npm package includes assist/TOOLS-AUDIT.md with the supported commands and limitations.

## Clone the workspace

Keep the sibling layout used by local package links:

```powershell
git clone https://github.com/devxcrew/cxsun.git projects/cxsun
git clone https://github.com/devxcrew/framework.git shared/framework
git clone https://github.com/devxcrew/ui.git shared/ui
git clone https://github.com/devxcrew/uiux.git devkits/uiux
```

Each repository installs the pinned @devxcrew/tools@0.1.3 package from npm. Framework and UI remain sibling file dependencies.

## Common maintenance commands

All repositories use the installed @devxcrew/tools package through these root scripts:

```powershell
npm run tools:check
npm run version:show
npm run version:update -- --dry-run
npm run check:versions
npm run changelog:show
npm run changelog:append -- --title "Change title" --note "Change details"
npm run lines:check
npm run fix:line-endings
npm run github:now -- --dry-run
```

Version updates and changelog appends change local files. github:now without --dry-run can commit and push after its review prompts. Reusable UI and framework packages keep their package-specific build contracts; the gallery keeps its standalone Vite workspace.

## Verify the base application

Run npm run verify to check dependencies, versions, line endings, lint, types, tests, the production build, and frontend route serving.

## Current platform scope

The base application composes framework and UI. The server starts from src/api/index.ts. The desk uses the shared MainWorkspace layout.

Login uses a tab-local preview flag. This flag is navigation state and cannot authorize backend access. Installed database, mail, queue, desktop, and infrastructure packages do not provide connected features.

## Next MVP steps

1. Define an app registry and desk navigation. Start with one local example app and an empty state.
2. Define the deployment mode and workspace context. Use one fixed organization for a single-client deployment and explicit organization membership for multi-tenant deployments.
3. Add server-backed authentication and sessions. Replace the preview flag and validate authorization on every API request.
4. Connect persistence and migrations. Apply tenant scope to every business query and test isolation between organizations.
5. Add role-based app access, administration, and audit events. Filter desk navigation and enforce the same permissions on the server.
6. Connect one business app through the registry. Verify login, organization selection, permissions, data access, and sign out together.

The app registry is the next frontend milestone. Real authentication and tenant isolation must precede access to business data. Decide the identity provider and database isolation model before the backend milestone.

## Ownership

| Location               | Responsibility                                |
| ---------------------- | --------------------------------------------- |
| shared/framework       | Reusable runtime and HTTP primitives          |
| shared/ui              | Reusable components and workspace layout      |
| projects/cxsun/src/api | Server composition and application API wiring |
| projects/cxsun/src/web | Public pages, login, desk, and app navigation |
| devkits/uiux           | Component examples and developer gallery      |
| @devxcrew/tools        | Build and repository maintenance commands     |

Keep deployment settings in environment configuration. Resolve authenticated organization and permissions on the server. Keep business behavior in its owning app.

## Common governance MCP

Use npm run mcp:connect for read-only repository, UI, and code guidance. It continues offline using the guides in assist/governance. Configure the connection through .env.example. See assist/GOVERNANCE.md for headers and client setup. This command is independent of application startup and verification.
