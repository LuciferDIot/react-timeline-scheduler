import { SchedulerConfig, SchedulerTask } from "../../types";

export const demoSchedulerData: SchedulerConfig = {
  label: "Production Schedule",
  data: [
    {
      id: "task1",
      label: "Sewing",
      groupLabel: "Sewing Department",
      groupId: "D01",
      startDate: new Date("2025-02-01"),
      endDate: new Date("2025-02-10"),
      prevEndDate: new Date("2025-02-06"),
      variant: "Style1",
      progress: 45,
      colorKey: "yellow",
      extendedStyles: {
        backgroundColor: "yellow",
        color: "black",
      },
      tooltipComponent: (task: SchedulerTask) => (
        <div>
          <strong>{task.label}</strong>
          <p>Start: {task.startDate.toDateString()}</p>
          <p>End: {task.endDate.toDateString()}</p>
          <p>Progress: {task.progress}%</p>
        </div>
      ),
    },
    {
      id: "task2",
      label: "Cutting",
      groupLabel: "Cutting Department",
      groupId: "D02",
      startDate: new Date("2025-02-05"),
      endDate: new Date("2025-02-15"),
      prevEndDate: new Date("2025-02-07"),
      variant: "Style2",
      progress: 70,
      colorKey: "blue",
      extendedStyles: {
        backgroundColor: "blue",
        color: "white",
      },
      tooltipComponent: (task: SchedulerTask) => (
        <div>
          <strong>{task.label}</strong>
          <p>Start: {task.startDate.toDateString()}</p>
          <p>End: {task.endDate.toDateString()}</p>
          <p>Progress: {task.progress}%</p>
        </div>
      ),
    },
    {
      id: "task3",
      label: "Packing",
      groupLabel: "Packing Department",
      groupId: "D03",
      startDate: new Date("2025-02-10"),
      endDate: new Date("2025-02-20"),
      variant: "Style3",
      progress: 30,
      colorKey: "green",
      extendedStyles: {
        backgroundColor: "black",
        color: "white",
      },
      tooltipComponent: (task: SchedulerTask) => (
        <div>
          <strong>{task.label}</strong>
          <p>Start: {task.startDate.toDateString()}</p>
          <p>End: {task.endDate.toDateString()}</p>
          <p>Progress: {task.progress}%</p>
        </div>
      ),
    },
  ],
  startOffsetDays: 7,
  endOffsetDays: 30,
  resources: [
    "Sewing Department",
    "Cutting Department",
    "Packing Department",
  ],
  styles: {
    customCellWidthPX: 100,
    customCellHeightPX: 40,
    dayColorHighlight: {
      "2025-02-01": [new Date("2025-02-01"), new Date("2025-02-02")],
      "2025-02-10": [new Date("2025-02-10"), new Date("2025-02-12")],
    },
  },
};
