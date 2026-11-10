import { create } from "zustand";
import { Coordination, SchedulerTask, StripIndex } from "../types";

export interface ChildrenState {
  mouseCoordination: Coordination;
  tooltipVisible: React.ReactNode | null;
  rightClickTask: SchedulerTask | null;
  hasHydrated: boolean;
  defaultTooltipComponent:
    | ((task: SchedulerTask, index?: StripIndex) => React.ReactNode)
    | null;

  setMouseCoordination: (coordination: Coordination) => void;
  removeTooltip: () => void;
  setTooltipVisible: (tooltip: React.ReactNode) => void;
  removeRightClickTask: () => void;
  setRightClickTask: (task: SchedulerTask) => void;
  setrightClickTask: (task: SchedulerTask) => void;
  setDefaultTooltipComponent: (
    action: (task: SchedulerTask, index?: StripIndex) => React.ReactNode
  ) => void;
}

export const useChildStore = create<ChildrenState>((set) => ({
  mouseCoordination: { x: null, y: null },
  tooltipVisible: null,
  rightClickTask: null,
  hasHydrated: false,
  defaultTooltipComponent: null,

  setMouseCoordination: (coordination) =>
    set(() => ({ mouseCoordination: coordination })),
  removeTooltip: () => set(() => ({ tooltipVisible: null })),
  setTooltipVisible: (tooltip) => set(() => ({ tooltipVisible: tooltip })),
  removeRightClickTask: () => set(() => ({ rightClickTask: null })),
  setRightClickTask: (task) => set(() => ({ rightClickTask: task })),
  setrightClickTask: (task) => set(() => ({ rightClickTask: task })),
  setDefaultTooltipComponent: (action) =>
    set(() => ({ defaultTooltipComponent: action })),
}));
