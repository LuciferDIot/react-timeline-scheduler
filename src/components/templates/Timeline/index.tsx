import { AnimatePresence, MotionConfig } from "framer-motion";
import React, { useEffect } from "react";
import { defaultStyles } from "../../../data/styles";
import { useActionStore } from "../../../stores";
import { AnimationConfig, ContextMenuType, DragConfig, SchedulerConfig, SchedulerConfigStyles, SchedulerTask, SchedulerTheme, StripIndex } from "../../../types";
import { TimelineError } from "./TimelineError";
import { TimelineView } from "./TimelineView";
import { useTimeline } from "./useTimeline";

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
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
  rightClickOptions?: ContextMenuType[];
  onTaskClick?: (task: SchedulerTask) => void;
  onRowExpand?: (groupLabel: string, groupId: string, task: SchedulerTask) => Promise<void>;
  onRowShrink?: (groupLabel: string, groupId: string, task: SchedulerTask) => Promise<void>;
  onRowLabelClick?: (groupLabel: string) => void;
  tooltipComponent?: (task: SchedulerTask, index?: StripIndex) => React.ReactNode;
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = React.memo((props) => {
  const { setAll, setDragConfig, setAnimationConfig } = useActionStore();
  const label = props.label ?? props.config?.label ?? "Timeline";
  const styles = props.styles ?? props.config?.styles ?? defaultStyles;
  const dragConfig = props.dragConfig ?? props.config?.dragConfig;
  const animationConfig = props.animationConfig ?? props.config?.animationConfig;

  useEffect(() => {
    setAll({ onTaskClick: props.onTaskClick, onRowExpand: props.onRowExpand, onRowShrink: props.onRowShrink, onRowLabelClick: props.onRowLabelClick });
  }, [props.onTaskClick, props.onRowExpand, props.onRowShrink, props.onRowLabelClick, setAll]);

  useEffect(() => {
    if (dragConfig) setDragConfig(dragConfig);
    if (animationConfig) setAnimationConfig(animationConfig);
  }, [dragConfig, animationConfig, setDragConfig, setAnimationConfig]);

  const timeline = useTimeline(props);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="sync">
        {props.loading || timeline.error ? (
          <TimelineError loading={props.loading} error={timeline.error} loadingComponent={props.loadingComponent} errorComponent={props.errorComponent} />
        ) : (
          <TimelineView
            timeline={timeline} label={label} styles={styles}
            scrollIntoToday={props.scrollIntoToday} className={props.className}
            rightClickOptions={props.rightClickOptions} emptyComponent={props.emptyComponent}
          />
        )}
      </AnimatePresence>
    </MotionConfig>
  );
});

Timeline.displayName = "Timeline";
