# Foundation task checklist

## Current release boundary

The local foundation profile is under final integration verification.
Real mail testing and production deployment are deferred by the user.
Package publication, registry-only consumers and three-OS Cxsun CI passed. Browser acceptance and deployed governance remain open.
Live governance still reports the 2026-10-03 snapshot and lacks focused discovery.
A fresh local governance snapshot does not update the deployed server.
Use [module extension contracts](MODULE-EXTENSIONS.md) for adding owned capabilities.
The checklist does not claim all 54 parent tasks are complete.

Updated: 2026-10-04. Source: current owner audits and the coordinator integration audit.

- [x] means the stated step has recorded evidence.
- [ ] means the step still needs work or acceptance.

A parent stays unchecked until its complete acceptance criteria pass. Checked substeps show verified progress.
States: accepted, in-review, planned, deferred by user. Real email testing and production deployment are deferred by user. Package publication passed. Deployed governance still requires separate release acceptance.
Evidence: each owner's agent/AUDIT.md. Full dependencies and acceptance: the master agent/PLAN.md.

## Phase 01 - Baseline and ownership

- [x] **01.01 Audit Framework exports, lifecycle and ownership** - accepted. Owner: framework.
  - [x] 01.01.1 Authenticated audit and runtime gaps recorded.
- [x] **01.02 Establish Platform owner and baseline** - accepted. Owner: platform.
  - [x] 01.02.1 Independent MCP and local Git boundary verified.
- [x] **01.03 Audit UI exports and domain ownership** - accepted. Owner: ui.
  - [x] 01.03.1 Public inventory and ownership findings recorded.
- [x] **01.04 Audit gallery and dependency boundaries** - accepted. Owner: uiux.
  - [x] 01.04.1 Gallery build and source-development boundary reviewed.
- [x] **01.05 Audit app composition and live SQLite** - accepted. Owner: cxsun.
  - [x] 01.05.1 Operational database and protected source changes reviewed.
- [x] **01.06 Audit CLI and package lifecycle** - accepted. Owner: tools.
  - [x] 01.06.1 Supported commands and reproducibility gaps recorded.
- [ ] **01.07 Register owners and reconcile deployed metadata** - in-review. Owner: governance.
  - [x] 01.07.1 Source owner registrations and authenticated retrieval verified.
  - [x] 01.07.2 Prepare fresh local snapshot with 13 owners and five guides.
  - [ ] 01.07.3 Refresh deployed snapshot and verify Platform and Email metadata. Deferred by user.
- [x] **01.08 Establish Email owner and delivery scope** - accepted. Owner: email.
  - [x] 01.08.1 SMTP owner, public boundary and local Git repository established.
- [x] **01.09 Audit Frappe and Tally scope and ownership** - accepted. Owner: integrations.
  - [x] 01.09.1 Planning-only directories and future integration scope recorded.
  - [x] 01.09.2 Accept adapter ownership inventory without claiming implementation.

## Phase 02 - Public contracts and release scope

- [x] **02.01 Define runtime and transport public contracts** - accepted. Owner: framework.
  - [x] 02.01.1 Provider composition, context, errors and parsing implemented.
  - [x] 02.01.2 Startup timeout contract and compatibility notes verified locally.
- [ ] **02.02 Define identity resource and permission contracts** - in-review. Owner: platform.
  - [x] 02.02.1 Schemas, resource APIs and scoped custom roles implemented.
  - [x] 02.02.2 Supported local resource/action matrix and password-only policy documented from actual providers.
  - [ ] 02.02.3 Production account/MFA policy acceptance - deferred by user.
  - [x] 02.02.4 Register app-qualified module permission declarations through a public provider, without automatic grants.
- [ ] **02.03 Define shared resource presentation contracts** - in-review. Owner: ui.
  - [x] 02.03.1 Generic resource views and module-owned domain boundaries implemented.
  - [x] 02.03.2a Accept compilation of all 122 public exports.
  - [ ] 02.03.2b Accept browser interaction contracts.
- [ ] **02.04 Map resources to frontend routes and navigation** - in-review. Owner: cxsun.
  - [x] 02.04.1 Identity routes, schemas, menus and resource specifications implemented.
  - [ ] 02.04.2 Verify full role/resource/action matrix in authenticated browser.
  - [x] 02.04.3 Compose owner frontend/backend providers through neutral route and navigation contracts.
- [x] **02.05 Define generation and supported runtime contracts** - accepted. Owner: tools, template.
  - [x] 02.05.1 Explicit artifact manifest, tokens and overwrite policy implemented.
  - [x] 02.05.2 Accept Node/npm/OS matrix and upgrade behavior.
  - [x] 02.05.3 Verify Linux/macOS runtime matrix in CI.
- [ ] **02.06 Define focused guidance discovery contracts** - in-review. Owner: governance.
  - [x] 02.06.1 Owner/topic/version discovery and failure tests pass.
  - [x] 02.06.2 Verify authenticated freshness diagnostic reports actual deployment drift.
  - [ ] 02.06.3 Verify deployed focused discovery. Production deployment deferred by user.
- [x] **02.07 Define public delivery and failure contracts** - accepted. Owner: email.
  - [x] 02.07.1 TLS transport, validation, timeouts and safe errors implemented.
  - [x] 02.07.2 Accept timeout, retry and token usability policy with Platform.
- [ ] **02.08 Define future integration boundaries** - planned. Owner: integrations.
  - [x] 02.08.1 Future adapters excluded from identity implementation.
  - [ ] 02.08.2 Document public adapter contracts when integration scope is approved.
- [ ] **02.09 Agree compatible release and operating limits** - planned. Owner: coordination.
  - [x] 02.09.1 Master release requirements and evidence matrix recorded.
  - [x] 02.09.2a Approve exact package versions, Node/npm target, three-OS source checks, local budgets and registry manifest.
  - [ ] 02.09.2b Complete supported browser interaction acceptance.

## Phase 03 - Backend and live persistence

- [ ] **03.01 Refine HTTP runtime, health and shutdown** - in-review. Owner: framework.
  - [x] 03.01.1 Seven runtime tests cover safe errors, readiness and deadlines.
  - [x] 03.01.2 Startup deadline, cancellation and failed-start cleanup verified locally.
  - [ ] 03.01.4 Production proxy/security and failure operations - deferred by user.
- [x] **03.02 Refine cancellation and concurrency primitives** - accepted. Owner: framework.
  - [x] 03.02.1 Request cancellation and bounded lifecycle behavior tested.
  - [x] 03.02.2 Accept consumer transaction, idempotency and cancellation responsibilities.
- [x] **03.03 Provide transport for accepted asynchronous needs** - accepted for current local scope. Owner: framework.
  - [x] 03.03.1 Synchronous ownership retained where no asynchronous consumer is required.
  - [x] 03.03.2 No current consumer requires asynchronous transport. Explicit not-required decision recorded.
- [ ] **03.04 Implement identity masters and role assignment** - in-review. Owner: platform.
  - [x] 03.04.1 Users, organizations, memberships and scoped custom roles work in file-backed tests.
  - [ ] 03.04.2 Verify all authorized master flows in Cxsun browser and accept resource matrix.
- [ ] **03.05 Implement sessions, invitations, recovery and audit** - in-review. Owner: platform.
  - [x] 03.05.1 Token rules, recovery role revalidation, revocation and audit tests pass.
  - [ ] 03.05.2 Verify real lifecycle delivery and approved retry/account policy.
- [ ] **03.06 Implement organization, app and security settings** - in-review. Owner: platform.
  - [x] 03.06.1 Typed settings, revision conflicts and presentation effects tested.
  - [ ] 03.06.2 Verify settings browser flows and final supported settings matrix.
- [ ] **03.07 Harden authentication and scope boundaries** - in-review. Owner: platform.
  - [x] 03.07.1 Origin, portal/app/tenant scope and role-loss recovery regressions pass.
  - [x] 03.07.2 Local threat review and password-only supported profile documented. MFA is not implemented.
  - [ ] 03.07.3 Production MFA/account-policy and cookie/proxy acceptance - deferred by user.

## Phase 04 - UI and frontend workflows

- [ ] **04.01 Refine generic list, detail and form presentation** - in-review. Owner: ui.
  - [x] 04.01.1 Resource headers, tables and feedback consumed by Cxsun.
  - [ ] 04.01.2 Verify reusable filters, confirmations and component behavior coverage.
- [ ] **04.02 Refine workspace navigation and portal presentation** - in-review. Owner: ui.
  - [x] 04.02.1 Module navigation metadata and three portal shells integrated.
  - [ ] 04.02.2 Verify keyboard, focus and responsive navigation.
- [ ] **04.03 Refine accessibility and interaction failure states** - in-review. Owner: ui.
  - [x] 04.03.1 Linked field errors and unsupported provider action removal completed.
  - [ ] 04.03.2 Verify keyboard, screen reader, dialogs, contrast and supported viewports.
- [ ] **04.04 Provide complete public UI examples** - in-review. Owner: uiux.
  - [x] 04.04.1 Resource presentation example and gallery build pass.
  - [x] 04.04.2 Add public TanStack Form/Zod and linked safe save-field-error examples.
  - [ ] 04.04.3 Complete browser interaction acceptance of the examples.
- [ ] **04.05 Connect identity master pages to APIs** - in-review. Owner: cxsun.
  - [x] 04.05.1 Lists, forms, custom roles and membership actions pass contract tests.
  - [ ] 04.05.2 Verify authenticated create/edit/detail/delete and permission denial in browser.
- [ ] **04.06 Connect account, settings and role navigation** - in-review. Owner: cxsun.
  - [x] 04.06.1 Profile, password, settings and scoped menus implemented.
  - [ ] 04.06.2 Verify settings persistence, logout, expiry and role-specific navigation in browser.
- [ ] **04.07 Remove inactive product concepts and scaffold copy** - in-review. Owner: cxsun.
  - [x] 04.07.1 Preview flow replaced and inactive provider actions removed.
  - [x] 04.07.2a Audit source destinations, supported actions, headings and contextual copy.
  - [ ] 04.07.2b Accept every visible destination and contextual copy in the authenticated browser.

## Phase 05 - Tools, guidance and delivery

- [x] **05.01 Integrate compatible packages and persistence** - accepted. Owner: cxsun.
  - [x] 05.01.1 Local snapshots, bundled Platform/Email and SQLite migrations integrated.
  - [x] 05.01.2a Safe startup stage diagnostics verified in compiled runtime.
  - [x] 05.01.2b Verify independent registry installation.
- [x] **05.02 Refine setup, diagnostics and lifecycle commands** - accepted. Owner: tools.
  - [x] 05.02.1 32 Tools tests cover safe paths, ports, boundaries and generation.
  - [x] 05.02.2 Verify actual killed-process interruption and complete retry.
  - [x] 05.02.3 Verify cross-platform matrix and released consumers.
- [ ] **05.03 Publish clear and accurate shared guidance** - in-review. Owner: governance.
  - [x] 05.03.1 Source guides revised and duplicated UIUX guidance corrected.
  - [x] 05.03.2 Verify fresh local Worker snapshot, types, smoke and deployment dry run.
  - [ ] 05.03.3 Deploy accepted guidance and verify live contracts. Deferred by user.
- [ ] **05.04 Add compatibility and drift diagnostics** - in-review. Owner: governance.
  - [x] 05.04.1 Source discovery validates repository/version metadata.
  - [x] 05.04.2 Verify live missing discovery and stale snapshot diagnostic.
  - [ ] 05.04.3 Verify deployed incompatible-version contract after production deployment.
- [ ] **05.05 Deliver identity invitation and recovery messages** - deferred by user. Owner: email.
  - [x] 05.05.1 Email provider wired through public Platform delivery contract.
  - [ ] 05.05.2 Configure approved provider and recipient, verify real delivery and failure/retry handling. Deferred by user.

## Phase 06 - Verification and operations

- [ ] **06.01 Verify runtime consumers and performance** - in-review. Owner: framework.
  - [x] 06.01.1 Seven HTTP/lifecycle tests and Cxsun integration checks pass.
  - [x] 06.01.2 Startup fault and 30-second default lifecycle budget verified.
  - [x] 06.01.4 Independent registry consumer - coordinated release gate.
  - [ ] 06.01.5 Production performance and proxy operations - deferred by user.
- [ ] **06.02 Verify persistence, mutations and security** - in-review. Owner: platform.
  - [x] 06.02.1 Six file-backed identity tests cover restart, scope and recovery regressions.
  - [x] 06.02.2 Concurrent invitation/recovery single-claim and expired-token regressions pass.
  - [ ] 06.02.7 Final production operational acceptance - deferred by user.
- [ ] **06.03 Verify UI consumers and accessibility** - in-review. Owner: ui.
  - [x] 06.03.1 UI release checks and Cxsun accessibility markup regression pass.
  - [x] 06.03.2a Verify all public exports and local component coverage.
  - [ ] 06.03.2b Complete interactive browser accessibility matrix.
- [ ] **06.04 Verify gallery interactions and performance** - in-review. Owner: uiux.
  - [x] 06.04.1 Typecheck and production build pass.
  - [x] 06.04.2a Accept gallery lint, form tests and JavaScript/CSS budgets.
  - [ ] 06.04.2b Accept interactive gallery behavior and accessibility.
  - [x] 06.04.2c Verify Windows, Linux and macOS source-gallery CI.
  - [x] 06.04.2d Verify published UI consumption through isolated registry installation and full gallery verification.
- [ ] **06.05 Verify final live application workflows** - in-review. Owner: cxsun.
  - [x] 06.05.1 47 tests, production checks and live reads across three portals pass.
  - [x] 06.05.2a Browser verifies user edit, role create, organization create/edit, settings and portal denial.
  - [x] 06.05.2b Settings persist after server restart; footer and application name reflect saved presentation.
  - [ ] 06.05.2c Complete remaining authorized mutation and accessibility matrix.
  - [x] 06.05.2d Browser verifies profile save, declared permission label and custom-role create/edit persistence.
- [ ] **06.06 Verify discovery and protocol failures** - in-review. Owner: governance.
  - [x] 06.06.1 Nine tests and corrected four-tool local Worker smoke pass.
  - [x] 06.06.2 Verify local cloud:check, fresh snapshot and authenticated drift result.
  - [ ] 06.06.3 Verify deployed discovery and refreshed provenance. Deferred by user.
- [ ] **06.07 Verify provider and disabled delivery profile** - deferred by user. Owner: email.
  - [x] 06.07.1 Two configuration tests, build and truthful disabled behavior pass.
  - [ ] 06.07.2 Verify actual TLS provider connection and recipient lifecycle delivery. Deferred by user.
  - [x] 06.07.3 Verify standalone maintenance, version alignment, LF and five-file release artifact.
  - [x] 06.07.4 Select distribution license and approve initial package publication.
- [ ] **06.08 Complete security and performance acceptance** - in-review. Owner: coordination.
  - [x] 06.08.1 Independent review corrections and SQLite multi-writer test pass.
  - [x] 06.08.2a Verify local threat controls and document actual retention and measured operating limits.
  - [ ] 06.08.2b Complete browser accessibility and interaction acceptance.
  - [ ] 06.08.2c Accept production retention/account policies and workload capacity. Deferred by user.
- [x] **06.09 Verify clean setup and remote CI** - accepted. Owner: coordination.
  - [x] 06.09.1 Local integration passes with explicit development artifacts.
  - [x] 06.09.2 Verify isolated npm ci, setup, live SQLite and remote CI from exact release.
- [ ] **06.10 Verify operations and disaster recovery** - in-review. Owner: coordination.
  - [x] 06.10.1 WAL-consistent backup and restored-copy portal reads pass.
  - [ ] 06.10.2 Verify TLS/proxy, off-host backup, disk limits, recovery objectives and incident procedure.
- [x] **06.11 Audit artifacts and supply chain** - accepted. Owner: coordination.
  - [x] 06.11.1 Dependency boundary checks and reviewed artifact allowlists pass.
  - [x] 06.11.2a Platform/Email release scripts and package contents verified.
  - [x] 06.11.2b Resolve MIT licensing and record actual archive checksums.
  - [x] 06.11.2c Verify all five registry releases against approved archive checksums.

## Phase 07 - Release and app generation

- [x] **07.01 Generate apps from accepted released contracts** - accepted. Owner: tools, template.
  - [x] 07.01.1 Safe app:create and exporter with three regression tests implemented.
  - [x] 07.01.2 Build approved registry artifact and verify generated application installation.
- [x] **07.02 Verify generation safety and upgrades** - accepted. Owner: tools, template.
  - [x] 07.02.1 Existing destination and private artifact rejection tests pass.
  - [x] 07.02.2 Verify killed-process interruption, rejected in-place upgrades and preservation of app-owned modules.
  - [x] 07.02.3 Verify two existing candidates against the released registry graph; preserve owned source, configuration and SQLite schema/rows. Future releases require their own migration verification.
- [x] **07.03 Prepare and publish compatible packages** - accepted. Owner: coordination.
  - [x] 07.03.1 Required package release boundaries and UI breaking change identified.
  - [x] 07.03.2 Prepare exact versions and artifacts, obtain applicable approval and publish, then verify consumer lockfile.
- [ ] **07.04 Release live MCP contracts and upgrade guidance** - planned. Owner: coordination.
  - [x] 07.04.1 Source guidance and discovery changes prepared.
  - [ ] 07.04.2 Deploy authorized compatible snapshot and verify exact released versions live.
- [x] **07.05 Verify two independent generated apps** - accepted. Owner: coordination, template.
  - [x] 07.05.1 Generation acceptance requirements recorded.
  - [x] 07.05.2 Verify registry installs, distinct app identities, separate SQLite and cross-app denial.
  - [x] 07.05.3 Prove a disposable diagnostic module extension without private imports or identity-table writes.
  - [x] 07.05.4 Verify two clean local packed-artifact installs, separate SQLite and cross-app session denial.
  - [x] 07.05.5 Reverify two fresh registry apps with latest workflow/security source, 44 tests each and exact generated source comparison.
- [ ] **07.06 Accept complete standard foundation release** - planned. Owner: coordination.
  - [x] 07.06.1 Coordinator audit and remaining gates documented.
  - [ ] 07.06.2 Accept every required gate, hand over operations and authorize business-module start.
