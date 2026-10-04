# Local foundation security and retention

Date: 2026-10-04.
Scope: Cxsun with Platform 0.1.2, Framework 0.1.8 and persisted SQLite.
This record describes implemented controls and their limits. It is not production acceptance.

## Supported local profile

- One Node server uses a local persisted SQLite file.
- HTTP identity origins must use a loopback host. External identity origins require HTTPS.
- Each app has its own ID, database, environment secrets and portal cookies.
- Platform owns authentication, authorization, identity SQL and token lifecycle rules.
- The application owns the database connection and neutral provider composition.
- The local operator controls operating-system access to configuration, SQLite and backup files.

## Threat and evidence matrix

| Threat | Implemented control | Acceptance evidence and limit |
| --- | --- | --- |
| Anonymous or wrong-portal access | Server-managed sessions and portal/app scope | Compiled three-portal checks and generated cross-app denial passed |
| Cross-organization access | Membership checks, trusted tenant scope and scoped resource queries | Compiled foreign-organization and role-denial checks passed |
| Stolen or stale browser authority | HttpOnly, SameSite=Strict cookies and current membership/permission lookup | Loopback cookie flags and logout/password revocation passed. HTTPS/proxy acceptance is deferred |
| Cross-origin mutation | Unsafe identity requests require the configured Origin | Compiled untrusted-origin denial passed |
| Repeated credential guesses | Persistent account/address counters | Ten failed account attempts return 401. The next returns 429, including after server restart |
| Unsafe input or stale updates | Independent Zod schemas, bound queries and expected revisions | Malformed input, unknown privileged fields and revision conflict checks passed |
| Credential disclosure in JSON | Safe resource projections and errors | Compiled responses reject known passwords/session tokens, password hashes, internal hash fields and stack fields |
| Cached identity responses | Cache-Control: no-store and X-Content-Type-Options: nosniff | Compiled response checks cover known portal API requests, including error responses |
| Concurrent lifecycle claims | Platform transactions and one-use token claims | Prior file-backed Platform concurrency/expiry regressions passed. Actual delivery remains deferred |
| Local disk or backup disclosure | Operator-controlled file access | SQLite and backups are not encrypted by this app. OS access and off-host encryption require separate acceptance |

The account throttle also uses an address-wide limit of 100 attempts within its persisted 15-minute counter window.
This phase verifies the account limit. It does not claim new address-limit or distributed proxy evidence.
Password authentication is supported. MFA, email verification and enterprise account policy remain outside accepted local capabilities.

## Data inventory and actual retention

| Data | Stored form | Current expiry, removal or retention behavior |
| --- | --- | --- |
| Users | Name, email, salted scrypt password hash, status and revision | Deactivation preserves the account. No automatic account purge exists |
| Organizations and memberships | Identity, relationships, status and revision | Organization deactivation preserves records. Supported membership revocation removes that membership |
| Roles and settings | System/custom assignments and validated settings | Updates retain current state. No general historical retention scheduler exists |
| Sessions | SHA-256 token hash, account/app/portal/tenant scope and expiry | Expired sessions cannot authenticate. Successful session creation removes expired rows. Revocation and password changes remove affected sessions |
| Login counters | Hashed counter key, attempts and expiry | Counters expire after 15 minutes. A later throttle operation removes expired rows |
| Invitation/recovery tokens | Token hash, recipient name/email, scope, expiry and completion state | Recovery expires after 30 minutes. Invitations expire after 24 hours. Expiry prevents use and does not guarantee row deletion |
| Failed deliveries | Newly issued lifecycle row | A failed delivery removes the new token. No simulated delivery success exists |
| Completed/replaced tokens | Completion marker and existing token metadata | Rows can remain after consumption or expiry. No scheduled token purge exists |
| Audit events | Actor, scope, action, resource ID and timestamp | No automatic audit deletion or anonymization exists |
| SQLite backups | Consistent full database snapshot | No automatic backup expiry or encryption exists. Each copy retains the included account and identity data |

Expiry is an authorization rule. It is not a promise of physical data deletion.
Database rows can also persist in backups, WAL files and filesystem snapshots.
This phase adds no deletion job and changes no stored operational records.
Do not promise erasure, anonymization or a retention duration that the owner has not approved and implemented.

## Performance and operating limits

- Prior Platform evidence used 1,000 persisted users and five list/count reads below a 1,000 ms regression budget.
- That measurement describes its local fixture. It does not establish deployment throughput or simultaneous-user capacity.
- The current SQLite adapter uses WAL, foreign keys and a five-second busy wait.
- Cxsun uses a 20-second handler deadline, 15-second receive timeout and 10-second header timeout.
- Shutdown permits eight seconds of connection draining before forced closure and ten seconds before process termination.
- Existing tests cover independent SQLite writers and WAL-consistent backup integrity.
- Load testing, disk limits, proxy behavior and recovery objectives remain outside local acceptance.

## Gates that remain pending

- [ ] 06.08.2b Complete the browser accessibility and interaction matrix.
- [ ] 06.08.2c Accept production retention/account policies, workload capacity and protected operational storage when production resumes.
- [ ] 06.10.2 Accept TLS/proxy, off-host backups and incident recovery.
- [ ] 07.04.2 Verify fresh deployed governance when deployment resumes.
- [ ] 07.06.2 Accept the complete required foundation profile before business-module development.

Real SMTP and production deployment remain deferred by the user.
Browser access remains blocked by the browser tool policy rejection.
