import { motion } from "framer-motion";
import React from "react";
import { HeaderIconButton } from "../../atoms";
import { DateCell, MonthHeader } from "../../molecules";
import { useHeader } from "./useHeader";

interface HeaderLayoutProps {
  dates: string[];
  topic: string;
  scrollIntoToday?: boolean;
  height: number;
  headerState: ReturnType<typeof useHeader>;
}

export const HeaderLayout: React.FC<HeaderLayoutProps> = ({
  dates, topic, scrollIntoToday, height, headerState,
}) => {
  const {
    labelRef, currentDateRef, isCurrentDateInView, isCurrentDateInDates, currentDate,
    groupedDates, cellCount, linePosition, daybgColor, handleScrollToCurrentDate,
    lockOperations, setLockOperations, customCellWidthPX, rowLabelMaxWidth, borderColor, theme, config,
  } = headerState;

  return (
    <div className="z-[70] sticky top-0 left-0 flex flex-col w-fit h-fit mb-2">
      <div className="flex w-full h-fit gap-2">
        <motion.div
          ref={labelRef}
          className={`z-[80] sticky left-0 top-0 min-w-32 md:min-w-48 text-sm font-medium text-left border border-b-0 p-2 ${borderColor}`}
          style={{ backgroundColor: theme.header.background, color: theme.header.text, borderColor: theme.border }}
          initial={{ width: 0 }} animate={{ width: rowLabelMaxWidth }} exit={{ width: 0 }}
        >
          {topic}
        </motion.div>
        <div className="flex">
          {Object.entries(groupedDates).map(([month, monthDates], idx) => {
            const width = customCellWidthPX * (monthDates.length - (idx === Object.keys(groupedDates).length - 1 ? cellCount : 0));
            return width > 0 ? (
              <MonthHeader key={month} borderColor={borderColor} month={month} monthCellWidth={width} />
            ) : null;
          })}
          {!config?.disableToolbar && (
            <div className="sticky top-0 right-0 flex justify-center items-center text-left text-xs" style={{ width: `${cellCount * customCellWidthPX}px` }}>
              {scrollIntoToday && isCurrentDateInDates && (
                <HeaderIconButton onClick={handleScrollToCurrentDate} isActive={!isCurrentDateInView} borderColor={borderColor} iconType="location" tooltipText="Go to Today" />
              )}
              <HeaderIconButton onClick={setLockOperations} isActive={lockOperations} borderColor={borderColor} iconType="lock" tooltipText={`${lockOperations ? "Unlock" : "Lock"} Operations`} />
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <div
          className={`z-[4] sticky left-0 min-w-32 md:min-w-48 text-sm font-medium text-left border border-t-0 p-2 ${borderColor} flex items-center justify-start`}
          style={{ backgroundColor: theme.header.background, borderColor: theme.border, color: theme.header.text, width: rowLabelMaxWidth }}
        />
        <div className="flex">
          {dates.map((date) => (
            <DateCell
              key={date} date={date} borderColor={borderColor} isCurrentDate={date === currentDate}
              cellWidthPX={customCellWidthPX} height={height} linePosition={linePosition}
              bgColor={daybgColor?.daybgColorHighlight[date]} currentDateRef={currentDateRef}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

HeaderLayout.displayName = "HeaderLayout";
