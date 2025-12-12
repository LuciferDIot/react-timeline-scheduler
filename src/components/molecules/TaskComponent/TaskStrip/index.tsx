import { motion } from "framer-motion";
import moment from "moment";
import { useMemo } from "react";
import { useChildStore, useStylesStore } from "../../../../stores";
import { SchedulerTask, StripIndex } from "../../../../types";

type TaskStripType = {
  index: number;
  task: SchedulerTask;
  startPercentage: number;
  endPercentage: number;
  startDate: Date;
  endDate: Date;
  prevEndDate?: Date;
  taskBackgroundColor: string;

  handleVisibleTooltip: (task: SchedulerTask, index?: StripIndex) => void;
};

export const TaskStrip = ({
  index,
  task,
  endPercentage,
  startPercentage,
  startDate,
  endDate,
  prevEndDate,
  taskBackgroundColor,

  handleVisibleTooltip,
}: TaskStripType) => {
  const { removeTooltip } = useChildStore();
  const { customCellWidthPX } = useStylesStore();
  const cellsToEndFromStart = useMemo(
    () =>
      prevEndDate
        ? moment(prevEndDate)
            .startOf("day")
            .diff(moment(startDate).endOf("day"), "days")
        : moment(endDate)
            .startOf("day")
            .diff(moment(startDate).endOf("day"), "days"),
    [endDate, prevEndDate, startDate]
  );

  const endCellWidth = customCellWidthPX * (endPercentage / 100);

  const startCellWidth = customCellWidthPX * (startPercentage / 100);

  const width =
    startCellWidth + customCellWidthPX * cellsToEndFromStart + endCellWidth;

  return (
    <motion.div
      key={index}
      className="relative h-full flex"
      animate={{
        width: `${width}px`,
        backgroundColor: taskBackgroundColor,
      }}
      onMouseEnter={() => handleVisibleTooltip(task, StripIndex.One)}
      onMouseLeave={removeTooltip}
    />
  );
};
