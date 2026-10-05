# Reserved-port preflight verification

## Result - 2026-10-05

All five project apps passed two consecutive development starts.
Every second start replaced the listener and passed readiness on the same port.

| App | Port | First PID | Replacement PID | Readiness |
| --- | --- | --- | --- | --- |
| Cxsun | 5173 | 6816 | 38668 | 200 |
| Billing | 5174 | 36264 | 23256 | 200 |
| CRM | 5175 | 114788 | 40860 | 200 |
| QCafe | 5176 | 30204 | 33176 | 200 |
| Ecommerce | 5177 | 11880 | 42148 | 200 |

## Lifecycle

1. Retrieve authenticated live governance.
2. Verify the app repository, host, reserved port and matching URL.
3. Identify the existing listener and verify application ownership.
4. Stop the app supervisor and descendants.
5. Wait for port release, then start on the same host and port.

All five environment examples and local environments explicitly set
`DEVXCREW_DEV_PORT_POLICY=restart`. Installed Tools 0.1.8 supports this setting.
Tools source now defaults to restart for single-server apps. This source default
is not yet published to npm. An explicit abort policy remains available.
Foreign listeners are preserved. Production does not reclaim an occupied port.

## New apps and live governance

Installed Tools generated an independent app with restart policy, app ID
port-proof, port 5199 and its matching URL. The generated fixture was not started.

The updated app-setup resource was deployed to https://mcp.codexsun.com/mcp.
Authenticated retrieval confirmed the restart policy, fixed-port rule and
consecutive-start requirement. Cloud drift reports an aligned snapshot.
All five apps passed fresh strict MCP connection checks after deployment.

Tools release checks passed with 32 tests, including foreign-listener protection.
Governance verification, cloud protocol checks, deployment dry run, deployment
and live resource verification passed. Cxsun remains running on port 5173.
Other verification app processes were stopped. PIDs above describe the test run.

Evidence: `.cache/port-restart-results.json`, `.cache/port-restart-check.log`,
`.cache/port-template-results.json`, Tools `.cache-port-check.log`,
and Governance `.cache-port-cloud-check.log`, `.cache-port-deploy.log`
and `.cache-port-drift.log`.

No npm publication, version bump, commit or push was performed in this task.
