import { describe, expect, it } from "bun:test";

import {
  buildMaintenanceCmmsCoreSqliteMigrationSql,
  buildMaintenanceCmmsCoreSqliteRollbackSql,
  getMaintenanceCmmsCoreSqliteLookupIndexName,
  getMaintenanceCmmsCoreSqliteStatusIndexName
} from "../../src/sqlite";

describe("maintenance-cmms-core sqlite helpers", () => {
  it("creates the business tables and indexes", () => {
    const sql = buildMaintenanceCmmsCoreSqliteMigrationSql().join("\n");

    expect(sql).toContain("CREATE TABLE IF NOT EXISTS maintenance_cmms_core_primary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS maintenance_cmms_core_secondary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS maintenance_cmms_core_exception_records");
    expect(sql).toContain(getMaintenanceCmmsCoreSqliteLookupIndexName("maintenance_cmms_core_"));
    expect(sql).toContain(getMaintenanceCmmsCoreSqliteStatusIndexName("maintenance_cmms_core_"));
  });

  it("rolls the sqlite tables back safely", () => {
    const sql = buildMaintenanceCmmsCoreSqliteRollbackSql({ tablePrefix: "maintenance_cmms_core_preview_" }).join("\n");
    expect(sql).toContain("DROP TABLE IF EXISTS maintenance_cmms_core_preview_exception_records");
  });
});
