# Cxsun tasks

## Package reference cleanup - 2026-10-05

- [x] Retrieve authenticated cloud governance.
- [x] Remove superseded package identifiers from source, fixtures and current documents.
- [x] Use Framework and UI names consistently.
- [x] Scan repository files for remaining superseded identifiers.

Static cleanup only. No test suite, publication or deployment ran in this step.


Updated: 2026-10-05.
Status: phases 1 and 2 are in progress. See AUDIT.md for current evidence and limits.

## 1. Package migration

Root verification and both fresh registry consumers passed. See AUDIT.md and PHASE12-GENERATED-CONSUMERS.json.

- [ ] Resolve the stalled older-fixture install and repeat its upgrade check. Fresh registry consumers already pass.

## 2. Browser acceptance

Public/login/desk flows, profile edits, organization creation, application settings, query navigation,
expiry redirects, mobile navigation, and focus return passed in an isolated fixture. See AUDIT.md.

- [ ] Complete resource mutations and denial combinations for each portal.
- [ ] Complete role, membership, organization, and security settings browser checks.
- [ ] Complete pagination, breadcrumb, and invalid-link browser checks.
- [ ] Complete session-revoke confirmation with an available dialog tool.
- [ ] Complete browser password change with user interaction.
- [ ] Complete real screen-reader and the remaining viewport checks.

## 3. Live governance

- [ ] Retrieve authenticated live guidance and verify current repository and package metadata.
- [ ] Confirm the deployed guidance and discovery tools match the accepted foundation.

## 4. Release acceptance

- [ ] Align release records and repeat required checks, including the current remote CI matrix.
- [ ] Record passed, failed, blocked, partial, and untested results in AUDIT.md.
- [ ] Commit and push the reviewed changes only when authorized.

## Deferred

- [ ] Verify real SMTP invitation and recovery delivery when resumed.
- [ ] Verify production TLS/proxy, account policy, load limits, protected backups, and recovery when resumed.

Do not mark a task complete from older release evidence. Link new verification evidence before removing completed tasks.

## Dependency alignment - 2026-10-05

- [x] Align consumed shared packages and common direct dependency versions.
- [x] Install dependencies with lifecycle scripts disabled.
- [x] Keep app dependency ownership and public peer ranges.
- [x] Exclude Veyrezio from this change.

Source version: 0.2.2. Published package archives retain their existing versions.
The baseline is recorded in projects/cxsun/agent/DEPENDENCY-BASELINE.json.
