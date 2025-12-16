# React Timeline Scheduler

<div>
  <img src="https://img.shields.io/npm/v/react-timeline-scheduler?style=flat-square&color=3b82f6" alt="npm version" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="license" />
  <img src="https://img.shields.io/npm/dt/react-timeline-scheduler?style=flat-square" alt="downloads" />
  <img src="https://img.shields.io/bundlephobia/minzip/react-timeline-scheduler?style=flat-square" alt="bundle size" />
</div>

A modern, responsive, and fully customizable timeline scheduler component for React applications. Perfect for project management, resource planning, event scheduling, and more.

**Live Demo:** [Try it here](https://luciferdiot.github.io/react-timeline-scheduler/)  
**Author:** [Pasindu Geevinda](https://www.pasindugeevinda.com)

## ✨ Features

- 📅 **Interactive Timeline**: Drag to move and resize tasks
- 🎯 **Responsive Design**: Works on all screen sizes
- 🎨 **Fully Themeable**: Complete light/dark theme support with customizable colors
- ⚡ **Performance Optimized**: Optimized rendering for large datasets
- ⌨️ **Accessible**: Keyboard navigation and screen reader support
- 📱 **Touch Support**: Works on mobile and tablet devices
- 🔧 **Configurable**: Extensive customization options

## 📦 Installation

```bash
npm install react-timeline-scheduler
# or
yarn add react-timeline-scheduler
# or
pnpm add react-timeline-scheduler
```

## 🚀 Quick Start

### Basic Timeline

```jsx
import { Timeline } from "react-timeline-scheduler";
import "react-timeline-scheduler/dist/react-timeline-scheduler.css";

const data = [
  {
    id: "1",
    label: "Task 1",
    groupLabel: "Group A",
    groupId: "group-1",
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2024, 0, 5),
  },
  {
    id: "2",
    label: "Task 2",
    groupLabel: "Group B",
    groupId: "group-2",
    startDate: new Date(2024, 0, 6),
    endDate: new Date(2024, 0, 10),
  },
];

export function MyTimeline() {
  return (
    <Timeline
      config={{
        label: "Project Timeline",
        data: data,
      }}
    />
  );
}
```

### With Custom Theme

```jsx
<Timeline
  config={{
    label: "Project Timeline",
    data: data,
    theme: {
      primary: "#3b82f6",
      background: { primary: "#ffffff", secondary: "#f8fafc" },
      text: { primary: "#1e293b", secondary: "#64748b" },
      // See THEME_GUIDE.md for complete theme options
    },
  }}
/>
```

### Dark Mode

```jsx
import { darkTheme } from "react-timeline-scheduler/dist";

<Timeline
  config={{
    label: "Project Timeline",
    data: data,
    theme: {
      mode: "dark",
      dark: darkTheme,
    },
  }}
/>
```

## 📖 Documentation

### Configuration Object

```typescript
interface SchedulerConfig {
  // Required
  label: string;                    // Timeline title/label
  data: SchedulerTask[];            // Array of tasks

  // Optional
  startOffsetDays?: number;         // Days to show before first task
  endOffsetDays?: number;           // Days to show after last task
  resources?: string[];             // Resource/group identifiers
  styles?: SchedulerConfigStyles;   // Style configuration
  theme?: SchedulerTheme | SchedulerThemeConfig; // Theme colors
  dragConfig?: DragConfig;          // Drag and drop settings
  disableToolbar?: boolean;         // Hide toolbar
  animationConfig?: AnimationConfig; // Animation settings
}
```

### Task Object

```typescript
interface SchedulerTask {
  id: string;                       // Unique identifier
  label: string;                    // Task name
  groupLabel: string;               // Group/row name
  groupId: string;                  // Group identifier
  startDate: Date;                  // Start date
  endDate: Date;                    // End date
  
  // Optional
  variant?: string;                 // Task variant
  progress?: number;                // Progress percentage (0-100)
  colorKey?: string;                // Custom color key
  discontinue?: {                   // Discontinuous period
    startDate: Date;
    endDate: Date;
  };
  extendedStyles?: CSSProperties;   // Custom inline styles
  tooltipComponent?: (task: SchedulerTask) => React.ReactNode; // Custom tooltip
}
```

### Theme Configuration

The scheduler includes built-in light and dark themes and supports full customization. See [THEME_GUIDE.md](./THEME_GUIDE.md) for comprehensive theme documentation.

```typescript
interface SchedulerTheme {
  primary: string;                  // Primary color
  secondary: string;                // Secondary color
  
  text: {
    primary: string;                // Primary text
    secondary: string;              // Secondary text
  };
  
  background: {
    primary: string;                // Main background
    secondary: string;              // Secondary background
  };
  
  border: string;                   // Border color
  
  row: {
    even: string;                   // Even row background
    odd: string;                    // Odd row background
    hover: string;                  // Hover state
  };
  
  grid: {
    color: string;                  // Grid lines
    currentDateLine?: string;       // Today indicator
  };
  
  header: {
    background: string;
    text: string;
  };
  
  task: {
    even: string;
    odd: string;
    hover: string;
    text: string;
    border?: string;
  };
  
  toolbar?: {
    icon?: string;
    background?: string;
    text?: string;
  };
  
  progressBar?: {
    background?: string;
  };
  
  tooltip?: {
    background?: string;
    text?: string;
    border?: string;
  };
  
  resize?: {
    handleBackground?: string;
    handleHoverBackground?: string;
  };
  
  interactive?: {
    focus?: string;
  };
}
```

### Drag Configuration

```typescript
interface DragConfig {
  enableLeftResize?: boolean;       // Allow left-side resize
  enableRightResize?: boolean;      // Allow right-side resize
  
  autoScroll?: {
    enabled?: boolean;              // Auto-scroll on drag
    edgeZone?: number;              // Distance from edge (px)
    maxSpeed?: number;              // Max scroll speed (px/frame)
  };
  
  snapToGrid?: boolean;             // Snap to cell boundaries
  minTaskDuration?: number;         // Minimum duration in days
}
```

### Animation Configuration

```typescript
interface AnimationConfig {
  enabled?: boolean;                // Enable animations
  
  taskResize?: {
    duration?: number;              // Duration in seconds
    ease?: string | number[];       // Easing function
  };
  
  cellExpand?: {
    duration?: number;
    ease?: string | number[];
  };
}
```

## 🎨 Theming

### Using Preset Themes

```jsx
import { Timeline, lightTheme, darkTheme } from "react-timeline-scheduler";

// Light theme (default)
<Timeline config={{ label: "Timeline", data, theme: lightTheme }} />

// Dark theme
<Timeline config={{ label: "Timeline", data, theme: darkTheme }} />
```

### Creating Custom Themes

```jsx
const myTheme = {
  primary: "#8b5cf6",
  secondary: "#ec4899",
  text: {
    primary: "#1f2937",
    secondary: "#6b7280",
  },
  background: {
    primary: "#ffffff",
    secondary: "#f3f4f6",
  },
  border: "#e5e7eb",
  row: {
    even: "#ffffff",
    odd: "#f9fafb",
    hover: "#f3f4f6",
  },
  // ... other theme properties
};

<Timeline config={{ label: "Timeline", data, theme: myTheme }} />
```

### Dark/Light Mode with Separate Themes

```jsx
const themeConfig = {
  mode: isDarkMode ? "dark" : "light",
  light: {
    primary: "#3b82f6",
    background: { primary: "#ffffff", secondary: "#f8fafc" },
    // ... light theme
  },
  dark: {
    primary: "#60a5fa",
    background: { primary: "#0f172a", secondary: "#1e293b" },
    // ... dark theme
  },
};

<Timeline config={{ label: "Timeline", data, theme: themeConfig }} />
```

## 🔧 Advanced Usage

### Custom Task Tooltip

```jsx
const customTooltip = (task) => (
  <div className="custom-tooltip">
    <strong>{task.label}</strong>
    <p>{task.startDate.toLocaleDateString()}</p>
  </div>
);

const task = {
  id: "1",
  label: "Task",
  groupLabel: "Group",
  groupId: "group-1",
  startDate: new Date(),
  endDate: new Date(),
  tooltipComponent: customTooltip,
};
```

### Handling Task Changes

```jsx
<Timeline
  config={{
    label: "Timeline",
    data: tasks,
  }}
  onTaskChange={(updatedTask) => {
    console.log("Task updated:", updatedTask);
    // Update your data source
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  }}
  onTaskClick={(task) => {
    console.log("Task clicked:", task);
  }}
/>
```

### Custom Styles

```jsx
<Timeline
  config={{
    label: "Timeline",
    data: tasks,
    styles: {
      customCellWidthPX: 120,        // Cell width in pixels
      customCellHeightPX: 50,        // Cell height in pixels
      taskColorFormat: {             // Custom color mapping
        "high-priority": "#ef4444",
        "medium-priority": "#f59e0b",
        "low-priority": "#10b981",
      },
    },
  }}
/>
```

## 📱 Responsive Design

The timeline is fully responsive and adapts to different screen sizes:

```jsx
<div style={{ height: "600px", width: "100%" }}>
  <Timeline config={{ label: "Timeline", data }} />
</div>
```

## ♿ Accessibility

- Keyboard navigation support
- ARIA labels for screen readers
- High contrast mode support
- Focus indicators on interactive elements

## 🚨 Common Issues

### Tasks Not Appearing
- Verify task dates are valid JavaScript Date objects
- Check that `startDate` is before `endDate`
- Ensure dates fall within the visible timeline range

### Drag/Resize Not Working
- Ensure `dragConfig` is properly configured
- Check that tasks are not read-only
- Verify CSS is properly loaded

### Theme Colors Not Applying
- Make sure all required theme properties are set
- Check that color values are valid CSS colors
- Verify theme is passed in config object

## 💡 Examples

### Project Management
```jsx
const tasks = [
  {
    id: "1",
    label: "Planning",
    groupLabel: "Phase 1",
    groupId: "phase-1",
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2024, 0, 5),
    progress: 100,
  },
  {
    id: "2",
    label: "Development",
    groupLabel: "Phase 2",
    groupId: "phase-2",
    startDate: new Date(2024, 0, 6),
    endDate: new Date(2024, 0, 20),
    progress: 60,
  },
];

<Timeline
  config={{
    label: "Project Roadmap",
    data: tasks,
    theme: { primary: "#8b5cf6" },
  }}
/>
```

### Resource Allocation
```jsx
const resources = [
  {
    id: "dev-1",
    label: "Developer 1",
    groupLabel: "Engineering",
    groupId: "eng",
    startDate: new Date(),
    endDate: new Date(),
  },
  // ... more resources
];

<Timeline
  config={{
    label: "Resource Schedule",
    data: resources,
    dragConfig: {
      enableLeftResize: true,
      enableRightResize: true,
      minTaskDuration: 1,
    },
  }}
/>
```

## 📚 API Reference

### Props

| Prop | Type | Description |
|------|------|-------------|
| `config` | `SchedulerConfig` | Configuration object |
| `onTaskChange` | `(task: SchedulerTask) => void` | Task updated callback |
| `onTaskClick` | `(task: SchedulerTask) => void` | Task clicked callback |

### Exported Types

- `SchedulerConfig`
- `SchedulerTask`
- `SchedulerTheme`
- `SchedulerThemeConfig`
- `DragConfig`
- `AnimationConfig`

### Exported Themes

- `lightTheme` - Default light theme
- `darkTheme` - Built-in dark theme
- `defaultTheme` - Alias for lightTheme

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

MIT © [Pasindu Geevinda](https://www.pasindugeevinda.com)

## 📖 Additional Resources

- [Theme Customization Guide](./THEME_GUIDE.md)
- [Live Demo](https://luciferdiot.github.io/react-timeline-scheduler/)
- [GitHub Repository](https://github.com/luciferdiot/react-timeline-scheduler)
- [NPM Package](https://www.npmjs.com/package/react-timeline-scheduler)

## 🔗 Links

- [Author Website](https://www.pasindugeevinda.com)
- [Report Bug](https://github.com/luciferdiot/react-timeline-scheduler/issues)
- [Feature Request](https://github.com/luciferdiot/react-timeline-scheduler/issues)
- [Changelog](./CHANGELOG.md)
