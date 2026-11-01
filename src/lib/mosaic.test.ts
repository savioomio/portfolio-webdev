import { describe, expect, it } from "vitest";
import { mosaicRows } from "./mosaic";

const self = (ratio: number) => ratio;

describe("mosaicRows", () => {
  it("varia a quantidade de mídias por linha", () => {
    const rows = mosaicRows([1.6, 1.6, 1.6, 1.6, 1.6, 1.6], self);
    expect(rows.map((row) => row.length)).toEqual([1, 2, 2, 1]);
  });

  it("não deixa uma mídia sozinha e alta no fim", () => {
    expect(mosaicRows([1.77, 0.56, 1], self)).toEqual([[1.77, 0.56, 1]]);
  });

  it("mantém todas as mídias, na ordem", () => {
    const items = [0.45, 0.45, 0.45, 0.45, 0.45, 0.45];
    expect(mosaicRows(items, self).flat()).toEqual(items);
  });

  it("aceita uma lista vazia", () => {
    expect(mosaicRows([], self)).toEqual([]);
  });
});
