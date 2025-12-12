// Export main component
export * from "./Timeline";

// Export types that consumers need
export type {
    AnimationConfig, ContextMenuType, DragConfig, SchedulerConfig,
    SchedulerConfigStyles, SchedulerTask, SchedulerTheme, StripIndex, TableDateRange
} from "../../types";

// Export stores for advanced usage
export {
    useActionStore, useChildStore, useDataStore,
    useStylesStore
} from "../../stores";

