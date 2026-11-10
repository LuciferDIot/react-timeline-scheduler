import { motion } from "framer-motion";
import { differenceInDays, endOfDay, startOfDay } from "date-fns";
import { useMemo } from "react";
import { useStylesStore } from "../../../../stores";

type TaskStripType = {
  index: number;
  startPercentage: number;
  endPercentage: number;
  startDate: Date;
  endDate: Date;
  prevEndDate?: Date;
  taskBackgroundColor: string;
  extendedStyles?: {
    backgroundColor?: string;
    borderColor?: string;
  };
};

export const TaskStrip = ({
  index,
  endPercentage,
  startPercentage,
  startDate,
  endDate,
  prevEndDate,
  taskBackgroundColor,
  extendedStyles,
}: TaskStripType) => {
  const { customCellWidthPX } = useStylesStore();
  const cellsToEndFromStart = useMemo(() => {
    const target = prevEndDate ? new Date(prevEndDate) : new Date(endDate);
    return differenceInDays(startOfDay(target), endOfDay(new Date(startDate)));
  }, [endDate, prevEndDate, startDate]);

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
        backgroundColor: extendedStyles?.backgroundColor || taskBackgroundColor,
      }}
      style={extendedStyles}
    />
  );
};
