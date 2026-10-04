# Extend the application with an owned module

## Current scope

This contract describes the local Cxsun source profile.
It does not establish compatible published packages or deployed governance acceptance.
Real email testing and production deployment are deferred by the user.
Use the task checklist for release gates and the audit for verified results.

## Backend registration

Keep a capability's backend code in its own module folder.
Export its registration from <module>.provider.ts.
Use contributeModule from src/api/application/application.provider.ts.
Declare the public dependencies by name. Framework passes only those dependencies to create.
Keep resource routes, schemas, controllers, services and persistence inside the capability.
Register the contribution explicitly in the app composition list.
Do not scan folders or import another owner's private files.

Create returns a public provider. Start verifies prerequisites and registers owned declarations.
The handler returns false for unrelated routes and true after handling its own route.
Forward the supplied AbortSignal into asynchronous work and authenticated request handling.
Readiness follows startup. Shutdown and failed startup close started modules in reverse order.
API and browser module handlers have bounded request deadlines.
The app database provider owns the SQLite connection. Modules do not open a second application connection.

## Authentication and authorization

Inject the identity public provider through the identity dependency.
Use authenticateRequest(request, portal, signal) for HTTP cookie authentication.
Platform owns cookie parsing, session lookup, app/portal scope, trusted-origin checks and cancellation.
Do not reconstruct authentication from browser session state or copy cookie logic.
Call requirePermission for the module action before executing its service.
Navigation visibility and frontend page guards do not authorize an API request.
The identity adapter maps public IdentityError to Framework HttpError with safe status, code, message and field errors.
Unexpected errors use the shared safe response envelope. Do not return raw storage or transport errors.

## Permission declarations and labels

Use the public IdentityPermissionDeclaration type and registerPermissions method.
Each declaration names its owner and lists app-qualified permission IDs with supported portals.
For example, an owner named orders declares cxsun.orders.read with the label View orders.
The actual app ID replaces cxsun in another application.
Supply concise business labels from the owner module. Keep IDs stable and language independent.
Registration is idempotent for matching ownership and portal policy. Conflicting policies fail.
Labels can change without changing the permission ID or granting access.
The permission catalog displays declared labels. An absent optional label falls back to the ID.
Await registration during module startup before readiness.
Registration does not grant permissions to roles or users. Authorized role administration owns grants.
Do not add business-specific labels or permissions to central Platform implementations.

## Frontend contribution

Keep pages, forms, schemas, resource clients, navigation and breadcrumbs in the matching frontend module.
Export a public contributor with an id, routes and optional navigation function.
Compose contributors through src/web/composition/frontend.provider.ts.
The composition rejects duplicate owner IDs and route paths.
Routes are relative to the app workspace prefix. Use module-owned resource API methods for data.

Use identityProvider.workspace(portal, page) to wrap an added authenticated page.
The page declares its title, component and optional permission.
The shared workspace supplies session checks, presentation, navigation, sign-out and permission feedback.
Contributed pages receive the verified principal. Do not create a second identity desk or login flow.
Navigation receives workspace, base, pathname and permissions.
Contribute each owner's sections and links; filter links using the relevant permission.
Keep list filters, pagination and sorting in the browser query string.
Own breadcrumbs and preserve list query state on ancestor links and browser navigation.

## Acceptance for an extension

1. Verify declared dependency injection and reject private sibling imports.
2. Verify authenticated API success, anonymous denial and missing-permission denial.
3. Verify portal/app isolation and untrusted-origin rejection for mutations.
4. Verify schema validation and safe field errors independently on the server.
5. Verify persistence in a separate SQLite fixture, then reopen it.
6. Verify the page inside the common workspace and its permission-filtered navigation.
7. Verify deadline cancellation and reverse lifecycle cleanup.
8. Record actual results in the owner task and audit before accepting completion.
