import type { ProductionTask } from 'react-timeline-scheduler';
import { WeeklyPlan } from 'react-timeline-scheduler';
import 'react-timeline-scheduler/dist/react-timeline-scheduler.css'; // Import styles directly
import './App.css';

const testTasks: ProductionTask[] = [
  {
    id: '1',
    label: 'Package Installation Test',
    departmentName: 'Engineering',
    departmentId: 'eng-001',
    startDate: new Date('2024-12-01'),
    endDate: new Date('2024-12-10'),
    // styleAllocationId is now optional, verifying that!
  },
  {
    id: '2',
    label: 'React 19 Compatibility',
    departmentName: 'QA',
    departmentId: 'qa-001',
    startDate: new Date('2024-12-05'),
    endDate: new Date('2024-12-15'),
    styleAllocationId: 'style2',
  },
  {
    id: '3',
    label: 'Disappearing Task Test',
    departmentName: 'Bug Fix',
    departmentId: 'bug-001',
    startDate: new Date('2024-11-20'), // Starts way before others
    endDate: new Date('2024-12-12'),
  },
];

function App() {
  return (
    <div className="w-screen h-screen">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">✅ Package Installation Successful!</h1>
        <p className="text-gray-600 mt-2">
          react-timeline-scheduler v1.0.20 installed from tarball
        </p>
      </div>
      
      <div className="border rounded p-4 bg-white">
        <WeeklyPlan
          topic="Installation Test"
          data={testTasks}
          // config object is removed to test direct props
        />
      </div>
    </div>
  );
}

export default App;
