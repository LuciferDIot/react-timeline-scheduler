import { create } from "zustand";
import { defaultStyles, defaultTheme, lightTheme, darkTheme } from "../../data";
import { SchedulerConfigStyles, SchedulerTheme } from "../../types";
import { resolveMergedTheme } from "./themeHelpers";

export interface StylesState {
  rowLabelMaxWidth: number;
  rowLableMaxWidth: number;
  customCellWidthPX: number;
  customCellHeightPX: number;
  borderColor: string;
  theme: SchedulerTheme;
  themeMode: "light" | "dark";
  taskColorFormat: { [key: string]: string };
  dayColorHighlight: { [key: string]: Date[] } | undefined;
  additionalStickyLeft: number;

  setRowLabelMaxWidth: (action: (prev: number) => number) => void;
  setRowLableMaxWidth: (action: (prev: number) => number) => void;
  setAllStyles: (
    styles: SchedulerConfigStyles,
    theme?:
      | Partial<SchedulerTheme>
      | {
          mode?: "light" | "dark";
          light?: Partial<SchedulerTheme>;
          dark?: Partial<SchedulerTheme>;
        }
  ) => void;
  setThemeMode: (mode: "light" | "dark") => void;
  setCustomCellWidthPX: (customCellWidthPX: number) => void;
  setCustomCellHeightPX: (customCellHeightPX: number) => void;
  setTaskColorFormat: (format: SchedulerConfigStyles["taskColorFormat"]) => void;
  setDayColorHighlight: (highlight: SchedulerConfigStyles["dayColorHighlight"]) => void;
}

export const useStylesStore = create<StylesState>((set) => ({
  ...defaultStyles,
  theme: defaultTheme,
  themeMode: "light",
  rowLabelMaxWidth: 0,
  rowLableMaxWidth: 0,
  additionalStickyLeft: 10,
  borderColor: "border-gray-200",

  setRowLabelMaxWidth: (action) =>
    set((state) => {
      const val = action(state.rowLabelMaxWidth);
      return { rowLabelMaxWidth: val, rowLableMaxWidth: val };
    }),
  setRowLableMaxWidth: (action) =>
    set((state) => {
      const val = action(state.rowLabelMaxWidth);
      return { rowLabelMaxWidth: val, rowLableMaxWidth: val };
    }),

  setThemeMode: (mode: "light" | "dark") => {
    set({
      themeMode: mode,
      theme: mode === "dark" ? darkTheme : lightTheme,
    });
  },

  setAllStyles: (styles, theme) => {
    const { mergedTheme, detectedMode } = resolveMergedTheme(theme);
    set({
      customCellWidthPX: styles.customCellWidthPX ?? defaultStyles.customCellWidthPX,
      customCellHeightPX: styles.customCellHeightPX || defaultStyles.customCellHeightPX,
      taskColorFormat: styles.taskColorFormat || defaultStyles.taskColorFormat,
      dayColorHighlight: styles.dayColorHighlight || defaultStyles.dayColorHighlight,
      theme: mergedTheme,
      themeMode: detectedMode,
    });
  },

  setCustomCellWidthPX: (customCellWidthPX) => set({ customCellWidthPX }),
  setCustomCellHeightPX: (customCellHeightPX) => set({ customCellHeightPX }),
  setTaskColorFormat: (taskColorFormat) => set({ taskColorFormat }),
  setDayColorHighlight: (dayColorHighlight) => set({ dayColorHighlight }),
}));
