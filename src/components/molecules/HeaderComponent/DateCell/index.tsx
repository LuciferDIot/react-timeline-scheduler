// Molecules/DateCell.tsx
import { motion } from "framer-motion";
import React from "react";
import { formatDateToCustomString } from "../../../../util/date.util";

import { useStylesStore } from "../../../../stores";

interface DateCellProps {
  date: string;
  isCurrentDate: boolean;
  cellWidthPX: number;
  height: number;
  linePosition: number;
  currentDateRef: React.MutableRefObject<HTMLDivElement | null>;
  bgColor?: string;
  borderColor: string;
}

export const DateCell: React.FC<DateCellProps> = ({
  date,
  isCurrentDate,
  cellWidthPX,
  height,
  borderColor,
  linePosition,
  bgColor,
  currentDateRef,
}) => {
  const { theme } = useStylesStore();
  
  return (
    <div
      className={`relative flex-1 text-center border p-2 text-xs ${borderColor}
         ${isCurrentDate && "font-bold"}`}
      ref={isCurrentDate ? currentDateRef : null}
      style={{ 
        width: `${cellWidthPX}px`, 
        backgroundColor: bgColor || theme.header.background,
        color: theme.header.text,
        borderColor: theme.border
      }}
    >
      {isCurrentDate && (
        <div
          className={`-z-10 w-full absolute top-0 left-0 flex justify-start 
            items-center pointer-events-none`}
          style={{ height }}
        >
          {isCurrentDate && (
            <motion.div
              className="w-px h-full border-l border-dashed "
              style={{ 
                  x: linePosition,
                  borderColor: theme.grid.currentDateLine || theme.grid.color
              }}
              animate={{ x: linePosition }}
              transition={{ type: "tween", duration: 0.5 }}
            />
          )}
        </div>
      )}
      <label>{formatDateToCustomString(date)}</label>
    </div>
  );
};
