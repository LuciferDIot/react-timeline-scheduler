import { motion } from "framer-motion";
import moment from "moment";
import { useMemo } from "react";
import { useChildStore, useStylesStore } from "../../../../stores";
import { SchedulerTask, StripIndex } from "../../../../types";

type Props = {
  task: SchedulerTask;
  endDate: Date;
  prevEndDate: Date;
  midPercentage: number;
  endPercentage: number;
  extendedStyles: {
    backgroundColor: string;
  };

  handleVisibleTooltip: (task: SchedulerTask, index?: StripIndex) => void;
};

function ExtendedCell({
  task,
  endDate,
  prevEndDate,
  midPercentage,
  endPercentage,
  extendedStyles,

  handleVisibleTooltip,
}: Props) {
  const { removeTooltip } = useChildStore();
  const { customCellWidthPX } = useStylesStore();
  const cellsToEndFromMid = useMemo(
    () =>
      moment(endDate)
        .startOf("day")
        .diff(moment(prevEndDate).endOf("day"), "days"),
    [endDate, prevEndDate]
  );

  const midCellWidth = customCellWidthPX * (midPercentage / 100);
  const endCellWidth = customCellWidthPX * (endPercentage / 100);

  const width =
    midCellWidth + cellsToEndFromMid * customCellWidthPX + endCellWidth;

  return (
    <motion.div
      className="h-full border border-dashed border-l-0"
      animate={{
        width: `${width}px`,
        ...extendedStyles,
      }}
      onMouseEnter={() => handleVisibleTooltip(task, StripIndex.Two)}
      onMouseLeave={removeTooltip}
    />
  );
}

export { ExtendedCell };
