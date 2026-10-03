# Verification evidence

## Passed

- Live MCP retrieval verified the foundation guide, audit/todo records, and application metadata
  where applicable.
- Release metadata checks passed.

## Untested

- New application generation was not run.

## Not applicable

- Shared package records do not imply an application login desk.

## Partial

- Existing home Ã¢â€ ’ preview login Ã¢â€ ’ desk flow is frontend-only.

## Blocked

- Shared Platform Core is absent. Authenticated user, administrator, and super-administrator desks
  are not implemented.
- MCP action approval and shared commit reservation services are absent.

## Cloud-only governance — 2026-10-03

- Passed: authenticated live instructions and required connection policy for this repository.
- Passed: local MCP endpoint rejected with exit code 1. No local guide fallback.
- Governance: seven protocol/client tests and cloud Worker checks passed.
- Cxsun: two development connection tests passed, including no process start on connection failure.
- Business features were not changed or tested. Source changes remain uncommitted.

## Live connection audit — 2026-10-03

- Passed: this repository retrieves all five cloud guidance documents with its configured app identity.
- Passed: environment secret files are ignored by Git.
- Fixed: imported clients now reject every endpoint except https://mcp.codexsun.com/mcp.
- Fixed: clients validate returned app identity and reject missing instruction content.
- Fixed: request timeout is 15 seconds. Cxsun no longer uses a two-second cloud timeout.
- Passed: official SDK initialization, five live resource reads, and all three live tools.
- Passed: missing/wrong secret, denied origin, and invalid identity HTTP checks.
- Passed: eight governance tests, two Cxsun failure tests, cloud checks, and successful live Cxsun startup.
- No current connection blocker was found. Cloud/network availability and valid secrets remain required.
- Cloud metadata is a deployment snapshot. Source changes require redeployment.
- App IDs identify caller context. The shared developer secret is not per-app authentication.
- Long-term uptime and external editor configuration were not tested. Source changes remain uncommitted.

## Live connection audit — 2026-10-03

- Passed: all six repositories retrieve five cloud guides with their configured app identities.
- Passed: environment secret files are ignored by Git.
- Fixed: imported clients reject every endpoint except https://mcp.codexsun.com/mcp.
- Fixed: clients validate returned app identity and reject missing instruction content.
- Fixed: request timeout is 15 seconds, including Cxsun development startup.
- Passed: official SDK initialization, five live resource reads, and all three live tools.
- Passed: missing/wrong secret, denied origin, and invalid identity HTTP checks.
- Passed: eight governance tests, two Cxsun failure tests, cloud checks, and successful live Cxsun startup.
- No current connection blocker was found. Network availability and valid secrets remain required.
- Cloud metadata is a deployment snapshot. Source changes require redeployment.
- App IDs identify caller context. The shared developer secret is not per-app authentication.
- Long-term uptime and external editor configuration were not tested. Source changes remain uncommitted.

## Release 0.1.7 — 2026-10-03

- Passed npm run verify: maintenance checks, lint, typechecks, three tests, production build, and production route/assets/API smoke checks.
- Passed authenticated live MCP connection, release metadata, LF, and configured-secret scans.
- Prepared commit subject: #7 - Require audited cloud MCP guidance.

## npm migration — 2026-10-03

- Passed public package preparation for Framework and UI version 0.1.7.
- Passed packed package consumption, Cxsun full verification, UIUX verification, and eight governance tests.
- npm CLI login and device authentication succeeded as devxcrew.
- Publication returned E409. Registry metadata records Framework unpublished at 2026-10-03 03:30:32 UTC and UI at 03:32:35 UTC.
- npm blocks the same package names for 24 hours. Both names should be eligible after October 4 at 09:03 IST.
- Blocked: registry publication, registry installation, and final project lockfile generation.
- Cxsun currently runs with explicitly installed local packed snapshots. Its manifest names the intended npm versions.
- Do not treat the current project lockfile as a completed registry migration.

## npm migration completion — 2026-10-03

- Passed: public @devxcrew/core-framework@0.1.7 and @devxcrew/react-ui@0.1.7 installed from npm.
- Passed: npm ci from the registry lockfile; npm audit found zero vulnerabilities.
- Passed: npm run verify (dependency boundaries, release metadata, LF, lint, frontend/backend typechecks, three tests, production build, and route/assets/API smoke checks).
- Passed: explicit local packed snapshots tested during development without changing release manifests. Registry packages are restored in the final installation.
- Passed: all project manifests and lockfiles have no shared Framework/UI file dependencies or old package names.
- Passed: UIUX local-source gallery typecheck and production build.
- Passed: updated live governance deployment and authenticated connections from all six repositories.
- Partial: the current UI flow uses preview sessions; real identity, RBAC, tenancy, and three authenticated desks remain separate foundation work.

## Live MCP access audit — 2026-10-03

- GREEN: authenticated live connection, matching repository metadata, five guidance resources, and all three MCP tools.
- Passed fresh live instruction retrieval through the project development startup hook.
- Central evidence: shared/mcp-governance/docs/mcp-access-audit.md.

## Release 0.1.9 — 2026-10-03

- Passed npm run verify and npm run packages:check.
- Passed Tools tests (21), version alignment, line-ending checks, and repository configuration review.
- GitHub CI now checks out the required sibling repositories and creates an environment file from the example.
- Authorized commit and push use github:now with no additional version bump.
