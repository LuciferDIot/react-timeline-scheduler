import moment from "moment";
import { useMemo } from "react";
import { useStylesStore } from "../../../../../stores";
import {
  ProductionTask,
  StripIndex,
} from "../../../../../types/scheduler.types";
import { AnimatedButton, StripActionIcon } from "../../../../atoms";
import { ContainerAnimation } from "../ContainerAnimation";

type ActionButtons = {
  task: ProductionTask;
  handleShrink: () => void;
  handleExpand: () => void;
  handleVisibleTooltip: (task: ProductionTask, index?: StripIndex) => void;
};

export const TaskActionButtons = ({
  task,
  handleVisibleTooltip,
  handleShrink,
  handleExpand,
}: ActionButtons) => {
  const { customCellWidthPX } = useStylesStore();
  const left = useMemo(
    () =>
      (task.prevEndDate && moment(task.prevEndDate).isBefore(task.endDate)
        ? moment(task.prevEndDate).diff(
            moment(task.startDate).startOf("days"),
            "days"
          )
        : moment(task.endDate).diff(
            moment(task.startDate).startOf("days"),
            "days"
          )) * customCellWidthPX,
    [customCellWidthPX, task.endDate, task.prevEndDate, task.startDate]
  );

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
