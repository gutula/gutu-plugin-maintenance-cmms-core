import {
  advancePrimaryRecord,
  amendPrimaryRecord,
  createPrimaryRecord,
  placePrimaryRecordOnHold,
  reconcilePrimaryRecord,
  releasePrimaryRecordHold,
  reversePrimaryRecord,
  type AdvancePrimaryRecordInput,
  type AmendPrimaryRecordInput,
  type CreatePrimaryRecordInput,
  type PlacePrimaryRecordOnHoldInput,
  type ReconcilePrimaryRecordInput,
  type ReleasePrimaryRecordHoldInput,
  type ReversePrimaryRecordInput
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
  },
  {
    "id": "maintenance.plans.hold",
    "label": "Place Record On Hold",
    "phase": "hold",
    "methodName": "placeRecordOnHold"
  },
  {
    "id": "maintenance.plans.release",
    "label": "Release Record Hold",
    "phase": "release",
    "methodName": "releaseRecordHold"
  },
  {
    "id": "maintenance.plans.amend",
    "label": "Amend Record",
    "phase": "amend",
    "methodName": "amendRecord"
  },
  {
    "id": "maintenance.plans.reverse",
    "label": "Reverse Record",
    "phase": "reverse",
    "methodName": "reverseRecord"
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

export async function placeRecordOnHold(input: PlacePrimaryRecordOnHoldInput) {
  return placePrimaryRecordOnHold(input);
}

export async function releaseRecordHold(input: ReleasePrimaryRecordHoldInput) {
  return releasePrimaryRecordHold(input);
}

export async function amendRecord(input: AmendPrimaryRecordInput) {
  return amendPrimaryRecord(input);
}

export async function reverseRecord(input: ReversePrimaryRecordInput) {
  return reversePrimaryRecord(input);
}
