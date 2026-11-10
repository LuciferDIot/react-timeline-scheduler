import { motion } from "framer-motion";
import { format } from "date-fns";
import React from "react";
import { useStylesStore } from "../../../stores";
import { SchedulerTask } from "../../../types";
import { TaskLabel } from "../../atoms";
import { DiscontinueCells, TaskCells } from "../../molecules";
import { DragProperties } from "./useTaskDrag";

interface TaskBodyProps {
  task: SchedulerTask;
  taskWidth: number;
  labelLeftPercentage: number;
  isDragging: boolean;
  dragProperties: DragProperties | null;
  borderColor: string;
  rowIndex: number;
  taskBackgroundColor: string;
  extendedCellStyles: { borderColor: string; backgroundColor: string };
  stripExtendedStyles?: React.CSSProperties;
  onContextMenu: (e: React.MouseEvent) => void;
  onMouseEnter: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
  onTaskClick?: (task: SchedulerTask) => void;
  handleMouseDown: (e: React.MouseEvent, direction: "left" | "right") => void;
  onResizeKey: (direction: "left" | "right", delta: number) => void;
  lockOperations: boolean;
  enableLeftResize?: boolean;
  enableRightResize?: boolean;
}

export const TaskBody: React.FC<TaskBodyProps> = ({
  task, taskWidth, labelLeftPercentage, isDragging, dragProperties,
  borderColor, rowIndex, taskBackgroundColor, extendedCellStyles, stripExtendedStyles,
  onContextMenu, onMouseEnter, onMouseLeave, onTaskClick, handleMouseDown, onResizeKey,
  lockOperations, enableLeftResize, enableRightResize,
}) => {
  const { theme } = useStylesStore();
  const dateLabel = `Task: ${task.label}, from ${format(new Date(task.startDate), "PP")} to ${format(new Date(task.endDate), "PP")}`;

  return (
    <div style={{ width: `${taskWidth}px`, height: "100%", position: "relative", zIndex: isDragging ? 50 : 10 }}>
      <motion.div
        id={task.id} role="button" tabIndex={0} aria-label={dateLabel}
        className={`relative group flex w-full h-full p-0.5 text-white font-bold text-sm min-h-10 border text-center text-nowrap ${borderColor} ${lockOperations ? "cursor-default" : "cursor-pointer"}`}
        style={{
          position: isDragging ? "absolute" : "relative",
          left: isDragging && dragProperties ? `${dragProperties.left}px` : 0,
          width: isDragging && dragProperties ? `${dragProperties.width}px` : "100%",
          backgroundColor: rowIndex % 2 === 0 ? theme.row.even : theme.row.odd,
          borderColor: task.borderColor || theme.task?.border || borderColor,
        }}
        onContextMenu={onContextMenu} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onTaskClick?.(task); }}
      >
        <TaskLabel label={task.label} addExtraLeft={labelLeftPercentage} />
        <div className="w-fit h-full flex-1" onClick={() => !isDragging && onTaskClick?.(task)}>
          {task.discontinue?.endDate && task.discontinue?.startDate && (
            <DiscontinueCells endDate={task.discontinue.endDate} startDate={task.discontinue.startDate} stripStartDate={task.startDate} />
          )}
          <TaskCells taskBackgroundColor={taskBackgroundColor} extendedStyles={extendedCellStyles} stripExtendedStyles={stripExtendedStyles}
            dates={{ startDate: task.startDate, endDate: task.endDate, prevEndDate: task.prevEndDate }} />
        </div>
        {!lockOperations && enableLeftResize && (
          <div role="separator" aria-orientation="vertical" aria-label="Resize start date" tabIndex={0}
            className="absolute left-[-8px] top-0 bottom-0 w-4 cursor-col-resize z-50 opacity-0 group-hover:opacity-100 focus:opacity-100"
            onMouseDown={(e) => handleMouseDown(e, "left")}
            onKeyDown={(e) => { if (e.key === "ArrowLeft") onResizeKey("left", -1); if (e.key === "ArrowRight") onResizeKey("left", 1); }} />
        )}
        {!lockOperations && enableRightResize && (
          <div role="separator" aria-orientation="vertical" aria-label="Resize end date" tabIndex={0}
            className="absolute right-[-8px] top-0 bottom-0 w-4 cursor-col-resize z-50 opacity-0 group-hover:opacity-100 focus:opacity-100"
            onMouseDown={(e) => handleMouseDown(e, "right")}
            onKeyDown={(e) => { if (e.key === "ArrowLeft") onResizeKey("right", -1); if (e.key === "ArrowRight") onResizeKey("right", 1); }} />
        )}
      </motion.div>
    </div>
  );
};
