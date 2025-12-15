import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Coordination } from "../../../types";

interface TooltipProps {
  children: React.ReactNode;
  mousePosition: Coordination;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  mousePosition,
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipSize, setTooltipSize] = useState({ width: 0, height: 0 });
  const [style, setStyle] = useState({
    top: "0px",
    left: "0px",
    borderRadius: "12px 12px 12px 0",
    borderWidth: "2px",
  });

  // Measure the tooltip's size after it renders
  useEffect(() => {
    if (tooltipRef.current) {
      const { width, height } = tooltipRef.current.getBoundingClientRect();
      setTooltipSize({ width, height });
    }
  }, [children]);

  // Update the tooltip's position and style based on mouse position and viewport boundaries
  useEffect(() => {
    if (!tooltipRef.current) return;

    const { width, height } = tooltipSize;
    const { x, y } = mousePosition;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let tooltipTop = (y || 0) + 10; // Default offset below the mouse
    let tooltipLeft = (x || 0) + 10; // Default offset to the right of the mouse
    let newBorderRadius = "12px 12px 12px 0";
    let newBorderWidth = "2px";

    // Check if the tooltip exceeds the viewport boundaries
    const exceedsRight = tooltipLeft + width > viewportWidth;
    const exceedsBottom = tooltipTop + height > viewportHeight;
    const exceedsLeft = tooltipLeft < 0;
    const exceedsTop = tooltipTop < 0;

    // Adjust position if the tooltip exceeds the viewport
    if (exceedsRight) {
      tooltipLeft = (x || 0) - width - 10; // Move to the left of the mouse
      newBorderRadius = "12px 0 12px 12px";
      newBorderWidth = "3px";
    }
    if (exceedsBottom) {
      tooltipTop = (y || 0) - height - 10; // Move above the mouse
      newBorderRadius = "12px 12px 0 12px";
      newBorderWidth = "3px";
    }
    if (exceedsLeft) {
      tooltipLeft = (x || 0) + 10; // Move back to the right
      newBorderRadius = "12px 12px 12px 0";
      newBorderWidth = "3px";
    }
    if (exceedsTop) {
      tooltipTop = (y || 0) + 10; // Move back below
      newBorderRadius = "12px 12px 12px 0";
      newBorderWidth = "3px";
    }

    // If the tooltip is small, remove rounded corners
    if (width < 100 || height < 100) {
      newBorderRadius = "0";
    }

    // Update the tooltip's style
    setStyle({
      top: `${tooltipTop}px`,
      left: `${tooltipLeft}px`,
      borderRadius: newBorderRadius,
      borderWidth: newBorderWidth,
    });
  }, [mousePosition, tooltipSize]);

  return (
    <motion.div
      ref={tooltipRef}
      className="fixed z-[100] bg-white/90 dark:bg-black/90 backdrop-blur-md w-fit h-fit border border-gray-200 dark:border-gray-700 shadow-xl pointer-events-none"
      style={{
        top: style.top,
        left: style.left,
        borderRadius: style.borderRadius,
        borderWidth: style.borderWidth,
        borderStyle: "solid",
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};
