# Foundation plan

Updated: 2026-10-05.

Framework owns generic database and settings infrastructure.
Platform owns identity and the separate tenant module.
Cxsun connects both through public package exports and recorded development snapshots.
Its master uses MariaDB. The initial tenant has separate storage.

## Completed

- Extract database drivers, leased pools, execution, transfers and backups into Framework.
- Extract settings file handling into an isolated Framework provider.
- Extract tenant mappings, scope, request transport, provisioning and tests into Platform.
- Preserve Cxsun's schema, seed composition and nine master migration IDs.
- Connect Cxsun through locally packed shared packages.

## Next work

1. Release new Framework and Platform versions when publication is authorized.
2. Replace development snapshots with those exact registry versions after consumer verification.
3. Connect other apps through the released public contracts.
4. Verify deployment account privileges, TLS, load budgets and network recovery.

Keep business modules and their migrations inside their owning applications.
Verification evidence belongs in TASK.md and AUDIT.md.
