# react-timeline-scheduler

A fully customizable, interactive timeline scheduler for managing tasks efficiently. Designed for production planning, scheduling, and tracking progress.

![npm](https://img.shields.io/npm/v/react-timeline-scheduler?style=flat-square) ![license](https://img.shields.io/npm/l/react-timeline-scheduler?style=flat-square) ![downloads](https://img.shields.io/npm/dt/react-timeline-scheduler?style=flat-square)

A **highly customizable** timeline scheduler for managing production tasks efficiently in React applications.

## ✨ Features

- **Customizable Timeline** - Adjust the view to show tasks by week, month, or custom ranges.
- **Task Progress Tracking** - Visualize progress with a progress bar.
- **Dynamic Styling** - Supports custom styles and colors per task.
- **Tooltip Support** - Custom tooltips for detailed task information.

---

## Installation

```sh
npm install react-timeline-scheduler
```

or

```sh
yarn add react-timeline-scheduler
```

## Usage

```tsx
import { WeeklyPlan } from "react-timeline-scheduler";
import { ProductionTask } from "react-timeline-scheduler/types";

const tasks: ProductionTask[] = [
  {
    id: "task-1",
    label: "Task A",
    departmentName: "Manufacturing",
    departmentId: "dept-1",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-02-05"),
    progress: 50,
    bgColorKey: "blue",
    styleAllocationId: "style-1",
    extendedStyles: { borderRadius: "8px" },
    tooltipComponent: (task) => (
      <div>
        {task.label} - {task.progress}% Complete
      </div>
    ),
  },
  {
    id: "task-2",
    label: "Task B",
    departmentName: "Assembly",
    departmentId: "dept-2",
    startDate: new Date("2024-02-03"),
    endDate: new Date("2024-02-07"),
    prevEndDate: new Date("2024-02-06"),
    progress: 75,
    bgColorKey: "green",
    styleAllocationId: "style-2",
  },
];

const MyComponent = () => {
  return <WeeklyPlan tasks={tasks} />;
};

export default MyComponent;
```

## Props

### `WeeklyPlan`

| Prop Name      | Type                                    | Description                                 |
| -------------- | --------------------------------------- | ------------------------------------------- |
| `tasks`        | `ProductionTask[]`                      | Array of tasks to display in the scheduler. |
| `startDate`    | `Date`                                  | The start date of the scheduler.            |
| `endDate`      | `Date`                                  | The end date of the scheduler.              |
| `onTaskClick`  | `(task: ProductionTask) => void`        | Callback when a task is clicked.            |
| `onTaskUpdate` | `(updatedTask: ProductionTask) => void` | Callback when a task is updated.            |

### `ProductionTask`

| Property            | Type                                        | Description                                     |
| ------------------- | ------------------------------------------- | ----------------------------------------------- |
| `id`                | `string`                                    | Unique identifier for the task.                 |
| `label`             | `string`                                    | Task name.                                      |
| `departmentName`    | `string`                                    | Department name the task belongs to.            |
| `departmentId`      | `string`                                    | Identifier for the department.                  |
| `startDate`         | `Date`                                      | Task start date.                                |
| `endDate`           | `Date`                                      | Task end date.                                  |
| `prevEndDate`       | `Date?`                                     | Previous end date, useful for tracking changes. |
| `styleAllocationId` | `string`                                    | ID for style allocation.                        |
| `progress`          | `number?`                                   | Task completion progress (0-100).               |
| `bgColorKey`        | `string?`                                   | Key for background color theme.                 |
| `extendedStyles`    | `Omit<React.CSSProperties, "width">?`       | Custom styles for the task.                     |
| `tooltipComponent`  | `(task: ProductionTask) => React.ReactNode` | Custom tooltip rendering function.              |

---

## 📌 Props

### `<WeeklyPlan config={{tasks: []}} />`

| Prop    | Type               | Required | Description                                |
| ------- | ------------------ | -------- | ------------------------------------------ |
| `tasks` | `ProductionTask[]` | ✅       | List of tasks to display in the scheduler. |

### `ProductionTask`

```ts
export interface ProductionTask {
  id: string;
  label: string;
  departmentName: string;
  departmentId: string;
  startDate: Date;
  endDate: Date;
  prevEndDate?: Date;
  styleAllocationId: string;
  progress?: number;
  bgColorKey?: string;
  extendedStyles?: Omit<React.CSSProperties, "width">;
  tooltipComponent?: (task: ProductionTask) => React.ReactNode;
}
```

---

## 🎨 Customization

- **Background Color**: `bgColorKey` can be used to set task background colors dynamically.
- **Extended Styles**: Pass additional CSS properties via `extendedStyles`.
- **Tooltips**: Use `tooltipComponent` to display custom tooltip content.

---

## 📜 License

MIT License © 2024
