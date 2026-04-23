export const exceptionQueueDefinitions = [
  {
    "id": "overdue-maintenance",
    "label": "Overdue Maintenance",
    "severity": "medium",
    "owner": "planner",
    "reconciliationJobId": "maintenance.reconciliation.run"
  },
  {
    "id": "downtime-escalation",
    "label": "Downtime Escalation",
    "severity": "medium",
    "owner": "planner",
    "reconciliationJobId": "maintenance.reconciliation.run"
  },
  {
    "id": "maintenance-plan-review",
    "label": "Maintenance Plan Review",
    "severity": "medium",
    "owner": "planner",
    "reconciliationJobId": "maintenance.reconciliation.run"
  }
] as const;
