// Molecules/MonthHeader.tsx
import React from "react";
import { HeaderLabel } from "../../../atoms";

interface MonthHeaderProps {
  month: string;
  monthCellWidth: number;
  borderColor: string;
  textStickyLeftPX?: number;
}

export const MonthHeader: React.FC<MonthHeaderProps> = ({
  month,
  monthCellWidth,
  borderColor,
  textStickyLeftPX,
}) => (
  <div
    className={`bg-white text-left border p-2 text-xs ${borderColor}`}
    style={{ width: `${monthCellWidth}px` }}
  >
    <HeaderLabel text={month} textStickyLeftPX={textStickyLeftPX} />
  </div>
);
