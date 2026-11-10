import { format } from "date-fns";
import React, { useEffect, useMemo, useRef } from "react";
import { useActionStore, useStylesStore } from "../../../stores";
import { SchedulerTask } from "../../../types";
import { EmptyCell } from "../../molecules";
import { Task } from "../Task";
import { RowLayout } from "./RowLayout";
import { useRowLayout } from "./useRowLayout";

interface RowProps {
  groupLabel: string;
  row: SchedulerTask[];
  dates: string[];
  rowIndex: number;
  groupedTasks: Record<string, SchedulerTask[][]>;
  taskRowIndex: number;
  emptyComponent?: React.ReactNode;
}

export const Row: React.FC<RowProps> = React.memo(({
  groupLabel: line, row, dates, rowIndex, groupedTasks, taskRowIndex, emptyComponent,
}) => {
  const { onRowLabelClick } = useActionStore();
  const { borderColor, setRowLabelMaxWidth } = useStylesStore();
  const labelRef = useRef<HTMLDivElement>(null);
  const { taskMap } = useRowLayout(row, dates);

  useEffect(() => {
    if (labelRef.current) {
      const width = labelRef.current.getBoundingClientRect().width;
      setRowLabelMaxWidth((prev) => Math.max(prev, width));
    }
  }, [line, setRowLabelMaxWidth]);

  const taskComponents = useMemo(() => dates.map((date, index) => {
    const entry = taskMap.get(date);
    if (entry === "occupied") return null;
    if (!entry) {
      return <EmptyCell key={`${line}-${date}`} borderColor={borderColor} rowIndex={rowIndex} />;
    }
    const task = entry as SchedulerTask;
    const taskEndIndex = dates.indexOf(format(new Date(task.endDate), "yyyy-MM-dd"));
    const span = taskEndIndex >= 0 ? taskEndIndex - index + 1 : dates.length - index;

    return (
      <Task key={`${task.id}-${date}`} task={task} span={span} rowIndex={rowIndex} borderColor={borderColor} />
    );
  }), [dates, taskMap, line, borderColor, rowIndex]);

  const totalGroupRows = groupedTasks[line]?.length ?? 0;

  return (
    <RowLayout
      line={line} rowIndex={rowIndex} taskRowIndex={taskRowIndex} totalGroupRows={totalGroupRows}
      borderColor={borderColor} labelRef={labelRef} onRowLabelClick={onRowLabelClick}
      taskComponents={taskComponents} emptyComponent={emptyComponent} hasTasks={row.length > 0}
    />
  );
});

Row.displayName = "Row";
