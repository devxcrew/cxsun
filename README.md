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

Development and builds use @devxcrew/tools, installed from the local packed archive in vendor. .devxcrew-tools.json declares this app's single-server layout, preparation script, environment file, and dependency boundaries. npm run tools:env preserves existing local settings; npm run tools:check verifies imports and package ownership. github:now is wired for explicit commit and push operations.

For audit results and the repeatable integration process, read ../../shared/tools/assist/TOOLS-AUDIT.md. The registry package has not been updated with these local compatibility changes.

## Clone the workspace

Keep the sibling layout used by local package links:

```powershell
git clone https://github.com/devxcrew/cxsun.git projects/cxsun
git clone https://github.com/devxcrew/framework.git shared/framework
git clone https://github.com/devxcrew/ui.git shared/ui
git clone https://github.com/devxcrew/uiux.git devkits/uiux
```

Each repository carries its tested @devxcrew/tools archive under vendor. The registry release does not yet include the local compatibility changes.
