import { useChildStore } from "../../../../stores";
import { ContextMenuType, ProductionTask } from "../../../../types";

type Props = {
  task: ProductionTask;
  rightClickOptions: ContextMenuType[];
};

function RightClickUI({ task, rightClickOptions }: Props) {
  return (
    <div className="min-w-48 rounded-md bg-black/50 backdrop-blur-md text-white text-xs px-4">
      <div className="p-3 pb-1 w-full">
        <label className="capitalize text-opacity-50 font-bold text-center">
          {task.label}
        </label>
      </div>
      <div className="h-px border-b border-white/30" />
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
  task: ProductionTask;
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
  return (
    <>
      <div
        className="flex justify-center items-center gap-4 text-nowrap p-3 hover:scale-110 cursor-pointer"
        onClick={() => {
          onAction(task);
          removeRightClickTask();
        }}
      >
        <div className="w-8 text-sm">{icon}</div>
        <div className="w-full">{label}</div>
      </div>
      {!isLast && <div className="h-px border-b border-white/30" />}
    </>
  );
};

export { RightClickUI };
