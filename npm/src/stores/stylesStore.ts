import { create } from "zustand";
import { defaultStyles } from "../data";
import { WeeklyPlanConfigStyles } from "../types";

interface StylesState {
  rowLableMaxWidth: number;
  customCellWidthPX: number;
  customCellHeightPX: number;
  borderColor: string;
  taskbgColorFormat: {
    [key: string]: string;
  };
  daybgColorHighlight:
    | {
        [key: string]: Date[];
      }
    | undefined;
  additionalStickyLeft: number;

  setRowLableMaxWidth: (action: (prev: number) => number) => void;
  setAllStyles: (styles: WeeklyPlanConfigStyles) => void;
  setCustomCellWidthPX: (customCellWidthPX: number) => void;
  setCustomCellHeightPX: (customCellHeightPX: number) => void;
  setTaskbgColorFormat: (
    taskbgColorFormat: WeeklyPlanConfigStyles["taskbgColorFormat"]
  ) => void;
  setDaybgColorHighlight: (
    daybgColorHighlight: WeeklyPlanConfigStyles["daybgColorHighlight"]
  ) => void;
}

export const useStylesStore = create<StylesState>((set) => ({
  ...defaultStyles,
  rowLableMaxWidth: 0,
  additionalStickyLeft: 10,
  borderColor: "border-gray-200",

  setRowLableMaxWidth: (action) =>
    set((state) => ({ rowLableMaxWidth: action(state.rowLableMaxWidth) })),
  setAllStyles: (styles: WeeklyPlanConfigStyles) =>
    set({
      customCellWidthPX:
        styles.customCellWidthPX ?? defaultStyles.customCellWidthPX,
      customCellHeightPX:
        styles.customCellHeightPX || defaultStyles.customCellHeightPX,
      taskbgColorFormat:
        styles.taskbgColorFormat || defaultStyles.taskbgColorFormat,
      daybgColorHighlight:
        styles.daybgColorHighlight || defaultStyles.daybgColorHighlight,
    }),
  setCustomCellWidthPX: (customCellWidthPX: number) =>
    set({ customCellWidthPX }),
  setCustomCellHeightPX: (customCellHeightPX: number) =>
    set({ customCellHeightPX }),
  setTaskbgColorFormat: (
    taskbgColorFormat: WeeklyPlanConfigStyles["taskbgColorFormat"]
  ) => set({ taskbgColorFormat }),
  setDaybgColorHighlight: (
    daybgColorHighlight: WeeklyPlanConfigStyles["daybgColorHighlight"]
  ) => set({ daybgColorHighlight }),
}));
