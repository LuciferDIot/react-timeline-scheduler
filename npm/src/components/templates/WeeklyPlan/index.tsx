import { AnimatePresence } from "framer-motion";
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { defaultStyles } from "../../../data/styles";
import {
  useActionStore,
  useChildStore,
  useDataStore,
  useStylesStore,
} from "../../../stores";
import {
  ContextMenuType,
  ProductionTask,
  StripIndex,
  WeeklyPlanConfig,
} from "../../../types";
import { generateGroupedTasks } from "../../../util/common.util";
import { ContextMenu, Tooltip } from "../../atoms";
import { RightClickUI } from "../../molecules";
import { Header } from "../../organisms/Header";
import { Row } from "../../organisms/Row";

export interface TimelineSchedulerProps {
  config: WeeklyPlanConfig;
  scrollIntoToday?: boolean;
  loading?: boolean;
  rightClickOptions?: ContextMenuType[];
  onTaskClick?: (task: ProductionTask) => void;
  onRowExpand?: (
    departmentName: string,
    departmentId: string,
    task: ProductionTask
  ) => Promise<void>;
  onRowShrink?: (
    departmentName: string,
    departmentId: string,
    task: ProductionTask
  ) => Promise<void>;
  onRowLabelClick?: (departmentName: string) => void;
  tooltipComponent?: (
    task: ProductionTask,
    index?: StripIndex
  ) => React.ReactNode;
}

export const TimeLineScheduler: React.FC<TimelineSchedulerProps> = React.memo(
  ({
    config: {
      topic,
      startOffsetDays = 0,
      endOffsetDays = 0,
      data = [],
      styles = defaultStyles,
      rowCategories,
    },
    rightClickOptions,
    scrollIntoToday,
    tooltipComponent,
    onRowExpand,
    onRowShrink,
    onTaskClick,
    onRowLabelClick,
    loading, // New loading prop
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | undefined>();

    const {
      tableEndDate,
      tableStartDate,
      schedulerTasks,
      setSchedulerTasks,
      setOffsetDays,
    } = useDataStore();
    const { borderColor, setAllStyles } = useStylesStore();

    const {
      mouseCoordination,
      rightClickTask,
      tooltipVisible,
      setDefaultTooltipComponent,
      setMouseCoordination,
      removeRightClickTask,
    } = useChildStore();

    const { setAll } = useActionStore();

    useEffect(() => {
      setAll({ onTaskClick, onRowExpand, onRowShrink, onRowLabelClick });
    }, [onTaskClick, onRowExpand, onRowShrink, onRowLabelClick, setAll]);

    useEffect(() => {
      if (tooltipComponent) {
        setDefaultTooltipComponent(tooltipComponent);
      }
    }, [setDefaultTooltipComponent, tooltipComponent]);

    useEffect(() => {
      setAllStyles(styles);
    }, [setAllStyles, styles]);

    useEffect(() => {
      if (!_.isEqual(data, schedulerTasks)) {
        setSchedulerTasks(data);
      }
    }, [data, schedulerTasks, setSchedulerTasks]);

    useEffect(() => {
      setOffsetDays(startOffsetDays, endOffsetDays);
    }, [startOffsetDays, endOffsetDays, setOffsetDays]);

    const handleMouseMove = (e: React.MouseEvent) => {
      if (tooltipVisible) {
        setMouseCoordination({ x: e.clientX, y: e.clientY });
      }
    };

    useEffect(() => {
      setError(undefined);
      schedulerTasks.tableDate.forEach((task) => {
        if (!moment(task.startDate).isValid()) {
          console.error(`Invalid startDate in task ${task.id}`, task.startDate);
          setError(`Invalid startDate in task ${task.id}`);
        }
        if (!moment(task.endDate).isValid()) {
          console.error(`Invalid endDate in task ${task.id}`, task.endDate);
          setError(`Invalid endDate in task ${task.id}`);
        }
        if (moment(task.startDate).isAfter(moment(task.endDate))) {
          setError(`Task ${task.id} has an invalid date range`);
        }
      });
    }, [schedulerTasks]);

    const mandatoryFieldsAvailable = useMemo(() => {
      return schedulerTasks.tableDate.every(
        (task) =>
          moment(task.startDate).isValid() &&
          moment(task.endDate).isValid() &&
          moment(task.startDate).isSameOrBefore(moment(task.endDate))
      );
    }, [schedulerTasks]);

    const groupedTasks = useMemo(() => {
      try {
        const grouped = generateGroupedTasks(schedulerTasks.tableDate);
        rowCategories?.forEach((category: string) => {
          if (!grouped[category]) {
            grouped[category] = [[]];
          }
        });
        return grouped;
      } catch (err) {
        console.error("Error while grouping tasks:", err);
        setError("Failed to group tasks. Check data format.");
        return {};
      }
    }, [schedulerTasks, rowCategories]);

    const dates = useMemo(() => {
      if (!tableStartDate || !tableEndDate) return [];

      const start = moment(tableStartDate);
      const end = moment(tableEndDate);

      return Array.from({ length: end.diff(start, "days") + 1 }).map(
        (_, index) => start.clone().add(index, "days").format("YYYY-MM-DD")
      );
    }, [tableStartDate, tableEndDate]);

    try {
      if (!dates) setError("Failed to generate dates.");

      return (
        <AnimatePresence mode="sync" presenceAffectsLayout>
          {loading || !mandatoryFieldsAvailable ? (
            <div className="w-full h-full flex justify-center items-center p-4">
              {loading ? "Loading..." : "Error: Mandatory fields are missing."}
            </div>
          ) : error ? (
            <div className="w-full h-full flex justify-center items-center p-4">
              {error}
            </div>
          ) : (
            <>
              <div
                ref={containerRef}
                className={`relative border ${borderColor} max-w-[90vw] max-h-[75vh] w-fit h-fit
                rounded-md scrollbar-thin overflow-x-scroll `}
                onMouseMove={handleMouseMove}
              >
                <div className="w-fit text-sm">
                  <Header
                    dates={dates}
                    topic={topic}
                    daybgColorHighlight={styles.daybgColorHighlight}
                    containerRef={containerRef}
                    scrollIntoToday={scrollIntoToday}
                  />
                  {Object.keys(groupedTasks || [])
                    .sort((a, b) => a.localeCompare(b))
                    .map((line) => (
                      <div className="pb-2 bg-white" key={line}>
                        {groupedTasks[line]?.map((row, taskRowIndex) => (
                          <Row
                            key={`${line}-${taskRowIndex}`}
                            departmentName={line}
                            row={row}
                            dates={dates}
                            rowIndex={Object.keys(groupedTasks)
                              .sort((a, b) => a.localeCompare(b))
                              .flatMap((department) => groupedTasks[department])
                              .findIndex((r) => r === row)}
                            groupedTasks={groupedTasks}
                            taskRowIndex={taskRowIndex}
                          />
                        ))}
                      </div>
                    ))}
                </div>
              </div>
              {tooltipVisible && !rightClickTask && (
                <Tooltip mousePosition={mouseCoordination}>
                  {tooltipVisible}
                </Tooltip>
              )}
              {rightClickTask && rightClickOptions && (
                <ContextMenu
                  mousePosition={mouseCoordination}
                  onClose={() => removeRightClickTask()}
                >
                  <RightClickUI
                    task={rightClickTask}
                    rightClickOptions={rightClickOptions}
                  />
                </ContextMenu>
              )}
            </>
          )}
        </AnimatePresence>
      );
    } catch (error) {
      console.error("Error in TimelineScheduler:", error);
      return (
        <div className="w-full h-full flex justify-center items-center p-4">
          {error instanceof Error
            ? error.message
            : "An unexpected error occurred."}
        </div>
      );
    }
  }
);
