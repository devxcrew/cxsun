# Cxsun foundation master plan

Date: 2026-10-04
Status: Local foundation verification is active. Real email testing and production deployment are deferred by the user. Publication, two registry consumers and three-OS Cxsun CI passed. Browser acceptance and deployed governance stay open.
Reference app: projects/cxsun.
Goal: one complete standard foundation release, built through owner packages and verified in Cxsun.

## 1. Required outcome

Every app follows the same technical contracts and interaction patterns.
Business modules own their entities, fields, domain rules, and business processes.
Reuse public packages instead of copying shared implementation into apps.
Keep application composition small and business-neutral.
Deliver working identity administration, masters, settings, and navigation before adding business modules.
Complete the agreed release scope together. Internal phases organize delivery, not unfinished product promises.

Cxsun is a real application with live persisted data.
Remove placeholder routes, dummy lists, inactive buttons, scaffold explanations, and development-only concepts from product screens.
Show short helper text only when it helps the user complete the current task.
Tools may generate a new app from the released foundation. Generation is an internal developer operation.

## 2. Current evidence

Latest local checks: Framework seven lifecycle tests; Platform six file-backed identity tests;
UI 61 tests and compilation of 122 public export paths; Tools 32 tests including actual interrupted generation;
UIUX lint, two form tests and enforced production bundle budgets; Email two tests and package checks.
Cxsun passes 47 tests, lint, typechecks, build, compiled identity and three-portal operational reads.
Browser evidence covers user editing, custom role creation, organization creation/editing, settings,
portal denial, logout, persisted presentation after restart and profile dialog keyboard focus.
The complete mutation, supported viewport and screen-reader matrices remain open.
The local generated-consumer rehearsal uses actual packed artifacts and is separate from registry acceptance.
See agent/RELEASE-CANDIDATE.md for proposed versions, supported local limits and explicit deferrals.

Five shared packages are published under MIT. Exact registry versions and checksums are in RELEASE-PACKAGES.json.
Two fresh registry apps and two existing candidate upgrades passed with separate persisted SQLite databases.
Source and task changes are committed and pushed. The latest verified source passed three-OS CI.
Optional local package snapshots remain development tools. Normal app installation uses the exact registry graph.
Authenticated governance still serves the older preview snapshot. Deployment remains deferred.
Browser, keyboard, viewport and screen-reader acceptance remain incomplete.
See WORKFLOW-ACCEPTANCE.md for remaining browser checks.
LOCAL-SECURITY.md records tested local threat controls, actual retention and production policy gaps.

### Review priorities and dependencies

| Priority | Tasks | Required result |
| --- | --- | --- |
| 1 | 03.05, 03.07, 04.03, 04.05, 07.01 | Correct confirmed authorization, form accessibility and artifact defects. Repeat affected checks. |
| 2 | 06.03, 06.05, 06.08 | Verify authenticated browser CRUD, keyboard flows, field errors and permission denials. |
| 3 | 05.05, 06.07 | Verify an approved real email provider and invitation/recovery delivery. |
| 4 | 02.09, 06.09, 06.11 | Agree compatible versions, supported environments, clean installation and artifact provenance. |
| 5 | 06.10 | Verify deployment, TLS/proxy behavior, protected backups, recovery objectives and incident response. |
| 6 | 07.01-07.05 | Publish authorized packages and guidance, then verify two independent generated apps. |
| 7 | 07.06 | Accept the release only after every required gate has evidence. |

Do not use a passing workstation build as clean-install evidence.
Do not use local guidance tests as deployed MCP freshness evidence.
Do not accept generated apps from synthetic lockfile fixtures.
Integration adapters remain outside identity implementation scope. Their plans describe future owner boundaries only.

## 3. Architecture and maintenance standard

Use a modular monolith with practical DDD and strict module ownership.
Each capability owns its backend, frontend, schemas, persistence, events, workers, tests, and navigation metadata.
Use <module>.provider.ts as its public registration and communication boundary.
Inject public provider contracts between modules.
Use controllers for parsed request orchestration. Keep routes declarative and domain decisions in services.
Keep the app root limited to composing providers and configuration.
Do not build central business services, schemas, repositories, event handlers, or navigation implementations.

Use event-driven communication for committed domain changes that need asynchronous consumers.
Keep producer contracts and consumer handlers inside their owners.
Use synchronous contracts for immediate operations.
Use transactional outbox delivery when reliable publication must agree with a database commit.
Validate payloads at consumer entry. Verify idempotency, retries, dead-letter handling, and trusted tenant scope.
Do not add CQRS, event sourcing, brokers, or queues without a concrete requirement.

Use simple names and focused files. Keep files below 700 lines when practical.
Review 700-900 lines. Split files above 900 lines within their owner.
Use one vocabulary across source, public contracts, documentation, and product screens.
Maintain compatibility notes, deprecation rules, upgrade paths, and meaningful consumer tests.
Do not add abstractions solely for imagined future applications.

## 4. Live database acceptance

Use file-backed SQLite through the supported Kysely adapter for this foundation release.
Use the app's configured database for final normal-user browser and API acceptance.
Use separate file-backed SQLite databases for destructive, concurrency, security, and migration tests.
Never run destructive test cases against operational user data.
In-memory databases and mocked repositories cannot satisfy release acceptance.
Verify records through UI, API, and database evidence, then restart the server and verify persistence.
Migrations and seeds must be repeatable and preserve existing accounts and settings.
Use database constraints, foreign keys, transactions, appropriate indexes, and bounded lock handling.
Document SQLite concurrency and storage limits before claiming deployment scalability.
Keep future database adapters outside this release unless a selected requirement needs them.

## 5. Identity masters and settings scope

Platform Core is the package at shared/platform. Do not create a second platform-core owner.
Platform owns identity backend modules and their persistence.
Cxsun owns frontend adapters and composes public Platform contracts with shared UI.
Assess reusable frontend contracts before moving any implementation to another package.

| Capability | Required pages and actions | Security boundary |
| --- | --- | --- |
| Users | List, detail, create, edit, activate/deactivate, reset/invite action, session view | Authorized administrators, no silent self-elevation |
| Organizations | List, detail, create, edit, activate/deactivate | Explicit organization administration authority |
| Memberships | List, assign, edit roles/status, revoke | Trusted organization scope, last-admin protection |
| Roles | List, detail, create/edit supported roles, permission assignment | Protected system roles and scoped authority |
| Permissions | List, detail, authorized assignment through roles | Code-owned catalog, no arbitrary privilege creation |
| Invitations | List, issue, resend, revoke, expiry/status | Single-use token and protected delivery |
| Sessions | List permitted sessions, detail where useful, revoke selected/all | Users see their sessions, admins need explicit authority |
| Audit history | Filtered list and detail | Read-only, scoped access, sensitive values redacted |
| Profile | Read/update permitted profile fields, password change | Current verified principal |
| Organization settings | Read/edit supported organization settings | Explicit organization permission |
| Security settings | Read/edit supported session and security policy | Validated limits and administrator protection |
| Application settings | Read/edit supported branding, locale/timezone and presentation settings | App scope, allowlisted keys, no browser-exposed secrets |

List and upsert flows apply to editable masters.
Sessions, audit history, and code-owned permission catalogs use appropriate read/action flows.
Do not make immutable records editable merely to give every page an upsert form.
Define resource schemas, field specifications, permission matrices, and supported actions before implementation.
Destructive actions need confirmation, domain safeguards, and audit evidence.
Organization lifecycle must not delete live data through an accidental settings action.
Recovery, invitations, and password changes must revoke or preserve sessions according to an explicit policy.

## 6. Product navigation and workflow

Use separate user, administrator, and super-administrator desks with verified permissions.
Define the super-administrator's cross-organization scope explicitly.
Each module owns its menu entries, breadcrumbs, route labels, headings, and submenu metadata.
The shared shell renders public navigation contracts without importing private module files.
Group navigation by Identity, Organization, Settings, and Account as authorized for the current principal.
Show only relevant entries. Server authorization remains mandatory on every endpoint.
Every visible menu item must reach a working page.

Use consistent list, detail, create, edit, save, cancel, and destructive-action patterns.
Preserve filters, pagination, sorting, breadcrumbs, and return locations through URL state.
Use TanStack Form with Zod and independent server validation.
Show safe field errors and preserve entered values after failure.
Handle dirty forms, duplicate submission, expired sessions, denied access, missing records, and network failure.
Clear scoped caches and sensitive state on logout, portal changes, and tenant changes.
Use accessible controls, keyboard navigation, focus management, responsive layouts, and minimal contextual helper text.

## 7. Continuous phase and task numbering

Use the same phase and task IDs in the master plan and every owner PLAN.md and TASK.md.
Never restart numbering independently in another repository.
Retain legacy IDs as references when moving previous backlog items into these phases.
Task states: planned, ready, active, in-review, changes-required, blocked, accepted.
An accepted task has reviewed code, meaningful verification, and integration evidence.
Publication, push, and deployment require applicable user authorization.

| Phase | Purpose | Exit gate |
| --- | --- | --- |
| 01 | Baseline, governance access, ownership | Accurate capability map and successful required owner connections |
| 02 | Public contracts and full resource specifications | Agreed schemas, workflows, scope, events, compatibility |
| 03 | Backend packages and live persistence | Runtime, identity masters/settings, domain constraints and public APIs work |
| 04 | UI, navigation, and full frontend wiring | Required pages operate through real APIs and persisted data |
| 05 | Tools, governance, package integration, optional required services | Reproducible setup and accurate live guidance |
| 06 | Independent verification and operations | Security, accessibility, recovery, installation and CI evidence |
| 07 | Standard release and developer generation | Compatible released packages and independent generated apps verified |

## 8. Owner task plans

### 8.1 Framework — shared/framework

Purpose: reusable business-neutral runtime and transport.
Legacy references: C01-C03, C06-C08, F01-F07.

| ID | Work | Acceptance |
| --- | --- | --- |
| 01.01 | Audit exports, lifecycle, dependencies, evidence and owner governance | Gaps recorded with source evidence |
| 02.01 | Define provider registration, parsed requests, trusted context, API envelopes and resource contracts | No private cross-owner imports or central business implementations |
| 03.01 | Refine configuration, routing, errors, health, shutdown, limits and HTTP security hooks | Safe failures and correct resource API behavior |
| 03.02 | Define transaction, cancellation, concurrency and idempotency primitives actually needed | Retries and stale writes cannot silently corrupt state |
| 03.03 | Provide event/job transport contracts only for accepted asynchronous needs | Owner payloads, committed publication and retried consumers verified |
| 06.01 | Verify consumer integration, performance budgets and fault handling | File-backed and real HTTP integration evidence |

### 8.2 Platform Core — shared/platform

Purpose: shared identity, authorization, organization scope, masters and settings.
Legacy references: A01, C02, C07, P01-P09, DB01-DB05.

| ID | Work | Acceptance |
| --- | --- | --- |
| 01.02 | Restore owner MCP connection and audit current identity implementation | Authenticated owner guidance before source work |
| 02.02 | Specify every resource in section 5, field schemas, actions, permissions and scope | Complete frontend/backend contract matrix |
| 03.04 | Implement users, organizations, memberships, roles and permission catalog/assignment | Live SQLite lists, details and allowed upserts work |
| 03.05 | Implement sessions, invitations, recovery, audit and account/security policies | Revocation, token expiry, abuse controls and denied operations verified |
| 03.06 | Implement supported settings with versioned schemas and safe defaults | No arbitrary setting keys or exposed secrets |
| 03.07 | Refine passwords, cookies, scope, CSRF/origin protections and tenant boundaries | Direct API bypass, escalation and cross-scope access fail |
| 06.02 | Verify migrations, repeat seeds, concurrent mutations, restart persistence and audit | File-backed evidence with protected operational data |

### 8.3 Shared UI — shared/ui

Purpose: consistent reusable presentation without domain ownership.
Legacy references: U01-U04, U06-U09.

| ID | Work | Acceptance |
| --- | --- | --- |
| 01.03 | Audit public exports, design vocabulary, accessibility and browser support | Supported component inventory |
| 02.03 | Define list, detail, upsert, navigation, heading and error presentation contracts | One interaction pattern with module-owned data/actions |
| 04.01 | Refine resource views, forms, table states, filters, pagination and confirmations | Real consumer flows and accessible error feedback |
| 04.02 | Refine workspace navigation, headers, submenus and portal presentation | Public metadata drives shell without business imports |
| 04.03 | Handle responsive layout, focus, dirty forms, stale requests and minimal helper text | Usable critical flows without placeholder UI |
| 06.03 | Verify supported viewports, keyboards, accessibility and UI consumers | Automated and manual critical-flow evidence |

### 8.4 UIUX — devkits/uiux

Purpose: maintain public UI examples and design consistency.
Legacy reference: U05.

| ID | Work | Acceptance |
| --- | --- | --- |
| 01.04 | Audit examples, UI dependencies and source-development boundaries | Clear gallery capability map |
| 04.04 | Provide complete list/detail/upsert/navigation examples using public UI contracts | Examples match actual supported component behavior |
| 06.04 | Verify gallery build and interaction consistency | No advertised unsupported interactions |

### 8.5 Cxsun — projects/cxsun

Purpose: complete reference app and final integration owner.
Legacy references: X01-X06, Q02, DB tasks.

| ID | Work | Acceptance |
| --- | --- | --- |
| 01.05 | Audit current app composition, live SQLite and protected changes | Preserve existing accounts and source changes |
| 02.04 | Map Platform resources to frontend modules, routes, menus, headers and permissions | Every required resource has a complete wiring specification |
| 04.05 | Implement all authorized identity master list/detail/upsert/action pages | Frontend and backend connected to file-backed SQLite |
| 04.06 | Implement settings/account pages and role-specific sidebars/submenus | Working destinations and server-enforced access |
| 04.07 | Remove placeholder concepts, scaffold prose, dummy data and dead actions from product flows | Minimal, relevant copy and usable application screens |
| 05.01 | Integrate compatible installed packages, migrations and required delivery services | Normal setup independent of sibling source repositories |
| 06.05 | Verify final normal-user flows against configured app database and restart | UI, API and persisted records agree |

### 8.6 Tools — shared/tools

Purpose: reproducible maintenance, application lifecycle and release/generation commands.
Legacy references: T01-T07, S01-S06.

| ID | Work | Acceptance |
| --- | --- | --- |
| 01.06 | Audit scripts, compatibility checks and package lifecycle | Isolated usage gaps recorded |
| 02.05 | Define supported Node/npm/OS matrix, package upgrades and generation behavior | Public CLI contracts and overwrite policy |
| 05.02 | Refine setup, environment diagnostics, checks, build, ports and stop/restart | Preserve secrets, existing files and unrelated processes |
| 07.01 | Generate apps/modules from accepted released contracts | Unique identity/configuration, no secrets or copied databases |
| 07.02 | Verify repeat generation, interruption recovery and upgrade migration | No overwrite of app-owned business implementations |

### 8.7 MCP Governance — shared/mcp-governance

Purpose: accurate, discoverable guidance for owners and consuming agents.
Legacy references: A04, M01-M05.

| ID | Work | Acceptance |
| --- | --- | --- |
| 01.07 | Register all required owners and reconcile stale cloud snapshots | Owner guidance matches current verified capabilities |
| 02.06 | Define resource navigation by owner, topic, version and task intent | Agents can request focused contracts without ambiguous ownership |
| 05.03 | Publish concise setup, architecture, API, event, UI, database and release guidance | Human-readable documents use consistent names and tone |
| 05.04 | Add compatibility, freshness, drift and fail-closed connection diagnostics | Wrong identity, missing content and stale metadata are visible |
| 06.06 | Verify representative agent lookups and protocol failure cases | Correct owner/contracts returned for concrete tasks |

Each guide states purpose, owner, public entry point, required steps, example and verification.
Keep one authoritative shared rule. Owner records link to it instead of copying divergent standards.
Separate implemented capabilities from proposed requirements and historical evidence.

### 8.8 Email and required addons — addons/email

Purpose: delivery needed for the accepted identity lifecycle.
Legacy references: E01-E04.

| ID | Work | Acceptance |
| --- | --- | --- |
| 01.08 | Audit owner location and determine required delivery/service scope | Explicit owner and public boundary |
| 02.07 | Define email provider, template, security and failure contracts | Identity depends on a public delivery contract |
| 05.05 | Implement invitation/recovery email and required retries/status evidence | Token secrecy, delivery failure and real configured provider verified |
| 06.07 | Verify selected addon behavior and disabled configuration | Required profile works without accidental infrastructure dependency |

Files, notifications, search and cache require explicit use cases before becoming release requirements.
Selected services require scope, limits, failure handling and operational evidence.

### 8.9 Integrations — integration/frappe and integration/tally

| ID | Work | Acceptance |
| --- | --- | --- |
| 01.09 | Audit each adapter location and ownership | Capability evidence instead of assumed implementation |
| 02.08 | Define future adapter boundaries and business-owned mappings | No external-system business code leaks into the foundation |

These adapters are outside the required identity foundation implementation.
A requested integration adds its own numbered phase tasks and live verification.

### 8.10 Release, verification and operations — coordinating owners

Legacy references: Q01-Q08, R01-R04, O01-O07.

| ID | Work | Acceptance |
| --- | --- | --- |
| 02.09 | Agree release manifest, supported combinations, browser matrix and operating limits | One compatible standard release scope |
| 06.08 | Verify contracts, security, accessibility, concurrency, consumer packages and performance | Meaningful failures tested, no unresolved required blockers |
| 06.09 | Verify clean checkout, npm ci, setup, live database and remote CI | No hidden workstation state or sibling runtime requirement |
| 06.10 | Rehearse deployment, TLS/proxy behavior, backup/restore and incident response | Recovery objectives demonstrated, secrets protected |
| 06.11 | Verify supply chain, licenses, artifact contents and package provenance | Risks reviewed, no secrets or unintended source artifacts |
| 07.03 | Prepare/publish compatible package releases and update Cxsun registry lockfile | Applicable authorization, artifact integrity and final consumer checks |
| 07.04 | Update deployed MCP release contracts and supported upgrade instructions | Guidance agrees with exact released versions |
| 07.05 | Verify two independent apps generated from the release | File-backed SQLite, same workflows, distinct scopes and cross-app denial |
| 07.06 | Final coordinator acceptance and operational handover | All required tasks accepted with evidence and ownership |

## 9. Subagent execution and integration loop

### Active delivery instructions - 2026-10-04

The user authorized implementation, repeated review, verification, and audit.
Use this loop for every numbered task:

1. Confirm its dependency contracts and authenticated MCP connection.
2. Assign one owner, exact task IDs, permitted paths, and measurable acceptance checks.
3. Implement the complete behavior inside the owner.
4. Return changed files, commands, results, limitations, and consumer contract changes.
5. Review the actual changes independently.
6. Return each defect with its reproduction and expected behavior.
7. Correct the defect and repeat affected checks.
8. Integrate the tested package artifact into Cxsun.
9. Verify the browser, API, persisted data, and error paths together.
10. Record evidence in owner TASK.md and AUDIT.md before acceptance.

Task states are planned, ready, active, in-review, changes-required, blocked, and accepted.
Blocked tasks must name the missing input and the work that can continue.
Passing a build moves a task into review. It does not establish feature acceptance.
Each assignment reserves its write paths. The coordinator owns app manifests, runtime composition, migration registration, and final records.

| Wave | Owners and tasks | Required handoff |
| --- | --- | --- |
| A | Framework 02.01/03.01-03.02, Platform 02.02/03.04-03.07, UI 02.03/04.01 | Public runtime, identity, validation, and presentation contracts |
| B | Cxsun 04.05-04.07, Email 05.05, Governance 05.03-05.04 | Integrated resource flows, real delivery, accurate owner guidance |
| C | Framework/Platform/Cxsun 06.01-06.08 | Failure handling, concurrency, isolation, browser and persisted-data evidence |
| D | Coordinating owners 06.09-06.11 | Clean installation, recovery rehearsal, artifact and supply-chain audit |
| E | Tools and coordinating owners 07.01-07.06 | Compatible release, generated apps, upgrade rehearsal, final acceptance |

Use at most three worker agents. Reserve one worker slot for independent review when contracts become available.
Overall foundation acceptance requires its remaining gates. The user approved publication of the reviewed MIT packages separately; this does not accept browser or deployment readiness.
Request release approval only after the artifacts and audit results are ready for review.

Previous review corrected strict-schema creates, unsupported sorting, scope errors, and stale-write protection.
This review rechecks current authorization, accessibility, generated artifact integrity and cloud contracts.
Record each confirmed new defect and its correction in owner audits before closing its task.
Email has a tested SMTP provider contract. Real provider connection and recipient delivery remain required.
Earlier baseline tables below describe the initial inspection. Current owner TASK.md and AUDIT.md record later implementation evidence.

Owner PLAN.md and TASK.md are already loaded after the user's master review decision.
Use shared phase/task IDs, owner paths, dependencies, deliverables and acceptance evidence.
Assign at most three active subagents plus the coordinator under current session limits.
Do not allow concurrent edits to shared files, release metadata or the configured live database.
Give destructive tests their own file-backed databases and unique paths.
Each agent connects to authenticated owner MCP and reads owner records before source work.
The coordinator reviews actual diffs, runs independent relevant checks and integrates compatible artifacts into Cxsun.
Return defects with reproductions and task IDs. Repeat affected checks after corrections.
No agent summary alone establishes completion.

Dependencies follow phase order with explicit contract handoffs.
03.04-03.07 precede final 04.05-04.06 integration.
05.05 must pass before real invitation/recovery delivery is accepted. The user deferred real mail testing on 2026-10-04.
07.03 requires 06.08-06.11. 07.05 requires 07.03-07.04.
Phases can overlap only when accepted contracts and separate write ownership permit it.

## 10. Master review and owner record loading

User authorized verification and owner plan/task distribution, then authorized restoring workspace MCP access.
Owner records are now loaded with continuous master task numbering.
Complete phase dependencies before starting each implementation assignment.
Owner plans include purpose, shared IDs, inputs, tasks, checks and downstream consumers.
Owner TASK files identify the current ready task and its blockers without removing historical evidence.
Preserve existing owner records and approved user changes.
Do not edit an owner repository when its required governance connection fails.
Record blocked owners in this master plan with the exact condition.

### Historical baseline and owner record index

The following baseline describes the earlier inspection. It is not the current implementation status.
Owner plan/task distribution is complete. Current results appear in section2 and owner audits.
Framework lacks a dedicated runtime test suite and still uses sibling maintenance wrappers.
UI contains IdentityManagementDesk domain paths and field rules inside shared presentation code.
Tasks 02.03 and 04.05 must move domain decisions into the identity frontend owner and retain generic UI contracts.
UI MasterForm uses local required checks without the accepted TanStack Form and server field-error contract.
Platform is not yet an independent Git repository. Task 01.02 must establish its repository/release boundary before delivery.
Platform :memory: integration coverage must be replaced or supplemented by required file-backed release evidence.
These findings are recorded in owner audits and block the affected acceptance gates.

| Owner | PLAN.md and TASK.md location | Verification and limits |
| --- | --- | --- |
| Framework | shared/framework/agent | Release checks and build pass, generic runtime APIs and runtime tests still need refinement |
| Platform Core | shared/platform/agent | Independent MCP, three tests and build pass, integration test uses memory and does not meet file-backed acceptance |
| UI | shared/ui/agent | Owner audit and available checks recorded locally, dedicated typecheck/test coverage needs work |
| UIUX | devkits/uiux/agent | Gallery verification recorded locally, intentional sibling source dependency remains |
| Tools | shared/tools/agent | Release checks and 21 tests pass, generation commands remain planned |
| MCP Governance | shared/mcp-governance/agent | Verification and nine tests pass, source Platform registration not deployed |
| Cxsun | projects/cxsun/agent | Full verify, 48 package checks and configured SQLite connection pass |
| Email | addons/email/agent | Previously empty directory, planning records only, owner execution setup pending |
| Frappe | integration/frappe/agent | Previously empty directory, planning records only, future business integration scope |
| Tally | integration/tally/agent | Previously empty directory, planning records only, future business integration scope |
| Developer template | template/cxnew/agent | Previously empty directory, planning records only, Tools controls generation |

Other app roots passed their existing cloud connection commands: billing, crm, qcafe, ecommerce and intergrid.
Veyrezio's connection command delegates to its configured Intergrid project. It does not prove independent Veyrezio registration.
Other app feature implementation remains outside this foundation program.

## 11. Release completion

### Required evidence matrix

| Gate | Evidence and owner |
| --- | --- |
| Identity security | Platform: portal/app/tenant isolation, role changes during sessions and token use, CSRF/origin failures, throttling and safe error responses. |
| Account policy | Platform: password/session revocation rules, recovery expiry and single use. Record the explicit MFA decision before acceptance. |
| Data integrity | Platform/Cxsun: migration history, repeated seeds, stale writes, concurrent writers, restart persistence and safe rollback refusal. |
| Browser workflows | Cxsun/UI: all authorized lists, details and mutations, query-state navigation, dirty forms, disabled actions, expiry and network errors. |
| Accessibility | UI/Cxsun: labels, linked errors, keyboard operation, focus after navigation/dialogs, contrast and responsive supported viewports. |
| Privacy | Platform/Cxsun: retention, audit redaction, log contents, protected backup storage and scoped export/deletion policy. |
| Performance | Framework/UIUX/Cxsun: agreed response and bundle budgets, representative dataset, SQLite writer limits and timeout/load evidence. |
| Delivery | Email/Platform: real configured TLS provider, approved recipient, failures, token secrecy and explicit retry/status behavior. |
| Reproducibility | Tools/Cxsun: clean isolated install, supported Node/npm/OS matrix, no sibling runtime dependency, exact artifacts and remote CI. |
| Supply chain | Package owners: licenses, dependency risks, package contents, provenance, compatible versions and upgrade notes. |
| Operations | Cxsun: deployment/TLS/proxy checks, shutdown, readiness, disk limits, off-host backups and demonstrated recovery objectives. |
| Guidance | Governance: source and deployed versions distinguished, correct owner discovery, supported versions and truthful freshness diagnostics. |
| Generation | Tools/Cxsun: two registry-installed apps, unique identities, separate SQLite files, cross-app denial and safe module extension/upgrades. |

Each gate records its command or procedure, date, environment, result, limitation and owner task ID.
When a check fails, keep the task changes-required until correction and repeated verification.
When external input is missing, record that input and continue independent work.

Complete means all required identity master/settings pages, public APIs and navigation work through live persisted data.
All required package contracts, operating procedures, docs and release artifacts agree.
The standard release installs independently, upgrades safely and passes common acceptance checks.
Cxsun's operational database and disposable file-backed test evidence prove persistence and isolation.
Required release tasks cannot be deferred merely to declare the foundation complete.
Business development starts from the accepted release and follows the same module-owned pattern.

## Task checkbox tracking

Use [owner phase checklist](TASK.md) for current checkboxes and numbered substeps.
Use [master checklist](D:/codexsun/projects/cxsun/agent/CHECKLIST.md) for all owners and shared release gates.
Keep task IDs unchanged. Check a parent only after all its acceptance criteria pass.

Release scope, proposed versions and operating limits: [release candidate](RELEASE-CANDIDATE.md).
Deferred email testing remains unchecked and explicitly labeled deferred, rather than passed.

## Historical integration checkpoint before publication

This checkpoint predates the registry release. Current status is in section 2.

Cxsun has persisted SQLite identity, three portals, administration resources, scoped custom roles, memberships, and settings.
Fresh verification passed with 26 tests after this audit's corrections. Production and compiled identity checks passed.
Three-portal reads passed against the operational database and a restored post-role backup in the previous wave.
Framework, UI, and Tools currently use unpublished local development snapshots during integration.
Their registry lockfile versions do not yet provide all required new exports and contracts.
Platform and Email use bundled development artifacts. No compatible standard release has been published.
Current changes remain uncommitted. Remote CI and independent clean-install acceptance remain open.
Fresh authenticated owner MCP retrieval is required and recorded for this review.
Deployed MCP guidance still describes the older preview foundation. Source metadata does not establish cloud freshness.
Platform and Email deployed repository metadata remain incomplete.
Current owner audits record code findings, commands, limitations, and acceptance states.
