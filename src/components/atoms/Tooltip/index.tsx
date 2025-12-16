import { motion } from "framer-motion";
import React, { useLayoutEffect, useRef, useState } from "react";
import { Coordination } from "../../../types";
import { useStylesStore } from "../../../stores";

interface TooltipProps {
  children: React.ReactNode;
  mousePosition: Coordination;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  mousePosition,
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const { theme } = useStylesStore();

  // Debug helpers (can be removed later)
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.debug("Tooltip mounted", { mousePosition });
  }, []);

  // Use useLayoutEffect to calculate position before paint
  useLayoutEffect(() => {
    if (!tooltipRef.current || mousePosition.x === null || mousePosition.y === null) return;

    const tooltip = tooltipRef.current;
    const { x, y } = mousePosition;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const offset = 12; // Distance from cursor
    const edgePadding = 8; // Padding from viewport edges

    // Ensure tooltip cannot be wider than the viewport minus padding so measurements are stable
    tooltip.style.maxWidth = `${Math.max(100, viewportWidth - edgePadding * 2)}px`;

    const { width, height } = tooltip.getBoundingClientRect();

    let tooltipLeft = x + offset;
    let tooltipTop = y + offset;

    // Smart horizontal positioning: prefer right, then left, then centered near cursor
    const fitsRight = x + offset + width + edgePadding <= viewportWidth;
    const fitsLeft = x - offset - width >= edgePadding;

    if (!fitsRight && fitsLeft) {
      tooltipLeft = x - width - offset;
    } else if (!fitsRight && !fitsLeft) {
      tooltipLeft = Math.max(edgePadding, Math.min(x - width / 2, viewportWidth - width - edgePadding));
    }

    // Smart vertical positioning: prefer below, then above, then centered vertically
    const fitsBelow = y + offset + height + edgePadding <= viewportHeight;
    const fitsAbove = y - offset - height >= edgePadding;

    if (!fitsBelow && fitsAbove) {
      tooltipTop = y - height - offset;
    } else if (!fitsBelow && !fitsAbove) {
      tooltipTop = Math.max(edgePadding, Math.min(y - height / 2, viewportHeight - height - edgePadding));
    }

    // Final bounds check
    tooltipLeft = Math.max(edgePadding, Math.min(tooltipLeft, viewportWidth - width - edgePadding));
    tooltipTop = Math.max(edgePadding, Math.min(tooltipTop, viewportHeight - height - edgePadding));

    // eslint-disable-next-line no-console
    console.debug("Tooltip position calculated", { tooltipTop, tooltipLeft, width, height, mousePosition });
    setPosition({ top: tooltipTop, left: tooltipLeft });
  }, [mousePosition, children]);

  return (
    <motion.div
      ref={tooltipRef}
      className="fixed z-[100] backdrop-blur-md w-fit h-fit pointer-events-none px-3 py-2"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        backgroundColor: theme.tooltip?.background || "#ffffff",
        color: theme.tooltip?.text || "#000000",
        borderColor: theme.tooltip?.border || "#e0e0e0",
        borderRadius: "6px",
        borderWidth: "1px",
        borderStyle: "solid",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        // allow the tooltip to expand but keep it within viewport via inline maxWidth
        maxWidth: `calc(100vw - 16px)`,
        whiteSpace: "normal",
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};
