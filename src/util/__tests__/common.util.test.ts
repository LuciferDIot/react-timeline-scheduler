import { describe, expect, it } from "vitest";
import { generateGroupedTasks } from "../common.util";
import { sampleTasks, overlappingTasks } from "./common.fixtures";

describe("generateGroupedTasks", () => {
  it("should group tasks by group label", () => {
    const grouped = generateGroupedTasks(sampleTasks);
    expect(grouped).toHaveProperty("Engineering");
    expect(grouped).toHaveProperty("Design");
    expect(grouped.Engineering[0]).toContainEqual(sampleTasks[0]);
    expect(grouped.Design[0]).toContainEqual(sampleTasks[1]);
  });

  it("should handle overlapping tasks in same group", () => {
    const grouped = generateGroupedTasks(overlappingTasks);
    expect(grouped.Engineering.length).toBe(2);
    expect(grouped.Engineering[0]).toContainEqual(overlappingTasks[0]);
    expect(grouped.Engineering[1]).toContainEqual(overlappingTasks[1]);
  });
});
