import { describe, expect, it } from "vitest";
import { DEFAULT_COUNTS, parseCounts, readCounts } from "./storeCounts";

const row = { faststore: 12, store_framework: 10, wake: 11, wordpress: 2 };

describe("parseCounts", () => {
  it("converte a linha do banco", () => {
    expect(parseCounts(row)).toEqual({ faststore: 12, storeFramework: 10, wake: 11, wordpress: 2 });
  });

  it("recusa número negativo, quebrado ou ausente", () => {
    expect(parseCounts({ ...row, wake: -1 })).toBeNull();
    expect(parseCounts({ ...row, wordpress: 1.5 })).toBeNull();
    expect(parseCounts({ ...row, faststore: null })).toBeNull();
    expect(parseCounts(undefined)).toBeNull();
  });
});

describe("readCounts", () => {
  it("usa os valores padrão sem banco configurado", async () => {
    await expect(readCounts()).resolves.toEqual(DEFAULT_COUNTS);
  });
});
