# Maintenance & CMMS Core

<p align="center">
  <img src="./docs/assets/gutu-mascot.png" alt="Gutu mascot" width="220" />
</p>

Preventive maintenance plans, asset work orders, inspections, and downtime-aware service coordination for asset-intensive operations.

![Maturity: Hardened](https://img.shields.io/badge/Maturity-Hardened-2563eb) ![Verification: Build+Typecheck+Lint+Test+Contracts+Migrations+Integration](https://img.shields.io/badge/Verification-Build%2BTypecheck%2BLint%2BTest%2BContracts%2BMigrations%2BIntegration-2563eb) ![DB: postgres+sqlite](https://img.shields.io/badge/DB-postgres%2Bsqlite-2563eb) ![Integration Model: Actions+Resources+Jobs+Workflows+UI](https://img.shields.io/badge/Integration%20Model-Actions%2BResources%2BJobs%2BWorkflows%2BUI-2563eb)

## Part Of The Gutu Stack

| Aspect | Value |
| --- | --- |
| Repo kind | First-party plugin |
| Domain group | Operational Data |
| Default category | Business / Assets & Lifecycle |
| Primary focus | maintenance plans, asset work orders, asset health |
| Best when | You need a governed domain boundary with explicit contracts and independent release cadence. |
| Composes through | Actions+Resources+Jobs+Workflows+UI |

- Gutu keeps plugins as independent repos with manifest-governed boundaries, compatibility channels, and verification lanes instead of hiding everything behind one giant mutable codebase.
- This plugin is meant to compose through explicit actions, resources, jobs, workflows, and runtime envelopes, not through undocumented hook chains.

## What It Does Now

Owns preventive maintenance plans, work orders, and asset-health posture for maintenance-led operations.

- Exports 7 governed actions: `maintenance.plans.publish`, `maintenance.work-orders.release`, `maintenance.asset-health.record`, `maintenance.plans.hold`, `maintenance.plans.release`, `maintenance.plans.amend`, `maintenance.plans.reverse`.
- Owns 3 resource contracts: `maintenance.plans`, `maintenance.work-orders`, `maintenance.asset-health`.
- Publishes 2 job definitions with explicit queue and retry policy metadata.
- Publishes 1 workflow definition with state-machine descriptions and mandatory steps.
- Adds richer admin workspace contributions on top of the base UI surface.
- Ships explicit SQL migration or rollback helpers alongside the domain model.
- Documents 5 owned entity surface(s): `Maintenance Plan`, `Work Order`, `Downtime Event`, `Asset Health Record`, `Preventive Schedule`.
- Carries 3 report surface(s) and 3 exception queue(s) for operator parity and reconciliation visibility.
- Tracks ERPNext reference parity against module(s): `Maintenance`, `Assets`.
- Operational scenario matrix includes `preventive-plan-publication`, `work-order-release`, `downtime-recording`.
- Governs 2 settings or policy surface(s) for operator control and rollout safety.

## Maturity

**Maturity Tier:** `Hardened`

This tier is justified because unit coverage exists, contract coverage exists, integration coverage exists, migration coverage exists, job definitions are exported, and workflow definitions are exported.

## Verified Capability Summary

- Domain group: **Operational Data**
- Default category: **Business / Assets & Lifecycle**
- Verification surface: **Build+Typecheck+Lint+Test+Contracts+Migrations+Integration**
- Tests discovered: **5** total files across unit, contract, integration, migration lanes
- Integration model: **Actions+Resources+Jobs+Workflows+UI**
- Database support: **postgres + sqlite**

## Dependency And Compatibility Summary

| Field | Value |
| --- | --- |
| Package | `@plugins/maintenance-cmms-core` |
| Manifest ID | `maintenance-cmms-core` |
| Repo | [gutu-plugin-maintenance-cmms-core](https://github.com/gutula/gutu-plugin-maintenance-cmms-core) |
| Depends On | `auth-core`, `org-tenant-core`, `role-policy-core`, `audit-core`, `workflow-core`, `assets-core`, `inventory-core`, `support-service-core`, `traceability-core` |
| Recommended Plugins | None |
| Capability Enhancing | None |
| Integration Only | None |
| Suggested Packs | None |
| Standalone Supported | Yes |
| Requested Capabilities | `ui.register.admin`, `api.rest.mount`, `data.write.maintenance`, `events.publish.maintenance` |
| Provided Capabilities | `maintenance.plans`, `maintenance.work-orders`, `maintenance.asset-health` |
| Runtime | bun>=1.3.12 |
| Database | postgres, sqlite |
| Integration Model | Actions+Resources+Jobs+Workflows+UI |

## Installation Guidance

- Required plugins: `auth-core`, `org-tenant-core`, `role-policy-core`, `audit-core`, `workflow-core`, `assets-core`, `inventory-core`, `support-service-core`, `traceability-core`
- Recommended plugins: none
- Capability-enhancing plugins: none
- Integration-only plugins: none
- Suggested packs: none
- Standalone supported: yes


## Capability Matrix

| Surface | Count | Details |
| --- | --- | --- |
| Actions | 7 | `maintenance.plans.publish`, `maintenance.work-orders.release`, `maintenance.asset-health.record`, `maintenance.plans.hold`, `maintenance.plans.release`, `maintenance.plans.amend`, `maintenance.plans.reverse` |
| Resources | 3 | `maintenance.plans`, `maintenance.work-orders`, `maintenance.asset-health` |
| Jobs | 2 | `maintenance.projections.refresh`, `maintenance.reconciliation.run` |
| Workflows | 1 | `maintenance-lifecycle` |
| UI | Present | base UI surface, admin contributions |
| Owned Entities | 5 | `Maintenance Plan`, `Work Order`, `Downtime Event`, `Asset Health Record`, `Preventive Schedule` |
| Reports | 3 | `Maintenance Plan Summary`, `Downtime Summary`, `Preventive Compliance` |
| Exception Queues | 3 | `overdue-maintenance`, `downtime-escalation`, `maintenance-plan-review` |
| Operational Scenarios | 3 | `preventive-plan-publication`, `work-order-release`, `downtime-recording` |
| Settings Surfaces | 2 | `Maintenance Schedule`, `Asset Maintenance Team` |
| ERPNext Refs | 2 | `Maintenance`, `Assets` |

## Quick Start For Integrators

Use this repo inside a **compatible Gutu workspace** or the **ecosystem certification workspace** so its `workspace:*` dependencies resolve honestly.

```bash
# from a compatible workspace that already includes this plugin's dependency graph
bun install
bun run build
bun run test
bun run docs:check
```

```ts
import { manifest, publishMaintenancePlanAction, BusinessPrimaryResource, jobDefinitions, workflowDefinitions, adminContributions, uiSurface } from "@plugins/maintenance-cmms-core";

console.log(manifest.id);
console.log(publishMaintenancePlanAction.id);
console.log(BusinessPrimaryResource.id);
```

Use the root repo scripts for day-to-day work **after the workspace is bootstrapped**, or run the nested package directly from `framework/builtin-plugins/maintenance-cmms-core` if you need lower-level control.

## Current Test Coverage

- Root verification scripts: `bun run build`, `bun run typecheck`, `bun run lint`, `bun run test`, `bun run test:contracts`, `bun run test:unit`, `bun run test:integration`, `bun run test:migrations`, `bun run docs:check`
- Unit files: 1
- Contracts files: 1
- Integration files: 1
- Migrations files: 2

## Known Boundaries And Non-Goals

- Not a full vertical application suite; this plugin only owns the domain slice exported in this repo.
- Not a replacement for explicit orchestration in jobs/workflows when multi-step automation is required.
- Cross-plugin composition should use Gutu command, event, job, and workflow primitives. This repo should not be documented as exposing a generic WordPress-style hook system unless one is explicitly exported.

## Recommended Next Milestones

- Deepen downtime, inspection, and preventive scheduling coverage as more asset-intensive flows rely on the maintenance contract.
- Clarify support, inventory, and asset-reconciliation handoffs before broader CMMS usage expands.
- Broaden lifecycle coverage with deeper orchestration, reconciliation, and operator tooling where the business flow requires it.
- Add more explicit domain events or follow-up job surfaces when downstream systems need tighter coupling.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `Maintenance Schedule`, `Maintenance Visit`, `Asset Maintenance`.

## More Docs

See [DEVELOPER.md](./DEVELOPER.md), [TODO.md](./TODO.md), [SECURITY.md](./SECURITY.md), [CONTRIBUTING.md](./CONTRIBUTING.md). The internal domain sources used to build those docs live under:

- `plugins/gutu-plugin-maintenance-cmms-core/framework/builtin-plugins/maintenance-cmms-core/docs/AGENT_CONTEXT.md`
- `plugins/gutu-plugin-maintenance-cmms-core/framework/builtin-plugins/maintenance-cmms-core/docs/BUSINESS_RULES.md`
- `plugins/gutu-plugin-maintenance-cmms-core/framework/builtin-plugins/maintenance-cmms-core/docs/EDGE_CASES.md`
- `plugins/gutu-plugin-maintenance-cmms-core/framework/builtin-plugins/maintenance-cmms-core/docs/FLOWS.md`
- `plugins/gutu-plugin-maintenance-cmms-core/framework/builtin-plugins/maintenance-cmms-core/docs/GLOSSARY.md`
- `plugins/gutu-plugin-maintenance-cmms-core/framework/builtin-plugins/maintenance-cmms-core/docs/MANDATORY_STEPS.md`
