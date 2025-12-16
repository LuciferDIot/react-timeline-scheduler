// Atoms/IconButton.tsx
import React from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { TbCurrentLocation, TbCurrentLocationOff } from "react-icons/tb";
import { useChildStore, useStylesStore } from "../../../../stores";
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
  const { setTooltipVisible, setMouseCoordination } = useChildStore();
  const { theme } = useStylesStore();

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
      className={`w-full h-full flex justify-center items-center focus:outline-none border p-2 ${borderColor}`}
      style={{
        backgroundColor: isActive 
          ? (theme.primary) 
          : (theme.toolbar?.background || "transparent"),
        color: isActive ? theme.task.text : theme.toolbar?.text || theme.header.text || theme.text.primary,
        borderColor: isActive ? theme.border : (theme.toolbar?.background ? theme.border : "transparent")
      }}
      onMouseEnter={(e) => {
        setMouseCoordination({ x: (e as React.MouseEvent).clientX, y: (e as React.MouseEvent).clientY });
        setTooltipVisible(<HeaderTooltip text={tooltipText} />);
      }}
      onMouseLeave={() => setTooltipVisible(null)}
    >
      <Icon size={16} className="mx-auto hover:scale-110" />
    </button>
  );
};
