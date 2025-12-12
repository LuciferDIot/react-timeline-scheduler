# React Timeline Scheduler

<div align="center">
  <img src="https://img.shields.io/npm/v/react-timeline-scheduler?style=flat-square&color=3b82f6" alt="npm version" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="license" />
  <img src="https://img.shields.io/npm/dt/react-timeline-scheduler?style=flat-square" alt="downloads" />
</div>

<div align="center">
  <h3>A modern, responsive, and performance-optimized timeline scheduler for React.</h3>
</div>

---

## ✨ Features

- **🖱️ Interactive & Smooth**: Drag-and-drop support with smooth animations and specialized "virtual drag" logic for extending tasks beyond the visible timeline.
- **🎨 Highly Customizable**: Full theming support, custom cell widths, and flexible stying options.
- **⚡ Optimized Performance**: Built with optimization in mind, ensuring smooth rendering even with large datasets.
- **🔧 TypeScript Ready**: First-class TypeScript support for a robust developer experience.
- **📱 Responsive**: Adapts gracefully to different screen sizes.

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
import "react-timeline-scheduler/dist/style.css"; // ⚠️ IMPORTANT: Must import styles!

const App = () => {
  const data = [
    {
      id: "task-1",
      label: "Project Alpha",
      departmentName: "Engineering",
      departmentId: "dept-1",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-01-05"),
      // Optional: Custom styles per task
      styleAllocationId: "style-1"
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
            primary: "#3b82f6", 
            text: {
               primary: "#1f2937" 
            }
          }
        }}
      />
    </div>
  );
};
```

## 🎨 Theming

You can fully customize the look and feel by passing a `theme` object in the `config`.

```tsx
const myTheme = {
  primary: "#8b5cf6",
  secondary: "#64748b",
  text: {
    primary: "#1e293b",
    secondary: "#64748b",
  },
  background: {
    primary: "#ffffff",
    secondary: "#f8fafc",
  },
  row: {
    even: "#ffffff",
    odd: "#f8fafc",
    hover: "#f1f5f9",
  },
  // ... and more
};
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
| `dragConfig` | `DragConfig` | Configuration for drag behavior (autoScroll, etc.). |

---

## 👤 Author

**LuciferDIot**

- 🌐 Website: [pasindugeevinda.com](https://www.pasindugeevinda.com/)
- 🐙 GitHub: [@LuciferDIot](https://github.com/LuciferDIot)

---

## 📄 License

MIT © 2024 LuciferDIot
