# React Timeline Scheduler

<div align="center">
  <img src="https://img.shields.io/npm/v/react-timeline-scheduler?style=flat-square&color=3b82f6" alt="npm version" />
  <img src="https://img.shields.io/npm/l/react-timeline-scheduler?style=flat-square&color=3b82f6" alt="license" />
  <img src="https://img.shields.io/npm/dt/react-timeline-scheduler?style=flat-square&color=3b82f6" alt="downloads" />
</div>

<br />

**React Timeline Scheduler** is a modern, responsive, and highly customizable timeline component for React. Built with performance and flexibility in mind, it's perfect for resource planning, project management, and production scheduling.

## ✨ Features

- **🚀 Modern & Responsive**: Built with Tailwind CSS and Framer Motion for smooth animations and adaptability to any screen size.
- **🎨 Fully Thememable**: Customize every color and style to match your brand using our flexible Theming API.
- **⚡ High Performance**: Optimized for handling large datasets with smart rendering and virtualization techniques.
- **🖱️ Interactive**: Drag, drop, resize (coming soon), context menus, and tooltips out of the box.
- **🔧 TypeScript Ready**: First-class TypeScript support for a robust development experience.

---

## 📦 Installation

```bash
npm install react-timeline-scheduler
# or
yarn add react-timeline-scheduler
```

## 🚀 Usage

```tsx
import { WeeklyPlan } from "react-timeline-scheduler";
import "react-timeline-scheduler/dist/style.css"; // Import base styles (if needed)

const App = () => {
  const data = [
    {
      id: "task-1",
      label: "Project Alpha",
      departmentName: "Engineering",
      departmentId: "dept-1",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-01-05"),
    },
    // ... more tasks
  ];

  return (
    <div className="w-screen h-screen">
      <WeeklyPlan
        config={{
          topic: "Project Schedule",
          data: data,
          theme: {
            primary: "#8b5cf6", // Custom primary color
            header: {
               background: "#f3f4f6",
               text: "#1f2937"
            }
          }
        }}
      />
    </div>
  );
};
```

## 🎨 Theming

React Timeline Scheduler provides a powerful theming system. You can override default colors by passing a `theme` object in the `config` prop.

```tsx
interface SchedulerTheme {
  primary: string;           // Main accent color
  secondary: string;         // Secondary accents
  text: {
    primary: string;         // Main text color
    secondary: string;       // Muted text
  };
  background: {
    primary: string;         // Main background
    secondary: string;       // Secondary background (e.g., sidebars)
  };
  border: string;            // Border colors
  row: {
    even: string;            // Alternating row colors
    odd: string;
    hover: string;           // Row hover color
  };
  grid: {
    color: string;           // Grid line colors
  };
  header: {
    background: string;      // Header background
    text: string;            // Header text color
  };
  task: {
    even: string;            // Task bars on even rows
    odd: string;             // Task bars on odd rows
    hover: string;           // Task hover effect
    text: string;            // Text inside task bars
  };
}
```

## 📄 API Reference

### `WeeklyPlan` Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `config` | `WeeklyPlanConfig` | **Required**. Main configuration object containing data and settings. |
| `className` | `string` | Optional. Custom CSS class for the root container. |
| `onTaskClick` | `(task) => void` | Callback fired when a task is clicked. |
| `onRowLabelClick` | `(label) => void` | Callback fired when a row label is clicked. |
| `loading` | `boolean` | Shows a loading state if true. |

### `WeeklyPlanConfig`

| Property | Type | Description |
| :--- | :--- | :--- |
| `data` | `ProductionTask[]` | Array of task objects. |
| `topic` | `string` | Title shown in the top-left corner. |
| `theme` | `Partial<SchedulerTheme>` | Theme override object. |
| `startOffsetDays` | `number` | Days to subtract from the start date view. |
| `endOffsetDays` | `number` | Days to add to the end date view. |

---

## 📄 License

MIT © 2024
