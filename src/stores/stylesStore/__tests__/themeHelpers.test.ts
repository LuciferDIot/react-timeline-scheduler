import { describe, expect, it } from "vitest";
import { resolveMergedTheme } from "../themeHelpers";

describe("resolveMergedTheme", () => {
  it("defaults to light theme when no theme is passed", () => {
    const { detectedMode, mergedTheme } = resolveMergedTheme();
    expect(detectedMode).toBe("light");
    expect(mergedTheme.primary).toBe("#3b82f6");
  });

  it("handles custom dark theme config", () => {
    const { detectedMode, mergedTheme } = resolveMergedTheme({
      mode: "dark",
      dark: { primary: "#ff0000" },
    });
    expect(detectedMode).toBe("dark");
    expect(mergedTheme.primary).toBe("#ff0000");
  });
});
