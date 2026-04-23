import {
  createBusinessDomainStateStore,
  createBusinessOrchestrationState,
  createBusinessPluginService,
  type BusinessAdvancePrimaryRecordInput,
  type BusinessAmendPrimaryRecordInput,
  type BusinessCreatePrimaryRecordInput,
  type BusinessFailPendingDownstreamItemInput,
  type BusinessPlacePrimaryRecordOnHoldInput,
  type BusinessReconcilePrimaryRecordInput,
  type BusinessReleasePrimaryRecordHoldInput,
  type BusinessReplayDeadLetterInput,
  type BusinessReversePrimaryRecordInput,
  type BusinessResolvePendingDownstreamItemInput
} from "@platform/business-runtime";

import { type ExceptionRecord, type PrimaryRecord, type SecondaryRecord } from "../model";

export type CreatePrimaryRecordInput = BusinessCreatePrimaryRecordInput;
export type AdvancePrimaryRecordInput = BusinessAdvancePrimaryRecordInput;
export type PlacePrimaryRecordOnHoldInput = BusinessPlacePrimaryRecordOnHoldInput;
export type ReleasePrimaryRecordHoldInput = BusinessReleasePrimaryRecordHoldInput;
export type AmendPrimaryRecordInput = BusinessAmendPrimaryRecordInput;
export type ReconcilePrimaryRecordInput = BusinessReconcilePrimaryRecordInput;
export type ReversePrimaryRecordInput = BusinessReversePrimaryRecordInput;
export type ResolvePendingDownstreamItemInput = BusinessResolvePendingDownstreamItemInput;
export type FailPendingDownstreamItemInput = BusinessFailPendingDownstreamItemInput;
export type ReplayDeadLetterInput = BusinessReplayDeadLetterInput;

function seedState() {
  return {
    primaryRecords: [
      {
        id: "maintenance-cmms-core:seed",
        tenantId: "tenant-platform",
        title: "Maintenance & CMMS Core Seed Record",
        counterpartyId: "party:seed",
        companyId: "company:primary",
        branchId: "branch:head-office",
        recordState: "active",
        approvalState: "approved",
        postingState: "unposted",
        fulfillmentState: "none",
        amountMinor: 125000,
        currencyCode: "USD",
        revisionNo: 1,
        reasonCode: null,
        effectiveAt: "2026-04-23T00:00:00.000Z",
        correlationId: "maintenance-cmms-core:seed",
        processId: "maintenance-lifecycle:seed",
        upstreamRefs: [],
        downstreamRefs: [],
        updatedAt: "2026-04-23T00:00:00.000Z"
      }
    ] satisfies PrimaryRecord[],
    secondaryRecords: [] satisfies SecondaryRecord[],
    exceptionRecords: [] satisfies ExceptionRecord[],
    orchestration: createBusinessOrchestrationState()
  };
}

const store = createBusinessDomainStateStore({
  pluginId: "maintenance-cmms-core",
  sqlite: {
    primaryTable: "maintenance_cmms_core_primary_records",
    secondaryTable: "maintenance_cmms_core_secondary_records",
    exceptionTable: "maintenance_cmms_core_exception_records",
    dbFileName: "business-runtime.sqlite"
  },
  postgres: {
    schemaName: "maintenance_cmms_core"
  },
  seedStateFactory: seedState
});

const service = createBusinessPluginService({
  pluginId: "maintenance-cmms-core",
  displayName: "Maintenance & CMMS Core",
  primaryResourceId: "maintenance.plans",
  secondaryResourceId: "maintenance.work-orders",
  exceptionResourceId: "maintenance.asset-health",
  createEvent: "maintenance.plan-published.v1",
  advanceEvent: "maintenance.work-order-released.v1",
  reconcileEvent: "maintenance.asset-health-recorded.v1",
  projectionJobId: "maintenance.projections.refresh",
  reconciliationJobId: "maintenance.reconciliation.run",
  advanceActionLabel: "Release Maintenance Work Order",
  orchestrationTargets: {
  "create": [],
  "advance": [
    "support.service-orders.dispatch",
    "inventory.transfers.request"
  ],
  "reconcile": [
    "traceability.reconciliation.queue"
  ]
},
  store
});

export const {
  listPrimaryRecords,
  listSecondaryRecords,
  listExceptionRecords,
  listPublishedMessages,
  listPendingDownstreamItems,
  listDeadLetters,
  listProjectionRecords,
  getBusinessOverview,
  createPrimaryRecord,
  advancePrimaryRecord,
  placePrimaryRecordOnHold,
  releasePrimaryRecordHold,
  amendPrimaryRecord,
  reconcilePrimaryRecord,
  reversePrimaryRecord,
  resolvePendingDownstreamItem,
  failPendingDownstreamItem,
  replayDeadLetter
} = service;
