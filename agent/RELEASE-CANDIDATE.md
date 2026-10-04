# Foundation release candidate

Date: 2026-10-04
Status: local acceptance and package preparation. No package publication or cloud deployment.

## GitHub source release versions

| Owner | Source version | Compatibility note |
| --- | --- | --- |
| Framework | 0.1.8 | Additive lifecycle, request context and transport contracts. |
| Platform | 0.1.1 | Identity package, public browser schemas and GitHub delivery records. |
| UI | 0.2.0 | Removes legacy domain exports. Apps must use their own identity module. |
| Tools | 0.1.8 | Adds explicit artifact generation and safe diagnostics. |
| Email | 0.1.0 | Initial TLS SMTP provider. Real delivery is deferred by the user. |
| Governance | 0.1.4 | Adds focused guidance discovery and updated owner snapshots. |
| Cxsun | 0.2.0 | Authenticated identity reference app replacing the preview flow. |

The manifests now use these versions for the authorized GitHub source delivery.
Npm publication and registry consumer acceptance remain open.
Source snapshots with the same version as published packages are development artifacts, not compatible registry evidence.
UI removal requires the minor version change shown above.

## Supported local profile

- One Node server, React frontend and persisted SQLite on a writable local disk.
- Node 26.10.0 or newer and npm 12.2.0 or newer for Cxsun.
- Windows is the current verified development environment. Remote Linux CI remains a separate gate.
- Separate user, administrator and super-administrator portals with scoped server sessions.
- Password authentication, server origin checks, role/tenant/app isolation and revision checks.
- No business modules, external ERP adapters or generic queues in this release profile.
- Public provider contracts own communication. Immediate operations remain synchronous.

MFA, privacy retention and production account policy remain explicit acceptance decisions in the Platform security profile.
Do not advertise unsupported authentication or automatic retention capabilities.

## Local regression budgets

- Platform list/count regression: 1,000 synthetic persisted users, five reads, each below 1,000 ms.
- The current measured Platform maximum was 16.6 ms. This measures the local fixture, not deployment capacity.
- Cxsun handler deadline: 20 seconds. Receive timeout: 15 seconds. Header timeout: 10 seconds.
- Cxsun shutdown drain: eight seconds before connection closure, ten seconds before process termination.
- SQLite writer waits: five seconds. Multi-process tests must preserve all committed writes.
- UIUX bundle budgets and measured assets are recorded in its owner audit.

## Package and generation acceptance

1. Complete owner release checks and review tarball contents.
2. Record exact direct dependency versions, integrity values and license metadata.
3. Prepare coordinated version changes and upgrade notes.
4. Obtain applicable publication approval after artifacts are reviewable.
5. Publish compatible packages and create an exact registry lockfile.
6. Export the approved Cxsun artifact and generate two independent apps.
7. Verify each clean installation, live database, unique identity and cross-app denial.
8. Update live governance and verify its actual deployed metadata and tools.

Tools AGENTS.md requires fresh explicit npm publication approval while the full starter app is prepared.
Local packaging, dry runs and test fixtures do not satisfy publication or independent registry installation.

## User-deferred work

Real email provider and recipient delivery testing is deferred by the user's instruction on 2026-10-04.
Local configuration, validation, disabled behavior and package checks remain required.
Do not mark real invitation/recovery delivery passed. It remains outside the current execution scope until resumed.
The user selected local foundation first and deferred production deployment on the same date.
External host, TLS/proxy, encrypted off-host recovery and production account/retention policy acceptance remain deferred and unchecked.
These deferrals change the current execution scope. They do not establish production readiness.

## External operating gates

Remote CI, deployment target, TLS/proxy behavior, encrypted off-host backups and recovery objectives need actual operating evidence.
The local SQLite backup and restore rehearsal does not prove those external conditions.
Preserve their unchecked task entries until the required environment is available and verified.
