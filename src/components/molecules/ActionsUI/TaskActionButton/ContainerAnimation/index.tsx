import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useChildStore } from "../../../../../stores";
import { SchedulerTask, StripIndex } from "../../../../../types";

type ContainerAnimationProps = {
  cellWidthPX: number;
  children: ReactNode;
  left: number;
  handleVisibleTooltip: (task: SchedulerTask, index?: StripIndex) => void;
  task: SchedulerTask;
};

export const ContainerAnimation = ({
  cellWidthPX,
  children,
  handleVisibleTooltip,
  task,
  left,
}: ContainerAnimationProps) => {
  const { removeTooltip } = useChildStore();
  return (
    <motion.div
      className="absolute z-[6] top-0 h-full flex justify-center items-center gap-2 text-white text-lg"
      initial={{ width: "0%", left: `${left - 5}px` }}
      animate={{ width: `${cellWidthPX}px`, left: `${left - 5}px` }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      onMouseEnter={removeTooltip}
      onMouseLeave={() => handleVisibleTooltip(task)}
    >
      {children}
    </motion.div>
  );
};
