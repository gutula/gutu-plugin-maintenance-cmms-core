export const reportDefinitions = [
  {
    "id": "maintenance-cmms-core.report.01",
    "label": "Maintenance Plan Summary",
    "owningPlugin": "maintenance-cmms-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "overdue-maintenance",
      "downtime-escalation",
      "maintenance-plan-review"
    ]
  },
  {
    "id": "maintenance-cmms-core.report.02",
    "label": "Downtime Summary",
    "owningPlugin": "maintenance-cmms-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "overdue-maintenance",
      "downtime-escalation",
      "maintenance-plan-review"
    ]
  },
  {
    "id": "maintenance-cmms-core.report.03",
    "label": "Preventive Compliance",
    "owningPlugin": "maintenance-cmms-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "overdue-maintenance",
      "downtime-escalation",
      "maintenance-plan-review"
    ]
  }
] as const;
