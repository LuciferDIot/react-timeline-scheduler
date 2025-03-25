// Atoms/IconButton.tsx
import React from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { TbCurrentLocation, TbCurrentLocationOff } from "react-icons/tb";
import { TaskColors } from "../../../../data";
import { useChildStore } from "../../../../stores";
import { HeaderTooltip } from "../HeaderTooltip";

interface IconButtonProps {
  onClick: () => void;
  isActive: boolean;
  iconType: "lock" | "location";
  tooltipText: string;
  borderColor: string;
}

export const HeaderIconButton: React.FC<IconButtonProps> = ({
  onClick,
  isActive,
  iconType,
  tooltipText,
  borderColor,
}) => {
  const { setTooltipVisible } = useChildStore();

  const Icon =
    iconType === "lock"
      ? isActive
        ? FaLock
        : FaLockOpen
      : isActive
      ? TbCurrentLocation
      : TbCurrentLocationOff;

  return (
    <button
      onClick={onClick}
      className={`w-full h-full flex justify-center items-center focus:outline-none border p-2 ${borderColor} ${
        isActive && "text-white"
      }`}
      style={{
        backgroundColor: isActive ? TaskColors.TASK_EVEN : TaskColors.ROW_EVEN,
      }}
      onMouseEnter={() =>
        setTooltipVisible(<HeaderTooltip text={tooltipText} />)
      }
      onMouseLeave={() => setTooltipVisible(null)}
    >
      <Icon size={16} className="mx-auto hover:scale-110" />
    </button>
  );
};
