import { ProductionTask } from "../types";

export const generateGroupedTasks = (tasks: ProductionTask[]) => {
  return tasks.reduce<Record<string, ProductionTask[][]>>((acc, task) => {
    if (!acc[task.departmentName]) acc[task.departmentName] = [[]];

    const lineRows = acc[task.departmentName];
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
