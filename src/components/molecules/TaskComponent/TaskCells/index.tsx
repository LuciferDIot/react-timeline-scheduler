import { motion } from "framer-motion";
import React from "react";
import { calculateDatesPercentage } from "../../../../util/date.util";
import { ExtendedCell } from "../ExtendedCell";
import { FirstEmptyCell } from "../FirstEmptyCell";
import { TaskStrip } from "../TaskStrip";

type Props = {
  taskBackgroundColor: string;
  extendedStyles: {
    backgroundColor?: string;
    borderColor?: string;
  };
  stripExtendedStyles?: {
      backgroundColor?: string;
      borderColor?: string;
  };
  dates: {
    startDate: Date;
    endDate: Date;
    prevEndDate?: Date;
  };
};

export const TaskCells = React.memo(
  ({
    taskBackgroundColor,
    extendedStyles,
    stripExtendedStyles,
    dates: { startDate, endDate, prevEndDate },
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
          startDate={startDate}
          endDate={endDate}
          prevEndDate={prevEndDate}
          endPercentage={midPercentage ? midPercentage : endPercentage}
          startPercentage={100 - startPercentage}
          taskBackgroundColor={taskBackgroundColor}
          extendedStyles={stripExtendedStyles}
        />
        {midPercentage && prevEndDate && (
          <ExtendedCell
            endDate={endDate}
            prevEndDate={prevEndDate}
            midPercentage={100 - midPercentage}
            endPercentage={endPercentage}
            extendedStyles={extendedStyles}
          />
        )}
      </motion.div>
    );
  }
);
