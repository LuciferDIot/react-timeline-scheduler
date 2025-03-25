import { create } from "zustand";
import { ProductionTask, StripIndex } from "../types/scheduler.types";
import { Coordination } from "../types";

interface ChildrenState {
  mouseCoordination: Coordination;
  tooltipVisible: React.ReactNode | null;
  rightClickTask: ProductionTask | null;
  hasHydrated: boolean;
  defaultTooltipComponent:
    | ((task: ProductionTask, index?: StripIndex) => React.ReactNode)
    | null;

  setMouseCoordination: (coordination: Coordination) => void;
  removeTooltip: () => void;
  setTooltipVisible: (tooltip: React.ReactNode) => void;
  removeRightClickTask: () => void;
  setrightClickTask: (task: ProductionTask) => void;
  setDefaultTooltipComponent: (
    action: (task: ProductionTask, index?: StripIndex) => React.ReactNode
  ) => void;
}

export const useChildStore = create<ChildrenState>((set) => ({
  rowLableMaxWidth: 0,
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
  setrightClickTask: (task) => set(() => ({ rightClickTask: task })),
  setDefaultTooltipComponent: (action) =>
    set(() => ({ defaultTooltipComponent: action })),
}));
