# Weekly Task Scheduler

![Weekly Task Scheduler](https://img.shields.io/npm/v/weekly-task-scheduler?style=flat-square)
![License](https://img.shields.io/npm/l/weekly-task-scheduler?style=flat-square)

A **React-based** task scheduling and planning component for managing weekly tasks efficiently. This package provides an intuitive UI for drag-and-drop scheduling, task tracking, and progress visualization.

## Features

- 📆 Weekly Task Management
- 🎯 Drag-and-Drop Support
- 📊 Progress Tracking
- ⚡ Interactive UI with Context Menu
- 🎨 Fully Customizable Components

## Installation

```sh
npm install weekly-task-scheduler
# or
yarn add weekly-task-scheduler
```

## Usage

```tsx
import { WeeklyPlan } from "weekly-task-scheduler";

const tasks = [
  {
    id: "task-1",
    name: "Design UI",
    startDate: "2024-02-01",
    endDate: "2024-02-03",
  },
  {
    id: "task-2",
    name: "Develop Backend",
    startDate: "2024-02-04",
    endDate: "2024-02-07",
  },
];

const App = () => {
  return <WeeklyPlan tasks={tasks} />;
};

export default App;
```

## Components

- **`<WeeklyPlan />`** - The main component for rendering the weekly task planner.
- **`<Task />`** - Represents an individual task.
- **`<Progressbar />`** - Displays task progress.
- **`<RightClickUI />`** - Provides a right-click context menu.
- **`<ExtendedTaskSection />`** - Expands tasks with more details.

## Props

| Prop           | Type                                                                       | Description                           |
| -------------- | -------------------------------------------------------------------------- | ------------------------------------- |
| `tasks`        | `Array<{ id: string; name: string; startDate: string; endDate: string; }>` | List of tasks to display              |
| `onTaskUpdate` | `(updatedTask) => void`                                                    | Callback when a task is updated       |
| `customStyles` | `object`                                                                   | Custom styles for styling the planner |

## License

This project is licensed under the **MIT License**.

## Contribution

Contributions are welcome! Feel free to open an issue or submit a pull request.

## Support

For issues and feature requests, open an [issue](https://github.com/yourusername/weekly-task-scheduler/issues).
