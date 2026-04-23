import {
  advancePrimaryRecord,
  createPrimaryRecord,
  reconcilePrimaryRecord,
  type AdvancePrimaryRecordInput,
  type CreatePrimaryRecordInput,
  type ReconcilePrimaryRecordInput
} from "../services/main.service";

export const businessFlowDefinitions = [
  {
    "id": "maintenance.plans.publish",
    "label": "Publish Maintenance Plan",
    "phase": "create",
    "methodName": "publishMaintenancePlan"
  },
  {
    "id": "maintenance.work-orders.release",
    "label": "Release Maintenance Work Order",
    "phase": "advance",
    "methodName": "releaseMaintenanceWorkOrder"
  },
  {
    "id": "maintenance.asset-health.record",
    "label": "Record Asset Health",
    "phase": "reconcile",
    "methodName": "recordAssetHealth"
  }
] as const;

export async function publishMaintenancePlan(input: CreatePrimaryRecordInput) {
  return createPrimaryRecord(input);
}

export async function releaseMaintenanceWorkOrder(input: AdvancePrimaryRecordInput) {
  return advancePrimaryRecord(input);
}

export async function recordAssetHealth(input: ReconcilePrimaryRecordInput) {
  return reconcilePrimaryRecord(input);
}
