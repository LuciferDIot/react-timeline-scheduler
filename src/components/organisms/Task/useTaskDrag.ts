import { addDays, isAfter, isBefore, isSameDay } from "date-fns";
import React, { useRef, useState } from "react";
import { useActionStore, useDataStore } from "../../../stores";
import { SchedulerTask } from "../../../types";

export interface DragProperties {
  width: number;
  left: number;
  direction: "left" | "right";
}

export function useTaskDrag(task: SchedulerTask, taskWidth: number, cellWidth: number) {
  const { lockOperations, onRowExpand, onRowShrink } = useActionStore();
  const { updateSchedulerTaskDates } = useDataStore();
  const [isDragging, setIsDragging] = useState(false);
  const [dragProperties, setDragProperties] = useState<DragProperties | null>(null);
  const virtualDeltaRef = useRef(0);

  const applyDateChange = (direction: "left" | "right", daysChanged: number) => {
    if (daysChanged === 0) return;
    updateSchedulerTaskDates((prev) => {
      const idx = prev.findIndex((t) => t.id === task.id);
      if (idx === -1) return prev;
      const updated = { ...prev[idx] };

      if (direction === "right") {
        const newEnd = addDays(new Date(updated.endDate), daysChanged);
        if (isBefore(newEnd, new Date(updated.startDate))) return prev;
        if (updated.prevEndDate && isSameDay(newEnd, new Date(updated.prevEndDate))) {
          updated.prevEndDate = undefined;
        } else if (!updated.prevEndDate) {
          updated.prevEndDate = updated.endDate;
        }
        updated.endDate = newEnd;
      } else {
        const newStart = addDays(new Date(updated.startDate), daysChanged);
        if (isAfter(newStart, new Date(updated.endDate))) return prev;
        updated.startDate = newStart;
      }

      const isExpand = (direction === "right" && daysChanged > 0) || (direction === "left" && daysChanged < 0);
      if (isExpand && onRowExpand) onRowExpand(task.groupLabel, task.groupId, updated);
      if (!isExpand && onRowShrink) onRowShrink(task.groupLabel, task.groupId, updated);

      prev[idx] = updated;
      return [...prev];
    });
  };

  const handleMouseDown = (e: React.MouseEvent, direction: "left" | "right") => {
    if (lockOperations) return;
    e.stopPropagation();
    e.preventDefault();
    setIsDragging(true);
    setDragProperties({ width: taskWidth, left: 0, direction });
    const startX = e.clientX;
    const startWidth = taskWidth;
    virtualDeltaRef.current = 0;

    const onMove = (me: MouseEvent) => {
      const delta = me.clientX - startX;
      if (direction === "right") {
        setDragProperties({ width: Math.max(cellWidth, startWidth + delta), left: 0, direction });
      } else {
        const clamped = Math.min(delta, startWidth - cellWidth);
        setDragProperties({ width: startWidth - clamped, left: clamped, direction });
      }
    };

    const onUp = (ue: MouseEvent) => {
      setIsDragging(false);
      setDragProperties(null);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      const days = Math.round((ue.clientX - startX) / cellWidth);
      applyDateChange(direction, days);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp, { once: true });
  };

  return { isDragging, dragProperties, handleMouseDown, applyDateChange };
}
