import { useChildStore, useStylesStore } from "../../../../stores";
import { ContextMenuType, SchedulerTask } from "../../../../types";

type Props = {
  task: SchedulerTask;
  rightClickOptions: ContextMenuType[];
};

function RightClickUI({ task, rightClickOptions }: Props) {
  const { theme } = useStylesStore();
  
  return (
    <div 
      className="min-w-48 rounded-md backdrop-blur-md text-xs px-4"
      style={{
        backgroundColor: theme.background.primary,
        color: theme.text.primary,
      }}
    >
      <div className="p-3 pb-1 w-full">
        <label className="capitalize opacity-50 font-bold text-center" style={{ color: theme.text.primary }}>
          {task.label}
        </label>
      </div>
      <div className="h-px border-b" style={{ borderColor: theme.border }} />
      {rightClickOptions.map((data, index) => (
        <RightClickUIRow
          key={index}
          isLast={index === rightClickOptions.length - 1}
          task={task}
          {...data}
        />
      ))}
    </div>
  );
}

type RightClickUIRowType = {
  task: SchedulerTask;
  isLast: boolean;
} & ContextMenuType;

const RightClickUIRow = ({
  icon,
  label,
  onAction,
  task,
  isLast,
}: RightClickUIRowType) => {
  const { removeRightClickTask } = useChildStore();
  const { theme } = useStylesStore();
  
  return (
    <>
      <div
        className="flex justify-center items-center gap-4 text-nowrap p-3 hover:scale-110 cursor-pointer transition-transform"
        style={{ color: theme.text.primary }}
        onClick={() => {
          onAction(task);
          removeRightClickTask();
        }}
      >
        <div className="w-8 text-sm">{icon}</div>
        <div className="w-full">{label}</div>
      </div>
      {!isLast && <div className="h-px border-b" style={{ borderColor: theme.border }} />}
    </>
  );
};

export { RightClickUI };
