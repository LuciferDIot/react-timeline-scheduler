import { addDays, format, isAfter, isBefore } from "date-fns";
import { useMemo } from "react";
import { SchedulerTask } from "../../../types";

export function useRowLayout(row: SchedulerTask[], dates: string[]) {
  const taskMap = useMemo(() => {
    const lookup = new Map<string, SchedulerTask | "occupied">();
    if (!dates.length) return lookup;

    const viewStart = new Date(dates[0]);
    const viewEnd = new Date(dates[dates.length - 1]);

    row.forEach((task) => {
      const taskStart = new Date(task.startDate);
      const taskEnd = new Date(task.endDate);

      if (isBefore(taskEnd, viewStart) || isAfter(taskStart, viewEnd)) return;

      let effectiveStart = taskStart;
      if (isBefore(effectiveStart, viewStart)) effectiveStart = viewStart;

      const effectiveStartStr = format(effectiveStart, "yyyy-MM-dd");
      lookup.set(effectiveStartStr, task);

      let current = addDays(effectiveStart, 1);
      while (!isAfter(current, taskEnd)) {
        const dStr = format(current, "yyyy-MM-dd");
        if (!lookup.has(dStr)) lookup.set(dStr, "occupied");
        current = addDays(current, 1);
        if (isAfter(current, viewEnd)) break;
      }
    });

    return lookup;
  }, [row, dates]);

  return { taskMap };
}
