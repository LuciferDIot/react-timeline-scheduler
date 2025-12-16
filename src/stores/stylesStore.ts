import _ from "lodash";
import { create } from "zustand";
import { defaultStyles, defaultTheme, lightTheme, darkTheme } from "../data";
import { SchedulerConfigStyles, SchedulerTheme } from "../types";

interface StylesState {
  rowLableMaxWidth: number;
  customCellWidthPX: number;
  customCellHeightPX: number;
  borderColor: string;
  theme: SchedulerTheme;
  themeMode: "light" | "dark";
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
    theme?: Partial<SchedulerTheme> | { mode?: "light" | "dark"; light?: Partial<SchedulerTheme>; dark?: Partial<SchedulerTheme> }
  ) => void;
  setThemeMode: (mode: "light" | "dark") => void;
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
  themeMode: "light",
  rowLableMaxWidth: 0,
  additionalStickyLeft: 10,
  borderColor: "border-gray-200",

  setRowLableMaxWidth: (action) =>
    set((state) => ({ rowLableMaxWidth: action(state.rowLableMaxWidth) })),
  
  setThemeMode: (mode: "light" | "dark") => {
    set((state) => {
      const baseTheme = mode === "dark" ? darkTheme : lightTheme;
      return {
        themeMode: mode,
        theme: baseTheme,
      };
    });
  },

  setAllStyles: (
    styles: SchedulerConfigStyles,
    theme?: Partial<SchedulerTheme> | { mode?: "light" | "dark"; light?: Partial<SchedulerTheme>; dark?: Partial<SchedulerTheme> }
  ) => {
    let mergedTheme = defaultTheme;
    let detectedMode: "light" | "dark" = "light";

    if (theme) {
      if ("mode" in theme || "light" in theme || "dark" in theme) {
        // It's a SchedulerThemeConfig with separate light/dark themes
        const config = theme as {
          mode?: "light" | "dark";
          light?: Partial<SchedulerTheme>;
          dark?: Partial<SchedulerTheme>;
        };
        detectedMode = config.mode || "light";

        // Get the appropriate base theme
        const baseTheme = detectedMode === "dark" ? darkTheme : lightTheme;

        // Merge with mode-specific overrides
        const specificTheme =
          detectedMode === "dark" ? config.dark : config.light;
        mergedTheme = _.merge({}, baseTheme, specificTheme);
      } else {
        // It's a standard Partial<SchedulerTheme> - merge with light theme as base
        mergedTheme = _.merge({}, lightTheme, theme);
      }
    }

    set({
      customCellWidthPX:
        styles.customCellWidthPX ?? defaultStyles.customCellWidthPX,
      customCellHeightPX:
        styles.customCellHeightPX || defaultStyles.customCellHeightPX,
      taskColorFormat:
        styles.taskColorFormat || defaultStyles.taskColorFormat,
      dayColorHighlight:
        styles.dayColorHighlight || defaultStyles.dayColorHighlight,
      theme: mergedTheme,
      themeMode: detectedMode,
    });
  },
  
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
