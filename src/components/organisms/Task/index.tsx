import React, { useCallback, useMemo } from "react";
import { useActionStore, useChildStore } from "../../../stores";
import { SchedulerTask } from "../../../types";
import { calculateDatesPercentage } from "../../../util/date.util";
import { TaskBody } from "./TaskBody";
import { useTaskColors } from "./useTaskColors";
import { useTaskDrag } from "./useTaskDrag";

interface TaskProps {
  task: SchedulerTask;
  span: number;
  rowIndex: number;
  borderColor: string;
}

export const Task: React.FC<TaskProps> = React.memo(({ task, span, rowIndex, borderColor }) => {
  const { setTooltipVisible, setRightClickTask, defaultTooltipComponent, removeTooltip, setMouseCoordination } = useChildStore();
  const { lockOperations, onTaskClick, dragConfig } = useActionStore();
  const { customCellWidthPX, taskBackgroundColor, extendedCellStyles, stripExtendedStyles } = useTaskColors(task, rowIndex);

  const taskWidth = useMemo(() => customCellWidthPX * span, [customCellWidthPX, span]);
  const { isDragging, dragProperties, handleMouseDown, applyDateChange } = useTaskDrag(task, taskWidth, customCellWidthPX);

  const handleVisibleTooltip = useCallback((e: React.MouseEvent) => {
    if (isDragging) return;
    setMouseCoordination({ x: e.clientX, y: e.clientY });
    setTooltipVisible(task.tooltipComponent ? task.tooltipComponent(task) : defaultTooltipComponent?.(task));
  }, [isDragging, setMouseCoordination, setTooltipVisible, task, defaultTooltipComponent]);

  const labelLeftPercentage = (calculateDatesPercentage(new Date(task.startDate)) * customCellWidthPX) / 100;

  return (
    <TaskBody
      task={task} taskWidth={taskWidth} labelLeftPercentage={labelLeftPercentage}
      isDragging={isDragging} dragProperties={dragProperties} borderColor={borderColor}
      rowIndex={rowIndex} taskBackgroundColor={taskBackgroundColor || ""}
      extendedCellStyles={extendedCellStyles} stripExtendedStyles={stripExtendedStyles}
      onContextMenu={(e) => { e.preventDefault(); setRightClickTask(task); }}
      onMouseEnter={handleVisibleTooltip} onMouseLeave={removeTooltip}
      onTaskClick={onTaskClick} handleMouseDown={handleMouseDown}
      onResizeKey={applyDateChange} lockOperations={lockOperations}
      enableLeftResize={dragConfig.enableLeftResize} enableRightResize={dragConfig.enableRightResize}
    />
  );
});

Task.displayName = "Task";
