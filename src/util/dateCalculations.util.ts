import {
  differenceInDays,
  differenceInMilliseconds,
  startOfDay,
  addDays,
} from "date-fns";
import { SchedulerTask } from "../types";

export const calculatePercentage = (task: SchedulerTask): number => {
  const totalDuration =
    differenceInDays(task.endDate, task.startDate) + 1;
  const elapsedDuration = task.prevEndDate
    ? differenceInDays(task.endDate, task.prevEndDate)
    : 0;

  const percentage = (elapsedDuration / totalDuration) * 100;
  return 100 - Math.min(100, Math.max(0, percentage));
};

export const generateTableDates = (
  tasks: SchedulerTask[],
  startOffsetDays: number,
  endOffsetDays: number
) => {
  if (tasks.length === 0) {
    const today = new Date();
    return {
      tableStartDate: addDays(today, startOffsetDays),
      tableEndDate: addDays(today, endOffsetDays),
      dates: [],
    };
  }

  const minStartMs = Math.min(...tasks.map((t) => t.startDate.getTime()));
  const maxEndMs = Math.max(...tasks.map((t) => t.endDate.getTime()));

  const taskStartDates = new Date(minStartMs - 2 * 86400000);
  const taskEndDates = new Date(maxEndMs + 2 * 86400000);

  const days = Math.ceil((taskEndDates.getTime() - taskStartDates.getTime()) / 86400000) + 1;
  const dates = Array.from({ length: days }).map((_, index) => {
    const d = addDays(taskStartDates, index);
    return d.toISOString().split("T")[0];
  });

  return { tableStartDate: taskStartDates, tableEndDate: taskEndDates, dates };
};

export const calculateDatesPercentage = (start: Date): number => {
  const dayStart = startOfDay(start);
  const nextDay = addDays(dayStart, 1);
  const totalDuration = differenceInMilliseconds(nextDay, dayStart);
  const elapsedDuration = differenceInMilliseconds(start, dayStart);

  const percentage = (elapsedDuration / totalDuration) * 100;
  return Math.min(100, Math.max(0, percentage));
};
