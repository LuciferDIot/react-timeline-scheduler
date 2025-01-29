import { BsLayoutSplit } from "react-icons/bs";
import { CiPen } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { IoPauseCircleOutline } from "react-icons/io5";
import { MdOutlineContentCut } from "react-icons/md";
import { ProductionTask } from "../../../../types";

type Props = {
  task: ProductionTask;
  rightClickOptions?: ContextMenuType[];
  setSchedulerTasks: React.Dispatch<React.SetStateAction<ProductionTask[]>>;
};

type ContextMenuType = {
  icon: React.ReactNode;
  label: string;
  onAction: (task: ProductionTask) => void;
};

function RightClickUI({ task, rightClickOptions }: Props) {
  const tooltipData: ContextMenuType[] = [
    {
      icon: <FiEdit />,
      label: "Edit Strip",
      onAction: (task) => {
        console.log("Edit", task);
      },
    },
    {
      icon: <MdOutlineContentCut />,
      label: "Split Strip",
      onAction: (task) => {
        console.log("Edit", task);
      },
    },
    {
      icon: <BsLayoutSplit />,
      label: "Discontinue",
      onAction: (task) => {
        console.log("Edit", task);
      },
    },
    {
      icon: <IoPauseCircleOutline />,
      label: "Pause",
      onAction: (task) => {
        console.log("Edit", task);
      },
    },
    {
      icon: <CiPen />,
      label: "Trim",
      onAction: (task) => {
        console.log("Edit", task);
      },
    },
    ...(rightClickOptions ?? []),
  ];

  return (
    <div className="min-w-48 rounded-md bg-black/50 backdrop-blur-md text-white text-xs px-4">
      <div className="p-3 pb-1 w-full">
        <label className="capitalize text-opacity-50 font-bold text-center">
          {task.label}
        </label>
      </div>
      <div className="h-px border-b border-white/30" />
      {tooltipData.map((data, index) => (
        <RightClickUIRow
          key={index}
          isLast={index === tooltipData.length - 1}
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
  return (
    <>
      <div
        className="flex justify-center items-center gap-4 text-nowrap p-3 hover:scale-110 cursor-pointer"
        onClick={() => {
          onAction(task);
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
