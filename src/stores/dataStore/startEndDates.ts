import { addDays, isAfter, isBefore } from "date-fns";
import { SchedulerTask } from "../../types";

export const startEndDates = (
  tasks: SchedulerTask[],
  startOffsetDays: number,
  endOffsetDays: number
): { start: Date; end: Date } => {
  if (tasks.length === 0) {
    const today = new Date();
    return {
      start: addDays(today, startOffsetDays),
      end: addDays(today, endOffsetDays),
    };
  }

  let minStart = new Date(tasks[0].startDate);
  let maxEnd = new Date(tasks[0].endDate);

  for (let i = 1; i < tasks.length; i++) {
    const taskStart = new Date(tasks[i].startDate);
    const taskEnd = new Date(tasks[i].endDate);
    if (isBefore(taskStart, minStart)) minStart = taskStart;
    if (isAfter(taskEnd, maxEnd)) maxEnd = taskEnd;
  }

  return {
    start: addDays(minStart, -Math.abs(startOffsetDays) - 2),
    end: addDays(maxEnd, Math.abs(endOffsetDays) + 2),
  };
};
