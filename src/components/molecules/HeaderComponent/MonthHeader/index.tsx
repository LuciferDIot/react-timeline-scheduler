// Molecules/MonthHeader.tsx
import React from "react";
import { HeaderLabel } from "../../../atoms";

import { useStylesStore } from "../../../../stores";

interface MonthHeaderProps {
  month: string;
  monthCellWidth: number;
  borderColor: string;
}

export const MonthHeader: React.FC<MonthHeaderProps> = ({
  month,
  monthCellWidth,
  borderColor,
}) => {
  const { theme } = useStylesStore();
  
  return (
    <div
      className={`text-left border p-2 text-xs ${borderColor}`}
      style={{ 
        width: `${monthCellWidth}px`,
        backgroundColor: theme.header.background,
        color: theme.header.text,
        borderColor: theme.border
      }}
    >
      <HeaderLabel text={month} />
    </div>
  );
};
