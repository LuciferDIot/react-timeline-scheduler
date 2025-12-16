import { motion } from "framer-motion";
import moment from "moment";
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
      style={extendedStyles}
      animate={{
        width: `${width}px`,
      }}
    />
  );
}

export { ExtendedCell };
