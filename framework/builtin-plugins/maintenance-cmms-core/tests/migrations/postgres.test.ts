import { describe, expect, it } from "bun:test";

import {
  buildMaintenanceCmmsCoreMigrationSql,
  buildMaintenanceCmmsCoreRollbackSql,
  getMaintenanceCmmsCoreLookupIndexName,
  getMaintenanceCmmsCoreStatusIndexName
} from "../../src/postgres";

describe("maintenance-cmms-core postgres helpers", () => {
  it("creates the business tables and indexes", () => {
    const sql = buildMaintenanceCmmsCoreMigrationSql().join("\n");

    expect(sql).toContain("CREATE TABLE IF NOT EXISTS maintenance_cmms_core.primary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS maintenance_cmms_core.secondary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS maintenance_cmms_core.exception_records");
    expect(sql).toContain(getMaintenanceCmmsCoreLookupIndexName());
    expect(sql).toContain(getMaintenanceCmmsCoreStatusIndexName());
  });

  it("rolls the schema back safely", () => {
    const sql = buildMaintenanceCmmsCoreRollbackSql({ schemaName: "maintenance_cmms_core_preview", dropSchema: true }).join("\n");
    expect(sql).toContain("DROP TABLE IF EXISTS maintenance_cmms_core_preview.exception_records");
    expect(sql).toContain("DROP SCHEMA IF EXISTS maintenance_cmms_core_preview CASCADE");
  });
});
