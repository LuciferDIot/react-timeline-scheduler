import { motion } from "framer-motion";
import React from "react";
import { useStylesStore } from "../../../stores";

interface RowLayoutProps {
  line: string;
  rowIndex: number;
  taskRowIndex: number;
  totalGroupRows: number;
  borderColor: string;
  labelRef: React.RefObject<HTMLDivElement>;
  onRowLabelClick?: (label: string) => void;
  taskComponents: React.ReactNode;
  emptyComponent?: React.ReactNode;
  hasTasks: boolean;
}

export const RowLayout: React.FC<RowLayoutProps> = ({
  line, rowIndex, taskRowIndex, totalGroupRows, borderColor, labelRef,
  onRowLabelClick, taskComponents, emptyComponent, hasTasks,
}) => {
  const { theme, rowLabelMaxWidth } = useStylesStore();

  return (
    <div
      role="row"
      className="flex flex-row gap-2 transition-colors duration-200"
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = theme.row.hover; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent"; }}
    >
      <motion.div
        ref={labelRef}
        role="rowheader"
        className={`z-[60] sticky left-0 min-w-32 md:min-w-48 p-2 border-x-1 ${borderColor} ${
          totalGroupRows > 1
            ? taskRowIndex === 0
              ? "border-t-[0.1px]"
              : taskRowIndex === totalGroupRows - 1
              ? "border-b-[0.1px]"
              : "border-y-0"
            : "border"
        }`}
        style={{
          backgroundColor: rowIndex % 2 === 0 ? theme.row.even : theme.row.odd,
          color: theme.text.primary,
          borderColor: theme.border,
        }}
        initial={{ width: 0 }}
        animate={{ width: rowLabelMaxWidth }}
        exit={{ width: 0 }}
      >
        {taskRowIndex === 0 && (
          <div
            className="flex items-center justify-between gap-2 cursor-pointer"
            onClick={(e) => { e.stopPropagation(); onRowLabelClick?.(line); }}
          >
            <label className="text-nowrap font-medium cursor-pointer">{line}</label>
          </div>
        )}
      </motion.div>
      <div className="flex relative">
        {taskComponents}
        {!hasTasks && (
          emptyComponent || (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400 italic pointer-events-none">
              No tasks
            </div>
          )
        )}
      </div>
    </div>
  );
};

RowLayout.displayName = "RowLayout";
