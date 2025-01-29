import { motion } from "framer-motion";
import { ReactNode } from "react";
import { ProductionTask } from "../../../../../types";

type ContainerAnimationProps = {
  cellWidthPX: number;
  children: ReactNode;
  setTooltipVisible: (value: React.SetStateAction<ReactNode>) => void;
  handleVisibleTooltip: (task: ProductionTask) => void;
  task: ProductionTask;
};

export const ContainerAnimation = ({
  cellWidthPX,
  children,
  setTooltipVisible,
  handleVisibleTooltip,
  task,
}: ContainerAnimationProps) => (
  <motion.div
    className="absolute right-0 top-0 h-full flex justify-center items-center gap-2 text-white text-lg"
    initial={{ width: "0%" }}
    animate={{ width: `${cellWidthPX}px` }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    onMouseEnter={() => setTooltipVisible(null)}
    onMouseLeave={() => handleVisibleTooltip(task)}
  >
    {children}
  </motion.div>
);
