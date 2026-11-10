import { defaultTheme, lightTheme, darkTheme } from "../../data";
import { SchedulerTheme, SchedulerThemeConfig } from "../../types";
import { deepMerge } from "../../util/objectUtils";

export function resolveMergedTheme(
  theme?:
    | Partial<SchedulerTheme>
    | SchedulerThemeConfig
): { mergedTheme: SchedulerTheme; detectedMode: "light" | "dark" } {
  if (!theme) {
    return { mergedTheme: defaultTheme, detectedMode: "light" };
  }

  const isConfig = "mode" in theme || "light" in theme || "dark" in theme;
  const detectedMode: "light" | "dark" =
    (isConfig && (theme as SchedulerThemeConfig).mode) || "light";
  const baseTheme = detectedMode === "dark" ? darkTheme : lightTheme;

  if (isConfig) {
    const config = theme as SchedulerThemeConfig & Partial<SchedulerTheme>;
    const modeSpecific = detectedMode === "dark" ? config.dark : config.light;
    const topLevel = { ...config };
    delete topLevel.mode;
    delete topLevel.light;
    delete topLevel.dark;
    const withTopLevel = deepMerge(baseTheme, topLevel);
    const merged = modeSpecific ? deepMerge(withTopLevel, modeSpecific) : withTopLevel;
    return { mergedTheme: merged, detectedMode };
  }

  return { mergedTheme: deepMerge(lightTheme, theme), detectedMode: "light" };
}

