import "./index.css";
// Main component export
export * from "./components/templates/Timeline";

// Re-export all types
export type {
    AnimationConfig,
    ContextMenuType,
    DragConfig, SchedulerConfig,
    SchedulerConfigStyles, SchedulerTask,
    SchedulerTheme,
    TableDateRange
} from "./types";

export { StripIndex } from "./types";

// Re-export stores for advanced usage
export {
    useActionStore,
    useChildStore,
    useDataStore,
    useStylesStore
} from "./stores";

// Re-export the props type with a clear name
export type { TimelineProps } from "./components/templates/Timeline";
