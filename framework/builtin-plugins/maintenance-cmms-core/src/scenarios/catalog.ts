export const scenarioDefinitions = [
  {
    "id": "preventive-plan-publication",
    "owningPlugin": "maintenance-cmms-core",
    "workflowId": "maintenance-lifecycle",
    "actionIds": [
      "maintenance.plans.publish",
      "maintenance.work-orders.release",
      "maintenance.asset-health.record"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "support.service-orders.dispatch",
        "inventory.transfers.request"
      ],
      "reconcile": [
        "traceability.reconciliation.queue"
      ]
    }
  },
  {
    "id": "work-order-release",
    "owningPlugin": "maintenance-cmms-core",
    "workflowId": "maintenance-lifecycle",
    "actionIds": [
      "maintenance.plans.publish",
      "maintenance.work-orders.release",
      "maintenance.asset-health.record"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "support.service-orders.dispatch",
        "inventory.transfers.request"
      ],
      "reconcile": [
        "traceability.reconciliation.queue"
      ]
    }
  },
  {
    "id": "downtime-recording",
    "owningPlugin": "maintenance-cmms-core",
    "workflowId": "maintenance-lifecycle",
    "actionIds": [
      "maintenance.plans.publish",
      "maintenance.work-orders.release",
      "maintenance.asset-health.record"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "support.service-orders.dispatch",
        "inventory.transfers.request"
      ],
      "reconcile": [
        "traceability.reconciliation.queue"
      ]
    }
  }
] as const;
