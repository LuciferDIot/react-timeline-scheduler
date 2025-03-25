import { motion } from "framer-motion";
import React from "react";
import { ProductionTask, StripIndex } from "../../../../types";
import { calculateDatesPercentage } from "../../../../util/date.util";
import { ExtendedCell } from "../ExtendedCell";
import { FirstEmptyCell } from "../FirstEmptyCell";
import { TaskStrip } from "../TaskStrip";

type Props = {
  task: ProductionTask;
  taskBackgroundColor: string;
  extendedStyles: {
    backgroundColor: string;
  };
  dates: {
    startDate: Date;
    endDate: Date;
    prevEndDate?: Date;
  };

  handleVisibleTooltip: (task: ProductionTask, index?: StripIndex) => void;
};

export const TaskCells = React.memo(
  ({
    task,
    taskBackgroundColor,
    extendedStyles,
    dates: { startDate, endDate, prevEndDate },
    handleVisibleTooltip,
  }: Props) => {
    const startPercentage = calculateDatesPercentage(startDate);
    const midPercentage = prevEndDate
      ? calculateDatesPercentage(prevEndDate)
      : null;
    const endPercentage = calculateDatesPercentage(endDate);

    if (midPercentage && Math.floor(midPercentage) === 99)
      console.log(midPercentage);

    return (
      <motion.div
        className="absolute top-0 left-0 w-full h-full flex z-[1]"
        animate={{ width: "100%" }}
      >
        <FirstEmptyCell index={0} startPercentage={startPercentage} />
        <TaskStrip
          index={0}
          task={task}
          startDate={startDate}
          endDate={endDate}
          prevEndDate={prevEndDate}
          endPercentage={midPercentage ? midPercentage : endPercentage}
          startPercentage={100 - startPercentage}
          taskBackgroundColor={taskBackgroundColor}
          handleVisibleTooltip={handleVisibleTooltip}
        />
        {midPercentage && prevEndDate && (
          <ExtendedCell
            task={task}
            endDate={endDate}
            prevEndDate={prevEndDate}
            midPercentage={100 - midPercentage}
            endPercentage={endPercentage}
            extendedStyles={extendedStyles}
            handleVisibleTooltip={handleVisibleTooltip}
          />
        )}
      </motion.div>
    );
  }
);
