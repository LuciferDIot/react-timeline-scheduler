import React from "react";
import { ContextMenuType, SchedulerConfigStyles, SchedulerTask } from "../../../types";
import { ContextMenu, Tooltip } from "../../atoms";
import { RightClickUI } from "../../molecules";
import { Header } from "../../organisms/Header";
import { Row } from "../../organisms/Row";
import { useTimeline } from "./useTimeline";

interface TimelineViewProps {
  timeline: ReturnType<typeof useTimeline>;
  label: string;
  styles: SchedulerConfigStyles;
  scrollIntoToday?: boolean;
  className?: string;
  rightClickOptions?: ContextMenuType[];
  emptyComponent?: React.ReactNode;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  timeline, label, styles, scrollIntoToday, className, rightClickOptions, emptyComponent,
}) => {
  const {
    containerRef, storeTheme, mouseCoordination, rightClickTask, tooltipVisible,
    removeRightClickTask, handleMouseMove, groupedTasks, sortedKeys, dates,
  } = timeline;

  const allRows = sortedKeys.flatMap((res) => groupedTasks[res]);

  return (
    <>
      <div
        ref={containerRef}
        role="region"
        aria-label={label}
        style={{
          scrollbarColor: `${storeTheme.scrollbar?.thumb || "rgba(0,0,0,0.2)"} ${storeTheme.scrollbar?.track || "transparent"}`,
          scrollbarWidth: "thin",
        }}
        className={`relative w-full h-full scrollbar-thin overflow-x-scroll horizontal-scroll ${className || ""}`}
        onMouseMove={handleMouseMove}
      >
        <div className="w-fit text-sm">
          <Header dates={dates} topic={label} daybgColorHighlight={styles.dayColorHighlight} containerRef={containerRef} scrollIntoToday={scrollIntoToday} />
          {sortedKeys.map((line) => (
            <div className="pb-2" key={line}>
              {groupedTasks[line]?.map((row: SchedulerTask[], taskRowIndex: number) => (
                <Row
                  key={`${line}-${taskRowIndex}`} groupLabel={line} row={row} dates={dates}
                  rowIndex={allRows.findIndex((r) => r === row)}
                  groupedTasks={groupedTasks} taskRowIndex={taskRowIndex} emptyComponent={emptyComponent}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      {tooltipVisible && !rightClickTask && (
        <Tooltip mousePosition={mouseCoordination}>{tooltipVisible}</Tooltip>
      )}
      {rightClickTask && rightClickOptions && (
        <ContextMenu mousePosition={mouseCoordination} onClose={removeRightClickTask}>
          <RightClickUI task={rightClickTask} rightClickOptions={rightClickOptions} />
        </ContextMenu>
      )}
    </>
  );
};

TimelineView.displayName = "TimelineView";

