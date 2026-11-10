import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";

function getAllSourceFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllSourceFiles(fullPath));
    } else if (/\.(ts|tsx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

describe("Codebase line count enforcement", () => {
  it("no source file in src/ should exceed 100 lines", () => {
    const srcDir = path.resolve(__dirname, "..");
    const files = getAllSourceFiles(srcDir);
    const violations: { file: string; lines: number }[] = [];

    for (const file of files) {
      const content = fs.readFileSync(file, "utf8");
      const lines = content.split(/\r?\n/).length;
      if (lines > 100) {
        violations.push({
          file: path.relative(srcDir, file).replace(/\\/g, "/"),
          lines,
        });
      }
    }

    expect(
      violations,
      `Files exceeding 100 lines: ${JSON.stringify(violations, null, 2)}`
    ).toEqual([]);
  });
});
