export function deepMerge<T>(
  target: T,
  ...sources: Array<unknown>
): T {
  if (!sources.length) return target;
  const output = { ...(target as Record<string, unknown>) };

  for (const source of sources) {
    if (!source || typeof source !== "object") continue;
    const src = source as Record<string, unknown>;

    for (const key of Object.keys(src)) {
      const sourceVal = src[key];
      const targetVal = output[key];

      if (
        sourceVal !== null &&
        typeof sourceVal === "object" &&
        !Array.isArray(sourceVal) &&
        !(sourceVal instanceof Date)
      ) {
        if (targetVal && typeof targetVal === "object" && !Array.isArray(targetVal)) {
          output[key] = deepMerge(targetVal, sourceVal);
        } else {
          output[key] = { ...(sourceVal as Record<string, unknown>) };
        }
      } else if (sourceVal !== undefined) {
        output[key] = sourceVal;
      }
    }
  }

  return output as T;
}
