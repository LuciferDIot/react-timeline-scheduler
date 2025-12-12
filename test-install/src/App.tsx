import { Timeline, type SchedulerTask } from 'react-timeline-scheduler';
import 'react-timeline-scheduler/dist/react-timeline-scheduler.css'; // Import styles directly
import './App.css';

const testTasks: SchedulerTask[] = [
  {
    id: '1',
    label: 'Package Installation Test',
    groupLabel: 'Engineering',
    groupId: 'eng-001',
    startDate: new Date('2024-12-01'),
    endDate: new Date('2024-12-10'),
    // variant is now optional, verifying that!
  },
  {
    id: '2',
    label: 'React 19 Compatibility',
    groupLabel: 'QA',
    groupId: 'qa-001',
    startDate: new Date('2024-12-05'),
    endDate: new Date('2024-12-15'),
    variant: 'style2',
  },
  {
    id: '3',
    label: 'Disappearing Task Test',
    groupLabel: 'Bug Fix',
    groupId: 'bug-001',
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
        <Timeline
          config={{
            label: "Installation Test",
            data: testTasks
          }}
        />
      </div>
    </div>
  );
}

export default App;
