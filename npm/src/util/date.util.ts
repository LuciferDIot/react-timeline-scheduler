import moment from "moment";
import { ProductionTask } from "../types";

export const calculatePercentage = (task: ProductionTask): number => {
  // Calculate the total duration of the task in days
  const totalDuration =
    moment(task.endDate).diff(moment(task.startDate), "days") + 1;

  // Calculate the elapsed duration in days
  const elapsedDuration = task.prevEndDate
    ? moment(task.endDate).diff(moment(task.prevEndDate), "days")
    : 0;

  // Calculate the percentage of time elapsed
  const percentage = (elapsedDuration / totalDuration) * 100;

  // Ensure the percentage is between 0% and 100%
  return 100 - Math.min(100, Math.max(0, percentage));
};

export function formatDateToCustomString(dateString: string): string {
  // Parse the input date string into a Date object
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  // Get the day of the month
  const dayOfMonth = date.getDate();

  // Get the abbreviated day of the week (e.g., "Mon", "Tue", etc.)
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeek = daysOfWeek[date.getDay()];

  // Combine the day of the month and the day of the week
  return `${dayOfMonth} ${dayOfWeek}`;
}

export const getMonthName = (date: Date): string => {
  return date.toLocaleString("default", { month: "long" });
};

export const generateTableDates = (
  tasks: ProductionTask[],
  startOffsetDays: number,
  endOffsetDays: number
) => {
  if (tasks.length === 0) {
    const startOffSetDay = new Date();
    startOffSetDay.setDate(startOffSetDay.getDate() + startOffsetDays);
    const endOffsetDay = new Date();
    endOffsetDay.setDate(endOffsetDay.getDate() + endOffsetDays);
    return {
      tableStartDate: startOffSetDay,
      tableEndDate: endOffsetDay,
      dates: [],
    };
  }

  const taskStartDates = new Date(
    Math.min(...tasks.map((task) => task.startDate.getTime())) - 2 * 86400000
  );
  const taskEndDates = new Date(
    Math.max(...tasks.map((task) => task.endDate.getTime())) + 2 * 86400000
  );

  const days =
    Math.ceil((taskEndDates.getTime() - taskStartDates.getTime()) / 86400000) +
    1;
  const dates = Array.from({ length: days }).map((_, index) => {
    const date = new Date(taskStartDates);
    date.setDate(taskStartDates.getDate() + index);
    return date.toISOString().split("T")[0];
  });

  return { tableStartDate: taskStartDates, tableEndDate: taskEndDates, dates };
};

export const calculateDatesPercentage = (start: Date): number => {
  // Get the start of the current day (00:00:00)
  const startOfDay = moment(start).startOf("day");

  // Get the start of the next day (00:00:00)
  const startOfNextDay = moment(startOfDay).add(1, "day");

  // Calculate the total duration in milliseconds
  const totalDuration = moment(startOfNextDay).diff(startOfDay, "milliseconds");

  // Calculate the elapsed duration in milliseconds
  const elapsedDuration = moment(start).diff(startOfDay, "milliseconds");

  // Calculate the percentage with decimal precision
  const percentage = (elapsedDuration / totalDuration) * 100;

  // Ensure the percentage is between 0% and 100%
  return Math.min(100, Math.max(0, percentage));
};
