import { useState, useMemo } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { Timeline } from "react-timeline-scheduler";
import type { SchedulerTask } from "react-timeline-scheduler";
import { examples, basicTasks, darkTasks, colorfulTasks } from "../data/examples";
import { Check, ChevronRight } from "lucide-react";

// Simple custom tooltip for the examples
const CustomTooltip = (task: SchedulerTask) => {
  return (
    <div className="min-w-[200px]">
      <div className="font-semibold mb-1">
        {task.label}
      </div>
      <div className="text-xs opacity-75 mb-2">
        {task.groupLabel}
      </div>
      <div className="flex items-center gap-2 text-xs">
        <div className="px-2 py-0.5 rounded bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-mono">
          {task.startDate.toLocaleDateString()}
        </div>
        <span className="opacity-50">→</span>
        <div className="px-2 py-0.5 rounded bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-mono">
          {task.endDate.toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export const Examples = () => {
  const [activeExampleId, setActiveExampleId] = useState(examples[0].id);
  const [customMode, setCustomMode] = useState<"light" | "dark">("light");
  const [disableToolbar, setDisableToolbar] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  
  const activeExample = useMemo(() => {
    // Explicitly load correct dataset array to prevent lookup failures
    if (activeExampleId === "colorful") return { ...examples.find(ex => ex.id === "colorful")!, tasks: colorfulTasks };
    if (activeExampleId === "basic") return { ...examples.find(ex => ex.id === "basic")!, tasks: basicTasks };
    if (activeExampleId === "dark-mode") return { ...examples.find(ex => ex.id === "dark-mode")!, tasks: darkTasks };
    
    return examples.find((ex) => ex.id === activeExampleId) || examples[0];
  }, [activeExampleId]);

  return (
    <div className={`flex ${isDesktop ? 'flex-row' : 'flex-col'} h-[calc(100vh-64px)] overflow-hidden`}>
      {/* Sidebar */}
      <aside className={`${isDesktop ? 'w-72 lg:w-80' : 'w-full'} bg-[#111827] border-r border-white/10 flex-shrink-0 overflow-y-auto`}>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Examples</h2>
          <div className="space-y-2">
            {examples.map((ex) => (
              <button
                key={ex.id}
                onClick={() => setActiveExampleId(ex.id)}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                  activeExampleId === ex.id
                    ? "bg-blue-600/10 border-blue-500/50 text-blue-400"
                    : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{ex.title}</span>
                  {activeExampleId === ex.id && <Check size={16} />}
                </div>
                {activeExampleId === ex.id && (
                  <p className="text-xs mt-1 text-blue-400/70 line-clamp-2">
                    {ex.description}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Preview Area */}
      <div className="flex-grow flex flex-col min-w-0 bg-[#030712] overflow-y-auto">
        <div className="p-6 border-b border-white/10 flex items-center gap-2">

          <span className="text-gray-500">Examples</span>
          <ChevronRight size={16} className="text-gray-600" />
          <span className="text-white font-medium">{activeExample.title}</span>
        </div>

        <div className="p-6 flex-grow flex flex-col">
          {/* Controls Area */}
          <div className="mb-4 flex flex-wrap items-center gap-4 bg-[#111827] p-4 rounded-lg border border-white/10">
            {/* Theme Toggle for specific example */}
            {activeExampleId === "theme-switching" && (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-white">
                  Theme Mode:
                </span>
                <div className="flex bg-[#030712] p-1 rounded-lg border border-white/10">
                  {["light", "dark"].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setCustomMode(mode as "light" | "dark")}
                      className={`px-4 py-1.5 rounded-md text-sm transition-all capitalize ${
                        customMode === mode
                          ? "bg-blue-600 text-white shadow-lg"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Toolbar Toggle */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-white flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={disableToolbar}
                  onChange={(e) => setDisableToolbar(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-900"
                />
                Disable Toolbar
              </label>
            </div>
          </div>

          <div className="flex-grow h-full rounded-xl border border-white/10 bg-[#111827]/50 backdrop-blur-sm overflow-hidden flex flex-col">
            <div className="flex-grow p-4 overflow-hidden relative">
              {/* We remount Timeline when example changes to force full re-render with new config */}
              <Timeline
                key={`${activeExample.id}-${customMode}-${disableToolbar}`}
                tooltipComponent={CustomTooltip}
                config={{
                  label: activeExample.title,
                  data: activeExample.tasks,
                  disableToolbar: disableToolbar,
                  theme:
                    activeExampleId === "theme-switching"
                      ? { ...activeExample.theme, mode: customMode }
                      : activeExample.theme,
                  ...activeExample.customConfig,
                }}
              />
            </div>
          </div>
        </div>

        {/* Source Code Snippet (Optional - could be collapsible) */}
        <div className="p-6 pt-0">
          <div className="rounded-lg bg-[#0d1117] border border-white/10 overflow-hidden">
            <div className="px-4 py-2 bg-white/5 border-b border-white/5 text-xs text-gray-500 font-mono">
              config object
            </div>
            <pre className="p-4 text-xs font-mono text-gray-400 overflow-x-auto">
              {JSON.stringify(
                {
                  label: activeExample.title,
                  data: activeExample.tasks.length > 5 
                    ? [...activeExample.tasks.slice(0, 3), `... ${activeExample.tasks.length - 3} more items`]
                    : activeExample.tasks,
                  theme: activeExample.theme || "default",
                  ...activeExample.customConfig,
                },
                null,
                2
              )}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
