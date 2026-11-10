import { useLayoutEffect, useState, RefObject } from "react";
import { Coordination } from "../../../types";

export function useTooltipPosition(
  tooltipRef: RefObject<HTMLDivElement | null>,
  mousePosition: Coordination
) {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (!tooltipRef.current || mousePosition.x === null || mousePosition.y === null) return;

    const tooltip = tooltipRef.current;
    const { x, y } = mousePosition;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const offset = 12;
    const edgePadding = 8;

    tooltip.style.maxWidth = `${Math.max(100, viewportWidth - edgePadding * 2)}px`;
    const { width, height } = tooltip.getBoundingClientRect();

    let tooltipLeft = x + offset;
    let tooltipTop = y + offset;

    const fitsRight = x + offset + width + edgePadding <= viewportWidth;
    const fitsLeft = x - offset - width >= edgePadding;

    if (!fitsRight && fitsLeft) {
      tooltipLeft = x - width - offset;
    } else if (!fitsRight && !fitsLeft) {
      tooltipLeft = Math.max(edgePadding, Math.min(x - width / 2, viewportWidth - width - edgePadding));
    }

    const fitsBelow = y + offset + height + edgePadding <= viewportHeight;
    const fitsAbove = y - offset - height >= edgePadding;

    if (!fitsBelow && fitsAbove) {
      tooltipTop = y - height - offset;
    } else if (!fitsBelow && !fitsAbove) {
      tooltipTop = Math.max(edgePadding, Math.min(y - height / 2, viewportHeight - height - edgePadding));
    }

    setPosition({ top: tooltipTop, left: tooltipLeft });
  }, [mousePosition, tooltipRef]);

  return position;
}

