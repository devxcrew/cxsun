# Remaining workspace work

Date: 2026-10-04
Scope: all 14 Git repositories, the Cxsun foundation, template planning, and Frappe/Tally planning.

## Completion update - 2026-10-04

Five MIT packages are published with verified registry checksums. Cxsun passes 47 tests, compiled identity resource acceptance, three live SQLite portals and three-OS CI. Two independently generated registry apps pass installation, full verification, separate persisted databases and cross-app session denial.

The current checklist has 21 accepted parents, 33 open parents and 34 open substeps. Open work includes browser interaction/accessibility, future release upgrades and integration scope, deployed governance, and deferred SMTP/production acceptance. Earlier inventory counts below are historical. Use TASK.md and CHECKLIST.md for current checkboxes.

Latest template verification passed two fresh registry apps from ca2425d, with 44 application tests each and 52 matching source files per app.
The existing 21 accepted/33 pending parent split is unchanged. Browser and deferred external acceptance remain the next gates.

## Earlier inventory

All 14 repositories have version records, changelogs, committed source, and matching GitHub branches.
That delivery does not complete foundation acceptance.

The master checklist contains 54 parent tasks: 8 accepted and 46 open.
It contains 48 unchecked substeps. These are recorded counts, not 48 missing implementations.
Some entries combine completed local work with an incomplete release or production gate.

Authenticated cloud guidance retrieval passed for all 14 owners during this inventory.
The cloud still returns the deployment snapshot generated at 2026-10-03T05:58:28.638Z.
Its Cxsun metadata reports 0.1.9, while current Git source is 0.2.0.

Registry metadata currently reports 0.1.7 for Framework, UI, and Tools.
Current source versions are Framework 0.1.8, UI 0.2.0, and Tools 0.1.8.
Cxsun CI failed at its published Tools dependency check.
Local verification uses prepared development artifacts and passed 41 tests in the release audit.
This inventory did not rerun implementation tests or browser acceptance.

## Status meanings

- Ready now: local preparation, review, or verification can proceed with existing source and infrastructure.
- Needs a decision: prepare the result now, then resolve the named product, support, or distribution choice.
- Depends on release: finish upstream publication before claiming registry consumer acceptance.
- Deferred: the user postponed real SMTP testing and production deployment.
- Later scope: an integration or business capability needs a defined use case.

## Recommended order

| Order | Work | Owners and task IDs | Can proceed now? | Completion evidence |
| --- | --- | --- | --- | --- |
| 1 | Reconcile task records against the latest audits and Git delivery | All owners | Yes | Current headings distinguish accepted local work, release blockers, and historical evidence |
| 2 | Complete authenticated identity resource and settings browser acceptance | Cxsun, Platform: 02.04, 03.04, 03.06, 04.05, 04.06, 06.05 | Yes, on the supported local profile | Allowed actions succeed, forbidden actions fail, changes survive SQLite restart, and URL state survives navigation |
| 3 | Complete accessibility, shared component, and gallery interaction acceptance | UI, UIUX, Cxsun: 02.03, 04.01-04.04, 04.07, 06.03-06.04 | Yes | Keyboard, focus, dialogs, field errors, supported viewports, direct routes, and contextual copy verified |
| 4 | Finalize local security, resource, delivery, and concurrency policies | Framework, Platform, Email, Cxsun: 03.02, 02.07, 02.09, 06.08 | Prepare now; policy choices need review | Written operation matrix, cancellation responsibilities, token timeout/retry policy, retention scope, and measured local budgets |
| 5 | Define supported runtime matrix and complete cross-platform release checks | Tools and template: 02.05, 05.02 | Prepare now; agree supported platforms | Accepted Node/npm/OS matrix with actual CI evidence for every claimed platform |
| 6 | Prepare compatible artifacts, license review, provenance, migration notes, and exact release manifest | Coordination and package owners: 06.11, 07.03 | Prepare now; distribution rights need a decision | Reviewed tarballs, exact versions, dependency integrity, public exports, and upgrade instructions |
| 7 | Publish approved packages, update consumer manifests/locks, and restore isolated Cxsun CI | Coordination and Cxsun: 05.01, 06.01, 06.09, 07.03 | After artifact review and explicit npm publication approval | Clean registry-only installation, startup, live SQLite, and passing CI on the exact release |
| 8 | Generate two independent apps and verify upgrades | Tools, template, Cxsun: 07.01, 07.02, 07.05 | Local preparation now; final acceptance after order 7 | Separate registry installs, app IDs, databases, secrets, ports, cross-app denial, and preserved app-owned modules |
| 9 | Refresh and deploy accepted MCP guidance and metadata | Governance: 01.07, 02.06, 05.03, 05.04, 06.06, 07.04 | Source preparation now; deployment remains deferred | Live discovery, exact versions, owner registration, freshness, and safe failure behavior |
| 10 | Accept the supported local foundation profile and document remaining production gates | Coordination: 07.06 | After the applicable local and release gates | Signed-off evidence matrix with no unresolved required local gate and no claim of production acceptance |

Keep the existing global task IDs. The order above groups dependencies without replacing owner plans.

## Detailed local work

### Cxsun and Platform

- Complete the portal/resource/action matrix for users, organizations, memberships, roles, permission catalogs, sessions, invitations, and audit views.
- Verify only supported mutations. Read-only catalogs and audit records do not need artificial upserts.
- Cover list filters, pagination, sorting, direct detail/create/edit links, invalid links, refresh, breadcrumbs, and Back/Forward.
- Cover duplicate input, field errors, stale revisions, canceled requests, denied roles, tenant boundaries, and safe network failures.
- Verify account, password, app/organization settings, logout, session expiry, and role changes.
- Review every menu destination, header, submenu, and contextual helper message.
- Use disposable persisted SQLite for destructive tests. Verify approved normal reads against the configured live database.
- Do not claim complete browser acceptance from passing server tests.

### UI and UIUX

- Complete keyboard navigation, focus return, confirmation dialogs, error announcements, contrast, and supported viewport checks.
- Verify shared filters, loading/empty/error states, repeat-submit protection, and responsive navigation.
- Complete UIUX example interactions and direct route behavior.
- Accept the measured bundle budgets for the supported gallery profile.
- Verify independently installed UI artifacts after publication.

### Framework and local policy

- Accept which owner controls transactions, optimistic concurrency, cancellation, and idempotency for each current consumer.
- Confirm supported resource response and field-error contracts.
- Define local security and privacy assumptions, retention behavior, and performance workloads.
- Keep asynchronous transport excluded until a real consumer requires it.
- Do not turn conditional framework service ideas into mandatory foundation tasks.

### Tools and template

- Agree supported Node/npm versions, operating systems, and upgrade behavior.
- Complete the Linux/macOS evidence matrix before advertising support.
- Review exact release artifact contents and generated setup instructions.
- Verify upgrades with released dependencies and two independent generated consumers after publication.
- Preserve app-owned modules and reject unsafe in-place generation or overwrite behavior.

### Email without real SMTP testing

- Resolve timeout ambiguity, possible remote delivery before timeout, retry behavior, and token usability.
- Prepare consistent invitation/recovery failure guidance with Platform.
- Review distribution rights and publication prerequisites.
- Keep real SMTP connection and recipient acceptance deferred.

## Record corrections required

These are documentation reconciliation tasks, not new missing implementations.

| Owner | Stale or conflicting record | Current evidence |
| --- | --- | --- |
| All owners | Historical text says local, uncommitted, or no remote | The GitHub source release was committed and pushed |
| Cxsun | Several current headings still say 26 or 39 tests | Latest release verification passed 41 tests |
| Framework | Earlier plan says no tests and no startup deadline | Runtime tests and bounded startup are recorded as passed |
| Platform | Earlier records say no remote or missing release scripts | Independent GitHub delivery and release checks exist |
| UI | Parent checkbox still bundles missing export/component coverage | Audit records 122 public export paths and 61 tests; browser and registry acceptance remain open |
| UIUX | Parent checkbox still bundles lint/tests/budgets as incomplete | Audit records lint, two form tests, build, and bundle budgets passed; browser and released UI acceptance remain open |
| Email | Earlier records say no commit/remote and missing maintenance | Initial source release and owner maintenance checks exist |
| Billing, CRM, Ecommerce, Qcafe | Task records say revised CI has not run | GitHub release CI passed |
| Veyrezio | Fresh-chat acceptance is checked while the note describes fixture coverage | Real fresh-project creation remains unverified in its PLAN and AUDIT |
| Template | Historical baseline says directory is empty | Planning records and a Cxsun-owned exporter exist; a published starter artifact remains incomplete |

Update summaries and split combined checkboxes before marking parent tasks accepted.
Preserve old evidence under dated historical headings.

## Release and infrastructure blockers

### Package release

The GitHub source delivery does not update npm.
Cxsun still locks registry 0.1.7 for Framework, UI, and Tools.
Its latest CI run fails because published Tools rejects the public Platform schema type import.
Do not bypass isolated app CI with sibling source checkouts.

Prepare the complete release artifact first.
Tools AGENTS.md requires fresh explicit npm publication approval after the starter artifact is reviewable.
The previous commit/push authorization does not grant that publication approval.

### Distribution rights

Email declares UNLICENSED.
Other foundation manifests do not provide a uniform explicit distribution license field.
Review actual license files and dependency rights before selecting or changing package licenses.
A public GitHub repository does not establish reuse rights for every dependency or source file.

### Governance

Cloud guidance is reachable, but its snapshot is stale.
Source-only discovery and registrations are not deployed evidence.
Preparation can proceed now.
Deployment and live contract acceptance remain deferred in current owner records.

### GitHub CI coverage

Framework, UI, UIUX, Email, and Veyrezio had no Actions run for this source delivery.
Inspect existing workflows and add appropriate continuous verification where absent.
Local checks are evidence, but they do not replace clean checkout CI.
Define each owner's supported runtime before adding an operating-system matrix.

## User-deferred work

- Real SMTP provider configuration, approved recipients, invitation/recovery delivery, and actual transport failure acceptance.
- Production host, TLS/proxy behavior, production cookie/account/MFA policy, and deployed operating limits.
- Encrypted off-host backup, disk limits, recovery objectives, incident procedures, and operational restore acceptance.
- Governance deployment and live freshness acceptance are also marked deferred in existing foundation records.

Keep deferred tasks unchecked.
A local foundation can be accepted only with a clearly stated local profile.
It must not be described as production-ready while these gates remain open.

## Other application backlogs

| Repository | Remaining work | Can proceed now? |
| --- | --- | --- |
| Billing | Replace preview sessions with Platform identity, three portals, RBAC and tenancy | Plan migration now; adopt the accepted foundation after registry release |
| CRM | Replace preview sessions with Platform identity, three portals, RBAC and tenancy | Same dependency |
| Ecommerce | Replace preview sessions with Platform identity, three portals, RBAC and tenancy | Same dependency |
| Qcafe | Replace preview sessions with Platform identity, three portals, RBAC and tenancy | Same dependency |
| Intergrid | Verify Lab and Remix acceptance, add persistent Asset storage and owner tests, connect Platform identity | Module acceptance planning now; persistent business work needs its approved capability scope |
| Veyrezio | Real fresh-project chat acceptance, desktop project selection/restart, profile-owned line-ending rules, project evidence policy and non-npm adapters | Local coordination improvements can proceed; live Antigravity proof needs the disposable project and operator environment |

Intergrid's current source is on agent5/shell.
Integration into main is a separate branch review decision.
Business features in Billing, CRM, Ecommerce, Qcafe, and Intergrid need their own module requirements.

## Planning-only integration areas

Frappe and Tally share tasks 01.09.2 and 02.08.2.
Confirm ownership and document adapter contracts only when their use cases are approved.
They have no executable package owner or independent MCP identity in the current planning records.
They are not prerequisites for Cxsun identity foundation acceptance.

template/cxnew shares the Tools generation tasks.
Cxsun owns the current artifact exporter. Tools owns app:create and generation safety.
Do not build a second overlapping template implementation.

## Unchecked master substeps

The following 48 entries are copied from the master checklist.
They preserve task IDs and include combined or stale acceptance steps described above.

  - [ ] 01.07.3 Refresh deployed snapshot and verify Platform and Email metadata. Deferred by user.
  - [ ] 01.09.2 Accept adapter ownership inventory without claiming implementation.
  - [ ] 02.02.3 Production account/MFA policy acceptance - deferred by user.
  - [ ] 02.03.2 Accept all-export consumer compilation and interaction contracts.
  - [ ] 02.04.2 Verify full role/resource/action matrix in authenticated browser.
  - [ ] 02.05.2 Accept Node/npm/OS matrix and upgrade behavior.
  - [ ] 02.05.3 Verify Linux/macOS runtime matrix in CI.
  - [ ] 02.06.3 Verify deployed focused discovery. Production deployment deferred by user.
  - [ ] 02.07.2 Accept timeout, retry and token usability policy with Platform.
  - [ ] 02.08.2 Document public adapter contracts when integration scope is approved.
  - [ ] 02.09.2 Approve exact versions, browser/OS support, budgets and release manifest.
  - [ ] 03.01.4 Production proxy/security and failure operations - deferred by user.
  - [ ] 03.02.2 Accept consumer transaction, idempotency and cancellation responsibilities.
  - [ ] 03.04.2 Verify all authorized master flows in Cxsun browser and accept resource matrix.
  - [ ] 03.05.2 Verify real lifecycle delivery and approved retry/account policy.
  - [ ] 03.06.2 Verify settings browser flows and final supported settings matrix.
  - [ ] 03.07.3 Production MFA/account-policy and cookie/proxy acceptance - deferred by user.
  - [ ] 04.01.2 Verify reusable filters, confirmations and component behavior coverage.
  - [ ] 04.02.2 Verify keyboard, focus and responsive navigation.
  - [ ] 04.03.2 Verify keyboard, screen reader, dialogs, contrast and supported viewports.
  - [ ] 04.04.3 Complete browser interaction acceptance of the examples.
  - [ ] 04.05.2 Verify authenticated create/edit/detail/delete and permission denial in browser.
  - [ ] 04.06.2 Verify settings persistence, logout, expiry and role-specific navigation in browser.
  - [ ] 04.07.2 Review every visible destination and final contextual copy.
  - [ ] 05.01.2b Verify independent registry installation.
  - [ ] 05.02.3 Verify cross-platform matrix and released consumers.
  - [ ] 05.03.3 Deploy accepted guidance and verify live contracts. Deferred by user.
  - [ ] 05.04.3 Verify deployed incompatible-version contract after production deployment.
  - [ ] 05.05.2 Configure approved provider and recipient, verify real delivery and failure/retry handling. Deferred by user.
  - [ ] 06.01.4 Independent registry consumer - coordinated release gate.
  - [ ] 06.01.5 Production performance and proxy operations - deferred by user.
  - [ ] 06.02.7 Final production operational acceptance - deferred by user.
  - [ ] 06.03.2 Add all-export/component coverage and complete browser accessibility matrix.
  - [ ] 06.04.2 Accept gallery interaction, lint/behavior and entry/deferred budgets.
  - [ ] 06.05.2c Complete remaining authorized mutation and accessibility matrix.
  - [ ] 06.06.3 Verify deployed discovery and refreshed provenance. Deferred by user.
  - [ ] 06.07.2 Verify actual TLS provider connection and recipient lifecycle delivery. Deferred by user.
  - [ ] 06.07.4 Select distribution license and approve initial package publication.
  - [ ] 06.08.2 Accept threat, privacy/retention, accessibility and performance matrices.
  - [ ] 06.09.2 Verify isolated npm ci, setup, live SQLite and remote CI from exact release.
  - [ ] 06.10.2 Verify TLS/proxy, off-host backup, disk limits, recovery objectives and incident procedure.
  - [ ] 06.11.2b Resolve distribution licensing and verify coordinated release provenance.
  - [ ] 07.01.2 Build approved registry artifact and verify generated application installation.
  - [ ] 07.02.3 Verify released package upgrades with two independent generated apps.
  - [ ] 07.03.2 Prepare exact versions and artifacts, obtain applicable approval and publish, then verify consumer lockfile.
  - [ ] 07.04.2 Deploy authorized compatible snapshot and verify exact released versions live.
  - [ ] 07.05.2 Verify registry installs, distinct app identities, separate SQLite and cross-app denial.
  - [ ] 07.06.2 Accept every required gate, hand over operations and authorize business-module start.

## Sources

- [Master checklist](CHECKLIST.md)
- [Master plan](PLAN.md)
- [Current audit](AUDIT.md)
- [Release candidate](RELEASE-CANDIDATE.md)
- [GitHub source release](GITHUB-RELEASE.md)
- Each owner's agent/PLAN.md, TASK.md, TODOS.md, AUDIT.md, and CHANGELOG.md

This inventory changes no implementation, published package, deployment, or master acceptance checkbox.

