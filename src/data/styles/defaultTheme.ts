import { SchedulerTheme } from "../../types";

export const defaultTheme: SchedulerTheme = {
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
  grid: {
    color: "#e2e8f0", // Slate 200
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
  },
};
