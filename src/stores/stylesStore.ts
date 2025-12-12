import _ from "lodash";
import { create } from "zustand";
import { defaultStyles, defaultTheme } from "../data";
import { SchedulerConfigStyles, SchedulerTheme } from "../types";

interface StylesState {
  rowLableMaxWidth: number;
  customCellWidthPX: number;
  customCellHeightPX: number;
  borderColor: string;
  theme: SchedulerTheme;
  taskColorFormat: {
    [key: string]: string;
  };
  dayColorHighlight:
    | {
        [key: string]: Date[];
      }
    | undefined;
  additionalStickyLeft: number;

  setRowLableMaxWidth: (action: (prev: number) => number) => void;
  setAllStyles: (
    styles: SchedulerConfigStyles,
    theme?: Partial<SchedulerTheme>
  ) => void;
  setCustomCellWidthPX: (customCellWidthPX: number) => void;
  setCustomCellHeightPX: (customCellHeightPX: number) => void;
  setTaskColorFormat: (
    taskColorFormat: SchedulerConfigStyles["taskColorFormat"]
  ) => void;
  setDayColorHighlight: (
    dayColorHighlight: SchedulerConfigStyles["dayColorHighlight"]
  ) => void;
}

export const useStylesStore = create<StylesState>((set) => ({
  ...defaultStyles,
  theme: defaultTheme,
  rowLableMaxWidth: 0,
  additionalStickyLeft: 10,
  borderColor: "border-gray-200",

  setRowLableMaxWidth: (action) =>
    set((state) => ({ rowLableMaxWidth: action(state.rowLableMaxWidth) })),
  setAllStyles: (
    styles: SchedulerConfigStyles,
    theme?: Partial<SchedulerTheme>
  ) =>
    set({
      customCellWidthPX:
        styles.customCellWidthPX ?? defaultStyles.customCellWidthPX,
      customCellHeightPX:
        styles.customCellHeightPX || defaultStyles.customCellHeightPX,
      taskColorFormat:
        styles.taskColorFormat || defaultStyles.taskColorFormat,
      dayColorHighlight:
        styles.dayColorHighlight || defaultStyles.dayColorHighlight,
      theme: theme ? _.merge({}, defaultTheme, theme) : defaultTheme,
    }),
  setCustomCellWidthPX: (customCellWidthPX: number) =>
    set({ customCellWidthPX }),
  setCustomCellHeightPX: (customCellHeightPX: number) =>
    set({ customCellHeightPX }),
  setTaskColorFormat: (
    taskColorFormat: SchedulerConfigStyles["taskColorFormat"]
  ) => set({ taskColorFormat }),
  setDayColorHighlight: (
    dayColorHighlight: SchedulerConfigStyles["dayColorHighlight"]
  ) => set({ dayColorHighlight }),
}));
