import { ButtonStyle } from "./config.types";

export interface SchedulerTheme {
  primary: string;
  secondary: string;
  text: {
    primary: string;
    secondary: string;
  };
  background: {
    primary: string;
    secondary: string;
  };
  border: string;
  row: {
    even: string;
    odd: string;
    hover: string;
  };
  grid: {
    color: string;
    currentDateLine?: string;
  };
  header: {
    background: string;
    text: string;
  };
  task: {
    even: string;
    odd: string;
    hover: string;
    text: string;
    border?: string;
  };
  toolbar?: {
    icon?: string;
    background?: string;
    text?: string;
  };
  progressBar?: {
    background?: string;
  };
  tooltip?: {
    background?: string;
    text?: string;
    border?: string;
  };
  resize?: {
    handleBackground?: string;
    handleHoverBackground?: string;
  };
  interactive?: {
    focus?: string;
  };
  buttons?: {
    lock?: {
      locked?: ButtonStyle;
      unlocked?: ButtonStyle;
    };
    today?: {
      active?: ButtonStyle;
      inactive?: ButtonStyle;
    };
  };
  scrollbar?: {
    thumb?: string;
    thumbHover?: string;
    track?: string;
  };
}

export interface SchedulerThemeConfig {
  mode?: "light" | "dark";
  light?: Partial<SchedulerTheme>;
  dark?: Partial<SchedulerTheme>;
}

