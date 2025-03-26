// Atoms/Tooltip.tsx
import React from "react";

export const HeaderTooltip: React.FC<{ text: string }> = ({ text }) => {
  return <div className="text-xs text-center p-1">{text}</div>;
};
