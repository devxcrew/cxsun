# Identity workflow acceptance

Date: 2026-10-04.
Scope: the local Cxsun foundation and its published package graph.

## Current evidence

Authenticated MCP retrieval passed. The server still reports the 2026-10-03 deployment snapshot.
Registry installation, generated consumers and candidate upgrades passed in the prior release wave.
This phase reviews the Cxsun source and corrects confirmed workflow defects.
It does not establish new browser or screen-reader evidence.
LOCAL-SECURITY.md records the compiled privacy/cookie/throttle checks and actual retention limits.

## Owned destinations

Each portal uses its own prefix: `/desk`, `/admin/desk` or `/sa/desk`.
The Identity section contains resource pages. The Account section contains profile and settings pages.
Profile and password links follow the current principal's declared permissions.
Platform authorizes every API operation independently of navigation visibility.

| Destination | Portals | Supported frontend actions |
| --- | --- | --- |
| Users | Admin, super admin | List, detail, create, edit and change active status |
| Organizations | Admin, super admin | List and detail. Only super admin creates or edits |
| Memberships | Admin, super admin | List, detail, assign, edit role/status and revoke |
| Roles | Admin, super admin | List, detail, create and edit custom roles. System-role editing follows Platform restrictions |
| Permissions | Admin, super admin | List and detail. Assign through roles |
| Sessions | All | List, detail and revoke within the authorized scope |
| Invitations | Admin, super admin | List, detail, issue, resend and revoke. Real delivery remains deferred |
| Audit history | Admin, super admin | List and detail |
| Profile | All, with profile permission | Read and update the current user's name |
| Password | All, with password permission | Change password and sign out |
| Organization settings | All | Users read. Authorized administrators edit presentation settings |
| Application settings | Super admin | Read and edit app presentation settings |
| Security settings | Super admin | Read and edit session duration with confirmation |

Read-only resources have no create/edit form. Unsupported direct action links show feedback and a list return link.
List return links retain query state. API validation and scoped authorization remain required.

## Source corrections in this phase

- Reject unsupported create/edit destinations before requesting a record or rendering a form.
- Preserve list filters in the return link for an unsupported action.
- Scope loaded account data to its portal and page.
- Clear account load errors and data when the page changes.
- Ignore an account response after its request is canceled.
- Reset the account form when its portal or page changes.
- Check each portal's resource labels, owned menu destinations, active nested routes and permission-dependent account links.

Source rendering checks cover unsupported actions across every declared resource and portal.
They do not exercise actual focus, Back/Forward, asynchronous React transitions or browser rendering.

## Required browser acceptance

Browser access was rejected by the browser tool security policy. These cases remain pending.
Use separate persisted SQLite fixtures for mutations. Preserve operational records.

- [ ] 02.04.2 Check every portal/resource/action combination and forbidden direct route.
- [ ] 04.05.2 Create, edit, inspect and revoke supported records. Confirm safe field and revision errors.
- [ ] 04.06.2 Switch account/settings pages, save presentation, restart, log out and check expiry.
- [ ] 04.07.2b Review all visible titles, menus, submenus, empty states and contextual copy.
- [ ] 06.05.2c Check query state through filters, pagination, refresh, breadcrumbs and Back/Forward.
- [ ] 06.03.2b Check keyboard access, dialog focus, error announcements, contrast and supported viewports.

Real SMTP and production acceptance remain deferred. Future ERP adapters remain outside this phase.
The complete foundation release remains unaccepted until its required gates pass.
