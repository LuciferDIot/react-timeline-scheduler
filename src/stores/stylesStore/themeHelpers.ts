import { defaultTheme, lightTheme, darkTheme } from "../../data";
import { SchedulerTheme } from "../../types";
import { deepMerge } from "../../util/objectUtils";

export function resolveMergedTheme(
  theme?:
    | Partial<SchedulerTheme>
    | {
        mode?: "light" | "dark";
        light?: Partial<SchedulerTheme>;
        dark?: Partial<SchedulerTheme>;
      }
): { mergedTheme: SchedulerTheme; detectedMode: "light" | "dark" } {
  let mergedTheme = defaultTheme;
  let detectedMode: "light" | "dark" = "light";

  if (theme) {
    if ("mode" in theme || "light" in theme || "dark" in theme) {
      const config = theme as {
        mode?: "light" | "dark";
        light?: Partial<SchedulerTheme>;
        dark?: Partial<SchedulerTheme>;
      };
      detectedMode = config.mode || "light";
      const baseTheme = detectedMode === "dark" ? darkTheme : lightTheme;
      const specificTheme =
        detectedMode === "dark" ? config.dark : config.light;
      mergedTheme = deepMerge(baseTheme, specificTheme);
    } else {
      mergedTheme = deepMerge(lightTheme, theme);
    }
  }

  return { mergedTheme, detectedMode };
}

