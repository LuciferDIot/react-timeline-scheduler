import { motion } from "framer-motion";
import { differenceInDays, startOfDay } from "date-fns";
import { useMemo } from "react";
import { useStylesStore } from "../../../../stores";
import { calculateDatesPercentage } from "../../../../util/date.util";

type Props = {
  startDate: Date;
  endDate: Date;
  stripStartDate: Date;
};

const DiscontinueCells = ({ endDate, startDate, stripStartDate }: Props) => {
  const { customCellWidthPX, theme } = useStylesStore();
  const startPercentage = calculateDatesPercentage(startDate);
  const endPercentage = calculateDatesPercentage(endDate);

  const cellsToDisStartDate = useMemo(
    () =>
      (differenceInDays(startOfDay(startDate), startOfDay(stripStartDate)) +
        startPercentage / 100) *
      customCellWidthPX,
    [customCellWidthPX, startDate, startPercentage, stripStartDate]
  );

  const cellsToDisEndDateFromDisStart = useMemo(
    () =>
      (differenceInDays(startOfDay(endDate), startOfDay(startDate)) +
        endPercentage / 100) *
      customCellWidthPX,
    [customCellWidthPX, endDate, endPercentage, startDate]
  );

  return (
    <div className="absolute top-0 right-0 w-full h-full flex z-[2] pointer-events-none cursor-none">
      <motion.div
        className="h-full border border-dashed border-x-0"
        style={{ borderColor: theme.border }}
        animate={{ width: `${cellsToDisStartDate}px` }}
      />
      <motion.div
        className="relative h-full"
        animate={{ width: `${cellsToDisEndDateFromDisStart}px` }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: theme.background.primary,
            opacity: 0.3,
          }}
        />
      </motion.div>
    </div>
  );
};

export { DiscontinueCells };
