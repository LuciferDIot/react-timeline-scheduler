import { calculateDatesPercentage } from "@/util/date.util";
import { motion } from "framer-motion";
import moment from "moment";
import { useMemo } from "react";
import { useStylesStore } from "../../../../stores";

type Props = {
  startDate: Date;
  endDate: Date;
  stripStartDate: Date;
};

const DiscontinueCells = ({ endDate, startDate, stripStartDate }: Props) => {
  const { customCellWidthPX } = useStylesStore();
  const startPercentage = calculateDatesPercentage(startDate);
  const endPercentage = calculateDatesPercentage(endDate);

  const cellsToDisStartDate = useMemo(
    () =>
      (moment(startDate)
        .startOf("day")
        .diff(moment(stripStartDate).startOf("day"), "days") +
        startPercentage / 100) *
      customCellWidthPX,
    [customCellWidthPX, startDate, startPercentage, stripStartDate]
  );

  const cellsToDisEndDateFromDisStart = useMemo(
    () =>
      (moment(endDate)
        .startOf("day")
        .diff(moment(startDate).startOf("day"), "days") +
        endPercentage / 100) *
      customCellWidthPX,
    [customCellWidthPX, endDate, endPercentage, startDate]
  );

  return (
    <div className="discontinue absolute top-0 right-0 w-full h-full flex z-[2] pointer-events-none cursor-none">
      <motion.div
        className="h-full border border-dashed border-x-0"
        animate={{
          width: `${cellsToDisStartDate}px`,
        }}
      />
      <motion.div
        className="relative h-full"
        animate={{
          width: `${cellsToDisEndDateFromDisStart}px`,
        }}
      >
        <img
          src="/public/icons/Mask_group.png"
          alt="image"
          className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-black opacity-20"></div>{" "}
        {/* Dark background */}
      </motion.div>
    </div>
  );
};

export { DiscontinueCells };
