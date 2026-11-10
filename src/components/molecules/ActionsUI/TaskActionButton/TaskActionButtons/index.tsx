import { differenceInDays, isBefore, startOfDay } from "date-fns";
import { useMemo } from "react";
import { useStylesStore } from "../../../../../stores";
import { SchedulerTask, StripIndex } from "../../../../../types";
import { AnimatedButton, StripActionIcon } from "../../../../atoms";
import { ContainerAnimation } from "../ContainerAnimation";

type ActionButtons = {
  task: SchedulerTask;
  handleShrink: () => void;
  handleExpand: () => void;
  handleVisibleTooltip: (task: SchedulerTask, index?: StripIndex) => void;
};

export const TaskActionButtons = ({
  task,
  handleVisibleTooltip,
  handleShrink,
  handleExpand,
}: ActionButtons) => {
  const { customCellWidthPX } = useStylesStore();
  const left = useMemo(() => {
    const start = startOfDay(new Date(task.startDate));
    const target =
      task.prevEndDate && isBefore(new Date(task.prevEndDate), new Date(task.endDate))
        ? new Date(task.prevEndDate)
        : new Date(task.endDate);
    return differenceInDays(target, start) * customCellWidthPX;
  }, [customCellWidthPX, task.endDate, task.prevEndDate, task.startDate]);

  return (
    <ContainerAnimation
      left={left}
      cellWidthPX={customCellWidthPX}
      handleVisibleTooltip={handleVisibleTooltip}
      task={task}
    >
      <AnimatedButton onClick={handleShrink}>
        <StripActionIcon name="back" />
      </AnimatedButton>
      <AnimatedButton onClick={handleExpand}>
        <StripActionIcon name="forward" />
      </AnimatedButton>
    </ContainerAnimation>
  );
};
