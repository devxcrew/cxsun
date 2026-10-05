# Foundation review

Date: 2026-10-05.

This is the earlier review snapshot. Use [Shared alignment](SHARED-ALIGNMENT.md) for the newer verification and remaining gaps.
Scope: Cxsun, Framework, Platform, UI, Tools, MCP Governance, Email, UIUX, and the four available sibling project apps.
This is a review of current source, installed packages, live guidance, and recorded verification.
No package install, release, deployment, or application migration ran during this review.

## Current conclusion

Cxsun has a working authenticated local foundation. The workspace does not yet have one accepted foundation release across all consumers.
Parallel corrections reached different source versions. Those source changes are not automatically present in installed npm packages.
Keep the current working baseline while accepting each package change through its public contracts.

## Confirmed gaps

| Priority | Gap | Evidence | Next action |
| --- | --- | --- | --- |
| 1 | Source and consumed package versions differ. | Cxsun uses Framework 0.1.8, Platform 0.1.2, UI 0.2.0, Tools 0.1.8, and Email 0.1.0. Their owner sources are 0.1.9, 0.1.5, 0.2.1, 0.1.9, and 0.1.1. | Review the actual owner changes. Select and verify one compatible package set before consumer migration. |
| 1 | Live governance is stale. | Authenticated retrieval succeeds, but the snapshot is dated October 3. It reports Cxsun 0.1.9, calls Cxsun a preview flow, and names the superseded packages. | Prepare and accept a fresh snapshot. Deploy within release authorization, then verify the live resources. |
| 1 | Existing apps do not share Cxsun's identity foundation. | Billing, CRM, QCafe, and Ecommerce use sessionStorage preview sessions and do not consume Platform. | Migrate each app to the accepted authenticated foundation while preserving its app identity and isolation. |
| 1 | The newest Platform refactor is not an accepted consumer release. | Platform has modified, deleted, and new identity files in its working tree. Cxsun still installs Platform 0.1.2. | Finish the owner review, verify the package archive, then verify Cxsun against that exact artifact. |
| 2 | The Framework API contract is not fully aligned. | The new API client reads error.message and error.fields. The resource standard uses message and errors. Provider lookup uses string names and unknown values. | Keep temporary error compatibility, align the public response shape, and type provider communication. |
| 2 | Current upgrade acceptance is incomplete. | Fresh 0.2.3 consumers passed. Older-fixture installation repeatedly stalled and was stopped before verification. | Diagnose the isolated installer once. Verify declared import migration and preservation of source, configuration, schema, and rows. |
| 2 | Browser acceptance is partial. | Identity flow and selected mutations passed. The full resource, denial, pagination, settings, screen-reader, password, and revoke-dialog matrix remains incomplete. | Close the remaining cases in TASK.md using isolated persisted fixtures. |
| 2 | Active records disagree. | TASK has old completion sections. Owner plans retain obsolete master task IDs. FOUNDATION-RELEASE uses a 0.2.1 release ID. Current acceptance is split across several receipts. | Keep historical evidence. Add one current status and compatibility record tied to an exact commit and lock hash. |
| 3 | Production acceptance is deferred. | Real email delivery, deployed proxy/TLS behavior, account policy, retention, protected backup recovery, and deployment capacity lack complete acceptance. | Accept these before production use. They do not block local foundation development. |

Billing already references Framework 0.1.9 while the other inspected apps use 0.1.8.
Version differences can be intentional. The gap is missing acceptance of the selected combination, not unequal numbers alone.
The registry availability of newer owner versions was not checked in this review.

## Governance and inventory details

The governance source now mandates controller files for every backend module. The live standard still describes optional controllers.
This source change was inspected as an unpublished correction, not used as fallback guidance.
Resolve the rule before deployment. Preserve practical DDD and avoid unused infrastructure layers.

The governance source registers Intergrid and Veyrezio, but neither project directory exists in the inspected workspace.
Confirm their current locations or inventory status before rebuilding the snapshot.
UIUX intentionally uses shared UI source. Its sibling preinstall is a source-gallery workflow, not proof of standalone app setup.

## Verification boundaries

Passed during this review:

- Authenticated live MCP retrieval for all twelve inspected repositories.
- Cxsun's 30 installed direct package and lockfile checks.
- Current Platform source: six test cases and TypeScript build.
- Core file-size inspection. One Platform integration test has 792 lines. No inspected core implementation exceeded 900 lines.

Earlier verified evidence reviewed:

- Cxsun 0.2.3: 48 tests, lint, types, build, and compiled production identity checks.
- Two fresh 0.2.3 registry consumers: full verification, database setup, three portals, and cross-app session denial.
- Selected browser checks recorded in AUDIT.md.

Not repeated here: full workspace tests, browser matrix, clean installations, remote CI, package publication, SMTP, and production deployment.
Passing connection proves access to guidance. It does not prove that guidance is current or that an app implements it.

## Recommended order

1. Freeze one reviewed source snapshot and reconcile current records.
2. Accept the corrected Platform and Framework contracts through exact package artifacts.
3. Verify Cxsun and complete its upgrade and browser checks.
4. Refresh live governance after the accepted package set is known.
5. Migrate each preview app and verify its own three portals and database isolation.
6. Complete production acceptance before deploying identity for real users.

Do not restart the scaffold or add business modules to close these gaps.
