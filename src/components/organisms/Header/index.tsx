// Organisms/Header.tsx
import { useInView } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { TaskColors } from "../../../data";
import { getMonthName } from "../../../util/date.util";
import { IconButton } from "../../atoms";
import { DateCell, MonthHeader } from "../../molecules";

interface HeaderProps {
  dates: string[];
  cellWidthPX: number;
  lockOperations: boolean;
  daybgColor?: {
    daysHighlight: Date[];
    daybgColorHighlight: { [key: string]: string };
  };
  scrollIntoToday?: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
  setTooltipVisible: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  lockChange: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  dates,
  cellWidthPX,
  lockOperations,
  daybgColor,
  scrollIntoToday,
  containerRef,
  setTooltipVisible,
  lockChange,
}) => {
  const { height } = containerRef.current
    ? containerRef.current.getBoundingClientRect()
    : { height: 0 };
  const groupedDates = useMemo(
    () =>
      dates.reduce<Record<string, string[]>>((acc, date) => {
        const month = getMonthName(new Date(date));
        (acc[month] = acc[month] || []).push(date);
        return acc;
      }, {}),
    [dates]
  );

  const currentDateRef = useRef<HTMLDivElement | null>(null);
  const isCurrentDateInView = useInView(currentDateRef, { amount: "all" });

  useEffect(() => {
    if (currentDateRef.current) {
      currentDateRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, []);

  const currentDate = new Date().toISOString().split("T")[0];

  const handleScrollToCurrentDate = () => {
    if (currentDateRef.current) {
      currentDateRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  const cellCount = scrollIntoToday ? 2 : 1;
  const [linePosition, setLinePosition] = useState(0);

  useEffect(() => {
    const updateLinePosition = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const totalMinutes = hours * 60 + minutes;
      const totalMinutesInDay = 24 * 60;
      const position = (totalMinutes / totalMinutesInDay) * cellWidthPX;
      setLinePosition(position);
    };

    updateLinePosition();
    const interval = setInterval(updateLinePosition, 60000);

    return () => clearInterval(interval);
  }, [cellWidthPX]);

  return (
    <div className="z-[3] sticky top-0 left-0 flex flex-col w-fit h-fit bg-white mb-2">
      <div className="flex w-full h-fit">
        <div
          className="z-[4] sticky left-0 top-0 min-w-48 text-sm text-[#3F3F3F] font-medium text-left border border-b-0 p-2"
          style={{ backgroundColor: TaskColors.ROW_ODD }}
        >
          Production Line
        </div>
        {Object.entries(groupedDates).map(([month, monthDates], index) => {
          const monthCellWidth =
            cellWidthPX *
            (monthDates.length -
              (index === Object.keys(groupedDates).length - 1 ? cellCount : 1));
          return (
            monthCellWidth > 0 && (
              <MonthHeader
                key={month}
                month={month}
                monthCellWidth={monthCellWidth}
              />
            )
          );
        })}
        <div
          className="sticky top-0 right-0 flex justify-center items-center bg-white text-left text-xs"
          style={{ width: `${cellCount * cellWidthPX}px` }}
        >
          {scrollIntoToday && (
            <IconButton
              onClick={handleScrollToCurrentDate}
              isActive={isCurrentDateInView}
              iconType="location"
              tooltipText="Go to Today"
              setTooltipVisible={setTooltipVisible}
            />
          )}
          <IconButton
            onClick={lockChange}
            isActive={lockOperations}
            iconType="lock"
            tooltipText={`${lockOperations ? "Unlock" : "Lock"} Operations`}
            setTooltipVisible={setTooltipVisible}
          />
        </div>
      </div>

      <div className="flex">
        <div
          className="z-[4] sticky left-0 min-w-48 text-sm text-[#3F3F3F] font-medium text-left border border-t-0 p-2"
          style={{ backgroundColor: TaskColors.ROW_ODD }}
        />
        {dates.map((date) => {
          const bgColor = daybgColor?.daybgColorHighlight[date];
          return (
            <DateCell
              key={date}
              date={date}
              isCurrentDate={date === currentDate}
              cellWidthPX={cellWidthPX}
              height={height}
              linePosition={linePosition}
              bgColor={bgColor}
            />
          );
        })}
      </div>
    </div>
  );
};
