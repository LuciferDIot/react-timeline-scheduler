import { motion } from "framer-motion";
import React from "react";
import { ProductionTask } from "../../../../types";
import { Progressbar, TaskLabel } from "../../../atoms";
import { TaskActionButtons } from "../../ActionsUI";

type TaskContentProps = {
  task: ProductionTask;
  percentage: number;
  taskBackgroundColor: string;
  lockOperations: boolean;
  cellWidthPX: number;
  handleVisibleTooltip: (task: ProductionTask) => void;
  handleExpand: () => void;
  handleShrink: () => void;
  setTooltipVisible: (value: React.SetStateAction<React.ReactNode>) => void;
};

export const TaskContent = ({
  task,
  percentage,
  taskBackgroundColor,
  lockOperations,
  cellWidthPX,
  handleVisibleTooltip,
  handleExpand,
  handleShrink,
  setTooltipVisible,
}: TaskContentProps) => (
  <motion.div
    key={task.bgColorKey}
    animate={{
      width: `${percentage}%`,
      backgroundColor: taskBackgroundColor,
    }}
    className="relative w-full h-full flex justify-start items-center text-white font-bold text-sm"
    exit={{
      width: percentage !== 100 ? `${percentage}%` : `${percentage / 2}%`,
    }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
  >
    <TaskLabel label={task.label} />
    {!lockOperations && (
      <TaskActionButtons
        task={task}
        cellWidthPX={cellWidthPX}
        handleVisibleTooltip={handleVisibleTooltip}
        handleExpand={handleExpand}
        handleShrink={handleShrink}
        setTooltipVisible={setTooltipVisible}
      />
    )}
    {task.progress && task.progress > 0 && (
      <Progressbar percentage={task.progress} />
    )}
  </motion.div>
);
