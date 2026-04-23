import { definePackage } from "@platform/kernel";

export default definePackage({
  "id": "maintenance-cmms-core",
  "kind": "plugin",
  "version": "0.1.0",
  "contractVersion": "1.0.0",
  "sourceRepo": "gutu-plugin-maintenance-cmms-core",
  "displayName": "Maintenance & CMMS Core",
  "domainGroup": "Operational Data",
  "defaultCategory": {
    "id": "business",
    "label": "Business",
    "subcategoryId": "assets_lifecycle",
    "subcategoryLabel": "Assets & Lifecycle"
  },
  "description": "Preventive maintenance plans, asset work orders, inspections, and downtime-aware service coordination for asset-intensive operations.",
  "extends": [],
  "dependsOn": [
    "auth-core",
    "org-tenant-core",
    "role-policy-core",
    "audit-core",
    "workflow-core",
    "assets-core",
    "traceability-core"
  ],
  "dependencyContracts": [
    {
      "packageId": "auth-core",
      "class": "required",
      "rationale": "Required for Maintenance & CMMS Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "org-tenant-core",
      "class": "required",
      "rationale": "Required for Maintenance & CMMS Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "role-policy-core",
      "class": "required",
      "rationale": "Required for Maintenance & CMMS Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "audit-core",
      "class": "required",
      "rationale": "Required for Maintenance & CMMS Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "workflow-core",
      "class": "required",
      "rationale": "Required for Maintenance & CMMS Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "assets-core",
      "class": "required",
      "rationale": "Required for Maintenance & CMMS Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "traceability-core",
      "class": "required",
      "rationale": "Required for Maintenance & CMMS Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "inventory-core",
      "class": "optional",
      "rationale": "Recommended with Maintenance & CMMS Core for smoother production adoption and operator experience."
    },
    {
      "packageId": "support-service-core",
      "class": "capability-enhancing",
      "rationale": "Improves Maintenance & CMMS Core with deeper downstream automation, visibility, or workflow coverage."
    },
    {
      "packageId": "field-service-core",
      "class": "capability-enhancing",
      "rationale": "Improves Maintenance & CMMS Core with deeper downstream automation, visibility, or workflow coverage."
    },
    {
      "packageId": "hr-payroll-core",
      "class": "capability-enhancing",
      "rationale": "Improves Maintenance & CMMS Core with deeper downstream automation, visibility, or workflow coverage."
    },
    {
      "packageId": "analytics-bi-core",
      "class": "capability-enhancing",
      "rationale": "Improves Maintenance & CMMS Core with deeper downstream automation, visibility, or workflow coverage."
    }
  ],
  "recommendedPlugins": [
    "inventory-core"
  ],
  "capabilityEnhancingPlugins": [
    "support-service-core",
    "field-service-core",
    "hr-payroll-core",
    "analytics-bi-core"
  ],
  "integrationOnlyPlugins": [],
  "suggestedPacks": [
    "sector-manufacturing"
  ],
  "standaloneSupported": false,
  "installNotes": [
    "Maintenance is best introduced once Assets exists, otherwise work orders lack a stable installed-base anchor."
  ],
  "optionalWith": [
    "inventory-core"
  ],
  "conflictsWith": [],
  "providesCapabilities": [
    "maintenance.plans",
    "maintenance.work-orders",
    "maintenance.asset-health"
  ],
  "requestedCapabilities": [
    "ui.register.admin",
    "api.rest.mount",
    "data.write.maintenance",
    "events.publish.maintenance"
  ],
  "ownsData": [
    "maintenance.plans",
    "maintenance.work-orders",
    "maintenance.asset-health",
    "maintenance.downtime-events"
  ],
  "extendsData": [],
  "publicCommands": [
    "maintenance.plans.publish",
    "maintenance.work-orders.release",
    "maintenance.asset-health.record",
    "maintenance.plans.hold",
    "maintenance.plans.release",
    "maintenance.plans.amend",
    "maintenance.plans.reverse"
  ],
  "publicQueries": [
    "maintenance.plan-summary",
    "maintenance.downtime-summary"
  ],
  "publicEvents": [
    "maintenance.plan-published.v1",
    "maintenance.work-order-released.v1",
    "maintenance.asset-health-recorded.v1"
  ],
  "domainCatalog": {
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
  },
  "slotClaims": [],
  "trustTier": "first-party",
  "reviewTier": "R1",
  "isolationProfile": "same-process-trusted",
  "compatibility": {
    "framework": "^0.1.0",
    "runtime": "bun>=1.3.12",
    "db": [
      "postgres",
      "sqlite"
    ]
  }
});
