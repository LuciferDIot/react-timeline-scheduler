export enum TaskColors {
  REMOVED_TASK = "#C90000",
  ADDED_TASK = "#31c48d",
  ROW_EVEN = "#F6F6F6",
  ROW_ODD = "#ffffff",
  TASK_EVEN = "#4D81C7",
  TASK_ODD = "#52C0D5",
  PROGRESSBAR = "#84e1bc",
}

export const defaultStyles = {
  customCellHeightPX: 40,
  customCellWidthPX: 100,
  taskColorFormat: TaskColors,
  dayColorHighlight: undefined,
};

export * from "./defaultTheme";
