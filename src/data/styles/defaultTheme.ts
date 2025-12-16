import { SchedulerTheme } from "../../types";

/**
 * Light theme - Designed for light backgrounds
 * Uses dark text and subtle colors for better readability
 */
export const lightTheme: SchedulerTheme = {
  primary: "#3b82f6", // Blue 500
  secondary: "#64748b", // Slate 500
  text: {
    primary: "#1e293b", // Slate 800
    secondary: "#64748b", // Slate 500
  },
  background: {
    primary: "#ffffff",
    secondary: "#f8fafc", // Slate 50
  },
  border: "#e2e8f0", // Slate 200
  row: {
    even: "#ffffff",
    odd: "#f8fafc", // Slate 50
    hover: "#f1f5f9", // Slate 100
  },
  header: {
    background: "#ffffff",
    text: "#0f172a", // Slate 900
  },
  task: {
    even: "#3b82f6", // Blue 500
    odd: "#0ea5e9", // Sky 500
    hover: "#2563eb", // Blue 600
    text: "#ffffff",
    border: "#e2e8f0", // Slate 200
  },
  toolbar: {
    icon: "#1e293b",
    background: "#ffffff",
    text: "#1e293b",
  },
  grid: {
    color: "#e2e8f0", // Slate 200
    currentDateLine: "#ef4444", // Red 500
  },
  progressBar: {
    background: "#10b981", // Emerald 500
  },
  tooltip: {
    background: "#ffffff",
    text: "#1e293b",
    border: "#e2e8f0",
  },
  resize: {
    handleBackground: "#64748b",
    handleHoverBackground: "#475569", // Slate 600
  },
  interactive: {
    focus: "#3b82f6",
  },
};

/**
 * Dark theme - Designed for dark backgrounds
 * Uses light text and vibrant colors for better contrast
 */
export const darkTheme: SchedulerTheme = {
  primary: "#60a5fa", // Blue 400
  secondary: "#94a3b8", // Slate 400
  text: {
    primary: "#f1f5f9", // Slate 100
    secondary: "#cbd5e1", // Slate 300
  },
  background: {
    primary: "#0f172a", // Slate 900
    secondary: "#1e293b", // Slate 800
  },
  border: "#334155", // Slate 700
  row: {
    even: "#0f172a", // Slate 900
    odd: "#1e293b", // Slate 800
    hover: "#334155", // Slate 700
  },
  header: {
    background: "#1e293b", // Slate 800
    text: "#f1f5f9", // Slate 100
  },
  task: {
    even: "#3b82f6", // Blue 500
    odd: "#06b6d4", // Cyan 500
    hover: "#2563eb", // Blue 600
    text: "#ffffff",
    border: "#334155", // Slate 700
  },
  toolbar: {
    icon: "#f1f5f9",
    background: "#1e293b",
    text: "#f1f5f9",
  },
  grid: {
    color: "#334155", // Slate 700
    currentDateLine: "#f87171", // Red 400
  },
  progressBar: {
    background: "#34d399", // Emerald 400
  },
  tooltip: {
    background: "#1e293b",
    text: "#f1f5f9",
    border: "#334155",
  },
  resize: {
    handleBackground: "#64748b",
    handleHoverBackground: "#94a3b8", // Slate 400
  },
  interactive: {
    focus: "#60a5fa",
  },
};

/**
 * Default theme - Light theme is used by default
 * Users can switch to dark theme or provide custom theme
 */
export const defaultTheme: SchedulerTheme = lightTheme;
