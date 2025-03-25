import { motion } from "framer-motion";
import moment from "moment";
import React, { useCallback, useMemo } from "react";
import { TaskColors } from "../../../data/styles";
import {
  useActionStore,
  useChildStore,
  useDataStore,
  useStylesStore,
} from "../../../stores";
import { ProductionTask, StripIndex } from "../../../types/scheduler.types";
import { TaskLabel } from "../../atoms";
import {
  DiscontinueCells,
  TaskActionButtons,
  TaskCells,
} from "../../molecules";
import { calculateDatesPercentage } from "../../../util/date.util";

interface TaskProps {
  task: ProductionTask;
  span: number;
  rowIndex: number;
  borderColor: string;
}

export const Task: React.FC<TaskProps> = React.memo(
  ({ task, span, rowIndex, borderColor }) => {
    const { setTooltipVisible, setrightClickTask, defaultTooltipComponent } =
      useChildStore();
    const { lockOperations, onRowExpand, onRowShrink, onTaskClick } =
      useActionStore();
    const { customCellWidthPX, taskbgColorFormat } = useStylesStore();
    const { updateSchedulerTaskDates } = useDataStore();
    const taskWidth = useMemo(
      () => customCellWidthPX * span,
      [customCellWidthPX, span]
    );

    const taskBackgroundColor = useMemo(() => {
      return taskbgColorFormat &&
        task.bgColorKey &&
        taskbgColorFormat[task.bgColorKey]
        ? taskbgColorFormat[task.bgColorKey]
        : rowIndex % 2 === 0
        ? TaskColors.TASK_EVEN
        : TaskColors.TASK_ODD;
    }, [taskbgColorFormat, task.bgColorKey, rowIndex]);

    const extendedStyles = useMemo(() => {
      return {
        borderColor: task.extendedStyles?.borderColor
          ? task.extendedStyles.borderColor
          : TaskColors.REMOVED_TASK,
        backgroundColor: task.extendedStyles?.backgroundColor
          ? task.extendedStyles.backgroundColor
          : `${TaskColors.REMOVED_TASK}20`,
      };
    }, [task.extendedStyles]);

    const handleVisibleTooltip = useCallback(
      (task: ProductionTask, index?: StripIndex) => {
        setTooltipVisible(
          task.tooltipComponent
            ? task.tooltipComponent(task, index)
            : defaultTooltipComponent?.(task, index)
        );
      },
      [defaultTooltipComponent, setTooltipVisible]
    );

    const TaskActionButton = useMemo(() => {
      const updateTaskDate = (operation: "add" | "subtract") => {
        return (prev: ProductionTask[]) => {
          const taskIndex = prev.findIndex((t) => t.id === task.id);
          if (taskIndex === -1) return prev;

          const updatedTask = prev[taskIndex];
          const days = operation === "add" ? 1 : -1;
          const action = operation === "add" ? onRowExpand : onRowShrink;
          const newEndDate = (
            operation === "add"
              ? moment(updatedTask.endDate)
              : moment(updatedTask.endDate)
          )
            .add(days, "days")
            .toDate();

          if (moment(updatedTask.startDate).isSameOrAfter(newEndDate))
            return prev;

          if (
            moment(newEndDate).date() === moment(updatedTask.prevEndDate).date()
          ) {
            updatedTask.prevEndDate = undefined;
          } else if (updatedTask.prevEndDate === undefined) {
            updatedTask.prevEndDate = updatedTask.endDate;
          }
          updatedTask.endDate = newEndDate;
          prev[taskIndex] = updatedTask;
          action && action(task.departmentName, task.departmentId, updatedTask);

          return [...prev];
        };
      };

      const handleExpand = () =>
        updateSchedulerTaskDates(updateTaskDate("add"));
      const handleShrink = () =>
        updateSchedulerTaskDates(updateTaskDate("subtract"));

      return (
        <TaskActionButtons
          task={task}
          handleVisibleTooltip={handleVisibleTooltip}
          handleExpand={handleExpand}
          handleShrink={handleShrink}
        />
      );
    }, [
      handleVisibleTooltip,
      onRowExpand,
      onRowShrink,
      task,
      updateSchedulerTaskDates,
    ]);

    const handleRightClick = (task: ProductionTask, e: React.MouseEvent) => {
      e.preventDefault(); // Prevent the default context menu from appearing
      setrightClickTask(task); // Call the right-click handler
    };

    const labelLeftPercentage =
      (calculateDatesPercentage(task.startDate) * customCellWidthPX) / 100;

    return (
      <motion.div
        key={`${task.id}-${taskWidth}-${task.startDate}-${task.endDate}`}
        className={`relative group flex w-full h-full p-0.5 text-white font-bold 
          text-sm z-0 min-h-10 border text-center text-nowrap ${borderColor} ${
          lockOperations ? "cursor-default" : "cursor-pointer hover:opacity-80"
        }`}
        animate={{
          width: `${taskWidth}px`,
        }}
        style={{
          width: `${taskWidth}px`,
          backgroundColor:
            rowIndex % 2 === 0 ? TaskColors.ROW_EVEN : TaskColors.ROW_ODD,
        }}
        onContextMenu={(e) => handleRightClick(task, e)}
      >
        <TaskLabel label={task.label} addExtraLeft={labelLeftPercentage} />

        <motion.div
          className="w-fit h-full"
          onClick={() => onTaskClick?.(task)}
          initial={{ width: 0 }}
          animate={{ width: "fit-content" }}
        >
          {task.discontinue && (
            <DiscontinueCells
              endDate={task.discontinue.endDate}
              startDate={task.discontinue.startDate}
              stripStartDate={task.startDate}
            />
          )}
          <TaskCells
            task={task}
            handleVisibleTooltip={handleVisibleTooltip}
            taskBackgroundColor={taskBackgroundColor || ""}
            extendedStyles={extendedStyles}
            dates={{
              startDate: task.startDate,
              endDate: task.endDate,
              prevEndDate: task.prevEndDate,
            }}
          />
        </motion.div>
        {!lockOperations && TaskActionButton}
      </motion.div>
    );
  }
);
