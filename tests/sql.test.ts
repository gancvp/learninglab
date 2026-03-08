import { describe, expect, it } from "vitest";
import { isSafeSqlQuery } from "@/lib/sql";

describe("sql safety", () => {
  it("allows select queries", () => {
    expect(isSafeSqlQuery("SELECT * FROM students").ok).toBe(true);
  });

  it("blocks destructive queries", () => {
    const result = isSafeSqlQuery("DROP TABLE students");
    expect(result.ok).toBe(false);
  });

  it("blocks update statements even inside text", () => {
    const result = isSafeSqlQuery("WITH data AS (SELECT 1) UPDATE students SET name = 'x'");
    expect(result.ok).toBe(false);
  });
});
