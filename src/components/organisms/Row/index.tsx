import { motion } from "framer-motion";
import moment from "moment";
import React, { useEffect, useMemo, useRef } from "react";

import { useActionStore, useStylesStore } from "../../../stores";
import { SchedulerTask } from "../../../types";
import { Task } from "../Task";

import { EmptyCell } from "../../molecules";

interface RowProps {
  groupLabel: string;
  row: SchedulerTask[];
  dates: string[];
  rowIndex: number;
  groupedTasks: Record<string, SchedulerTask[][]>;
  taskRowIndex: number;
}

const Row: React.FC<RowProps> = React.memo(
  ({
    groupLabel: line,
    row,
    dates,
    rowIndex,
    groupedTasks,
    taskRowIndex,
  }) => {
    // console.log('Row rendering:', line, dates.length, row.length);
    const { onRowLabelClick } = useActionStore();
    const { rowLableMaxWidth, borderColor, setRowLableMaxWidth, theme } =
      useStylesStore();
    // const { tableEndDate } = useDataStore();

    const labelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (labelRef.current) {
        const width = labelRef.current.getBoundingClientRect().width;
        setRowLableMaxWidth((prev) => Math.max(prev, width));
      }
    }, [line, setRowLableMaxWidth]);

    const taskMap = useMemo(() => {
        const lookup = new Map<string, SchedulerTask | "occupied">();
        
        row.forEach(task => {
             // Check if task is visible at all
             const viewStart = moment(dates[0]);
             const viewEnd = moment(dates[dates.length -1]);
             
             if (moment(task.endDate).isBefore(viewStart) || moment(task.startDate).isAfter(viewEnd)) return;
             
             // Determine effective start
             let effectiveStart = moment(task.startDate);
             if (effectiveStart.isBefore(viewStart)) effectiveStart = viewStart;
             
             const effectiveStartStr = effectiveStart.format("YYYY-MM-DD");
             lookup.set(effectiveStartStr, task);
             
             const current = effectiveStart.clone().add(1, 'days');
             const end = moment(task.endDate);
             
             while (current.isSameOrBefore(end)) {
                 const dStr = current.format("YYYY-MM-DD");
                 if (!lookup.has(dStr)) lookup.set(dStr, "occupied"); 
                 current.add(1, 'days');
                 
                 // Optimization: break if beyond viewEnd
                 if (current.isAfter(viewEnd)) break;
             }
        });
        return lookup;
    }, [row, dates]);

    const taskComponents = useMemo(
      () =>
        dates.map((date, index) => {
          const entry = taskMap.get(date);
          
          if (entry === "occupied") return null;
          
          if (!entry) {
             return (
              <EmptyCell
                key={`${line}-${date}`}
                borderColor={borderColor}
                rowIndex={rowIndex}
              />
            );
          }
          
          // It is a task
          const task = entry as SchedulerTask;
          
          // Calculate span
          // We can use the logic we had, but simplified since we know we are at effective start.
           const taskStartIndex = index; // Since we are here, this IS the start (effective or real)
           
           const taskEndIndex = dates.indexOf(
            moment(task.endDate).format("YYYY-MM-DD")
          );

          let span;
          if (taskEndIndex >= 0) {
            span = taskEndIndex - taskStartIndex + 1;
          } else {
             // Ends after view
             span = dates.length - taskStartIndex;
          }

          return (
              <Task
                key={`${task.id}-${date}`}
                task={task}
                span={span}
                rowIndex={rowIndex}
                borderColor={borderColor}
              />
            );
        }),
      [dates, taskMap, line, borderColor, rowIndex]
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
              rowIndex % 2 === 0 ? theme.row.even : theme.row.odd,
            color: theme.text.primary,
            borderColor: theme.border,
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
