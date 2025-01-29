import { ProductionTask, WeeklyPlanConfig } from "../../types";

export const demoSchedulerData: WeeklyPlanConfig = {
  data: [
    {
      id: "task1",
      label: "Sewing",
      departmentName: "Sewing Department",
      departmentId: "D01",
      startDate: new Date("2025-02-01"),
      endDate: new Date("2025-02-10"),
      prevEndDate: new Date("2025-01-30"),
      styleAllocationId: "Style1",
      progress: 45,
      bgColorKey: "yellow",
      extendedStyles: {
        backgroundColor: "yellow",
        color: "black",
      },
      tooltipComponent: (task: ProductionTask) => (
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
      departmentName: "Cutting Department",
      departmentId: "D02",
      startDate: new Date("2025-02-05"),
      endDate: new Date("2025-02-15"),
      prevEndDate: new Date("2025-02-03"),
      styleAllocationId: "Style2",
      progress: 70,
      bgColorKey: "blue",
      extendedStyles: {
        backgroundColor: "blue",
        color: "white",
      },
      tooltipComponent: (task: ProductionTask) => (
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
      departmentName: "Packing Department",
      departmentId: "D03",
      startDate: new Date("2025-02-10"),
      endDate: new Date("2025-02-20"),
      styleAllocationId: "Style3",
      progress: 30,
      bgColorKey: "green",
      extendedStyles: {
        backgroundColor: "green",
        color: "white",
      },
      tooltipComponent: (task: ProductionTask) => (
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
  rowCategories: [
    "Sewing Department",
    "Cutting Department",
    "Packing Department",
  ],
  styles: {
    customCellWidthPX: 100,
    customCellHeightPX: 40,
    taskbgColorFormat: {
      yellow: "lightyellow",
      blue: "lightblue",
      green: "lightgreen",
    },
    daybgColorHighlight: {
      "2025-02-01": [new Date("2025-02-01"), new Date("2025-02-02")],
      "2025-02-10": [new Date("2025-02-10"), new Date("2025-02-12")],
    },
  },
};
