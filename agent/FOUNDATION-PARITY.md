# Application foundation parity

## Result - 2026-10-05

Billing, CRM, QCafe and Ecommerce now match Cxsun's foundation source and exact
npm dependencies. Each app remains independent. The audit compared all 62 source
files after substituting each app's name, ID and default port.

| App | Version | Default port | SQLite database | Tests |
| --- | --- | --- | --- | --- |
| Cxsun | 0.2.3 | 5173 | existing configuration preserved | 50 |
| Billing | 0.1.4 | 5174 | storage/billing.sqlite | 46 |
| CRM | 0.1.4 | 5175 | storage/crm.sqlite | 46 |
| QCafe | 0.1.4 | 5176 | storage/qcafe.sqlite | 46 |
| Ecommerce | 0.1.4 | 5177 | storage/ecommerce.sqlite | 46 |

## Foundation behavior

All apps use public npm Framework 0.1.11, Platform 0.1.2, UI 0.2.0,
Email 0.1.0 and Tools 0.1.8. They share the same foundation code pattern,
not a runtime database, source import or application session.

User: `/login` to `/desk`. Admin: `/admin/login` to `/admin/desk`.
Super-admin: `/sa/login` to `/sa/desk`. Platform owns durable sessions,
identity, authorization and tenancy. Browser preview sessions were removed.
Kysely connects each application to its own SQLite file.

Frontend modules use canonical list, form and hooks files. Identity backend
adapter routes pass through the controller and service to public Platform.
Required non-applicable adapter files explain which behavior Platform owns.
Application and database composition remain business-neutral infrastructure.

Repository versions, ports, app IDs, ignored environment values and agent history
remain independent. Existing business planning files were preserved.
Unused preview foundation dependencies were replaced with Cxsun's package set.
Before-change foundation copies are in each migrated app's ignored `.cache` folder.

## Passed checks

All five apps passed full verification: 234 tests, lint, TypeScript, build,
production frontend smoke and compiled identity acceptance. Identity checks cover
three portals, role/tenant denial, durable sessions, logout, password change,
validation, resources, privacy and restart-persistent login limits.
Package installation and public-boundary checks passed in each app.
Authenticated live MCP verification passed in every app.

All four migrated apps passed database migration, configured seeding and connection
checks against their own configured SQLite files. Blank account fields create no
accounts. Configure bootstrap emails and strong passwords in ignored `.env`, then
run `npm run db:setup` before trying your own accounts.

Machine evidence is in [FOUNDATION-PARITY.json](FOUNDATION-PARITY.json).
Per-app logs are in `.cache/foundation-final-verify.log`,
`.cache/foundation-final-packages.log` and `.cache/foundation-final-mcp.log`.
Migration logs are in `.cache/foundation-alignment-database.log`.

## Remaining acceptance work

The deployed governance snapshot still lists the four apps' old dependency sets.
Its authenticated connection works, but inventory freshness is not yet complete.
Refresh and deploy governance inventory under an authorized deployment, then compare
its app package metadata with these manifests.

Complete full browser acceptance, existing populated database upgrade evidence,
real email delivery and production TLS, proxy, backup, recovery and load checks.
Newer shared source packages remain unpublished and are outside this parity change.
These apps match Cxsun's verified local foundation; production acceptance is open.

No commit, push, npm publication or deployment was performed.
