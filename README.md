# React Timeline Scheduler

<div align="center">
  <img src="https://img.shields.io/npm/v/react-timeline-scheduler?style=flat-square&color=3b82f6" alt="npm version" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="license" />
  <img src="https://img.shields.io/npm/dt/react-timeline-scheduler?style=flat-square" alt="downloads" />
# React Timeline Scheduler

![npm version](https://img.shields.io/npm/v/react-timeline-scheduler?style=flat-square&color=3b82f6) ![license](https://img.shields.io/badge/license-MIT-green?style=flat-square) ![downloads](https://img.shields.io/npm/dt/react-timeline-scheduler?style=flat-square)

A modern, responsive, and performance-optimized timeline scheduler for React. This README documents the component purpose, capabilities, API surface, common usage patterns, accessibility considerations, and testing recommendations so you can quickly adopt and extend the scheduler in your apps.

--

## Table of contents
- Overview
- Installation
- Quick Start
- Components & Responsibilities
  - `Timeline` (high-level scheduler)
  - `Task` (individual task bar)
- Props & Configuration (examples)
- Theming & Styling
- Accessibility
- Performance & Implementation Notes
- Testing
- Contributing
- License

--

## Overview

This project provides a set of React components that make it easy to render interactive time-based schedules (similar to Gantt charts or resource timelines). Key responsibilities:

- Visualize tasks on a horizontal time axis grouped by rows (resources or groups).
- Provide editing interactions: select, drag-to-move, drag-to-resize, and context actions.
- Support customization via render props, theming, and callbacks so you can integrate with your data stores.

The scheduler is designed to be used as a controlled or presentational component and aims to keep rendering fast through virtualization and memoized layout calculations.

## Installation

Install via npm or yarn as appropriate for your project:

```bash
npm install react-timeline-scheduler
# or
yarn add react-timeline-scheduler
```

If you're working from this repo locally, run:

```bash
pnpm install
pnpm dev
```

## Quick Start

Minimal example showing how to render a timeline and supply tasks.

```tsx
import React from "react";
import { Timeline } from "react-timeline-scheduler";
import "react-timeline-scheduler/dist/style.css";

const tasks = [
  { id: "t1", title: "Task A", rowId: "r1", start: new Date("2025-01-01"), end: new Date("2025-01-05") },
  { id: "t2", title: "Task B", rowId: "r1", start: new Date("2025-01-06"), end: new Date("2025-01-07") }
];

export default function App() {
  return (
    <div style={{ height: "100vh" }}>
      <Timeline
        config={{
          label: "Project Schedule",
          data: tasks,
          startOffsetDays: 2,
          endOffsetDays: 2,
        }}
        onTaskClick={(task) => console.log("click", task)}
      />
    </div>
  );
}
```

## Components & Responsibilities

This README focuses on two primary building blocks provided in this repo:

- `Timeline` — the top-level component that renders the time axis, toolbar, rows, and task strips. See implementation: `src/components/templates/Timeline/index.tsx`.
- `Task` — a lightweight, interactive bar representing a scheduled item. See implementation: `src/components/organisms/Task/index.tsx`.

Each component is intentionally small and composable so projects can replace or extend behavior with `render*` props or by wrapping the components.

### Timeline (what it achieves)

- Renders a horizontal time axis and rows (resources/groups).
- Positions tasks using their `start`/`end` dates relative to the current visible window.
- Supports zoom/scale (day/week/month), scrolling to today, and toolbar controls (lock/read-only, zoom, etc.).
- Exposes drag-and-drop handlers to allow moving and resizing tasks.
- Virtualizes rows and cells for large datasets.

High-level props (example):

```ts
interface TimelineProps {
  config: SchedulerConfig; // required
  className?: string;
  onTaskClick?: (task: SchedulerTask) => void;
  onTaskChange?: (task: SchedulerTask) => void;
  loading?: boolean;
}
```

Common use cases:

- Resource allocation dashboards
- Project planning with editable tasks
- Visualizing time-series events with context menus and custom renderers

### Task (what it achieves)

- Draws a task bar from `start` to `end` within a row.
- Supports selection, hover states, inline actions (edit, delete), progress display, and different visual variants.
- Emits structured events for drag start, drag end, and click.

High-level props (example):

```ts
interface TaskProps {
  id: string;
  title?: string;
  start: Date;
  end: Date;
  rowId: string;
  progress?: number; // 0-100
  color?: string;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  onDragStart?: (id: string) => void;
  onDragEnd?: (taskUpdate: { id: string; start: Date; end: Date; rowId?: string }) => void;
  renderContent?: (task: any) => React.ReactNode;
}
```

## Props & API Examples

Below are common props you will use frequently. For full TypeScript types, explore `src/types`.

Timeline important config fields:

- `config.data` — Array of tasks (required).
- `config.label` — String label that appears in the header.
- `config.startOffsetDays` / `config.endOffsetDays` — Expand visible window.
- `config.theme` — Partial theme overrides.
- `config.dragConfig` — `{ autoScroll?: boolean; snapToGrid?: number; }`

Task important fields:

- `id`, `start`, `end`, `rowId` — minimal required fields to render.
- `title` — displayed label.
- `progress` — numeric progress indicator.
- `variant` / `color` — visual appearance token.

Example of editing flow (pseudo):

1. User drags a `Task` to a new position.
2. `onDragEnd` fires with `{ id, start, end, rowId }`.
3. Parent updates source `data` and re-passes `config.data` to `Timeline`.

## Theming & Styling

The scheduler prefers project CSS strategy (Tailwind, CSS modules, or plain CSS). You can override appearance by:

- Passing a `theme` object into `config`.
- Replacing renderers (e.g., `renderTask`) to return custom markup.
- Passing `className` or CSS variables at the root container.

Example theme override:

```ts
const theme = { primary: "#8b5cf6", row: { even: "#fff", odd: "#f8fafc" } };
<Timeline config={{ data: tasks, label: "Plan", theme }} />
```

## Accessibility

Accessible behavior implemented / recommended:

- Use `role="grid"` for the timeline viewport and `role="gridcell"` for task cells where appropriate.
- Ensure interactive elements (task bars, resize handles) are keyboard-focusable and expose `aria-label` that includes title and date range.
- Provide visible focus states for keyboard users.
- When using custom renderers, keep semantics intact by forwarding necessary props (`tabIndex`, `role`, `aria-*`).

Keyboard suggestions:

- Arrow keys to move focus between tasks or navigate the time axis.
- Enter/Space to select or open a details pane.
- Escape to cancel drag operations.

## Performance & Implementation Notes

- Virtualize rows and columns to handle thousands of tasks.
- Use `transform: translate3d(...)` for visual movement during drags to avoid layout thrashing.
- Memoize heavy calculations (position, width) with `useMemo` and stabilize callbacks with `useCallback`.
- Keep `data` arrays stable (avoid re-creating arrays each render) to prevent unnecessary recalculation.

Implementation hints found in the codebase:

- Timeline template: `src/components/templates/Timeline/index.tsx`
- Task implementation: `src/components/organisms/Task/index.tsx`
- Utility functions for date math: `src/util/date.util.ts`

## Testing

Unit and integration testing recommendations:

- Use `vitest` and `@testing-library/react` for unit and interaction tests (this repo includes `vitest` config).
- Test layout calculations — verify that given `start`/`end` produce expected left/width in pixels using the same scale helper functions.
- Interaction tests — simulate dragging and ensure `onDragEnd` receives the expected payload.

Example commands:

```bash
pnpm test
pnpm vitest --watch
```

## Customization Patterns

- Render props: `renderTask(task)` — return custom JSX for each task.
- Slot replacement: pass custom header/toolbar components via `config.toolbarComponent`.
- Event hooks: use `onTaskDrag`, `onTaskResize`, `onTaskClick` to sync with your store or server.

## Integration Tips

- Debounce expensive server updates during drag operations; persist final position on `onDragEnd`.
- Use optimistic UI updates for smooth UX: update the local store immediately, then confirm with server.
- If you need multiple timelines, extract the shared layout logic (scale, date math) into a small helper module.

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repo.
2. Create a feature branch.
3. Add unit tests for new behavior.
4. Open a PR describing the change.

Please follow the code style in the repository and update types where necessary.

## Where to look in the codebase

- Timeline template: `src/components/templates/Timeline/index.tsx`
- Task component: `src/components/organisms/Task/index.tsx`
- Types: `src/types`
- Utilities: `src/util`

## License

MIT © 2024 LuciferDIot
