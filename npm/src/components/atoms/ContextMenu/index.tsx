import { useEffect, useRef, useState } from "react";
import { Coordination } from "../../../types";

type Props = {
  children: React.ReactNode; // The content of the ContextMenu
  onClose: () => void; // Callback to close the ContextMenu
  mousePosition: Coordination; // Initial mouse position where the menu should open
};

function ContextMenu({ onClose, children, mousePosition }: Props) {
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const [coordination, setCoordination] = useState<Coordination>(mousePosition);

  // Handle clicks outside the component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    // Handle Esc key press
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Add event listeners
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup event listeners
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Calculate the position only once when the component mounts
  useEffect(() => {
    const { x, y } = coordination;
    if (!contextMenuRef.current || !x || !y) return;

    const { width, height } = contextMenuRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let tooltipTop = y; // Open at the exact Y position of the mouse click
    let tooltipLeft = x; // Open at the exact X position of the mouse click

    // Check if the context menu exceeds the viewport boundaries
    const exceedsRight = tooltipLeft + width > viewportWidth;
    const exceedsBottom = tooltipTop + height > viewportHeight;

    // Adjust position if the context menu exceeds the viewport
    if (exceedsRight) {
      tooltipLeft = x - width; // Move to the left of the mouse click
    }
    if (exceedsBottom) {
      tooltipTop = y - height; // Move above the mouse click
    }

    // Update the context menu's style
    setCoordination({
      y: tooltipTop,
      x: tooltipLeft,
    });
  }, [mousePosition]); // This effect runs only once, when the component mounts

  return (
    <div
      ref={contextMenuRef}
      style={{
        top: `${coordination.y}px`,
        left: `${coordination.x}px`,
      }}
      className="fixed shadow-lg z-10"
    >
      {children}
    </div>
  );
}

export { ContextMenu };
