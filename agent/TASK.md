# Current task

## Completion wave - 2026-10-04

Cxsun 0.2.0 now consumes five exact published MIT packages. Full verification passes 41 tests, compiled identity resources and three-portal live SQLite checks. Two independent registry-generated apps and three-OS Cxsun CI passed. Browser acceptance is blocked by browser tool policy. Mail and production remain user-deferred.

- [x] Reconcile current status with the GitHub source release and latest owner audit.
- [x] Retrieve fresh authenticated cloud governance before this wave.
- [x] 06.05.1 Record full verify: 41 tests, lint, types, build, and compiled identity resource acceptance.
- [x] 06.05.1a Verify three login portals against persisted local SQLite.
- [x] 07.05.4 Verify two fresh generated local apps, separate databases, and cross-app session denial.
- [x] 06.11.2b Prepare five MIT package archives and record actual checksums.
- [x] 07.03.2a Receive explicit approval to publish all five versions.
- [x] 07.03.2b Publish five MIT releases and verify actual registry checksums; Platform uses 0.1.2 after an npm conflict.
- [x] 06.09.2 Complete registry-only installs, two generated consumers, and three-OS Cxsun CI (37204145628).
- [ ] 06.05.2c Complete interactive browser and accessibility acceptance when browser access is available.
- [ ] 07.04.2 Accept deployed governance freshness after deployment.
- [ ] 06.07.2 Real SMTP delivery remains user-deferred.
- [ ] 06.10.2 Production deployment remains user-deferred.

Use projects/cxsun/agent/REMAINING-WORK.md for ordered cross-owner dependencies.
Production deployment and real SMTP acceptance remain deferred. No pending external gate is marked complete.

- [x] Verify final Cxsun source commit 65b7fb2 on Windows, Linux and macOS: CI 37208049321.
- [x] Record all affected owner CI results in AUDIT.md.

## Prior records

## Cxsun review corrections - 2026-10-04

Resource links now use a module-owned parser before rendering or requesting records.
Malformed IDs and unsupported route suffixes show safe feedback and preserve the list query.
The default sessions page remains available when the account permission is absent.
Package checks verify installed manifests and report shared version differences from the lockfile.
Standalone records distinguish the historical preview release from the current development profile.
Registry acceptance, full browser accessibility, live governance freshness, and deferred production gates remain open.
See the current review entry in AUDIT.md for verification results.

## Final integrated local command evidence

Cxsun verify passes 39 tests, lint, frontend/backend types, build and production frontend/compiled identity checks.
The compiled checks cover three portals, role/tenant denial, password changes and durable sessions.
Package checks pass for all 30 direct dependencies. Two fresh generated local consumers pass clean installs,
36 tests each, full verify, separate live SQLite and cross-app cookie denial. Fresh browser proof covers profile save,
declared permission labels, mandatory desk permission protection and custom-role create/edit persistence.
The broader browser/accessibility matrix and registry release remain open.

## Current release boundary

The local foundation profile is under final integration verification.
Real mail testing and production deployment are deferred by the user.
Package publication, registry-only consumers and three-OS Cxsun CI passed. Browser acceptance and deployed governance remain open.
Live governance still reports the 2026-10-03 snapshot and lacks focused discovery.
A fresh local governance snapshot does not update the deployed server.
Use [module extension contracts](MODULE-EXTENSIONS.md) for adding owned capabilities.
The checklist does not claim all 54 parent tasks are complete.

<!-- foundation-checklist:start -->

## Numbered phase checklist

Master: [all foundation tasks](D:/codexsun/projects/cxsun/agent/CHECKLIST.md).

Updated: 2026-10-04. Checked steps have recorded evidence. External acceptance stays pending.

### Phase 01 - Baseline and ownership

- [x] **01.05 Audit app composition and live SQLite** - accepted. Owner: cxsun.
  - [x] 01.05.1 Operational database and protected source changes reviewed.

### Phase 02 - Public contracts and release scope

- [ ] **02.04 Map resources to frontend routes and navigation** - in-review. Owner: cxsun.
  - [x] 02.04.1 Identity routes, schemas, menus and resource specifications implemented.
  - [ ] 02.04.2 Verify full role/resource/action matrix in authenticated browser.
  - [x] 02.04.3 Compose owner frontend/backend providers through neutral route and navigation contracts.

### Phase 04 - UI and frontend workflows

- [ ] **04.05 Connect identity master pages to APIs** - in-review. Owner: cxsun.
  - [x] 04.05.1 Lists, forms, custom roles and membership actions pass contract tests.
  - [ ] 04.05.2 Verify authenticated create/edit/detail/delete and permission denial in browser.
- [ ] **04.06 Connect account, settings and role navigation** - in-review. Owner: cxsun.
  - [x] 04.06.1 Profile, password, settings and scoped menus implemented.
  - [ ] 04.06.2 Verify settings persistence, logout, expiry and role-specific navigation in browser.
- [ ] **04.07 Remove inactive product concepts and scaffold copy** - in-review. Owner: cxsun.
  - [x] 04.07.1 Preview flow replaced and inactive provider actions removed.
  - [ ] 04.07.2 Review every visible destination and final contextual copy.

### Phase 05 - Tools, guidance and delivery

- [x] **05.01 Integrate compatible packages and persistence** - accepted. Owner: cxsun.
  - [x] 05.01.1 Local snapshots, bundled Platform/Email and SQLite migrations integrated.
  - [x] 05.01.2a Safe startup stage diagnostics verified in compiled runtime.
  - [x] 05.01.2b Verify independent registry installation.

### Phase 06 - Verification and operations

- [ ] **06.05 Verify final live application workflows** - in-review. Owner: cxsun.
  - [x] 06.05.1 41 tests, production checks and live reads across three portals pass.
  - [x] 06.05.2a Browser verifies user edit, role create, organization create/edit, settings and portal denial.
  - [x] 06.05.2b Settings persist after server restart; footer and application name reflect saved presentation.
  - [ ] 06.05.2c Complete remaining authorized mutation and accessibility matrix.
  - [x] 06.05.2d Browser verifies profile save, declared permission label and custom-role create/edit persistence.

<!-- foundation-checklist:end -->

## Earlier task records

## Latest integrated acceptance - 2026-10-04

The local role and membership wave is implemented and reviewed. After the independent review corrections, full Cxsun verification passed with 26 tests.
Thirty direct dependency checks passed. All three portals passed live reads against the configured SQLite database.
A restored post-role backup passed the same reads in the previous wave.

Framework, Platform, UI, Tools, Governance and Email source changes remain in review until their complete release gates pass. Custom role and membership implementation is no longer pending. The app-owned artifact exporter is implemented and tested; generation from approved registry artifacts remains pending.

Recovery access, artifact helper inclusion, UI field associations and Governance smoke corrections passed affected checks and integrated verification.
Next gates include browser CRUD/accessibility, real delivery, owner release scripts, compatible artifacts, generated apps, remote CI and production operations.

## Active foundation delivery - 2026-10-04

User authorized coordinated implementation, result review, repeated corrections, verification and audit.
Authenticated cloud retrieval passed for all seven foundation owners before this wave.

| Owner                 | Tasks                      | State     | Current evidence                                                                                                         |
| --------------------- | -------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| Framework             | 02.01, 03.01-03.02, 06.01  | in-review | Six tests and release checks pass. Performance and independent consumer acceptance remain open.                          |
| Platform              | 02.02, 03.04-03.07, 06.02  | in-review | Four file-backed tests pass, including recovery-access regressions. Owner release scripts and real delivery remain open. |
| UI and Cxsun frontend | 02.03-02.04, 04.01-04.07   | in-review | 16 focused tests pass after accessibility corrections. Authenticated browser acceptance remains open.                    |
| Tools                 | 02.05, 05.02, 07.01-07.02  | in-review | 28 tests and release checks pass. Exporter helper regression passes. Registry-generated apps and upgrades remain open.   |
| Governance            | 02.06, 05.03-05.04, 06.06  | in-review | Nine tests and corrected four-tool local Worker smoke pass. Deployed guidance remains stale.                             |
| Email                 | 01.08, 02.07, 05.05, 06.07 | in-review | Build and two tests pass. Real delivery needs provider configuration. Owner release scripts remain missing.              |

The coordinator reviews actual diffs, integrates compatible artifacts and reruns affected consumer checks.
No release task is accepted solely from a subagent summary.
Publication and external operational evidence remain separate from local implementation success.

### Historical first integrated wave evidence

Cxsun verify passed with 16 tests and compiled identity acceptance.
Normal three-portal reads passed against the configured SQLite database and a restored backup copy.
Browser login/recovery checks passed. Authenticated master CRUD and accessibility checks remain open.
Platform custom role creation and membership editing remain active under03.04/04.05.
Tools generation now has safe commands. The app-owned source artifact is the next handoff.
Real email delivery, clean registry installation, remote CI, deployment/TLS, and final release remain open.

## Owner verification and plan distribution - 2026-10-04

User authorized owner verification, plan/task distribution and restoring cloud MCP connections.
Loaded continuous owner phase/task plans across packages, UIUX, addon/integration planning areas and Tools template location.
Cxsun master PLAN remains the cross-owner dependency and acceptance record.
Passed fresh Cxsun verify, packages:check and configured SQLite db:check.
Platform independent instruction retrieval now passes. Deployed repository metadata remains pending.
Platform tests use an in-memory integration database. File-backed acceptance is a required corrective task.
No identity master/settings implementation or external release was performed.

## Complete standard foundation release plan - 2026-10-04

Revised the master plan for long-term reuse, maintenance, scalability and a complete compatible release.
Added seven continuous phases and globally numbered owner tasks.
Defined identity masters, settings, list/detail/upsert actions, menus and frontend/backend integration acceptance.
Required file-backed SQLite and final normal-user verification against the configured app database.
Defined separate file-backed databases for destructive tests and prohibited in-memory release acceptance.
Required clear module ownership, practical DDD, purposeful events and consistent human-readable guidance.
User decision: review this master plan first. Split owner PLAN.md and TASK.md files after confirmation.
No owner files were distributed and no implementation agents were dispatched.

## Workspace foundation master plan - 2026-10-04

Expanded requirement coverage for security, data integrity, resilient workflows, accessibility, package safety, scaffold upgrades, and operations.
Added essential, production, and optional profiles, priorities, and requirement-to-gate mapping.
Added a separate database section and retained previous task IDs.
The master plan remains a review draft. No owner implementation or delegation started.

Refined the master backlog into separate owner and delivery sections with purpose, dependencies, and completion criteria.
Separated UIUX, email, optional services, integrations, verification, releases, scaffolding, and production operations.
Retained existing task IDs and the review gate before owner plans and implementation delegation.

Prepared agent/PLAN.md as the single draft backlog for packages, Tools, governance, addons, Cxsun, and scaffolding.
The plan defines task IDs, dependencies, acceptance gates, future subagent assignments, and coordinator review loops.
Status: awaiting user review before owner plans and implementation delegation.
Authenticated Cxsun MCP retrieval passed before documentation work.
Complete package audits remain pending. Platform governance access is an identified blocker.
No implementation subagents were assigned during this planning task.

## Shared foundation readiness review - 2026-10-04

Completed the Cxsun package wiring review and fresh npm run verify and npm run packages:check.
Business module development can start against the verified local foundation.
Platform publication, deployed MCP metadata updates, and current GitHub CI remain pending before broad reuse.
Production deployment, backup, and restore remain unverified. See AUDIT.md for evidence and limits.

Completed: connect database identity to Cxsun through shared Platform Core.

## Implementation

Installed the approved bundled @devxcrew/platform@0.1.0 development package.
Added the owned identity migration and repeatable seed to the SQLite lifecycle.
Seeded three local accounts with generated passwords saved only in ignored .env.
Replaced preview login with three database-backed login portals and authorized desks.
Added password changes, session revocation, role permissions, and trusted tenant membership.

## Verification

- Passed: authenticated live MCP retrieval before work and development startup.
- Passed: repeated migration and seed without duplicate or overwritten users.
- Passed: Platform Core three tests and build.
- Passed: Cxsun maintenance, lint, types, five tests, build, packages, and compiled HTTP identity smoke.
- Passed: durable sessions, logout, password changes, role and tenant denial, and database integrity.
- Passed: browser login for all three portals, refresh, logout, direct desk denial, and portal isolation.
- Passed: fresh browser checks captured no console errors after the React lazy-loader correction.
- Passed: normal database login, current session, and logout for each bootstrap account on port 5173.
- Partial: package publication and independent live MCP registration remain pending.
- Partial: automatic approval review blocked cleanup of the stopped audit database in ignored storage.
- Untested: deployment, proxies, backup and restore, recovery, MFA, and administration screens.

Version remains 0.1.9. No publication, commit, or push was requested.
Earlier standalone changes remain local. GitHub CI has not run for the current working tree.
## Workspace GitHub release - 2026-10-04

Release title: Deliver reusable Cxsun foundation.
Connect persisted SQLite, three identity portals, module-owned resource workflows, public provider composition, permission extensions and template rehearsal.
Update version records, review release checks, then commit and push the current owner branch.
Preserve existing task history and incomplete acceptance gates.
