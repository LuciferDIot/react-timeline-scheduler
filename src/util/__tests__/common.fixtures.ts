import { SchedulerTask } from "../../types";

export const sampleTasks: SchedulerTask[] = [
  {
    id: "1",
    label: "Task 1",
    groupLabel: "Engineering",
    groupId: "eng",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-05"),
    variant: "style1",
  },
  {
    id: "2",
    label: "Task 2",
    groupLabel: "Design",
    groupId: "des",
    startDate: new Date("2024-01-02"),
    endDate: new Date("2024-01-06"),
    variant: "style2",
  },
];

export const overlappingTasks: SchedulerTask[] = [
  {
    id: "1",
    label: "Task 1",
    groupLabel: "Engineering",
    groupId: "eng",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-05"),
    variant: "style1",
  },
  {
    id: "2",
    label: "Task 2",
    groupLabel: "Engineering",
    groupId: "eng",
    startDate: new Date("2024-01-03"),
    endDate: new Date("2024-01-07"),
    variant: "style2",
  },
];
