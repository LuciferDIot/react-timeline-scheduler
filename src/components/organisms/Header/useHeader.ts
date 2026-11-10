import { useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useActionStore, useDataStore, useStylesStore } from "../../../stores";
import { getMonthName } from "../../../util/date.util";

export function useHeader(dates: string[], scrollIntoToday?: boolean, daybgColorHighlight?: { [key: string]: Date[] }) {
  const { lockOperations, setLockOperations } = useActionStore();
  const { config } = useDataStore();
  const { customCellWidthPX, rowLabelMaxWidth, borderColor, setRowLabelMaxWidth, theme } = useStylesStore();

  const labelRef = useRef<HTMLDivElement>(null);
  const currentDateRef = useRef<HTMLDivElement | null>(null);
  const isCurrentDateInView = useInView(currentDateRef, { amount: "all" });

  const currentDate = new Date().toISOString().split("T")[0] || "";
  const isCurrentDateInDates = dates.includes(currentDate);

  const groupedDates = useMemo(() => dates.reduce<Record<string, string[]>>((acc, date) => {
    const month = getMonthName(new Date(date));
    (acc[month] = acc[month] || []).push(date);
    return acc;
  }, {}), [dates]);

  useEffect(() => {
    if (labelRef.current) {
      const width = labelRef.current.getBoundingClientRect().width;
      setRowLabelMaxWidth((prev) => Math.max(prev, width));
    }
  }, [dates, setRowLabelMaxWidth]);

  const handleScrollToCurrentDate = () => {
    currentDateRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  const cellCount = useMemo(() => {
    if (config?.disableToolbar) return 0;
    return scrollIntoToday && isCurrentDateInDates ? 2 : 1;
  }, [isCurrentDateInDates, scrollIntoToday, config?.disableToolbar]);

  const [linePosition, setLinePosition] = useState(0);

  const daybgColor = useMemo(() => {
    if (!daybgColorHighlight) return undefined;
    const highlightMap: Record<string, string> = {};
    Object.keys(daybgColorHighlight).forEach((color) => {
      daybgColorHighlight[color]?.forEach((date) => {
        const d = new Date(date);
        if (!isNaN(d.getTime())) {
          highlightMap[d.toISOString().split("T")[0]] = color;
        }
      });
    });
    return { daybgColorHighlight: highlightMap };
  }, [daybgColorHighlight]);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const pos = ((now.getHours() * 60 + now.getMinutes()) / (24 * 60)) * customCellWidthPX;
      setLinePosition(pos);
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [customCellWidthPX]);

  return {
    labelRef, currentDateRef, isCurrentDateInView, isCurrentDateInDates, currentDate,
    groupedDates, cellCount, linePosition, daybgColor, handleScrollToCurrentDate,
    lockOperations, setLockOperations, customCellWidthPX, rowLabelMaxWidth, borderColor, theme, config,
  };
}
