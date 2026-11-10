import { describe, expect, it } from "vitest";
import { deepMerge } from "../objectUtils";

describe("deepMerge", () => {
  it("should merge simple shallow properties", () => {
    const target = { a: 1, b: 2 };
    const result = deepMerge(target, { b: 3, c: 4 });
    expect(result).toEqual({ a: 1, b: 3, c: 4 });
  });

  it("should merge nested objects without mutating source", () => {
    const target = { a: { x: 1, y: 2 }, b: 2 };
    const source = { a: { y: 3, z: 4 } };
    const result = deepMerge(target, source);
    expect(result).toEqual({ a: { x: 1, y: 3, z: 4 }, b: 2 });
    expect(target.a.y).toBe(2);
  });
});
