export const domainCatalog = {
  "erpnextModules": [
    "Maintenance",
    "Assets"
  ],
  "erpnextDoctypes": [
    "Maintenance Schedule",
    "Maintenance Visit",
    "Asset Maintenance",
    "Asset Repair"
  ],
  "ownedEntities": [
    "Maintenance Plan",
    "Work Order",
    "Downtime Event",
    "Asset Health Record",
    "Preventive Schedule"
  ],
  "reports": [
    "Maintenance Plan Summary",
    "Downtime Summary",
    "Preventive Compliance"
  ],
  "exceptionQueues": [
    "overdue-maintenance",
    "downtime-escalation",
    "maintenance-plan-review"
  ],
  "operationalScenarios": [
    "preventive-plan-publication",
    "work-order-release",
    "downtime-recording"
  ],
  "settingsSurfaces": [
    "Maintenance Schedule",
    "Asset Maintenance Team"
  ],
  "edgeCases": [
    "missed preventive schedule",
    "asset under repair during active assignment",
    "downtime overlap"
  ]
} as const;
