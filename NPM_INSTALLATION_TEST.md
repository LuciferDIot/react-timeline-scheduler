# NPM Package Installation Test

## ✅ Package Published Successfully

**Package Details:**
- Name: `react-timeline-scheduler`
- Version: `1.0.14`
- Registry: https://www.npmjs.com/package/react-timeline-scheduler
- Author: luciferdiots

---

## 🧪 Manual Verification Steps

### 1. Create Test Project

```bash
# Create new directory
mkdir test-react-scheduler
cd test-react-scheduler

# Initialize new Vite + React + TypeScript project
npm create vite@latest . -- --template react-ts

# Install dependencies
npm install
```

### 2. Install Package from npm

```bash
npm install react-timeline-scheduler
```

Expected output:
```
+ react-timeline-scheduler@1.0.14
added 1 package
```

### 3. Install Peer Dependencies

```bash
npm install react react-dom tailwindcss
```

### 4. Create Test Component

Update `src/App.tsx`:

```typescript
import { WeeklyPlan, type ProductionTask } from 'react-timeline-scheduler';

const testTasks: ProductionTask[] = [
  {
    id: '1',
    label: 'Development Phase',
    departmentName: 'Engineering',
    departmentId: 'eng',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-10'),
    styleAllocationId: 'style1',
  },
  {
    id: '2',
    label: 'Testing Phase',
    departmentName: 'QA',
    departmentId: 'qa',
    startDate: new Date('2024-01-05'),
    endDate: new Date('2024-01-15'),
    styleAllocationId: 'style2',
  },
];

function App() {
  return (
    <div className="w-screen h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">NPM Package Test</h1>
      <WeeklyPlan
        config={{
          topic: "Project Timeline",
          data: testTasks,
        }}
      />
    </div>
  );
}

export default App;
```

### 5. Run Development Server

```bash
npm run dev
```

Visit: `http://localhost:5173`

---

## ✅ Verification Checklist

- [ ] Package installs without errors
- [ ] TypeScript types are available (no type errors)
- [ ] Component renders correctly
- [ ] Tasks are visible on timeline
- [ ] Drag-to-resize works (both left and right handles)
- [ ] Auto-scroll works during drag
- [ ] Lock/unlock toggle works
- [ ] No console errors
- [ ] Responsive design works

---

## 🎯 Expected Results

### TypeScript Autocomplete
All types should be available:
- `WeeklyPlan` component
- `ProductionTask` interface
- `DragConfig` interface
- `AnimationConfig` interface
- `useActionStore`, `useDataStore`, etc.

### Visual Appearance
- Timeline header with dates
- Department rows with labels
- Task bars displayed correctly
- Hover effects working
- Smooth animations

### Functionality
- Click task bars (triggers `onTaskClick` if provided)
- Drag task edges to resize
- Scroll horizontally
- Lock operations to disable editing

---

## 📸 Screenshot Test

Take screenshots of:
1. Initial render (tasks visible)
2. Drag operation in progress
3. Resized task
4. Lock operations enabled

---

## 🔍 Test All Exported Items

```typescript
import {
  WeeklyPlan,
  type ProductionTask,
  type DragConfig,
  type AnimationConfig,
  type WeeklyPlanConfig,
  type SchedulerTheme,
  useActionStore,
  useDataStore,
  useStylesStore,
  useChildStore,
} from 'react-timeline-scheduler';

// All should import without errors
console.log('All exports available!');
```

---

## ✨ Advanced Test: Custom Configuration

```typescript
const dragConfig: DragConfig = {
  enableLeftResize: true,
  enableRightResize: true,
  autoScroll: {
    enabled: true,
    edgeZone: 75,
    maxSpeed: 30,
  },
};

const animationConfig: AnimationConfig = {
  enabled: true,
  taskResize: { duration: 0.5, ease: 'easeInOut' },
};

<WeeklyPlan
  config={{
    topic: "Advanced Test",
    data: testTasks,
    dragConfig,
    animationConfig,
  }}
/>
```

---

## ❌ Troubleshooting

### "Module not found"
```bash
# Ensure package is installed
npm list react-timeline-scheduler

# Reinstall if needed
npm uninstall react-timeline-scheduler
npm install react-timeline-scheduler
```

### TypeScript errors
```bash
# Ensure peer dependencies are installed
npm install react react-dom tailwindcss
```

### Styling issues
Configure Tailwind CSS in your project or the component won't style correctly.

---

## 📝 Report Results

Document your findings:
- Installation: ✅/❌
- TypeScript: ✅/❌
- Rendering: ✅/❌
- Drag functionality: ✅/❌
- All features: ✅/❌

---

## 🎉 Success Criteria

**ALL should be ✅:**
- Package installs from npm
- No installation errors
- TypeScript works
- Component renders
- All features functional
- No runtime errors
