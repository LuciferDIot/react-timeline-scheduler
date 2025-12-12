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
    AnimationConfig,
    ContextMenuType,
    DragConfig,
    SchedulerConfig,
    SchedulerConfigStyles,
    SchedulerTask,
    SchedulerTheme,
    StripIndex,
} from "../../../types";
import { generateGroupedTasks } from "../../../util/common.util";
import { ContextMenu, Tooltip } from "../../atoms";
import { RightClickUI } from "../../molecules";
import { Header } from "../../organisms/Header";
import { Row } from "../../organisms/Row";

export interface TimelineProps {
  config?: SchedulerConfig;
  label?: string;
  data?: SchedulerTask[];
  startOffsetDays?: number;
  endOffsetDays?: number;
  resources?: string[];
  styles?: SchedulerConfigStyles;
  theme?: Partial<SchedulerTheme>;
  dragConfig?: DragConfig;
  animationConfig?: AnimationConfig;
  scrollIntoToday?: boolean;
  loading?: boolean;
  rightClickOptions?: ContextMenuType[];
  onTaskClick?: (task: SchedulerTask) => void;
  onRowExpand?: (
    groupLabel: string,
    groupId: string,
    task: SchedulerTask
  ) => Promise<void>;
  onRowShrink?: (
    groupLabel: string,
    groupId: string,
    task: SchedulerTask
  ) => Promise<void>;
  onRowLabelClick?: (groupLabel: string) => void;
  tooltipComponent?: (
    task: SchedulerTask,
    index?: StripIndex
  ) => React.ReactNode;
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = React.memo(
  ({
    config,
    label: propLabel,
    data: propData,
    startOffsetDays: propStartOffsetDays,
    endOffsetDays: propEndOffsetDays,
    resources: propResources,
    styles: propStyles,
    theme: propTheme,
    dragConfig: propDragConfig,
    animationConfig: propAnimationConfig,
    rightClickOptions,
    scrollIntoToday,
    tooltipComponent,
    onRowExpand,
    onRowShrink,
    onTaskClick,
    onRowLabelClick,
    loading,
    className,
  }) => {
    // Merge config and props with defaults
    const label = propLabel ?? config?.label ?? "Timeline";
    const data = propData ?? config?.data ?? [];
    const startOffsetDays = propStartOffsetDays ?? config?.startOffsetDays ?? 0;
    const endOffsetDays = propEndOffsetDays ?? config?.endOffsetDays ?? 0;
    const resources = propResources ?? config?.resources;
    const styles = propStyles ?? config?.styles ?? defaultStyles;
    const theme = propTheme ?? config?.theme;
    const dragConfig = propDragConfig ?? config?.dragConfig;
    const animationConfig = propAnimationConfig ?? config?.animationConfig;
    const containerRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | undefined>();

    const {
      tableEndDate,
      tableStartDate,
      schedulerData,
      setSchedulerData,
      setOffsetDays,
    } = useDataStore();
    const { setAllStyles } = useStylesStore();

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
      if (dragConfig) {
        useActionStore.getState().setDragConfig(dragConfig);
      }
      if (animationConfig) {
        useActionStore.getState().setAnimationConfig(animationConfig);
      }
    }, [dragConfig, animationConfig]);

    useEffect(() => {
      tooltipComponent && setDefaultTooltipComponent(tooltipComponent);
    }, [setDefaultTooltipComponent, tooltipComponent]);

    useEffect(() => {
      setAllStyles(styles, theme);
    }, [setAllStyles, styles, theme]);

    useEffect(() => {
      if (!_.isEqual(data, schedulerData.tasks)) {
        setSchedulerData(data);
      }
    }, [data, schedulerData.tasks, setSchedulerData]);

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
      schedulerData.tasks.forEach((task) => {
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
    }, [schedulerData]);

    const mandatoryFieldsAvailable = useMemo(() => {
      return schedulerData.tasks.every(
        (task) =>
          moment(task.startDate).isValid() &&
          moment(task.endDate).isValid() &&
          moment(task.startDate).isSameOrBefore(moment(task.endDate))
      );
    }, [schedulerData]);

    const groupedTasks = useMemo(() => {
      try {
        const grouped = generateGroupedTasks(schedulerData.tasks);
        resources?.forEach((category: string) => {
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
    }, [schedulerData, resources]);

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
                className={`relative w-full h-full
          scrollbar-track-white dark:scrollbar-track-black scrollbar-thumb-black/20
          scrollbar-thin overflow-x-scroll horizontal-scroll ${className || ""}`}
                onMouseMove={handleMouseMove}
              >
                <div className="w-fit text-sm">
                  <Header
                    dates={dates}
                    topic={label}
                    daybgColorHighlight={styles.dayColorHighlight}
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
                            groupLabel={line}
                            row={row}
                            dates={dates}
                            rowIndex={Object.keys(groupedTasks)
                              .sort((a, b) => a.localeCompare(b))
                              .flatMap((resource) => groupedTasks[resource])
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
