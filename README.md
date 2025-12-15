# React Timeline Scheduler

<div>
  <img src="https://img.shields.io/npm/v/react-timeline-scheduler?style=flat-square&color=3b82f6" alt="npm version" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="license" />
  <img src="https://img.shields.io/npm/dt/react-timeline-scheduler?style=flat-square" alt="downloads" />
  <img src="https://img.shields.io/bundlephobia/minzip/react-timeline-scheduler?style=flat-square" alt="bundle size" />
</div>

A modern, responsive, and interactive timeline scheduler component for React applications. Visualize tasks and events on a horizontal timeline with drag-and-drop functionality.

**Live Demo:** [Try it here](https://luciferdiot.github.io/react-timeline-scheduler/)  
**Author:** [Pasindu Geevinda](https://www.pasindugeevinda.com)

## ✨ Features

- 📅 **Interactive Timeline**: Drag to move and resize tasks
- 🎯 **Responsive Design**: Works on all screen sizes
- 🎨 **Customizable**: Easy theming and styling options
- ⚡ **Performance Optimized**: Virtualized rendering for large datasets
- ⌨️ **Accessible**: Keyboard navigation and screen reader support
- 📱 **Touch Support**: Works on mobile and tablet devices

## 📦 Installation

```bash
npm install react-timeline-scheduler
# or
yarn add react-timeline-scheduler
# or
pnpm add react-timeline-scheduler
```

## 🚀 Quick Start

```jsx
import React from "react";
import { Timeline } from "react-timeline-scheduler";
import "react-timeline-scheduler/dist/style.css";

const App = () => {
  const tasks = [
    {
      id: "1",
      title: "Project Planning",
      start: new Date(2024, 0, 1),
      end: new Date(2024, 0, 5),
      rowId: "team-a",
      color: "#3b82f6"
    },
    {
      id: "2",
      title: "Development",
      start: new Date(2024, 0, 6),
      end: new Date(2024, 0, 15),
      rowId: "team-b",
      color: "#10b981"
    }
  ];

  return (
    <div style={{ height: "600px" }}>
      <Timeline
        config={{
          data: tasks,
          startDate: new Date(2024, 0, 1),
          endDate: new Date(2024, 0, 31),
          rows: ["team-a", "team-b"]
        }}
        onTaskClick={(task) => console.log("Task clicked:", task)}
        onTaskChange={(updatedTask) => console.log("Task updated:", updatedTask)}
      />
    </div>
  );
};

export default App;
```

## 📖 Documentation

### Basic Props

| Prop | Type | Description | Required |
|------|------|-------------|----------|
| `config` | Object | Configuration object | Yes |
| `onTaskClick` | Function | Callback when task is clicked | No |
| `onTaskChange` | Function | Callback when task is modified | No |
| `className` | String | Additional CSS class | No |

### Configuration Object

```javascript
const config = {
  // Required
  data: [], // Array of task objects
  startDate: new Date(), // Timeline start date
  endDate: new Date(), // Timeline end date
  
  // Optional
  rows: [], // Array of row IDs
  zoom: 1, // Zoom level (0.5 to 3)
  theme: {
    primary: "#3b82f6",
    secondary: "#6b7280",
    background: "#ffffff"
  },
  readOnly: false, // Disable editing
  showToolbar: true // Show/hide toolbar
};
```

### Task Object Structure

```javascript
{
  id: "unique-id",
  title: "Task Name",
  start: new Date(), // Start date
  end: new Date(), // End date
  rowId: "row-1", // Row identifier
  color: "#3b82f6", // Custom color
  progress: 50, // Progress percentage (0-100)
  data: {} // Additional custom data
}
```

## 🎨 Customization

### Custom Styling

```jsx
import "./custom-styles.css";

<Timeline
  config={config}
  className="custom-timeline"
/>
```

### Custom Task Renderer

```jsx
<Timeline
  config={{
    ...config,
    renderTask: (task, props) => (
      <div className="custom-task">
        <span>{task.title}</span>
        <span>{task.progress}%</span>
      </div>
    )
  }}
/>
```

## 🔧 API Reference

### Timeline Methods

| Method | Description |
|--------|-------------|
| `zoomIn()` | Increase zoom level |
| `zoomOut()` | Decrease zoom level |
| `zoomToFit()` | Zoom to fit all tasks |
| `scrollToToday()` | Scroll to current date |
| `getVisibleRange()` | Get currently visible date range |

### Events

| Event | Description | Callback Parameters |
|-------|-------------|---------------------|
| `onTaskClick` | Task clicked | `task` object |
| `onTaskChange` | Task moved/resized | Updated `task` object |
| `onTaskCreate` | New task created | New `task` object |
| `onTaskDelete` | Task deleted | `taskId` |
| `onZoomChange` | Zoom level changed | `zoomLevel` |
| `onDateRangeChange` | Visible date range changed | `{ start, end }` |

## 📱 Examples

### Project Management Timeline
```jsx
<Timeline
  config={{
    data: projectTasks,
    startDate: projectStart,
    endDate: projectDeadline,
    rows: departments,
    theme: {
      primary: "#8b5cf6",
      row: { even: "#f8fafc", odd: "#ffffff" }
    }
  }}
/>
```

### Resource Scheduling
```jsx
<Timeline
  config={{
    data: resourceAllocations,
    startDate: new Date(),
    endDate: addMonths(new Date(), 3),
    rows: resources,
    readOnly: true // View-only mode
  }}
/>
```

## 🚨 Common Issues

### "Tasks not appearing"
- Ensure dates are valid Date objects
- Check that `rowId` matches rows in configuration
- Verify tasks fall within the visible date range

### "Drag and drop not working"
- Ensure `readOnly` is not set to `true`
- Check callback functions are properly defined
- Verify no conflicting CSS styles

### "Performance issues with many tasks"
- Use virtual scrolling for 1000+ tasks
- Implement pagination or lazy loading
- Optimize task objects (avoid unnecessary properties)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT © [Pasindu Geevinda](https://www.pasindugeevinda.com)

## 🔗 Links

- [GitHub Repository](https://github.com/luciferdiot/react-timeline-scheduler)
- [Live Demo](https://luciferdiot.github.io/react-timeline-scheduler/)
- [NPM Package](https://www.npmjs.com/package/react-timeline-scheduler)
- [Author Website](https://www.pasindugeevinda.com)
- [Report Bug](https://github.com/luciferdiot/react-timeline-scheduler/issues)
```
