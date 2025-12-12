import { SchedulerTask } from "../types";

export const generateGroupedTasks = (tasks: SchedulerTask[]) => {
  return tasks.reduce<Record<string, SchedulerTask[][]>>((acc, task) => {
    if (!acc[task.groupLabel]) acc[task.groupLabel] = [[]];

    const lineRows = acc[task.groupLabel];
    let placed = false;

    for (const row of lineRows) {
      const conflict = row.some(
        (t) => t.startDate <= task.endDate && t.endDate >= task.startDate
      );
      if (!conflict) {
        row.push(task);
        placed = true;
        break;
      }
    }

    if (!placed) lineRows.push([task]);
    return acc;
  }, {});
};
