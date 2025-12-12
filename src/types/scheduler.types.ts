export interface TableDateRange {
  start: Date;
  end: Date;
}

export type TableData = {
  tableDate: ProductionTask[];
  isFirstInit: boolean;
};

export enum StripIndex {
  One = "one",
  Two = "Two",
}

export interface ProductionTask {
  id: string;
  label: string;
  departmentName: string;
  departmentId: string;
  startDate: Date;
  endDate: Date;
  prevEndDate?: Date;
  styleAllocationId: string;
  progress?: number;
  bgColorKey?: string;
  discontinue?: {
    startDate: Date;
    endDate: Date;
  };
  extendedStyles?: Omit<React.CSSProperties, "width" | "height">;
  tooltipComponent?: (
    task: ProductionTask,
    index?: StripIndex
  ) => React.ReactNode;
}

export interface SchedulerTheme {
  primary: string;
  secondary: string;
  text: {
    primary: string;
    secondary: string;
  };
  background: {
    primary: string;
    secondary: string;
  };
  border: string;
  row: {
    even: string;
    odd: string;
    hover: string;
  };
  grid: {
    color: string;
  };
  header: {
    background: string;
    text: string;
  };
  task: {
    even: string;
    odd: string;
    hover: string;
    text: string;
  };
}

export interface WeeklyPlanConfigStyles {
  customCellWidthPX?: number;
  customCellHeightPX?: number;
  taskbgColorFormat?: {
    [key: string]: string;
  };
  daybgColorHighlight?: {
    [key: string]: Date[];
  };
}

export interface WeeklyPlanConfig {
  topic: string;
  data: ProductionTask[];
  startOffsetDays?: number;
  endOffsetDays?: number;
  rowCategories?: string[];
  styles?: WeeklyPlanConfigStyles;
  theme?: Partial<SchedulerTheme>;
}

export type ContextMenuType = {
  icon: React.ReactNode;
  label: string;
  onAction: (task: ProductionTask) => void;
};
