import React, { useMemo } from "react";
import { TaskColors } from "../../../data/styles";
import { useStylesStore } from "../../../stores";
import { SchedulerTask } from "../../../types";

export interface TaskColorsResult {
  customCellWidthPX: number;
  taskBackgroundColor: string;
  extendedCellStyles: {
    borderColor: string;
    backgroundColor: string;
  };
  stripExtendedStyles?: React.CSSProperties;
}

export function useTaskColors(task: SchedulerTask, rowIndex: number): TaskColorsResult {
  const { customCellWidthPX, taskColorFormat, theme } = useStylesStore();

  const taskBackgroundColor = useMemo(() => {
    if (task.bgColor) return task.bgColor;
    return taskColorFormat && task.colorKey && taskColorFormat[task.colorKey]
      ? taskColorFormat[task.colorKey]
      : rowIndex % 2 === 0
      ? theme.task.even
      : theme.task.odd;
  }, [taskColorFormat, task.colorKey, rowIndex, theme, task.bgColor]);

  const extendedCellStyles = useMemo(() => ({
    borderColor: task.extendedStyles?.borderColor || TaskColors.REMOVED_TASK,
    backgroundColor:
      task.extendedStyles?.backgroundColor || `${TaskColors.REMOVED_TASK}20`,
  }), [task.extendedStyles]);

  const stripExtendedStyles = useMemo(() => {
    if (task.extendedStyles?.backgroundColor || task.extendedStyles?.borderColor) {
      return task.extendedStyles;
    }
    return undefined;
  }, [task.extendedStyles]);

  return { customCellWidthPX, taskBackgroundColor, extendedCellStyles, stripExtendedStyles };
}
