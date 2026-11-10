import React from "react";
import { DragConfig, AnimationConfig } from "./config.types";
import { SchedulerTask } from "./task.types";
import { SchedulerTheme, SchedulerThemeConfig } from "./theme.types";

export * from "./task.types";
export * from "./config.types";
export * from "./theme.types";

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

export interface CustomRenderProps {
  loadingComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
}
