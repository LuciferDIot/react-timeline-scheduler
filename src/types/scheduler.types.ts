export interface TableDateRange {
  start: Date;
  end: Date;
}

export interface Coordination {
  x: number | null;
  y: number | null;
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
}

export type ContextMenuType = {
  icon: React.ReactNode;
  label: string;
  onAction: (task: ProductionTask) => void;
};
