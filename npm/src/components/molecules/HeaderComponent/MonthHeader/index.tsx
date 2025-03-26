// Molecules/MonthHeader.tsx
import React from "react";
import { HeaderLabel } from "../../../atoms";

interface MonthHeaderProps {
  month: string;
  monthCellWidth: number;
  borderColor: string;
}

export const MonthHeader: React.FC<MonthHeaderProps> = ({
  month,
  monthCellWidth,
  borderColor,
}) => (
  <div
    className={`backdrop-blur-2xl text-left border p-2 text-xs ${borderColor}`}
    style={{ width: `${monthCellWidth}px` }}
  >
    <HeaderLabel text={month} />
  </div>
);
