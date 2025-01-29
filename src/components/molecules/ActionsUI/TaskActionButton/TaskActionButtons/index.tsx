import { ProductionTask } from "../../../../../types";
import { AnimatedButton, Icon } from "../../../../atoms";
import { ContainerAnimation } from "../ContainerAnimation";

type ActionButtons = {
  task: ProductionTask;
  cellWidthPX: number;
  handleShrink: () => void;
  handleExpand: () => void;
  handleVisibleTooltip: (task: ProductionTask) => void;
  setTooltipVisible: (value: React.SetStateAction<React.ReactNode>) => void;
};

export const TaskActionButtons = ({
  cellWidthPX,
  task,
  handleVisibleTooltip,
  handleShrink,
  handleExpand,
  setTooltipVisible,
}: ActionButtons) => (
  <ContainerAnimation
    cellWidthPX={cellWidthPX}
    setTooltipVisible={setTooltipVisible}
    handleVisibleTooltip={handleVisibleTooltip}
    task={task}
  >
    <AnimatedButton onClick={handleShrink}>
      <Icon name="back" />
    </AnimatedButton>
    <AnimatedButton onClick={handleExpand}>
      <Icon name="forward" />
    </AnimatedButton>
  </ContainerAnimation>
);
