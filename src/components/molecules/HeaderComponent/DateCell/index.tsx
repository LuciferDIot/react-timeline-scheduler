// Molecules/DateCell.tsx
import { motion } from "framer-motion";
import React from "react";
import { formatDateToCustomString } from "../../../../util/date.util";

interface DateCellProps {
  date: string;
  isCurrentDate: boolean;
  cellWidthPX: number;
  height: number;
  linePosition: number;
  currentDateRef: React.MutableRefObject<HTMLDivElement | null>;
  bgColor?: string;
}

export const DateCell: React.FC<DateCellProps> = ({
  date,
  isCurrentDate,
  cellWidthPX,
  height,
  linePosition,
  bgColor,
  currentDateRef,
}) => (
  <div
    className={`relative flex-1 text-center border p-2 text-xs ${
      isCurrentDate && "font-bold"
    }`}
    ref={isCurrentDate ? currentDateRef : null}
    style={{ width: `${cellWidthPX}px`, backgroundColor: bgColor }}
  >
    {bgColor && (
      <div
        className={`-z-10 w-full absolute top-0 left-0 flex justify-start 
            items-center pointer-events-none`}
        style={{ height }}
      >
        {isCurrentDate && (
          <motion.div
            className="w-px h-full border-l border-dashed border-[#a5a5a5]"
            style={{ x: linePosition }}
            animate={{ x: linePosition }}
            transition={{ type: "tween", duration: 0.5 }}
          />
        )}
      </div>
    )}
    <label>{formatDateToCustomString(date)}</label>
  </div>
);
