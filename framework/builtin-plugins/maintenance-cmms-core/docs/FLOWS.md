# Maintenance & CMMS Core Flows

## Happy paths

- `maintenance.plans.publish`: Publish Maintenance Plan
- `maintenance.work-orders.release`: Release Maintenance Work Order
- `maintenance.asset-health.record`: Record Asset Health

## Operational scenario matrix

- `preventive-plan-publication`
- `work-order-release`
- `downtime-recording`

## Action-level flows

### `maintenance.plans.publish`

Publish Maintenance Plan

Permission: `maintenance.plans.write`

Business purpose: Expose the plugin’s write boundary through a validated, auditable action contract.

Preconditions:

- Caller input must satisfy the action schema exported by the plugin.
- The caller must satisfy the declared permission and any host-level installation constraints.
- Integration should honor the action’s idempotent semantics.

Side effects:

- Mutates or validates state owned by `maintenance.plans`, `maintenance.work-orders`, `maintenance.asset-health`.
- May schedule or describe follow-up background work.

Forbidden shortcuts:

- Do not bypass the action contract with undocumented service mutations in application code.
- Do not document extra hooks, retries, or lifecycle semantics unless they are explicitly exported here.


### `maintenance.work-orders.release`

Release Maintenance Work Order

Permission: `maintenance.work-orders.write`

Business purpose: Expose the plugin’s write boundary through a validated, auditable action contract.

Preconditions:

- Caller input must satisfy the action schema exported by the plugin.
- The caller must satisfy the declared permission and any host-level installation constraints.
- Integration should honor the action’s non-idempotent semantics.

Side effects:

- Mutates or validates state owned by `maintenance.plans`, `maintenance.work-orders`, `maintenance.asset-health`.
- May schedule or describe follow-up background work.

Forbidden shortcuts:

- Do not bypass the action contract with undocumented service mutations in application code.
- Do not document extra hooks, retries, or lifecycle semantics unless they are explicitly exported here.


### `maintenance.asset-health.record`

Record Asset Health

Permission: `maintenance.asset-health.write`

Business purpose: Expose the plugin’s write boundary through a validated, auditable action contract.

Preconditions:

- Caller input must satisfy the action schema exported by the plugin.
- The caller must satisfy the declared permission and any host-level installation constraints.
- Integration should honor the action’s non-idempotent semantics.

Side effects:

- Mutates or validates state owned by `maintenance.plans`, `maintenance.work-orders`, `maintenance.asset-health`.
- May schedule or describe follow-up background work.

Forbidden shortcuts:

- Do not bypass the action contract with undocumented service mutations in application code.
- Do not document extra hooks, retries, or lifecycle semantics unless they are explicitly exported here.


## Cross-package interactions

- Direct dependencies: `auth-core`, `org-tenant-core`, `role-policy-core`, `audit-core`, `workflow-core`, `assets-core`, `inventory-core`, `support-service-core`, `traceability-core`
- Requested capabilities: `ui.register.admin`, `api.rest.mount`, `data.write.maintenance`, `events.publish.maintenance`
- Integration model: Actions+Resources+Jobs+Workflows+UI
- ERPNext doctypes used as parity references: `Maintenance Schedule`, `Maintenance Visit`, `Asset Maintenance`, `Asset Repair`
- Recovery ownership should stay with the host orchestration layer when the plugin does not explicitly export jobs, workflows, or lifecycle events.
