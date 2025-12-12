import { create } from "zustand";
import { AnimationConfig, DragConfig, SchedulerTask } from "../types";

interface ActionStoreState {
  scrollIntoToday: boolean;
  lockOperations: boolean;
  dragConfig: DragConfig;
  animationConfig: AnimationConfig;

  setLockOperations: () => void;
  setDragConfig: (config: DragConfig) => void;
  setAnimationConfig: (config: AnimationConfig) => void;
  onTaskClick?: (task: SchedulerTask) => void;
  onRowExpand?: (
    groupLabel: string,
    groupId: string,
    task: SchedulerTask
  ) => Promise<void>;
  onRowShrink?: (
    groupLabel: string,
    groupId: string,
    task: SchedulerTask
  ) => Promise<void>;
  onRowLabelClick?: (groupLabel: string) => void;
  setAll: (state: Partial<ActionStoreState>) => void;
}

export const useActionStore = create<ActionStoreState>((set) => ({
  scrollIntoToday: false,
  lockOperations: false,
  dragConfig: {
    enableLeftResize: true,
    enableRightResize: true,
    autoScroll: {
      enabled: true,
      edgeZone: 50,
      maxSpeed: 20,
    },
    snapToGrid: false,
    minTaskDuration: 1,
  },
  animationConfig: {
    enabled: true,
    taskResize: {
      duration: 0.3,
      ease: "easeOut",
    },
    cellExpand: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  onTaskClick: () => {},
  onRowExpand: () => Promise.resolve(),
  onRowShrink: () => Promise.resolve(),
  onRowLabelClick: () => {},

  setLockOperations: () =>
    set((state) => ({ lockOperations: !state.lockOperations })),
  setDragConfig: (dragConfig) => set({ dragConfig }),
  setAnimationConfig: (animationConfig) => set({ animationConfig }),
  setAll: (state) => set(() => state),
}));
