# Shared alignment audit

For the newer app identity migration, see [Foundation parity](FOUNDATION-PARITY.md).
The preview-app gap below describes the earlier alignment snapshot.

## Current result - 2026-10-05

All 12 local repositories passed authenticated verification against
https://mcp.codexsun.com/mcp. Governance source and deployed snapshot match at 0.1.10.
Intergrid and Veyrezio are absent locally and are outside this audit.

All five project apps now consume published Framework 0.1.11. Other published
shared package versions remain current. UIUX keeps its intentional local UI source
connection for gallery development. Third-party package choices remain owner-specific.

| Package | Published npm latest | Current owner source |
| --- | --- | --- |
| Framework | 0.1.11 | 0.1.11 with an unreleased config correction |
| Platform | 0.1.2 | 0.1.5 |
| UI | 0.2.0 | 0.2.1 |
| Tools | 0.1.8 | 0.1.9 |
| Email | 0.1.0 | 0.1.1 |

## Corrections

Platform's integration test now imports the seeder through its public export.
Resource mutation handlers retain their controller instance. Browser schema exports
no longer load backend providers or Kysely. A regression test guards that boundary.

Cxsun source-consumer verification now packs the current owner sources into fresh
archives. The optional `--temporary` flag runs fixtures outside the workspace and
avoids the installer stall observed in a workspace fixture. Published manifests
continue to reference npm packages.

## Passed verification

- Cxsun: full verification, 48 tests, build, compiled identity and production HTTP checks.
- Billing, CRM, QCafe and Ecommerce: full verification and package boundary checks.
- Framework: release checks and 25 tests.
- Platform: seven tests, TypeScript build and packed consumer checks.
- UI: release checks and 61 tests.
- Tools: release checks and 32 tests.
- Email: release checks and two tests.
- Governance: verification, cloud tests and matching live snapshot.
- UIUX: verification, two tests, build and asset budgets.
- Two fresh registry consumers and two fresh source consumers: installation,
  verification, package boundaries, separate SQLite databases, three identity portals
  and cross-app session denial.
- Platform's nine identity modules have the canonical owner files. The shared
  implementation scan found no files above 900 lines.

Exact consumer receipts and source archive integrity values are saved in
[SHARED-ALIGNMENT.json](SHARED-ALIGNMENT.json). Execution logs remain in each
repository's alignment logs or `.cache` directory. This receipt supplements older
phase records; it does not replace their historical results.

## Remaining work

1. Publish the newer source packages only under an authorized release, then adopt
   those releases in consumers. Framework needs a new version for its source-only
   correction; do not replace the already published 0.1.11 archive.
2. Verify an upgrade with an existing populated database. Fresh database and seed
   checks passed, but the older fixture upgrade remains unverified after an install stall.
3. Billing, CRM, QCafe and Ecommerce still use preview sessions. They need a separate
   identity foundation migration before their desks represent authenticated access.
4. Complete the remaining browser permission, password, session-revoke, navigation,
   screen-reader and viewport acceptance checks. No browser suite was rerun here.
5. Verify real SMTP, deployed proxy/TLS, account policy, backups, recovery and load
   budgets before production acceptance.

There is no unresolved failure in the checks listed as passed. Existing database
upgrades, browser acceptance and production acceptance remain partial or untested.
No commit, push, npm publication or deployment was performed by this audit.
