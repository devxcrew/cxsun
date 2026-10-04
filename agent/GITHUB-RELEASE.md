# Workspace GitHub release

Date: 2026-10-04

## Scope

This record covers version metadata, changelogs, local verification, commits and GitHub source delivery for all 14 repositories. It does not mark every foundation roadmap task complete.

| Repository | Version | Branch | Local verification |
| --- | --- | --- | --- |
| [projects/billing](https://github.com/devxcrew/billing) | 0.1.2 | main | 3 tests, lint, types, build and production smoke |
| [projects/crm](https://github.com/devxcrew/crm) | 0.1.2 | main | 3 tests, lint, types, build and production smoke |
| [projects/cxsun](https://github.com/devxcrew/cxsun) | 0.2.0 | main | 41 tests, lint, types, build, identity and production smoke; 30 installed direct packages with snapshot differences reported |
| [projects/ecommerce](https://github.com/devxcrew/ecommerce) | 0.1.2 | main | 3 tests, lint, types, build and production smoke |
| [projects/intergrid](https://github.com/devxcrew/intergrid) | 0.1.2 | agent5/shell | 10 tests, lint, types, build and production smoke |
| [projects/qcafe](https://github.com/devxcrew/qcafe) | 0.1.2 | main | 3 tests, lint, types, build and production smoke |
| [projects/veyrezio](https://github.com/devxcrew/veyrezio) | 0.1.1 | main | 160 tests and maintenance checks |
| [shared/framework](https://github.com/devxcrew/framework) | 0.1.8 | main | Release check passed |
| [shared/mcp-governance](https://github.com/devxcrew/mcp-governance) | 0.1.4 | main | 9 tests, types, build and maintenance checks |
| [shared/platform](https://github.com/devxcrew/platform) | 0.1.1 | main | 6 tests, SQLite list benchmark and release check |
| [shared/tools](https://github.com/devxcrew/tools) | 0.1.8 | main | 32 tests and release check |
| [shared/ui](https://github.com/devxcrew/ui) | 0.2.0 | main | Public exports, component checks and release check |
| [devkits/uiux](https://github.com/devxcrew/uiux) | 0.1.8 | main | 2 form tests, lint, types, build and size budgets |
| [addons/email](https://github.com/devxcrew/email) | 0.1.0 | main | 2 tests and release check; real SMTP deferred |

## Release boundaries

- Email is the first source release at 0.1.0. Veyrezio is a private GitHub repository.
- Intergrid remains on its existing agent5/shell branch. This release does not merge it into main.
- Cxsun uses prepared local Framework, UI and Tools artifacts for its current foundation acceptance. Platform and Email are checked-in package snapshots.
- Cxsun CI stays isolated and uses registry dependencies. Registry acceptance of the new shared APIs remains pending approved npm publication and consumer dependency updates.
- No npm packages were published and no production services were deployed in this release.
- Real SMTP acceptance and production deployment remain deferred by the user.
- See each owner's agent/AUDIT.md for its verification evidence and agent/CHANGELOG.md for release changes.

## GitHub CI results

- Billing, CRM, Ecommerce, Qcafe, Intergrid, Platform and Tools passed their release runs.
- Governance's first run failed formatting. The eight files were formatted; local verification and the replacement GitHub CI run 37200459817 passed on Ubuntu and Windows.
- Cxsun run [37200330583](https://github.com/devxcrew/cxsun/actions/runs/37200330583) failed at the published Tools 0.1.7 dependency check: it rejects the public Platform schema type import in identity.permissions.tsx. Current local verification uses Tools 0.1.8, Framework 0.1.8 and UI 0.2.0. The lockfile still uses registry 0.1.7 for those packages. Registry acceptance is blocked until publication and consumer updates.
- Framework, UI, UIUX, Email and Veyrezio have no GitHub Actions run for this delivery. Their local verification passed.
