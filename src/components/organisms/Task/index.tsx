import { motion } from "framer-motion";
import moment from "moment";
import React, { useCallback, useMemo, useRef } from "react";
import { TaskColors } from "../../../data/styles";
import {
    useActionStore,
    useChildStore,
    useDataStore,
    useStylesStore,
} from "../../../stores";
import { SchedulerTask, StripIndex } from "../../../types";
import { calculateDatesPercentage } from "../../../util/date.util";
import { TaskLabel } from "../../atoms";
import {
    DiscontinueCells,
    TaskCells
} from "../../molecules";

interface TaskProps {
  task: SchedulerTask;
  span: number;
  rowIndex: number;
  borderColor: string;
}

export const Task: React.FC<TaskProps> = React.memo(
  ({ task, span, rowIndex, borderColor }) => {
    const { setTooltipVisible, setrightClickTask, defaultTooltipComponent } =
      useChildStore();
    const { lockOperations, onRowExpand, onRowShrink, onTaskClick, dragConfig } =
      useActionStore();
  const { customCellWidthPX, taskColorFormat, theme } = useStylesStore();
    const { updateSchedulerTaskDates } = useDataStore();
    const [isDragging, setIsDragging] = React.useState(false);
    const [dragProperties, setDragProperties] = React.useState<{
      width: number;
      left: number;
      direction: "left" | "right";
    } | null>(null);
    const virtualDeltaRef = useRef(0);


    const taskWidth = useMemo(
      () => customCellWidthPX * span,
      [customCellWidthPX, span]
    );

    const taskBackgroundColor = useMemo(() => {
      return taskColorFormat &&
        task.colorKey &&
        taskColorFormat[task.colorKey]
        ? taskColorFormat[task.colorKey]
        : rowIndex % 2 === 0
        ? theme.task.even
        : theme.task.odd;
    }, [taskColorFormat, task.colorKey, rowIndex, theme]);

    const extendedStyles = useMemo(() => {
      return {
        borderColor: task.extendedStyles?.borderColor
          ? task.extendedStyles.borderColor
          : TaskColors.REMOVED_TASK,
        backgroundColor: task.extendedStyles?.backgroundColor
          ? task.extendedStyles.backgroundColor
          : `${TaskColors.REMOVED_TASK}20`,
      };
    }, [task.extendedStyles]);

    const handleVisibleTooltip = useCallback(
      (task: SchedulerTask, index?: StripIndex) => {
        if (isDragging) return; // Disable tooltip during drag
        setTooltipVisible(
          task.tooltipComponent
            ? task.tooltipComponent(task, index)
            : defaultTooltipComponent?.(task, index)
        );
      },
      [defaultTooltipComponent, setTooltipVisible, isDragging]
    );

    const handleRightClick = (task: SchedulerTask, e: React.MouseEvent) => {
      e.preventDefault(); // Prevent the default context menu from appearing
      setrightClickTask(task); // Call the right-click handler
    };

    const labelLeftPercentage =
      (calculateDatesPercentage(task.startDate) * customCellWidthPX) / 100;

    const handleMouseDown = (e: React.MouseEvent, direction: "left" | "right") => {
      if (lockOperations) return;
      e.stopPropagation();
      e.preventDefault(); 
      
      setIsDragging(true);
      setDragProperties({ width: taskWidth, left: 0, direction });

      const startX = e.clientX;
      const startWidth = taskWidth;
      
      // Auto-scroll setup
      const viewport = document.querySelector(".horizontal-scroll");
      const startScrollLeft = viewport ? viewport.scrollLeft : 0;
      
      let currentMouseX = e.clientX;
      let rafId: number | undefined;

      // Global style updates
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";

      virtualDeltaRef.current = 0;

       const calculateDrag = (clientX: number, virtualSpeed = 0) => {
          const currentScroll = viewport ? viewport.scrollLeft : 0;
          const scrollDelta = currentScroll - startScrollLeft;
          const mouseDelta = clientX - startX;
          
          virtualDeltaRef.current += virtualSpeed;
          
          const totalDelta = mouseDelta + scrollDelta + virtualDeltaRef.current;
          
          if (direction === "right") {
            const newWidth = Math.max(customCellWidthPX, startWidth + totalDelta);
            setDragProperties({ width: newWidth, left: 0, direction });
          } else {
            const clampedDelta = Math.min(totalDelta, startWidth - customCellWidthPX);
            // Allow expanding left indefinitely (negative clampedDelta)
            // But if shrinking, clamp to min width.
            
            // Wait, logic above for left:
            // startWidth - clampedDelta = newWidth.
             // If totalDelta is large positive (shrinking from left), we clamp it to startWidth - minWidth.
            // If totalDelta is negative (expanding left), we don't clamp?
            // "clampedDelta" naming is confusing.
            
            // Logic check:
            // If expanding left, totalDelta is negative. clampedDelta = negative.
            // width = startWidth - (-large) = large. Correct.
            // left = -large. Correct.
            
            setDragProperties({
               width: startWidth - clampedDelta,
               left: clampedDelta,
               direction
             });
          }
       };

       const handleMouseMove = (moveEvent: MouseEvent) => {
        currentMouseX = moveEvent.clientX;
        calculateDrag(moveEvent.clientX);
      };

       const autoScrollLoop = () => {
         if (!viewport || !dragConfig.autoScroll?.enabled) return;
         
         const { left, right } = viewport.getBoundingClientRect();
         const mouseX = currentMouseX;
         const edgeZone = dragConfig.autoScroll?.edgeZone ?? 50;
         const maxSpeed = dragConfig.autoScroll?.maxSpeed ?? 20;
         
         let scrollSpeed = 0;
         
         if (mouseX < left + edgeZone) {
            const distance = Math.max(0, (left + edgeZone) - mouseX);
            const intensity = Math.min(1, distance / edgeZone);
            scrollSpeed = -intensity * maxSpeed;
         } else if (mouseX > right - edgeZone) {
            const distance = Math.max(0, mouseX - (right - edgeZone));
            const intensity = Math.min(1, distance / edgeZone);
            scrollSpeed = intensity * maxSpeed;
         }
         
         if (scrollSpeed !== 0) {
            const prevScrollLeft = viewport.scrollLeft;
            viewport.scrollLeft += scrollSpeed;
            const actualScrollDelta = viewport.scrollLeft - prevScrollLeft;
            
            // If scroll was clamped (hit the edge), we treat the remaining speed as "virtual" expansion
            // This allows the task to keep growing even if the view can't scroll further
            if (Math.abs(actualScrollDelta) < Math.abs(scrollSpeed)) {
                calculateDrag(mouseX, scrollSpeed);
            } else {
                calculateDrag(mouseX);
            }
         }
         
         rafId = requestAnimationFrame(autoScrollLoop);
      };

      rafId = requestAnimationFrame(autoScrollLoop);

      const handleMouseUp = (upEvent: MouseEvent) => {
        setIsDragging(false);
        setDragProperties(null);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        if (rafId) cancelAnimationFrame(rafId);
         
        const finalScroll = viewport ? viewport.scrollLeft : 0;
        const scrollDelta = finalScroll - startScrollLeft;
        const mouseDelta = upEvent.clientX - startX;
        
        const totalDelta = mouseDelta + scrollDelta + virtualDeltaRef.current;
        
        const cellWidth = customCellWidthPX;
        const daysChanged = Math.round(totalDelta / cellWidth);

        if (daysChanged !== 0) {
          const updateAction = (prev: SchedulerTask[]) => {
             const taskIndex = prev.findIndex((t) => t.id === task.id);
             if (taskIndex === -1) return prev;
             
             const updatedTask = { ...prev[taskIndex] };
             
             if (direction === "right") {
                 const newEndDate = moment(updatedTask.endDate).add(daysChanged, "days").toDate();
                 if (moment(updatedTask.startDate).isSameOrAfter(newEndDate)) return prev;
                 
                  // Update prevEndDate logic
                  if (
                    moment(newEndDate).date() === moment(updatedTask.prevEndDate).date()
                  ) {
                    updatedTask.prevEndDate = undefined;
                  } else if (updatedTask.prevEndDate === undefined) {
                    updatedTask.prevEndDate = updatedTask.endDate;
                  }
                 updatedTask.endDate = newEndDate;
             } else {
                 const newStartDate = moment(updatedTask.startDate).add(daysChanged, "days").toDate();
                 if (moment(newStartDate).isSameOrAfter(updatedTask.endDate)) return prev;
                 updatedTask.startDate = newStartDate;
             }
             
             const isExpansion = (direction === "right" && daysChanged > 0) || (direction === "left" && daysChanged < 0);
             
             if (isExpansion && onRowExpand) onRowExpand(task.groupLabel, task.groupId, updatedTask);
             if (!isExpansion && onRowShrink) onRowShrink(task.groupLabel, task.groupId, updatedTask);

             prev[taskIndex] = updatedTask;
             return [...prev];
          };

          updateSchedulerTaskDates(updateAction);
        }
      };
      
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp, { once: true });
    };

    return (
      <div
        style={{
          width: `${taskWidth}px`,
          height: "100%",
          position: "relative",
          zIndex: isDragging ? 50 : 0,
        }}
        className={isDragging ? "z-50" : ""}
      >
        <motion.div
          id={task.id}
          key={`${task.id}-${taskWidth}-${task.startDate}-${task.endDate}`}
          className={`relative group flex w-full h-full p-0.5 text-white font-bold 
          text-sm z-0 min-h-10 border text-center text-nowrap ${borderColor} ${
            lockOperations ? "cursor-default" : "cursor-pointer"
          } ${isDragging ? "opacity-90 shadow-2xl" : "hover:opacity-100"}`}
          animate={{
            width: isDragging && dragProperties ? `${dragProperties.width}px` : "100%",
          }}
          style={{
            position: isDragging ? "absolute" : "relative",
            left: isDragging && dragProperties ? `${dragProperties.left}px` : 0, // Handle left shift
            top: 0,
            zIndex: isDragging ? 50 : 1,
            width: isDragging && dragProperties ? `${dragProperties.width}px` : "100%",
            backgroundColor:
              rowIndex % 2 === 0 ? theme.row.even : theme.row.odd,
            borderColor: theme.task && theme.task.border !== undefined 
                ? theme.task.border 
                : borderColor,
          }}
          onContextMenu={(e) => handleRightClick(task, e)}
          layout={!isDragging}
        >
          <TaskLabel label={task.label} addExtraLeft={labelLeftPercentage} />

          <motion.div
            className="w-fit h-full flex-1"
            onClick={() => !isDragging && onTaskClick?.(task)}
            initial={{ width: 0 }}
            animate={{ width: "fit-content" }}
          >
            {task.discontinue && (
              <DiscontinueCells
                endDate={task.discontinue.endDate!}
                startDate={task.discontinue.startDate!}
                stripStartDate={task.startDate}
              />
            )}
            <TaskCells
              task={task}
              handleVisibleTooltip={handleVisibleTooltip}
              taskBackgroundColor={taskBackgroundColor || ""}
              extendedStyles={extendedStyles}
              dates={{
                startDate: task.startDate,
                endDate: task.endDate,
                prevEndDate: task.prevEndDate,
              }}
            />
          </motion.div>

          {/* Resize Handles */}
          {!lockOperations && (
            <>
                {dragConfig.enableLeftResize && (
                  <div
                    className="absolute left-0 top-0 bottom-0 w-4 cursor-col-resize z-50 hover:bg-black/10 transition-colors touch-none"
                    style={{ left: "-8px" }}
                    onMouseDown={(e) => handleMouseDown(e, "left")}
                  />
                )}
                {dragConfig.enableRightResize && (
                  <div
                    className="absolute right-0 top-0 bottom-0 w-4 cursor-col-resize z-50 hover:bg-black/10 transition-colors touch-none"
                    style={{ right: "-8px" }}
                    onMouseDown={(e) => handleMouseDown(e, "right")}
                  />
                )}
            </>
          )}
        </motion.div>
      </div>
    );
  }
);
