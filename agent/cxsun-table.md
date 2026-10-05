# Cxsun and CXApp table comparison

Reviewed on 2026-10-05.

Cxsun has 16 application foundation tables and two Kysely migration tables in
`storage/private/data/identity.sqlite`. These were confirmed through a read-only
database query. CXApp names below come from its current TypeScript schemas and
migrations at `E:/Workspace/codexsun/cxapp`; its live MariaDB databases were not
queried. A source declaration does not prove that a migration has been applied.

The comparison maps capabilities, not interchangeable tables. Similar names do
not imply matching columns, keys, constraints, permissions or runtime behavior.

## Database layout

| Area                 | Cxsun                                                        | CXApp                                                                                                 | Meaning                                                                                                        |
| -------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Database engine      | SQLite through Kysely                                        | MariaDB-oriented Kysely schemas and SQL migrations                                                    | Migration SQL cannot be copied directly between engines.                                                       |
| Identity ownership   | Public Platform package; app owns database composition       | Platform app modules                                                                                  | Both separate identity implementation from product business owners.                                            |
| Tenant storage       | Tenant-scoped records in the app-local database              | Platform master schema and tenant application schemas                                                 | Cxsun does not reproduce CXApp's database-per-tenant routing.                                                  |
| Foundation inventory | 16 foundation tables plus two migration tables               | 22 PlatformDatabase declarations and eight TenantDatabase declarations; 28 distinct names across both | Two task-manager table names occur in both database types. These are source counts, not deployed table counts. |
| Database file        | `storage/private/data/identity.sqlite`                       | Database connections and tenant database names                                                        | Each Cxsun app has its own file.                                                                               |
| Backups              | `storage/private/data/backup/`; timestamped SQLite snapshots | Database-maintenance records and MariaDB operations                                                   | A maintenance table is not the backup file itself.                                                             |

## Identity and foundation tables

“Partial” means that related data exists on both sides but has a different scope
or structure. “No direct equivalent” means that no matching table was identified
in the inspected foundation schemas; it does not prove the capability is absent
from all code.

| Capability                | Cxsun table                        | CXApp table or tables                                       | Comparison                                                                                                                                                              |
| ------------------------- | ---------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Application metadata      | `application_metadata`             | No direct equivalent                                        | Cxsun stores key/value metadata. CXApp app registration is a separate capability.                                                                                       |
| User accounts             | `identity_users`                   | `app_users`, `platform_auth_users`, `access_users`          | Partial. Cxsun keeps credentials on one user record. CXApp separates tenant accounts, platform credentials and platform access-user records.                            |
| Tenant organizations      | `identity_tenants`                 | `tenants`                                                   | Related purpose. CXApp additionally models tenant database and access configuration.                                                                                    |
| User membership           | `identity_memberships`             | `app_users`, `app_user_roles`                               | Partial. Cxsun explicitly links user, tenant and role; CXApp user-to-role assignments live in the tenant database.                                                      |
| Standard roles            | `identity_roles`                   | `app_roles`, `access_roles`                                 | Related purpose. CXApp separates tenant and platform role catalogs.                                                                                                     |
| Permission identifiers    | `identity_permissions`             | `app_permissions`, `access_permissions`                     | Related purpose. CXApp separates tenant and platform permission catalogs.                                                                                               |
| Standard role permissions | `identity_role_permissions`        | `app_role_permissions`, `access_roles.permission_keys_json` | Partial. Tenant grants use a join table; platform roles store permission keys as JSON.                                                                                  |
| Custom roles              | `identity_custom_roles`            | `app_roles`                                                 | Partial. Cxsun separates custom roles from standard roles; CXApp's tenant role table includes role lifecycle and protected-record fields.                               |
| Custom role permissions   | `identity_custom_role_permissions` | `app_role_permissions`                                      | Related purpose. CXApp uses the tenant role-permission table rather than a separate custom-role grant table.                                                            |
| Permission declarations   | `identity_permission_declarations` | `app_permissions`, `access_permissions`                     | Partial. Cxsun declarations include app, owner, supported portals and label; the CXApp catalogs are not an identical declaration contract.                              |
| Login sessions            | `identity_sessions`                | `auth_sessions`                                             | Related purpose. Cxsun stores a token hash and app/portal/tenant scope; CXApp includes JTI, user type, host, tenant database, context, last-seen and revocation fields. |
| Login throttling          | `identity_throttles`               | `auth_login_attempts`                                       | Related purpose. Cxsun uses attempts and expiry; CXApp records failure count, last failure and blocked-until time.                                                      |
| Identity workflow tokens  | `identity_tokens`                  | `password_reset_requests`                                   | Partial. Cxsun tokens have a kind and delivery/consumption fields; the CXApp table specifically models password recovery.                                               |
| Tenant settings           | `identity_settings`                | `app_module_settings`, `tenants`                            | Partial. Cxsun stores tenant presentation settings; CXApp module settings and tenant configuration have different responsibilities.                                     |
| Application settings      | `identity_app_settings`            | `app_module_settings`, `platform_apps`                      | Partial. Cxsun includes locale, time zone and session duration; CXApp splits module settings from app registration.                                                     |
| Identity audit history    | `identity_audit_events`            | `tenant_audit_events`, `platform_activity`                  | Related purpose. CXApp separates tenant events and broader platform activity.                                                                                           |
| Migration history         | `kysely_migration`                 | `migration_schema`                                          | Different implementations. CXApp's current framework ledger records scoped migration execution and checksums. Legacy source also references `schema_migrations`.        |
| Migration coordination    | `kysely_migration_lock`            | No directly corresponding lock table identified             | Do not infer CXApp lacks migration locking from the absence of a matching table name.                                                                                   |

## Additional CXApp foundation and service tables

These capabilities have no dedicated Cxsun table today. They are additions to
evaluate when required, rather than mandatory tables to copy into the identity MVP.

| Capability           | Cxsun table | CXApp table                 | Owner and scope                                                      |
| -------------------- | ----------- | --------------------------- | -------------------------------------------------------------------- |
| App registry         | None        | `platform_apps`             | Platform; app registration and landing metadata.                     |
| Plans                | None        | `plans`                     | Platform; plan catalog.                                              |
| Subscriptions        | None        | `subscriptions`             | Platform; subscription records.                                      |
| Entitlements         | None        | `entitlements`              | Platform; access to registered apps.                                 |
| Industry catalog     | None        | `industries`                | Platform; industry reference data.                                   |
| Tenant domains       | None        | `tenant_domains`            | Platform; tenant domain configuration.                               |
| Database maintenance | None        | `database_maintenance_runs` | Platform; maintenance execution history.                             |
| Queue jobs           | None        | `queue_jobs`                | Platform; persisted asynchronous jobs.                               |
| Queue configuration  | None        | `queue_runtime_settings`    | Platform; queue runtime settings.                                    |
| Storage metadata     | None        | `storage_objects`           | Platform; managed storage object metadata.                           |
| Tasks                | None        | `task_manager_todos`        | Task-manager owner; declared for both platform and tenant databases. |
| Task reference data  | None        | `task_manager_lookups`      | Task-manager owner; declared for both platform and tenant databases. |

## Review findings

| Area                  | Finding                                                                                                                               | Next decision                                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Core identity         | Both schemas cover accounts, roles, permissions, sessions and throttling.                                                             | Verify behavior through acceptance tests; table presence alone is insufficient.                   |
| Multiple roles        | Cxsun membership has `role_id` and `custom_role_id`; CXApp has a separate user-role join table.                                       | Define whether one user needs multiple independently assigned roles before changing Cxsun.        |
| Tenancy               | Cxsun row scope differs from CXApp's tenant database model.                                                                           | Choose the required isolation model before adding database routing.                               |
| Account governance    | CXApp account/role schemas include status, protected-record and audit metadata fields that differ from Cxsun's active/version fields. | Define account lifecycle and protected-record rules explicitly.                                   |
| Session lifecycle     | CXApp sessions declare revocation, last-seen, host and database context fields not present in Cxsun sessions.                         | Review required session behavior; an absent column does not prove logout or revocation is broken. |
| Permission ownership  | Cxsun has a dedicated module declaration table.                                                                                       | Preserve the public declaration contract instead of replacing it with a permission catalog alone. |
| Service expansion     | Registry, subscriptions, queues and storage tables broaden CXApp beyond Cxsun's foundation.                                           | Add only the capabilities required for the next phase, in their owning modules.                   |
| Product business data | CXApp Core, Billing and Accounts tables are outside Cxsun's current foundation.                                                       | Keep business tables in the appropriate product module or app.                                    |

## Evidence and verification scope

| Evidence                                          | Location                                                                                                    |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Cxsun actual tables                               | `D:/codexsun/projects/cxsun/storage/private/data/identity.sqlite`, read-only `sqlite_master` query          |
| Cxsun migration composition                       | [database.migration.ts](../src/api/database/database.migration.ts)                                          |
| Cxsun schema composition                          | [database.types.ts](../src/api/database/database.types.ts)                                                  |
| CXApp platform and tenant declarations            | [schema.ts](E:/Workspace/codexsun/cxapp/apps/platform/api/src/database/schema.ts)                           |
| CXApp platform migration order and prefix history | [platform-database.ts](E:/Workspace/codexsun/cxapp/apps/platform/api/src/database/platform-database.ts)     |
| CXApp tenant migration order                      | [tenant.migration.ts](E:/Workspace/codexsun/cxapp/apps/platform/api/src/modules/tenant/tenant.migration.ts) |
| CXApp migration ledger                            | [migrations.ts](E:/Workspace/codexsun/cxapp/packages/framework/src/db/migrations.ts)                        |

The latest inspected Platform migration batch restores unprefixed platform master
table names after older `app_` prefix migrations. Tenant identity tables retain
their `app_` names. An older deployed database may still differ until upgraded.

Passed: authenticated Cxsun governance connection, read-only Cxsun table inventory
and static CXApp schema/migration review. CXApp live database inventory, migration
execution, row counts, RBAC behavior and runtime parity were not tested for this
documentation task. No database changes were made.

## CXApp product and developer table inventory

These tables were declared in the inspected owner migration files. None is present
in the current Cxsun database. They are product or tooling scope, not missing
identity tables. This inventory does not claim a live deployed schema.

### Core

| Cxsun table | CXApp table                     | Owning migration                                                                    |
| ----------- | ------------------------------- | ----------------------------------------------------------------------------------- |
| None        | `core_address_types`            | `modules/common/contacts/address-types/address-types.migration.ts`                  |
| None        | `core_bank_names`               | `modules/common/contacts/bank-names/bank-names.migration.ts`                        |
| None        | `core_brands`                   | `modules/common/products/brands/brands.migration.ts`                                |
| None        | `core_cities`                   | `modules/common/location/city/city.migration.ts`                                    |
| None        | `core_colours`                  | `modules/common/products/colours/colours.migration.ts`                              |
| None        | `core_companies`                | `modules/organisation/company/company.migration.ts`                                 |
| None        | `core_companies_addresses`      | `modules/organisation/company/company.migration.ts`                                 |
| None        | `core_companies_bank_accounts`  | `modules/organisation/company/company.migration.ts`                                 |
| None        | `core_companies_emails`         | `modules/organisation/company/company.migration.ts`                                 |
| None        | `core_companies_phones`         | `modules/organisation/company/company.migration.ts`                                 |
| None        | `core_companies_social_links`   | `modules/organisation/company/company.migration.ts`                                 |
| None        | `core_contact_groups`           | `modules/common/contacts/contact-groups/contact-groups.migration.ts`                |
| None        | `core_contact_types`            | `modules/common/contacts/contact-types/contact-types.migration.ts`                  |
| None        | `core_contacts`                 | `modules/master/contact/contact.migration.ts`                                       |
| None        | `core_contacts_addresses`       | `modules/master/contact/contact.migration.ts`                                       |
| None        | `core_contacts_bank_accounts`   | `modules/master/contact/contact.migration.ts`                                       |
| None        | `core_contacts_emails`          | `modules/master/contact/contact.migration.ts`                                       |
| None        | `core_contacts_phones`          | `modules/master/contact/contact.migration.ts`                                       |
| None        | `core_contacts_social_links`    | `modules/master/contact/contact.migration.ts`                                       |
| None        | `core_countries`                | `modules/common/location/country/country.migration.ts`                              |
| None        | `core_currencies`               | `modules/common/others/currencies/currencies.migration.ts`                          |
| None        | `core_default_company_settings` | `modules/organisation/default-company/default-company.migration.ts`                 |
| None        | `core_destinations`             | `modules/common/workorder/destinations/destinations.migration.ts`                   |
| None        | `core_districts`                | `modules/common/location/district/district.migration.ts`                            |
| None        | `core_financial_years`          | `modules/organisation/financial-year/financial-year.migration.ts`                   |
| None        | `core_hsn_codes`                | `modules/common/products/hsn-codes/hsn-codes.migration.ts`                          |
| None        | `core_ledger_groups`            | `modules/common/accounts/ledger-groups/ledger-groups.migration.ts`                  |
| None        | `core_ledgers`                  | `modules/common/accounts/ledgers/ledgers.migration.ts`                              |
| None        | `core_months`                   | `modules/common/others/months/months.migration.ts`                                  |
| None        | `core_payment_terms`            | `modules/common/others/payment-terms/payment-terms.migration.ts`                    |
| None        | `core_pincodes`                 | `modules/common/location/pincode/pincode.migration.ts`                              |
| None        | `core_priorities`               | `modules/common/others/priorities/priorities.migration.ts`                          |
| None        | `core_product_categories`       | `modules/common/products/product-categories/product-categories.migration.ts`        |
| None        | `core_product_groups`           | `modules/common/products/product-groups/product-groups.migration.ts`                |
| None        | `core_product_types`            | `modules/common/products/product-types/product-types.migration.ts`                  |
| None        | `core_products`                 | `modules/master/product/product.migration.ts`                                       |
| None        | `core_sales_types`              | `modules/common/others/sales-types/sales-types.migration.ts`                        |
| None        | `core_sizes`                    | `modules/common/products/sizes/sizes.migration.ts`                                  |
| None        | `core_states`                   | `modules/common/location/state/state.migration.ts`                                  |
| None        | `core_stock_rejection_types`    | `modules/common/workorder/stock-rejection-types/stock-rejection-types.migration.ts` |
| None        | `core_styles`                   | `modules/common/products/styles/styles.migration.ts`                                |
| None        | `core_taxes`                    | `modules/common/products/taxes/taxes.migration.ts`                                  |
| None        | `core_transports`               | `modules/common/workorder/transports/transports.migration.ts`                       |
| None        | `core_units`                    | `modules/common/products/units/units.migration.ts`                                  |
| None        | `core_warehouses`               | `modules/common/workorder/warehouses/warehouses.migration.ts`                       |
| None        | `core_work_order_types`         | `modules/common/workorder/work-order-types/work-order-types.migration.ts`           |
| None        | `core_work_orders`              | `modules/master/work-order/work-order.migration.ts`                                 |

### Billing

| Cxsun table | CXApp table                                  | Owning migration                                               |
| ----------- | -------------------------------------------- | -------------------------------------------------------------- |
| None        | `billing_company_settings`                   | `modules/settings/settings.migration.ts`                       |
| None        | `billing_dashboard_snapshots`                | `modules/dashboard/dashboard.migration.ts`                     |
| None        | `billing_domain_events`                      | `modules/runtime-persistence/runtime-persistence.migration.ts` |
| None        | `billing_export_sales`                       | `modules/export-sales/export-sales.migration.ts`               |
| None        | `billing_export_sales_activities`            | `modules/export-sales/export-sales.migration.ts`               |
| None        | `billing_export_sales_comments`              | `modules/export-sales/export-sales.migration.ts`               |
| None        | `billing_export_sales_einvoices`             | `modules/export-sales/export-sales.migration.ts`               |
| None        | `billing_export_sales_entry_tools`           | `modules/export-sales/export-sales.migration.ts`               |
| None        | `billing_export_sales_eway_bills`            | `modules/export-sales/export-sales.migration.ts`               |
| None        | `billing_export_sales_items`                 | `modules/export-sales/export-sales.migration.ts`               |
| None        | `billing_gst_filings`                        | `modules/reports/gst-statement/gst-statement.migration.ts`     |
| None        | `billing_opening_balance_activities`         | `modules/opening-balance/opening-balance.migration.ts`         |
| None        | `billing_opening_balance_legacy_assignments` | `modules/opening-balance/opening-balance.migration.ts`         |
| None        | `billing_opening_balances`                   | `modules/opening-balance/opening-balance.migration.ts`         |
| None        | `billing_outbox_jobs`                        | `modules/runtime-persistence/runtime-persistence.migration.ts` |
| None        | `billing_payment_activities`                 | `modules/payment/payment.migration.ts`                         |
| None        | `billing_payment_allocations`                | `modules/payment/payment.migration.ts`                         |
| None        | `billing_payments`                           | `modules/payment/payment.migration.ts`                         |
| None        | `billing_purchase_activities`                | `modules/purchase/purchase.migration.ts`                       |
| None        | `billing_purchase_items`                     | `modules/purchase/purchase.migration.ts`                       |
| None        | `billing_purchases`                          | `modules/purchase/purchase.migration.ts`                       |
| None        | `billing_quotation_activities`               | `modules/quotation/quotation.migration.ts`                     |
| None        | `billing_quotation_items`                    | `modules/quotation/quotation.migration.ts`                     |
| None        | `billing_quotations`                         | `modules/quotation/quotation.migration.ts`                     |
| None        | `billing_receipt_activities`                 | `modules/receipt/receipt.migration.ts`                         |
| None        | `billing_receipt_allocations`                | `modules/receipt/receipt.migration.ts`                         |
| None        | `billing_receipt_export_allocations`         | `modules/receipt/receipt.export-allocation.migration.ts`       |
| None        | `billing_receipts`                           | `modules/receipt/receipt.migration.ts`                         |
| None        | `billing_sales`                              | `modules/sales/sales.migration.ts`                             |
| None        | `billing_sales_activities`                   | `modules/sales/sales.migration.ts`                             |
| None        | `billing_sales_comments`                     | `modules/sales/sales.migration.ts`                             |
| None        | `billing_sales_einvoices`                    | `modules/sales/sales.migration.ts`                             |
| None        | `billing_sales_entry_tools`                  | `modules/sales/sales.migration.ts`                             |
| None        | `billing_sales_eway_bills`                   | `modules/sales/sales.migration.ts`                             |
| None        | `billing_sales_items`                        | `modules/sales/sales.migration.ts`                             |
| None        | `billing_settings`                           | `modules/settings/settings.migration.ts`                       |

### Accounts

| Cxsun table | CXApp table                   | Owning migration                             |
| ----------- | ----------------------------- | -------------------------------------------- |
| None        | `accounts_account_groups`     | `modules/accounting/accounting.migration.ts` |
| None        | `accounts_accounting_periods` | `modules/accounting/accounting.migration.ts` |
| None        | `accounts_accounting_rules`   | `modules/accounting/accounting.migration.ts` |
| None        | `accounts_accounts`           | `modules/accounting/accounting.migration.ts` |
| None        | `accounts_bank_entries`       | `modules/accounting/accounting.migration.ts` |
| None        | `accounts_cash_entries`       | `modules/accounting/accounting.migration.ts` |
| None        | `accounts_cash_entry_lines`   | `modules/accounting/accounting.migration.ts` |
| None        | `accounts_core_ledger_links`  | `modules/accounting/accounting.migration.ts` |
| None        | `accounts_entries`            | `modules/accounting/accounting.migration.ts` |
| None        | `accounts_entry_lines`        | `modules/accounting/accounting.migration.ts` |
| None        | `accounts_journal_entries`    | `modules/accounting/accounting.migration.ts` |
| None        | `accounts_journal_lines`      | `modules/accounting/accounting.migration.ts` |
| None        | `accounts_ledger`             | `modules/accounting/accounting.migration.ts` |

### Devkit

| Cxsun table | CXApp table                          | Owning migration                                           |
| ----------- | ------------------------------------ | ---------------------------------------------------------- |
| None        | `devkit_platform_registry_activity`  | `modules/platform-registry/platform-registry.migration.ts` |
| None        | `devkit_platform_registry_groups`    | `modules/platform-registry/platform-registry.migration.ts` |
| None        | `devkit_platform_registry_modules`   | `modules/platform-registry/platform-registry.migration.ts` |
| None        | `devkit_platform_registry_platforms` | `modules/platform-registry/platform-registry.migration.ts` |

### Mail

| Cxsun table | CXApp table        | Owning migration                 |
| ----------- | ------------------ | -------------------------------- |
| None        | `mail_attachments` | `modules/mail/mail.migration.ts` |
| None        | `mail_events`      | `modules/mail/mail.migration.ts` |
| None        | `mail_messages`    | `modules/mail/mail.migration.ts` |
| None        | `mail_settings`    | `modules/mail/mail.migration.ts` |
