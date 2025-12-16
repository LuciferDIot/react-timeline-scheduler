
import { useState } from 'react';
import { Timeline } from 'react-timeline-scheduler';
import { examples } from '../data/examples';
import { Check, ChevronRight } from 'lucide-react';

export const Examples = () => {
  const [activeExampleId, setActiveExampleId] = useState(examples[0].id);
  const [customMode, setCustomMode] = useState<'light' | 'dark'>('light');
  const [disableToolbar, setDisableToolbar] = useState(false);
  const activeExample = examples.find(ex => ex.id === activeExampleId) || examples[0];

  return (
    <div className="flex max-sm:flex-col min-h-[calc(100vh-64px)] bg-[#030712]">
      {/* Sidebar - Fixed width */}
      <aside className="max-sm:w-full w-64 flex-shrink-0 bg-[#0f1117] border-r border-white/10 flex flex-col">
        <div className="p-4 border-b border-white/10">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Examples</h2>
        </div>
        <div className="flex-grow p-2 space-y-1">
          {examples.map((ex) => (
            <button
              key={ex.id}
              onClick={() => setActiveExampleId(ex.id)}
              className={`w-full text-left px-4 py-3 rounded-md transition-all flex items-center justify-between group ${
                activeExampleId === ex.id
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              <div className="flex flex-col">
                <span className="font-medium text-sm">{ex.title}</span>
                <span className="text-xs text-gray-500 mt-1 line-clamp-1">{ex.description}</span>
              </div>
              {activeExampleId === ex.id && <Check size={14} className="text-blue-400" />}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0 bg-[#030712]">
        {/* Breadcrumb Header */}
        <div className="h-14 flex items-center px-6 border-b border-white/10 bg-[#030712]">
            <span className="text-gray-500 text-sm">Examples</span>
            <ChevronRight size={14} className="text-gray-600 mx-2" />
            <span className="text-white font-medium text-sm">{activeExample.title}</span>
        </div>

        {/* Content Scrollable Area */}
        <div className="flex-grow p-6">
            
            {/* Example Description */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white mb-2">{activeExample.title}</h1>
                <p className="text-gray-400">{activeExample.description}</p>
            </div>

            {/* Controls Toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-white/10 bg-[#0f1117]">
                <div className="flex items-center gap-6">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${disableToolbar ? 'bg-blue-600 border-blue-600' : 'border-gray-600 bg-transparent group-hover:border-gray-500'}`}>
                            {disableToolbar && <Check size={12} className="text-white" />}
                        </div>
                        <input 
                            type="checkbox" 
                            checked={disableToolbar}
                            onChange={(e) => setDisableToolbar(e.target.checked)}
                            className="hidden"
                        />
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">Disable Toolbar</span>
                    </label>

                    {activeExampleId === 'theme-switching' && (
                        <div className="flex items-center gap-3 border-l border-white/10 pl-6">
                            <span className="text-sm text-gray-400">Theme:</span>
                            <div className="flex bg-[#030712] p-1 rounded-lg border border-white/10">
                                {['light', 'dark'].map((mode) => (
                                    <button
                                        key={mode}
                                        onClick={() => setCustomMode(mode as 'light' | 'dark')}
                                        className={`px-3 py-1 rounded text-xs font-medium transition-all capitalize ${
                                            customMode === mode 
                                            ? 'bg-blue-600 text-white shadow-sm' 
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        {mode}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Timeline Preview */}
            <div className="mb-8 rounded-xl border border-white/10 bg-[#0b0d13] overflow-hidden shadow-2xl">
                 <div className="relative">
                     <Timeline
                        key={`${activeExample.id}-${customMode}-${disableToolbar}`}
                        config={{
                            label: activeExample.title,
                            data: activeExample.tasks,
                            disableToolbar: disableToolbar,
                            theme: activeExampleId === 'theme-switching' 
                                ? { ...activeExample.theme, mode: customMode } 
                                : activeExample.theme,
                            ...activeExample.customConfig
                        }}
                     />
                 </div>
            </div>

            {/* Source Code */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-300">Configuration</h3>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#0d1117] overflow-hidden group">
                     <div className="flex items-center px-4 py-2 border-b border-white/5 bg-white/5">
                         <div className="flex gap-1.5">
                             <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                             <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                             <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                         </div>
                         <span className="ml-4 text-xs font-mono text-gray-500">config object</span>
                     </div>
                     <pre className="p-4 text-xs font-mono text-gray-400 overflow-x-auto selection:bg-blue-500/30">
{JSON.stringify({
    label: activeExample.title,
    data: "[...tasks]",
    theme: activeExample.theme || "default",
    ...activeExample.customConfig
}, null, 2)}
                     </pre>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};
