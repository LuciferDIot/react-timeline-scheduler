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
    const { x, y } = mousePosition;
    if (!contextMenuRef.current || !x || !y) return;

    const { width, height } = contextMenuRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let tooltipTop = y;
    let tooltipLeft = x;

    if (tooltipLeft + width > viewportWidth) {
      tooltipLeft = x - width;
    }
    if (tooltipTop + height > viewportHeight) {
      tooltipTop = y - height;
    }

    setCoordination({
      y: tooltipTop,
      x: tooltipLeft,
    });
  }, [mousePosition]);

  return (
    <div
      ref={contextMenuRef}
      role="menu"
      tabIndex={-1}
      style={{
        top: `${coordination.y}px`,
        left: `${coordination.x}px`,
      }}
      className="fixed shadow-lg z-50"
    >
      {children}
    </div>
  );
}

export { ContextMenu };
