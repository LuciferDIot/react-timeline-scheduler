export interface TableDateRange {
  start: Date;
  end: Date;
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
  extendedStyles?: Omit<React.CSSProperties, "width">;
  tooltipComponent?: (task: ProductionTask) => React.ReactNode;
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
