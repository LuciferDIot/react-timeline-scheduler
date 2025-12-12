import "./index.css";
// Main component export
export * from "./components/templates/WeeklyPlan";

// Re-export all types
export type {
    AnimationConfig,
    ContextMenuType,
    DragConfig,
    ProductionTask,
    SchedulerTheme,
    StripIndex,
    TableDateRange,
    WeeklyPlanConfig,
    WeeklyPlanConfigStyles
} from "./types";

// Re-export stores for advanced usage
export {
    useActionStore,
    useChildStore,
    useDataStore,
    useStylesStore
} from "./stores";

// Re-export the props type with a clear name
export type { TimelineSchedulerProps } from "./components/templates/WeeklyPlan";
