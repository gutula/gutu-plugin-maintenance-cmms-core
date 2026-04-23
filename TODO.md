# Maintenance & CMMS Core TODO

**Maturity Tier:** `Hardened`

## Shipped Now

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

## Current Gaps

- Repo-local documentation verification entrypoints were missing before this pass and need to stay green as the repo evolves.

## Recommended Next

- Deepen downtime, inspection, and preventive scheduling coverage as more asset-intensive flows rely on the maintenance contract.
- Clarify support, inventory, and asset-reconciliation handoffs before broader CMMS usage expands.
- Broaden lifecycle coverage with deeper orchestration, reconciliation, and operator tooling where the business flow requires it.
- Add more explicit domain events or follow-up job surfaces when downstream systems need tighter coupling.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `Maintenance Schedule`, `Maintenance Visit`, `Asset Maintenance`.

## Later / Optional

- Outbound connectors, richer analytics, or portal-facing experiences once the core domain contracts harden.
