import React from "react";
import { HeaderLayout } from "./HeaderLayout";
import { useHeader } from "./useHeader";

interface HeaderProps {
  dates: string[];
  topic: string;
  scrollIntoToday?: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
  daybgColorHighlight?: { [key: string]: Date[] };
}

export const Header: React.FC<HeaderProps> = ({
  dates, topic, scrollIntoToday, containerRef, daybgColorHighlight,
}) => {
  const headerState = useHeader(dates, scrollIntoToday, daybgColorHighlight);
  const height = containerRef.current?.getBoundingClientRect().height || 0;

  return (
    <HeaderLayout
      dates={dates} topic={topic} scrollIntoToday={scrollIntoToday}
      height={height} headerState={headerState}
    />
  );
};

Header.displayName = "Header";
