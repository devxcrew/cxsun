# Database package integration

Framework owns the database provider in shared/framework/src/modules/database.
The provider supports SQLite and MariaDB through module-owned drivers.
Platform owns identity and tenancy. Framework does not depend on Platform or an app.

## Public contracts

| Contract | Purpose |
| --- | --- |
| createDatabaseProvider<Schema>(environment, options) | Create an isolated provider with owner migrations and an optional seed callback. |
| DatabaseInfrastructureSchema | Describe application metadata and transfer checkpoint tables. |
| DatabaseExecution<Schema> | Validate writes and response DTOs, bound page sizes and run atomic transfers. |
| ResumableTransfer<Schema> | Commit each data batch with its source-bound checkpoint. |
| withConnection(target, work) | Lease a validated target connection during the work. |
| provisionConnection(target) | Create storage and apply generic infrastructure migrations. |
| backupConnection / checkConnectionBackup | Dispatch backup and recovery checks to the selected driver. |
| SqliteDataTransfer | Stream an explicit owner table allowlist into MariaDB. |
| createSettingsProvider(options) | Read and update environment files without process-global state. |

Each caller supplies its complete schema type and migration list.
Framework creates infrastructure tables only by default. It never seeds identity or selects a tenant.
Callbacks keep domain rules and owner queries inside their modules.

## Cxsun composition

The app database provider supplies its nine historical migrations and Platform identity seeder.
The app CLI supplies the identity import allowlist and refuses populated identity destinations.
The app readiness check combines master engine readiness with Platform tenant readiness.
The app settings file contains app defaults, validation and writable keys. Framework owns file handling.

masterData and masterTransfers operate on the master explicitly.
Authenticated module work uses Platform tenant.current().data and transfers.
No tenant request silently falls back to the master.

## Operations and limits

Run db:migrate before seed or server startup. Existing migration names and data remain unchanged.
Run db:smoke for read-only checks. Development preflight calls the app smoke command before port reclaim.
Frontend-only development does not require database readiness.

DB_POOL_CACHE_LIMIT defaults to 16. DB_POOL_IDLE_MS defaults to 300000.
Idle eviction runs during later acquisition. Active leases cannot be evicted.
A changed mapping retires its old connection after active work finishes.

Atomic transfers roll back all batches on failure. Resumable transfers retain committed chunks and resume from their checkpoints.
MariaDB query cancellation requires the documented signal and kill-session options on owner queries.
SQLite synchronous work cannot be preempted by JavaScript cancellation.

See DATABASE-TESTING.md for tested behavior and remaining production limits.
