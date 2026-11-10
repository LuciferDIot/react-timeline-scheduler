import { describe, expect, it } from "vitest";
import { startEndDates } from "../startEndDates";
import { SchedulerTask } from "../../../types";

describe("startEndDates helper", () => {
  it("should handle empty tasks array with offsets", () => {
    const { start, end } = startEndDates([], -2, 5);
    expect(start).toBeInstanceOf(Date);
    expect(end).toBeInstanceOf(Date);
    expect(start.getTime()).toBeLessThan(end.getTime());
  });

  it("should properly compute min and max dates plus offsets", () => {
    const tasks: SchedulerTask[] = [
      {
        id: "1",
        label: "T1",
        groupLabel: "G1",
        groupId: "g1",
        startDate: new Date("2024-02-10"),
        endDate: new Date("2024-02-15"),
      },
      {
        id: "2",
        label: "T2",
        groupLabel: "G1",
        groupId: "g1",
        startDate: new Date("2024-02-05"),
        endDate: new Date("2024-02-20"),
      },
    ];

    const { start, end } = startEndDates(tasks, 0, 0);
    // minStart is Feb 5 - 2 days = Feb 3
    // maxEnd is Feb 20 + 2 days = Feb 22
    expect(start.getDate()).toBe(3);
    expect(end.getDate()).toBe(22);
  });
});

