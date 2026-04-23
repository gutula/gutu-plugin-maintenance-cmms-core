import { defineResource } from "@platform/schema";

import {
  primaryRecordsTable,
  secondaryRecordsTable,
  exceptionRecordsTable
} from "../../db/schema";
import { exceptionRecordSchema, primaryRecordSchema, secondaryRecordSchema } from "../model";

export const BusinessPrimaryResource = defineResource({
  id: "maintenance.plans",
  description: "Preventive and corrective maintenance planning records.",
  businessPurpose: "Own maintenance planning separately from assets, inventory, and support truth.",
  table: primaryRecordsTable,
  contract: primaryRecordSchema,
  fields: {
    title: { searchable: true, sortable: true, label: "Title" },
    recordState: { filter: "select", label: "Record State" },
    approvalState: { filter: "select", label: "Approval" },
    postingState: { filter: "select", label: "Posting" },
    fulfillmentState: { filter: "select", label: "Fulfillment" },
    updatedAt: { sortable: true, label: "Updated" }
  },
  admin: {
    autoCrud: true,
    defaultColumns: ["title", "recordState", "approvalState", "postingState", "fulfillmentState", "updatedAt"]
  },
  portal: { enabled: false }
});

export const BusinessSecondaryResource = defineResource({
  id: "maintenance.work-orders",
  description: "Maintenance work orders, execution posture, and follow-up records.",
  businessPurpose: "Track maintenance execution explicitly across preventive and corrective work.",
  table: secondaryRecordsTable,
  contract: secondaryRecordSchema,
  fields: {
    label: { searchable: true, sortable: true, label: "Label" },
    status: { filter: "select", label: "Status" },
    requestedAction: { searchable: true, sortable: true, label: "Requested Action" },
    updatedAt: { sortable: true, label: "Updated" }
  },
  admin: {
    autoCrud: true,
    defaultColumns: ["label", "status", "requestedAction", "updatedAt"]
  },
  portal: { enabled: false }
});

export const BusinessExceptionResource = defineResource({
  id: "maintenance.asset-health",
  description: "Condition, downtime, and serviceability records linked to maintained assets.",
  businessPurpose: "Make asset-health posture explicit for planning and operational repair.",
  table: exceptionRecordsTable,
  contract: exceptionRecordSchema,
  fields: {
    severity: { filter: "select", label: "Severity" },
    status: { filter: "select", label: "Status" },
    reasonCode: { searchable: true, sortable: true, label: "Reason" },
    updatedAt: { sortable: true, label: "Updated" }
  },
  admin: {
    autoCrud: true,
    defaultColumns: ["severity", "status", "reasonCode", "updatedAt"]
  },
  portal: { enabled: false }
});

export const businessResources = [
  BusinessPrimaryResource,
  BusinessSecondaryResource,
  BusinessExceptionResource
] as const;
