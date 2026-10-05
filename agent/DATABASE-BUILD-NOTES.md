# Database build notes

Purpose: capture the database features Cxsun needs, how to build them, and why
each pattern matters. These are design notes, not implementation or release
acceptance.

## 1. Database features Cxsun needs

| Feature | What it provides | Why Cxsun needs it |
| --- | --- | --- |
| Configuration | Named master and tenant connections, validated driver settings, server-only credentials | Prevents accidental connection to the wrong database and silent fallback |
| Provider and lifecycle | One public owner that creates connections, exposes safe operations, checks readiness, and closes resources | Gives modules one stable boundary and makes startup and shutdown predictable |
| Driver support | Driver-owned connection, dialect, compatibility, and backup code | Keeps engine differences out of identity and feature modules |
| Schema and migrations | Ordered, repeatable schema changes with preserved migration history | Makes fresh installs and upgrades consistent and reviewable |
| Repositories and queries | Module-owned data access using parameterized queries and typed results | Keeps persistence inside its owner and reduces injection and coupling risks |
| Transactions and constraints | Atomic multi-step writes, foreign keys, uniqueness, and other database rules | Prevents partial updates and protects data when concurrent requests run |
| Seeding | Safe, repeatable setup for master tenancy and later identity bootstrap | Establishes the initial tenant without overwriting existing users or settings |
| Backup and recovery | Consistent backups, integrity checks, and isolated restore rehearsal | Shows that data can be recovered, not only copied |
| Operations and diagnostics | Connection status, migration status, safe errors, and query timing | Helps diagnose failures without exposing credentials or sensitive data |
| Tenant isolation | Trusted tenant resolution and scoped reads and writes | Prevents one tenant from reading or changing another tenant's data |

## 2. How to build it

| Step | Build work | Acceptance evidence |
| --- | --- | --- |
| 1. Decide the database model | Confirm master engine, tenant storage model, existing-data transition, and which owner controls each schema | Written decision that matches runtime configuration and preserves operational data |
| 2. Define configuration | Parse required environment values by driver, validate names and ranges, keep secrets server-side, reject incomplete settings | Invalid settings fail clearly; no implicit engine or tenant fallback |
| 3. Build the provider | Lazily create named connections, expose typed query/transaction access, readiness checks, and close lifecycle | Startup verifies the configured database; shutdown closes it; repeated access reuses the intended connection |
| 4. Isolate drivers | Put each driver's config, dialect, SQL compatibility, and backup support in its driver folder | Driver differences do not leak into Platform identity or feature code |
| 5. Add migrations | Keep ordered owner migrations and migration history; make repeat runs safe; support a clear upgrade path | Fresh database and existing-data upgrade both pass for each supported driver |
| 6. Add repositories and transactions | Let each module own queries and repository contracts; parameterize values; transact related changes | Constraints, rollback, concurrent writes, and permission checks behave correctly |
| 7. Seed in safe stages | Create master tenancy first, then identity roles/permissions and approved bootstrap accounts | Repeated seed preserves existing tenant identity, users, credentials, and settings |
| 8. Add recovery operations | Create non-overwriting backups, verify integrity, and restore into an isolated target | Restored data matches expected state and the app can read it |
| 9. Prove tenant boundaries | Resolve tenant only from trusted host or validated selection and authenticated membership; scope every access | Two tenant fixtures prove reads, writes, sessions, and permissions cannot cross |

Keep shared database composition business-neutral. Keep identity and tenancy
schema ownership with Platform. Feature modules must use public provider
contracts and keep private persistence code in their own module. Follow the
canonical backend files from live `governance://code-standard` for business
modules. Do not create placeholder layers that have no behavior.

## 3. Patterns from Laravel and NestJS

| Pattern | Laravel | NestJS | Cxsun application |
| --- | --- | --- | --- |
| Service registration | Providers bind services in `register`; `boot` attaches behavior after bindings are available | A module registers a database client or ORM as an injectable provider | Register one app-owned database provider at composition; keep startup hooks explicit |
| Connection access | Named connection manager; query builder and ORM use configured connections | Database-agnostic; inject raw client or use an integration such as TypeORM, Drizzle, Prisma, Sequelize, or Mongoose | Expose typed connection contracts; feature code does not instantiate drivers |
| Schema lifecycle | Migrations and seeders are framework-managed | Depends on the selected ORM/tool; module can provide migrations and configuration | Keep migration history, owner migrations, repeatability, and upgrade checks explicit |
| Data consistency | Transaction APIs and query builder support parameter binding and row locks | Transaction behavior depends on the selected database library | Use explicit transactions, database constraints, parameterized values, and tested concurrency rules |
| Testing | Framework database tools support database-focused tests | Injected providers make database integrations replaceable in tests | Use disposable file-backed databases for persistence evidence; mocks alone are insufficient |

The useful shared idea is dependency injection around a clear connection
boundary. Laravel's provider lifecycle and integrated migration/query tools are
reference patterns. NestJS shows that the application can choose an ORM or a
lower-level client. Cxsun should keep its own contracts and module ownership
instead of copying framework-specific decorators or APIs.

## 4. Current Cxsun decision to resolve

The multi-tenant plan says SQLite is the current runtime and engine selection is
pending. The current uncommitted `.env.example` selects MariaDB, and the current
source has MariaDB and SQLite driver paths with MariaDB as the default. Reconcile
the plan, environment contract, and operational data transition before treating
MariaDB as selected or changing identity storage. Source support alone is not
engine acceptance.

Before enabling multi-tenant login, accept the configured master connection,
fresh and repeat migrations, tenancy-first seed, backup and restore, and
two-tenant isolation. A master connection alone does not prove tenant isolation.

## References

- [Laravel service providers](https://laravel.com/docs/13.x/providers)
- [Laravel database connections and transactions](https://laravel.com/docs/13.x/database)
- [Laravel migrations](https://laravel.com/docs/13.x/migrations)
- [NestJS database overview](https://docs.nestjs.com/data/overview)
- [NestJS database techniques](https://docs.nestjs.com/techniques/database)
