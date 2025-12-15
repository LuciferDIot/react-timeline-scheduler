import React from 'react';

export const Docs = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="prose prose-invert max-w-none">
        <h1 className="text-4xl font-bold text-white mb-2">Documentation</h1>
        <p className="text-gray-400 text-lg mb-10">
            A comprehensive guide to configuring and customizing the React Timeline Scheduler.
        </p>
        
        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
             <span className="text-blue-500">01.</span> Installation
          </h2>
          <div className="bg-[#111827] rounded-lg p-5 font-mono text-sm border border-white/10 shadow-lg">
            <span className="text-purple-400">npm</span> <span className="text-gray-300">install</span> <span className="text-green-400">react-timeline-scheduler</span>
          </div>
        </section>

        {/* Timeline Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <span className="text-blue-500">02.</span> Timeline Props
          </h2>
          <p className="text-gray-400 mb-6">
              The `Timeline` component is the main entry point. It accepts the following props:
          </p>
          <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-[#030712]">
            <table className="w-full text-left text-sm text-gray-400">
              <thead className="bg-[#111827] text-gray-200 uppercase font-medium text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4">Prop</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Required</th>
                  <th className="px-6 py-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">config</td>
                  <td className="px-6 py-4 font-mono text-purple-400">SchedulerConfig</td>
                  <td className="px-6 py-4"><Badge color="green">Yes</Badge></td>
                  <td className="px-6 py-4">The core configuration object containing data, labels, and theme settings.</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">startOffsetDays</td>
                  <td className="px-6 py-4 font-mono text-purple-400">number</td>
                  <td className="px-6 py-4"><Badge color="gray">No</Badge></td>
                  <td className="px-6 py-4">Override the start offset from the config. Defaults to 0 (today).</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">endOffsetDays</td>
                  <td className="px-6 py-4 font-mono text-purple-400">number</td>
                  <td className="px-6 py-4"><Badge color="gray">No</Badge></td>
                  <td className="px-6 py-4">Override the end offset from the config. Defaults to 0.</td>
                </tr>
                 <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">onTaskClick</td>
                  <td className="px-6 py-4 font-mono text-purple-400">(task) =&gt; void</td>
                  <td className="px-6 py-4"><Badge color="gray">No</Badge></td>
                  <td className="px-6 py-4">Callback fired when a task bar is clicked.</td>
                </tr>
                 <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">loading</td>
                  <td className="px-6 py-4 font-mono text-purple-400">boolean</td>
                  <td className="px-6 py-4"><Badge color="gray">No</Badge></td>
                  <td className="px-6 py-4">If true, displays a loading skeleton instead of the timeline.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>



        {/* SchedulerTask */}
        <section className="mb-16">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                <span className="text-blue-500">03.</span> SchedulerTask
            </h2>
            <p className="text-gray-400 mb-6">
                The `data` array consists of `SchedulerTask` objects. This is the primary data structure for your timeline.
            </p>
            <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-[#030712]">
            <table className="w-full text-left text-sm text-gray-400">
              <thead className="bg-[#111827] text-gray-200 uppercase font-medium text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Required</th>
                  <th className="px-6 py-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">id</td>
                  <td className="px-6 py-4 font-mono text-purple-400">string</td>
                  <td className="px-6 py-4"><Badge color="green">Yes</Badge></td>
                  <td className="px-6 py-4">Unique identifier for the task.</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">label</td>
                  <td className="px-6 py-4 font-mono text-purple-400">string</td>
                  <td className="px-6 py-4"><Badge color="green">Yes</Badge></td>
                  <td className="px-6 py-4">Text displayed on the task bar.</td>
                </tr>
                 <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">startDate</td>
                  <td className="px-6 py-4 font-mono text-purple-400">Date</td>
                  <td className="px-6 py-4"><Badge color="green">Yes</Badge></td>
                  <td className="px-6 py-4">Start date of the task.</td>
                </tr>
                 <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">endDate</td>
                  <td className="px-6 py-4 font-mono text-purple-400">Date</td>
                  <td className="px-6 py-4"><Badge color="green">Yes</Badge></td>
                  <td className="px-6 py-4">End date of the task.</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">groupLabel</td>
                  <td className="px-6 py-4 font-mono text-purple-400">string</td>
                  <td className="px-6 py-4"><Badge color="green">Yes</Badge></td>
                  <td className="px-6 py-4">The text label for the row this task belongs to (e.g., "Project A").</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">groupId</td>
                  <td className="px-6 py-4 font-mono text-purple-400">string</td>
                  <td className="px-6 py-4"><Badge color="green">Yes</Badge></td>
                  <td className="px-6 py-4">Unique ID for the group/row. Used for grouping logic.</td>
                </tr>
                 <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">colorKey</td>
                  <td className="px-6 py-4 font-mono text-purple-400">string</td>
                  <td className="px-6 py-4"><Badge color="gray">No</Badge></td>
                  <td className="px-6 py-4">Key to look up in `styles.taskColorFormat` for custom colors.</td>
                </tr>
                 <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">progress</td>
                  <td className="px-6 py-4 font-mono text-purple-400">number</td>
                  <td className="px-6 py-4"><Badge color="gray">No</Badge></td>
                  <td className="px-6 py-4">Completion percentage (0-100).</td>
                </tr>
                 <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">extendedStyles</td>
                  <td className="px-6 py-4 font-mono text-purple-400">CSSProperties</td>
                  <td className="px-6 py-4"><Badge color="gray">No</Badge></td>
                  <td className="px-6 py-4">Inline styles applied directly to the task bar.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SchedulerConfig */}
        <section className="mb-16">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                <span className="text-blue-500">04.</span> SchedulerConfig
            </h2>
            <p className="text-gray-400 mb-6">
                The `config` prop is where most of your setup happens. It defines your data source, global styles, and behavior.
            </p>
            <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-[#030712]">
            <table className="w-full text-left text-sm text-gray-400">
              <thead className="bg-[#111827] text-gray-200 uppercase font-medium text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                 <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">data</td>
                  <td className="px-6 py-4 font-mono text-purple-400">SchedulerTask[]</td>
                  <td className="px-6 py-4">Array of task objects. Each task must have a `startDate` and `endDate`.</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">resources</td>
                  <td className="px-6 py-4 font-mono text-purple-400">string[]</td>
                  <td className="px-6 py-4">
                      Optional list of group labels to determine the row order. 
                      <p className="mt-1 text-xs text-yellow-500/80">Useful for fixed row ordering.</p>
                  </td>
                </tr>
                 <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">theme</td>
                  <td className="px-6 py-4 font-mono text-purple-400">ThemeConfig</td>
                  <td className="px-6 py-4">
                      Can be a simple theme object OR a configuration object with modes.
                      <div className="mt-2 text-xs bg-white/5 p-2 rounded border border-white/5">
                        <code className="block text-gray-300">
                            {`{ mode: 'light' | 'dark', light: {...}, dark: {...} }`}
                        </code>
                      </div>
                  </td>
                </tr>
                 <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">dragConfig</td>
                  <td className="px-6 py-4 font-mono text-purple-400">DragConfig</td>
                  <td className="px-6 py-4">Controls drag-and-drop behavior (auto-scroll, snap-to-grid).</td>
                </tr>
                 <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">disableToolbar</td>
                  <td className="px-6 py-4 font-mono text-purple-400">boolean</td>
                  <td className="px-6 py-4">If true, hides the top toolbar row (topic, month headers, lock icons).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Theme Object */}
         <section className="mb-16">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                <span className="text-blue-500">05.</span> SchedulerTheme
            </h2>
            <p className="text-gray-400 mb-6">
                Fully customize the library's appearance. The `theme` prop accepts a partial object that overrides these defaults.
            </p>
            
            <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-[#030712]">
                <table className="w-full text-left text-sm text-gray-400">
                     <thead className="bg-[#111827] text-gray-200 uppercase font-medium text-xs tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Property</th>
                             <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Description</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        <tr className="hover:bg-white/5 transition-colors"><td className="px-6 py-4 font-mono text-blue-400">primary</td><td className="px-6 py-4 font-mono text-purple-400">string</td><td className="px-6 py-4">Primary accent color.</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="px-6 py-4 font-mono text-blue-400">secondary</td><td className="px-6 py-4 font-mono text-purple-400">string</td><td className="px-6 py-4">Secondary accent color.</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="px-6 py-4 font-mono text-blue-400">border</td><td className="px-6 py-4 font-mono text-purple-400">string</td><td className="px-6 py-4">Global border color.</td></tr>
                        
                        <tr className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-mono text-blue-400">background</td>
                            <td className="px-6 py-4 font-mono text-purple-400">{`{ primary: string, secondary: string }`}</td>
                            <td className="px-6 py-4">Main container backgrounds.</td>
                        </tr>
                         <tr className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-mono text-blue-400">text</td>
                            <td className="px-6 py-4 font-mono text-purple-400">{`{ primary: string, secondary: string }`}</td>
                            <td className="px-6 py-4">Global text colors.</td>
                        </tr>
                         <tr className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-mono text-blue-400">row</td>
                            <td className="px-6 py-4 font-mono text-purple-400">{`{ even: string, odd: string, hover: string }`}</td>
                            <td className="px-6 py-4">Background colors for timeline rows.</td>
                        </tr>
                        <tr className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-mono text-blue-400">header</td>
                            <td className="px-6 py-4 font-mono text-purple-400">{`{ background: string, text: string }`}</td>
                            <td className="px-6 py-4">Date header styles.</td>
                        </tr>
                         <tr className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-mono text-blue-400">grid</td>
                            <td className="px-6 py-4 font-mono text-purple-400">{`{ color: string }`}</td>
                            <td className="px-6 py-4">Color of the vertical grid lines.</td>
                        </tr>
                        <tr className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-mono text-blue-400">grid.currentDateLine</td>
                            <td className="px-6 py-4 font-mono text-purple-400">string</td>
                            <td className="px-6 py-4">Color of the dashed current date indicator.</td>
                        </tr>
                        <tr className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-mono text-blue-400">toolbar</td>
                            <td className="px-6 py-4 font-mono text-purple-400">{`{ icon: string, background: string, text: string }`}</td>
                            <td className="px-6 py-4">Colors for the toolbar icons (lock, scroll-to-today).</td>
                        </tr>
                         <tr className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-mono text-blue-400">task</td>
                            <td className="px-6 py-4 font-mono text-purple-400">object</td>
                            <td className="px-6 py-4">
                                Default task colors.
                                <div className="mt-1 text-xs text-gray-500">
                                   `even`, `odd`, `hover`, `text`, `border`
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

      </div>
    </div>
  );
};

const Badge = ({ children, color } : { children: React.ReactNode, color: 'green' | 'gray' }) => {
    const styles = color === 'green' 
        ? "bg-green-500/10 text-green-400 border-green-500/20"
        : "bg-gray-800 text-gray-400 border-gray-700";
        
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${styles}`}>
            {children}
        </span>
    );
}
