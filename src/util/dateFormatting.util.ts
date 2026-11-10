import { format } from "date-fns";

export function formatDateToCustomString(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }
  return format(date, "d eee");
}

export const getMonthName = (date: Date): string => {
  return date.toLocaleString("default", { month: "long" });
};
