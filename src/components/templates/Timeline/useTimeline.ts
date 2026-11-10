import { addDays, differenceInDays, format, isAfter, isValid } from "date-fns";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { defaultStyles } from "../../../data/styles";
import { useChildStore, useDataStore, useStylesStore } from "../../../stores";
import { SchedulerConfig, SchedulerConfigStyles, SchedulerTask, SchedulerTheme, StripIndex } from "../../../types";
import { generateGroupedTasks } from "../../../util/common.util";

interface UseTimelineParams {
  config?: SchedulerConfig;
  data?: SchedulerTask[];
  startOffsetDays?: number;
  endOffsetDays?: number;
  resources?: string[];
  styles?: SchedulerConfigStyles;
  theme?: Partial<SchedulerTheme>;
  tooltipComponent?: (task: SchedulerTask, index?: StripIndex) => React.ReactNode;
}

export function useTimeline(params: UseTimelineParams) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | undefined>();
  const { tableEndDate, tableStartDate, schedulerData, setSchedulerData, setOffsetDays, setConfig } = useDataStore();
  const { setAllStyles, theme: storeTheme } = useStylesStore();
  const { mouseCoordination, rightClickTask, tooltipVisible, setDefaultTooltipComponent, setMouseCoordination, removeRightClickTask } = useChildStore();

  useEffect(() => { if (params.config) setConfig(params.config); }, [params.config, setConfig]);
  useEffect(() => { if (params.tooltipComponent) setDefaultTooltipComponent(params.tooltipComponent); }, [params.tooltipComponent, setDefaultTooltipComponent]);
  useEffect(() => { setAllStyles(params.styles || defaultStyles, params.theme); }, [params.styles, params.theme, setAllStyles]);

  const tasksData = useMemo(
    () => params.data ?? params.config?.data ?? [],
    [params.data, params.config?.data]
  );
  useEffect(() => {
    const isSameLength = tasksData.length === schedulerData.tasks.length;
    const isSame = isSameLength && tasksData.every((t, i) => t.id === schedulerData.tasks[i]?.id && t.startDate === schedulerData.tasks[i]?.startDate && t.endDate === schedulerData.tasks[i]?.endDate);
    if (!isSame) setSchedulerData(tasksData);
  }, [tasksData, schedulerData.tasks, setSchedulerData]);

  useEffect(() => {
    setOffsetDays(params.startOffsetDays ?? params.config?.startOffsetDays ?? 0, params.endOffsetDays ?? params.config?.endOffsetDays ?? 0);
  }, [params.startOffsetDays, params.endOffsetDays, params.config?.startOffsetDays, params.config?.endOffsetDays, setOffsetDays]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMouseCoordination({ x: e.clientX, y: e.clientY });
  }, [setMouseCoordination]);

  useEffect(() => {
    setError(undefined);
    for (const task of schedulerData.tasks) {
      const s = new Date(task.startDate);
      const e = new Date(task.endDate);
      if (!isValid(s) || !isValid(e)) { setError(`Invalid date in task ${task.id}`); break; }
      if (isAfter(s, e)) { setError(`Task ${task.id} has invalid date range`); break; }
    }
  }, [schedulerData.tasks]);

  const groupedTasks = useMemo(() => {
    try {
      const grouped = generateGroupedTasks(schedulerData.tasks);
      params.resources?.forEach((cat) => { if (!grouped[cat]) grouped[cat] = [[]]; });
      return grouped;
    } catch {
      setError("Failed to group tasks.");
      return {};
    }
  }, [schedulerData.tasks, params.resources]);

  const sortedKeys = useMemo(() => Object.keys(groupedTasks).sort((a, b) => a.localeCompare(b)), [groupedTasks]);

  const dates = useMemo(() => {
    if (!tableStartDate || !tableEndDate) return [];
    const days = Math.max(0, differenceInDays(tableEndDate, tableStartDate) + 1);
    return Array.from({ length: days }).map((_, i) => format(addDays(tableStartDate, i), "yyyy-MM-dd"));
  }, [tableStartDate, tableEndDate]);

  return {
    containerRef, error, schedulerData, storeTheme, mouseCoordination, rightClickTask,
    tooltipVisible, removeRightClickTask, handleMouseMove, groupedTasks, sortedKeys, dates,
  };
}
