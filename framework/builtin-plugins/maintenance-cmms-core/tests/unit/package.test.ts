import { describe, expect, it } from "bun:test";
import { domainCatalog } from "../../src/domain/catalog";
import { exceptionQueueDefinitions } from "../../src/exceptions/catalog";
import { businessFlowDefinitions, publishMaintenancePlan, releaseMaintenanceWorkOrder, recordAssetHealth } from "../../src/flows/catalog";
import { reportDefinitions } from "../../src/reports/catalog";
import { scenarioDefinitions } from "../../src/scenarios/catalog";
import { settingsSurfaceDefinitions } from "../../src/settings/catalog";
import manifest from "../../package";

describe("plugin manifest", () => {
  it("keeps a stable package id and business contract surface", () => {
    expect(manifest.id).toBe("maintenance-cmms-core");
    expect(manifest.kind).toBe("plugin");
    expect(manifest.publicCommands).toContain("maintenance.plans.publish");
    expect(manifest.publicEvents).toContain("maintenance.plan-published.v1");
  });
});

describe("domain catalog", () => {
  it("keeps ERPNext parity references and operational surfaces visible", () => {
    expect(domainCatalog.ownedEntities.length).toBeGreaterThan(0);
    expect(domainCatalog.reports.length).toBeGreaterThan(0);
    expect(domainCatalog.exceptionQueues.length).toBeGreaterThan(0);
    expect(domainCatalog.operationalScenarios.length).toBeGreaterThan(0);
    expect(reportDefinitions).toHaveLength(domainCatalog.reports.length);
    expect(exceptionQueueDefinitions).toHaveLength(domainCatalog.exceptionQueues.length);
    expect(scenarioDefinitions).toHaveLength(domainCatalog.operationalScenarios.length);
    expect(settingsSurfaceDefinitions).toHaveLength(domainCatalog.settingsSurfaces.length);
    expect(businessFlowDefinitions).toHaveLength(manifest.publicCommands.length);
    expect(typeof publishMaintenancePlan).toBe("function");
    expect(typeof releaseMaintenanceWorkOrder).toBe("function");
    expect(typeof recordAssetHealth).toBe("function");
  });
});
