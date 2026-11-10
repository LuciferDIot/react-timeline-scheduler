import { motion } from "framer-motion";
import { differenceInDays, endOfDay, startOfDay } from "date-fns";
import { useMemo } from "react";
import { useStylesStore } from "../../../../stores";

type Props = {
  endDate: Date;
  prevEndDate: Date;
  midPercentage: number;
  endPercentage: number;
  extendedStyles: {
    backgroundColor?: string;
    borderColor?: string;
  };
};

function ExtendedCell({
  endDate,
  prevEndDate,
  midPercentage,
  endPercentage,
  extendedStyles,
}: Props) {
  const { customCellWidthPX } = useStylesStore();
  const cellsToEndFromMid = useMemo(
    () =>
      differenceInDays(
        startOfDay(new Date(endDate)),
        endOfDay(new Date(prevEndDate))
      ),
    [endDate, prevEndDate]
  );

  const midCellWidth = customCellWidthPX * (midPercentage / 100);
  const endCellWidth = customCellWidthPX * (endPercentage / 100);

  const width =
    midCellWidth + cellsToEndFromMid * customCellWidthPX + endCellWidth;

  return (
    <motion.div
      className="h-full border border-dashed border-l-0"
      style={extendedStyles}
      animate={{
        width: `${width}px`,
      }}
    />
  );
}

export { ExtendedCell };
