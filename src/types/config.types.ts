import { SchedulerTask } from "./task.types";

export interface DragConfig {
  enableLeftResize?: boolean;
  enableRightResize?: boolean;
  autoScroll?: {
    enabled?: boolean;
    edgeZone?: number;
    maxSpeed?: number;
  };
  snapToGrid?: boolean;
  minTaskDuration?: number;
}

export interface AnimationConfig {
  enabled?: boolean;
  taskResize?: {
    duration?: number;
    ease?: string | number[];
  };
  cellExpand?: {
    duration?: number;
    ease?: string | number[];
  };
}

export interface ButtonStyle {
  background?: string;
  color?: string;
  border?: string;
}

export interface ContextMenuType {
  label: string;
  icon?: React.ReactNode;
  onAction?: (task: SchedulerTask) => void;
  onClick?: (task: SchedulerTask) => void;
}
