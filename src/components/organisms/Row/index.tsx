import { motion } from "framer-motion";
import moment from "moment";
import React, { useEffect, useMemo, useRef } from "react";

import { useActionStore, useDataStore, useStylesStore } from "../../../stores";
import { ProductionTask } from "../../../types";
import { Task } from "../Task";

import { EmptyCell } from "../../molecules";

interface RowProps {
  departmentName: string;
  row: ProductionTask[];
  dates: string[];
  rowIndex: number;
  groupedTasks: Record<string, ProductionTask[][]>;
  taskRowIndex: number;
}

const Row: React.FC<RowProps> = React.memo(
  ({
    departmentName: line,
    row,
    dates,
    rowIndex,
    groupedTasks,
    taskRowIndex,
  }) => {
    const { onRowLabelClick } = useActionStore();
    const { rowLableMaxWidth, borderColor, setRowLableMaxWidth, theme } =
      useStylesStore();
    const { tableEndDate } = useDataStore();

    const labelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      console.log(dates.length);
    }, [dates.length]);

    useEffect(() => {
      if (labelRef.current) {
        const width = labelRef.current.getBoundingClientRect().width;
        setRowLableMaxWidth((prev) => Math.max(prev, width));
      }
    }, [line, setRowLableMaxWidth]);

    const taskComponents = useMemo(
      () =>
        dates.map((date, index) => {
          const currDate = moment(date);
          const task = row.find(
            (t) =>
              moment(t.startDate).isSameOrBefore(currDate, "day") &&
              moment(t.endDate).isSameOrAfter(currDate, "day")
          );

          if (!task) {
            return (
              <EmptyCell
                key={`${line}-${date}`}
                borderColor={borderColor}
                rowIndex={rowIndex}
              />
            );
          }

          const taskStartIndex = dates.indexOf(
            moment(task.startDate).format("YYYY-MM-DD")
          );
          const taskEndIndex = dates.indexOf(
            moment(task.endDate).format("YYYY-MM-DD")
          );

          let span = taskEndIndex - taskStartIndex + 1;

          if (taskEndIndex < taskStartIndex) {
            const endOfRowIndex = dates.indexOf(
              moment(tableEndDate).format("YYYY-MM-DD")
            );
            span = endOfRowIndex - taskStartIndex + 1;
          }

          if (index === taskStartIndex) {
            return (
              <Task
                key={`${task.id}-${date}`}
                task={task}
                span={span}
                rowIndex={rowIndex}
                borderColor={borderColor}
              />
            );
          }

          return null;
        }),
      [dates, row, line, borderColor, rowIndex, tableEndDate]
    );

    return (
      <div
        key={line}
        className="flex flex-row gap-2 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors duration-200"
      >
        <motion.div
          ref={labelRef}
          className={` z-[60] sticky left-0 min-w-32 md:min-w-48 p-2 border-x-1 ${borderColor} ${
            (groupedTasks[line]?.length ?? 0) > 1
              ? taskRowIndex === 0
                ? "border-t-[0.1px]"
                : taskRowIndex === (groupedTasks[line]?.length ?? 0) - 1
                ? "border-b-[0.1px]"
                : "border-y-0"
              : "border"
          }`}
          style={{
            backgroundColor:
              taskRowIndex % 2 === 0 ? theme.row.even : theme.row.odd,
          }}
          initial={{ width: 0 }}
          animate={{ width: rowLableMaxWidth }}
          exit={{ width: 0 }}
        >
          {taskRowIndex === 0 && (
            <div
              className="flex items-center justify-between gap-2"
              onClick={(e) => {
                e.stopPropagation();
                if (onRowLabelClick) onRowLabelClick(line);
              }}
            >
              <label className="text-nowrap">{line}</label>
            </div>
          )}
        </motion.div>
        <div key={`${line}-row-${taskRowIndex}`} className="flex">
          {taskComponents}
        </div>
      </div>
    );
  }
);

export { Row };
