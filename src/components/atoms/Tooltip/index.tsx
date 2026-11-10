import { motion } from "framer-motion";
import React, { useRef } from "react";
import { createPortal } from "react-dom";
import { Coordination } from "../../../types";
import { useStylesStore } from "../../../stores";
import { useTooltipPosition } from "./useTooltipPosition";

interface TooltipProps {
  children: React.ReactNode;
  mousePosition: Coordination;
  id?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  mousePosition,
  id,
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const position = useTooltipPosition(tooltipRef, mousePosition);
  const { theme } = useStylesStore();

  return createPortal(
    <motion.div
      ref={tooltipRef}
      id={id}
      role="tooltip"
      aria-live="polite"
      className="fixed z-[100] px-3 py-2 text-xs rounded-md shadow-lg pointer-events-none transition-opacity duration-150 border"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        backgroundColor: theme.tooltip?.background || "#ffffff",
        color: theme.tooltip?.text || "#1e293b",
        borderColor: theme.tooltip?.border || "#e2e8f0",
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.1 }}
    >
      {children}
    </motion.div>,
    document.body
  );
};

Tooltip.displayName = "Tooltip";
