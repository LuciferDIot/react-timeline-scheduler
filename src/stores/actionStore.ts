import { create } from "zustand";
import { ProductionTask } from "../types";

interface ActionStoreState {
  scrollIntoToday: boolean;
  lockOperations: boolean;

  setLockOperations: () => void;
  onTaskClick?: (task: ProductionTask) => void;
  onRowExpand?: (
    departmentName: string,
    departmentId: string,
    task: ProductionTask
  ) => Promise<void>;
  onRowShrink?: (
    departmentName: string,
    departmentId: string,
    task: ProductionTask
  ) => Promise<void>;
  onRowLabelClick?: (departmentName: string) => void;
  setAll: (state: Partial<ActionStoreState>) => void;
}

export const useActionStore = create<ActionStoreState>((set) => ({
  scrollIntoToday: false,
  lockOperations: true,
  onTaskClick: () => {},
  onRowExpand: () => Promise.resolve(),
  onRowShrink: () => Promise.resolve(),
  onRowLabelClick: () => {},

  setLockOperations: () =>
    set((state) => ({ lockOperations: !state.lockOperations })),
  setAll: (state) => set(() => state),
}));
