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
    currentDateLine?: string;
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
    border?: string;
  };
  toolbar?: {
    icon?: string;
    background?: string;
    text?: string;
  };
  progressBar?: {
    background?: string;
  };
  tooltip?: {
    background?: string;
    text?: string;
    border?: string;
  };
  resize?: {
    handleBackground?: string;
    handleHoverBackground?: string;
  };
  interactive?: {
    focus?: string;
  };
}

export interface SchedulerConfigStyles {
  customCellWidthPX?: number;
  customCellHeightPX?: number;
  taskColorFormat?: {
    [key: string]: string;
  };
  dayColorHighlight?: {
    [key: string]: Date[];
  };
}

export interface SchedulerThemeConfig {
  mode?: "light" | "dark";
  light?: Partial<SchedulerTheme>;
  dark?: Partial<SchedulerTheme>;
}

export interface SchedulerConfig {
  label: string;
  data: SchedulerTask[];
  startOffsetDays?: number;
  endOffsetDays?: number;
  resources?: string[];
  styles?: SchedulerConfigStyles;
  theme?: Partial<SchedulerTheme> | SchedulerThemeConfig;
  dragConfig?: DragConfig;
  disableToolbar?: boolean;
  animationConfig?: AnimationConfig;
}

export type ContextMenuType = {
  icon: React.ReactNode;
  label: string;
  onAction: (task: SchedulerTask) => void;
};
