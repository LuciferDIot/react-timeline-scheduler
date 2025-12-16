import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { Code, Layers, MousePointer2 } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Hero onGetStarted={() => navigate('/examples')} />
      
      {/* Quick Start Section */}
      <section className="py-20 bg-[#030712]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-4">Get Started in Seconds</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Install the package and start building your timeline. No complex setup required.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Installation Code */}
                <div className="rounded-xl border border-white/10 bg-[#111827] p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                        <span className="text-gray-400 text-sm">Terminal</span>
                        <div className="flex gap-2">
                             <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                             <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                             <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                        </div>
                    </div>
                    <code className="text-sm font-mono text-gray-300">
                        <span className="text-blue-400">npm</span> install react-timeline-scheduler
                    </code>
                </div>

                {/* Usage Code */}
                <div className="rounded-xl border border-white/10 bg-[#111827] p-6 shadow-xl relative">
                     <div className="absolute top-4 right-4 text-xs font-mono text-gray-500">App.tsx</div>
                     <pre className="text-sm font-mono text-gray-300 overflow-x-auto">
{`import { Timeline } from 'react-timeline-scheduler';
import 'react-timeline-scheduler/dist/style.css';

const MyScheduler = () => (
  <Timeline
    config={{
      label: "My Project",
      data: myTasks, // Array of tasks
      theme: { primary: "#3b82f6" }
    }}
  />
);`}
                    </pre>
                </div>
            </div>
        </div>
      </section>
      
      {/* key benefits */}
      <section className="py-24 bg-gradient-to-b from-[#030712] to-[#111827]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                   <div className="text-center">
                       <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 text-blue-400">
                           <MousePointer2 size={32} />
                       </div>
                       <h3 className="text-xl font-semibold text-white mb-3">Interactive Drag & Drop</h3>
                       <p className="text-gray-400">
                           Intuitive task management with smooth drag and drop interactions. Reschedule tasks instantly.
                       </p>
                   </div>
                   <div className="text-center">
                       <div className="mx-auto w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 text-purple-400">
                           <Layers size={32} />
                       </div>
                       <h3 className="text-xl font-semibold text-white mb-3">Group & Filter</h3>
                       <p className="text-gray-400">
                           Organize complex schedules with nested groups and powerful filtering capabilities.
                       </p>
                   </div>
                   <div className="text-center">
                       <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6 text-green-400">
                           <Code size={32} />
                       </div>
                       <h3 className="text-xl font-semibold text-white mb-3">Developer Friendly</h3>
                       <p className="text-gray-400">
                           Built with TypeScript for type safety. Extensive API and flexible configuration options.
                       </p>
                   </div>
              </div>
          </div>
      </section>
    </div>
  );
};
