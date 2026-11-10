import React from "react";

export interface TableDateRange {
  start: Date;
  end: Date;
}

export type TableData = {
  tasks: SchedulerTask[];
  isFirstInit: boolean;
};

export enum StripIndex {
  One = "one",
  Two = "Two",
}

export interface SchedulerTask {
  id: string;
  label: string;
  groupLabel: string;
  groupId: string;
  startDate: Date;
  endDate: Date;
  prevEndDate?: Date;
  variant?: string;
  progress?: number;
  colorKey?: string;
  bgColor?: string;
  borderColor?: string;
  discontinue?: {
    startDate: Date;
    endDate: Date;
  };
  extendedStyles?: Omit<React.CSSProperties, "width" | "height">;
  tooltipComponent?: (
    task: SchedulerTask,
    index?: StripIndex
  ) => React.ReactNode;
}

