# Database execution and test contract

## Module ownership

Each business module owns its input/output Zod schemas, repositories, ordering,
authorization and domain rules. Database infrastructure supplies connections,
validated execution and transaction mechanics. It does not authorize a tenant.
Choose the identity-authorized tenant before querying its database. Never accept
raw table names, SQL, paths, sort expressions or database names from a browser.

## Persistence and fetch format

Use `provider.masterData.persist(schema, input, write)` for validated writes. Validation
runs before opening the transaction. Use strict module schemas to reject unknown
fields. The callback receives a Kysely transaction and parsed data. Bind values;
do not concatenate SQL. Validate domain invariants inside the same transaction.

Use `provider.masterData.fetch({ page, pageSize }, read, outputSchema)` for bounded reads, with a mandatory owner output schema. The result is
{ data, meta: { page, pageSize } }. Oversized callback results are rejected. Page starts
at 1; page size is 1–500. Apply stable ordering with a unique tie-breaker in the
owner repository. This helper bounds the requested size; the callback must apply
its limit and offset; oversized returned arrays are rejected. Use owner-controlled keyset pagination for large scans.
Do not fetch entire tables for browser responses.

Use explicit DTOs: named fields, null for missing nullable values, UTC ISO strings
for API timestamps, decimal strings for money and integers above JavaScript safe
precision. Keep binary values in binary storage or explicit encoded DTO fields.
Never serialize password hashes, tokens or connection credentials. Engine storage
and API DTOs can differ; the owner maps and validates them explicitly.

## Transfers and transactions

`provider.masterData.transfer(schema, source, write, batchSize)` consumes an iterable
or asynchronous iterable and holds at most one batch (default 100, maximum 500).
Every record is validated before its batch is written. One transaction covers the
whole transfer: invalid rows, duplicate constraints, source errors and write errors
roll back all batches. Empty sources perform no writes. Callbacks must use the
supplied transaction, avoid retaining batches and avoid external side effects.

Memory is bounded only when the source and callback stream too. A long atomic
transaction still consumes engine log, lock and disk resources. Production-scale
imports need measured limits; resumable committed chunks require a separate
owner-defined checkpoint and idempotency contract. Atomic transfers accept signal, timeoutMs and maxRows. Write callbacks receive
the signal; use execute({ signal, inflightQueryAbortStrategy: "kill session" }) for
MariaDB work that must interrupt in-flight statements. SQLite synchronous work is
still bounded by its engine busy timeout, not a preemptive JavaScript interrupt.
No automatic retries are used.
The SQLite source importer now streams one row at a time, transfers only explicitly
allowed owner tables and verifies primary-key matches and total counts in the
destination transaction. Migration metadata, sessions and throttles are excluded.

## Commands and startup

- `npm run test:database`: isolated database test suite.
- `npm run test:database:mariadb`: opt-in tests in a fresh temporary MariaDB database, removed afterward.
- `npm run db:smoke`: read-only configured master and migration readiness.
- `npm run check`: repository tests, lint, types and tooling.

Development all/API targets run database smoke after live governance and before
port reclaim or server spawn. Frontend-only development does not need the database.
Smoke never migrates, seeds, imports, restores or writes test records. A failure
stops backend startup and points to db:smoke. The subprocess has a 20-second bound.
Missing migrations require an explicit db:migrate command.

## Coverage and limits

Tests cover invalid input, unknown fields, pagination boundaries, Unicode, SQL
literal values, large strings, restart persistence, transaction rollback, an empty
transfer, a 10,000-row bounded transfer and late transfer failures. Existing suites
cover connection lifecycle, concurrent SQLite writers, backup integrity, request
context isolation and MariaDB SQL translation. Live MariaDB smoke is a separate
read-only check. The opt-in MariaDB suite verifies a 10,000-row transfer, Unicode,
pagination, validation, duplicate rollback, migrations and reopen persistence
in an isolated database. Distributed network partitions, crash recovery, cross-database atomicity and unbounded data volume are not proven
by this suite. Full identity acceptance is recorded separately.

## Resumable transfers

provider.masterTransfers.run({ jobId, sourceSha256, batchSize }, schema,
sourceFromCursor, write, signal) commits each validated batch and its checkpoint
in one transaction. The source fingerprint is SHA-256 supplied by the trusted
owner; it must identify immutable ordered input. The source factory starts at the
persisted cursor. A partial failure preserves earlier committed batches. Resume
with the same job ID and fingerprint; a changed fingerprint is rejected.
Optimistic cursor/version updates roll back competing checkpoint changes.
A callback must not make external side effects. This contract covers one target
database; it does not pretend cross-database writes are atomic.

Tenant-scoped equivalents are current().data and current().transfers. They never
select the master implicitly. Tenant tests use two actual SQLite databases and
verify isolation, mapping changes, disabled mappings, concurrent contexts and
single-client denial. The compiled identity suite exercises the tenant HTTP route
with real session cookies for all three portals and rejects foreign tenant headers.

Live MariaDB tests run in a separate temporary database and include deadlock
rollback, killed-connection recovery, in-flight cancellation and streaming import
verification. Backup/restore is verified separately for both master and tenant.
The tests do not prove unlimited throughput or real distributed-network recovery.
Use deployment-specific load measurements and fault injection before scaling.

Use npm run test:database:stress for the isolated 100,000-row MariaDB transfer
measurement. Reported heap growth is sampled process heap, not a complete RSS or
engine memory profile. These measurements describe this machine and workload.

## Extracted package checks

Run npm test in Framework for engine and settings tests.
Run npm test in Platform for identity and tenant owner tests.
Run npm run verify in Cxsun for app composition, build and compiled identity acceptance.
Run npm run test:tenant in Cxsun for the installed public package isolation check.
Run npm run test:foundation:standalone for a clean installation without shared source dependencies.
The live MariaDB suite remains an explicit app command. The default app suite skips it.
