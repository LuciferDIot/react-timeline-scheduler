// Export main component
export * from "./WeeklyPlan";

// Export types that consumers need
export type {
    AnimationConfig, ContextMenuType, DragConfig, ProductionTask, SchedulerTheme, StripIndex, TableDateRange, WeeklyPlanConfig,
    WeeklyPlanConfigStyles
} from "../../types";

// Export stores for advanced usage
export {
    useActionStore, useChildStore, useDataStore,
    useStylesStore
} from "../../stores";

