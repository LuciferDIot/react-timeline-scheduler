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
  styleAllocationId?: string;
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

/**
 * Configuration for drag-to-resize behavior
 */
export interface DragConfig {
  /** Enable left-side resize handle */
  enableLeftResize?: boolean;
  /** Enable right-side resize handle */
  enableRightResize?: boolean;
  /** Auto-scroll configuration when dragging near edges */
  autoScroll?: {
    /** Enable auto-scrolling */
    enabled?: boolean;
    /** Distance from edge to trigger scroll (in pixels) */
    edgeZone?: number;
    /** Maximum scroll speed per frame (in pixels) */
    maxSpeed?: number;
  };
  /** Snap task resize to grid boundaries */
  snapToGrid?: boolean;
  /** Minimum task duration in days */
  minTaskDuration?: number;
}

/**
 * Configuration for animations
 */
export interface AnimationConfig {
  /** Enable all animations */
  enabled?: boolean;
  /** Task resize animation */
  taskResize?: {
    /** Animation duration in seconds */
    duration?: number;
    /** Easing function (framer-motion easing) */
    ease?: string | number[];
  };
  /** Cell expand/collapse animation */
  cellExpand?: {
    /** Animation duration in seconds */
    duration?: number;
    /** Easing function (framer-motion easing) */
    ease?: string | number[];
  };
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
  dragConfig?: DragConfig;
  animationConfig?: AnimationConfig;
}

export type ContextMenuType = {
  icon: React.ReactNode;
  label: string;
  onAction: (task: ProductionTask) => void;
};
