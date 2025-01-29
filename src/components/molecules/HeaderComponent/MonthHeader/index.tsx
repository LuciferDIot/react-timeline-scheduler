// Molecules/MonthHeader.tsx
import React from "react";
import { HeaderLabel } from "../../../atoms";

interface MonthHeaderProps {
  month: string;
  monthCellWidth: number;
}

export const MonthHeader: React.FC<MonthHeaderProps> = ({
  month,
  monthCellWidth,
}) => (
  <div
    className="bg-white text-left border p-2 text-xs"
    style={{ width: `${monthCellWidth}px` }}
  >
    <HeaderLabel text={month} />
  </div>
);
