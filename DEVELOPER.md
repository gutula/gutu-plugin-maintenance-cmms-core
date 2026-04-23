# Maintenance & CMMS Core Developer Guide

Preventive maintenance plans, asset work orders, inspections, and downtime-aware service coordination for asset-intensive operations.

**Maturity Tier:** `Hardened`

## Purpose And Architecture Role

Owns preventive maintenance plans, work orders, and asset-health posture for maintenance-led operations.

### This plugin is the right fit when

- You need **maintenance plans**, **asset work orders**, **asset health** as a governed domain boundary.
- You want to integrate through declared actions, resources, jobs, workflows, and UI surfaces instead of implicit side effects.
- You need the host application to keep plugin boundaries honest through manifest capabilities, permissions, and verification lanes.

### This plugin is intentionally not

- Not a full vertical application suite; this plugin only owns the domain slice exported in this repo.
- Not a replacement for explicit orchestration in jobs/workflows when multi-step automation is required.

## Repo Map

| Path | Purpose |
| --- | --- |
| `package.json` | Root extracted-repo manifest, workspace wiring, and repo-level script entrypoints. |
| `framework/builtin-plugins/maintenance-cmms-core` | Nested publishable plugin package. |
| `framework/builtin-plugins/maintenance-cmms-core/src` | Runtime source, actions, resources, services, and UI exports. |
| `framework/builtin-plugins/maintenance-cmms-core/tests` | Unit, contract, integration, and migration coverage where present. |
| `framework/builtin-plugins/maintenance-cmms-core/docs` | Internal domain-doc source set kept in sync with this guide. |
| `framework/builtin-plugins/maintenance-cmms-core/db/schema.ts` | Database schema contract when durable state is owned. |
| `framework/builtin-plugins/maintenance-cmms-core/src/postgres.ts` | SQL migration and rollback helpers when exported. |

## Manifest Contract

| Field | Value |
| --- | --- |
| Package Name | `@plugins/maintenance-cmms-core` |
| Manifest ID | `maintenance-cmms-core` |
| Display Name | Maintenance & CMMS Core |
| Domain Group | Operational Data |
| Default Category | Business / Assets & Lifecycle |
| Version | `0.1.0` |
| Kind | `plugin` |
| Trust Tier | `first-party` |
| Review Tier | `R1` |
| Isolation Profile | `same-process-trusted` |
| Framework Compatibility | ^0.1.0 |
| Runtime Compatibility | bun>=1.3.12 |
| Database Compatibility | postgres, sqlite |

## Dependency Graph And Capability Requests

| Field | Value |
| --- | --- |
| Depends On | `auth-core`, `org-tenant-core`, `role-policy-core`, `audit-core`, `workflow-core`, `assets-core`, `inventory-core`, `support-service-core`, `traceability-core` |
| Requested Capabilities | `ui.register.admin`, `api.rest.mount`, `data.write.maintenance`, `events.publish.maintenance` |
| Provides Capabilities | `maintenance.plans`, `maintenance.work-orders`, `maintenance.asset-health` |
| Owns Data | `maintenance.plans`, `maintenance.work-orders`, `maintenance.asset-health`, `maintenance.downtime-events` |

### Dependency interpretation

- Direct plugin dependencies describe package-level coupling that must already be present in the host graph.
- Requested capabilities tell the host what platform services or sibling plugins this package expects to find.
- Provided capabilities and owned data tell integrators what this package is authoritative for.

## Public Integration Surfaces

| Type | ID / Symbol | Access / Mode | Notes |
| --- | --- | --- | --- |
| Action | `maintenance.plans.publish` | Permission: `maintenance.plans.write` | Publish Maintenance Plan<br>Idempotent<br>Audited |
| Action | `maintenance.work-orders.release` | Permission: `maintenance.work-orders.write` | Release Maintenance Work Order<br>Non-idempotent<br>Audited |
| Action | `maintenance.asset-health.record` | Permission: `maintenance.asset-health.write` | Record Asset Health<br>Non-idempotent<br>Audited |
| Resource | `maintenance.plans` | Portal disabled | Preventive and corrective maintenance planning records.<br>Purpose: Own maintenance planning separately from assets, inventory, and support truth.<br>Admin auto-CRUD enabled<br>Fields: `title`, `recordState`, `approvalState`, `postingState`, `fulfillmentState`, `updatedAt` |
| Resource | `maintenance.work-orders` | Portal disabled | Maintenance work orders, execution posture, and follow-up records.<br>Purpose: Track maintenance execution explicitly across preventive and corrective work.<br>Admin auto-CRUD enabled<br>Fields: `label`, `status`, `requestedAction`, `updatedAt` |
| Resource | `maintenance.asset-health` | Portal disabled | Condition, downtime, and serviceability records linked to maintained assets.<br>Purpose: Make asset-health posture explicit for planning and operational repair.<br>Admin auto-CRUD enabled<br>Fields: `severity`, `status`, `reasonCode`, `updatedAt` |

### Job Catalog

| Job | Queue | Retry | Timeout |
| --- | --- | --- | --- |
| `maintenance.projections.refresh` | `maintenance-projections` | Retry policy not declared | No timeout declared |
| `maintenance.reconciliation.run` | `maintenance-reconciliation` | Retry policy not declared | No timeout declared |


### Workflow Catalog

| Workflow | Actors | States | Purpose |
| --- | --- | --- | --- |
| `maintenance-lifecycle` | `planner`, `maintenance-lead`, `technician` | `draft`, `pending_approval`, `active`, `reconciled`, `closed`, `canceled` | Keep maintenance work and downtime-aware repair cycles explicit and governable. |


### UI Surface Summary

| Surface | Present | Notes |
| --- | --- | --- |
| UI Surface | Yes | A bounded UI surface export is present. |
| Admin Contributions | Yes | Additional admin workspace contributions are exported. |
| Zone/Canvas Extension | No | No dedicated zone extension export. |

## Hooks, Events, And Orchestration

This plugin should be integrated through **explicit commands/actions, resources, jobs, workflows, and the surrounding Gutu event runtime**. It must **not** be documented as a generic WordPress-style hook system unless such a hook API is explicitly exported.

- No standalone plugin-owned lifecycle event feed is exported today.
- Job surface: `maintenance.projections.refresh`, `maintenance.reconciliation.run`.
- Workflow surface: `maintenance-lifecycle`.
- Recommended composition pattern: invoke actions, read resources, then let the surrounding Gutu command/event/job runtime handle downstream automation.

## Storage, Schema, And Migration Notes

- Database compatibility: `postgres`, `sqlite`
- Schema file: `framework/builtin-plugins/maintenance-cmms-core/db/schema.ts`
- SQL helper file: `framework/builtin-plugins/maintenance-cmms-core/src/postgres.ts`
- Migration lane present: Yes

The plugin ships explicit SQL helper exports. Use those helpers as the truth source for database migration or rollback expectations.

## Failure Modes And Recovery

- Action inputs can fail schema validation or permission evaluation before any durable mutation happens.
- If downstream automation is needed, the host must add it explicitly instead of assuming this plugin emits jobs.
- There is no separate lifecycle-event feed to rely on today; do not build one implicitly from internal details.
- Schema regressions are expected to show up in the migration lane and should block shipment.

## Mermaid Flows

### Primary Lifecycle

```mermaid
flowchart LR
  caller["Host or operator"] --> action["maintenance.plans.publish"]
  action --> validation["Schema + permission guard"]
  validation --> service["Maintenance & CMMS Core service layer"]
  service --> state["maintenance.plans"]
  service --> jobs["Follow-up jobs / queue definitions"]
  service --> workflows["Workflow state transitions"]
  state --> ui["Admin contributions"]
```

### Workflow State Machine

```mermaid
stateDiagram-v2
  [*] --> draft
  draft --> pending_approval
  draft --> active
  draft --> reconciled
  draft --> closed
  draft --> canceled
```


## Integration Recipes

### 1. Host wiring

```ts
import { manifest, createPrimaryRecordAction, BusinessPrimaryResource, jobDefinitions, workflowDefinitions, adminContributions, uiSurface } from "@plugins/maintenance-cmms-core";

export const pluginSurface = {
  manifest,
  createPrimaryRecordAction,
  BusinessPrimaryResource,
  jobDefinitions,
  workflowDefinitions,
  adminContributions,
  uiSurface
};
```

Use this pattern when your host needs to register the plugin’s declared exports without reaching into internal file paths.

### 2. Action-first orchestration

```ts
import { manifest, createPrimaryRecordAction } from "@plugins/maintenance-cmms-core";

console.log("plugin", manifest.id);
console.log("action", createPrimaryRecordAction.id);
```

- Prefer action IDs as the stable integration boundary.
- Respect the declared permission, idempotency, and audit metadata instead of bypassing the service layer.
- Treat resource IDs as the read-model boundary for downstream consumers.

### 3. Cross-plugin composition

- Register the workflow definitions with the host runtime instead of re-encoding state transitions outside the plugin.
- Drive follow-up automation from explicit workflow transitions and resource reads.
- Pair workflow decisions with notifications or jobs in the outer orchestration layer when humans must be kept in the loop.

## Test Matrix

| Lane | Present | Evidence |
| --- | --- | --- |
| Build | Yes | `bun run build` |
| Typecheck | Yes | `bun run typecheck` |
| Lint | Yes | `bun run lint` |
| Test | Yes | `bun run test` |
| Unit | Yes | 1 file(s) |
| Contracts | Yes | 1 file(s) |
| Integration | Yes | 1 file(s) |
| Migrations | Yes | 2 file(s) |

### Verification commands

- `bun run build`
- `bun run typecheck`
- `bun run lint`
- `bun run test`
- `bun run test:contracts`
- `bun run test:unit`
- `bun run test:integration`
- `bun run test:migrations`
- `bun run docs:check`

## Current Truth And Recommended Next

### Current truth

- Exports 3 governed actions: `maintenance.plans.publish`, `maintenance.work-orders.release`, `maintenance.asset-health.record`.
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

### Current gaps

- Repo-local documentation verification entrypoints were missing before this pass and need to stay green as the repo evolves.

### Recommended next

- Deepen downtime, inspection, and preventive scheduling coverage as more asset-intensive flows rely on the maintenance contract.
- Clarify support, inventory, and asset-reconciliation handoffs before broader CMMS usage expands.
- Broaden lifecycle coverage with deeper orchestration, reconciliation, and operator tooling where the business flow requires it.
- Add more explicit domain events or follow-up job surfaces when downstream systems need tighter coupling.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `Maintenance Schedule`, `Maintenance Visit`, `Asset Maintenance`.

### Later / optional

- Outbound connectors, richer analytics, or portal-facing experiences once the core domain contracts harden.
