import { Badge } from '../components/Badge';

export const Docs = () => {
  // Define all sections in an array for easy management and dynamic numbering
  const sections = [
    {
      id: 'installation',
      active: true,
      title: 'Installation',
      content: (
        <div className="bg-[#111827] rounded-lg p-5 font-mono text-sm border border-white/10 shadow-lg">
          <span className="text-purple-400">npm</span> <span className="text-gray-300">install</span> <span className="text-green-400">react-timeline-scheduler</span>
        </div>
      )
    },
    {
      id: 'scheduler-task',
      active: true,
      title: 'SchedulerTask (The Data)',
      content: (
        <>
          <p className="text-gray-400 mb-6">
            The `SchedulerTask` object is the core data unit. It represents a single event or task on the timeline.
            <br/>
            <strong>Note:</strong> When callbacks like `onRowExpand` receive a `task`, they receive this exact full object with updated values.
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
                  <td className="px-6 py-4 font-mono text-blue-400">variant</td>
                  <td className="px-6 py-4 font-mono text-purple-400">string</td>
                  <td className="px-6 py-4"><Badge color="gray">No</Badge></td>
                  <td className="px-6 py-4">A classification string (e.g. "primary", "success") which can be used for custom logic/styling.</td>
                </tr>
                 <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">progress</td>
                  <td className="px-6 py-4 font-mono text-purple-400">number</td>
                  <td className="px-6 py-4"><Badge color="gray">No</Badge></td>
                  <td className="px-6 py-4">Completion percentage (0-100). Determines the filled portion of the task bar.</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">colorKey</td>
                  <td className="px-6 py-4 font-mono text-purple-400">string</td>
                  <td className="px-6 py-4"><Badge color="gray">No</Badge></td>
                  <td className="px-6 py-4">Key to look up in `styles.taskColorFormat` for custom colors specific to this task.</td>
                </tr>
                 <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">discontinue</td>
                  <td className="px-6 py-4 font-mono text-purple-400">{`{ startDate: Date, endDate: Date }`}</td>
                  <td className="px-6 py-4"><Badge color="gray">No</Badge></td>
                  <td className="px-6 py-4">Defines a "break" or discontinued period within the task's lifespan.</td>
                </tr>
                 <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">prevEndDate</td>
                  <td className="px-6 py-4 font-mono text-purple-400">Date</td>
                  <td className="px-6 py-4"><Badge color="gray">No</Badge></td>
                  <td className="px-6 py-4">Track previous end date state. Often managed internally or for change history.</td>
                </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">tooltipComponent</td>
                  <td className="px-6 py-4 font-mono text-purple-400">function</td>
                  <td className="px-6 py-4"><Badge color="gray">No</Badge></td>
                  <td className="px-6 py-4">Custom function returning a React Node to use as the tooltip just for this task.</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">extendedStyles</td>
                  <td className="px-6 py-4 font-mono text-purple-400">CSSProperties</td>
                  <td className="px-6 py-4"><Badge color="gray">No</Badge></td>
                  <td className="px-6 py-4">Inline styles applied directly to the task bar (e.g., override background color).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )
    },
    {
      id: 'scheduler-config',
      active: true,
      title: 'SchedulerConfig',
      content: (
        <>
          <p className="text-gray-400 mb-6">
            The `config` prop passed to the `Timeline` component controls global settings.
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
                  <td className="px-6 py-4">Array of task objects.</td>
                </tr>
                 <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">label</td>
                  <td className="px-6 py-4 font-mono text-purple-400">string</td>
                  <td className="px-6 py-4">The topic/title of the schedule (displayed in header).</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">resources</td>
                  <td className="px-6 py-4 font-mono text-purple-400">string[]</td>
                  <td className="px-6 py-4">
                    Optional list of group labels (`groupId`) to enforce a specific row order.
                  </td>
                </tr>
                 <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">startOffsetDays</td>
                  <td className="px-6 py-4 font-mono text-purple-400">number</td>
                  <td className="px-6 py-4">Days to add/subtract from the view start date (defaults to Today).</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">endOffsetDays</td>
                  <td className="px-6 py-4 font-mono text-purple-400">number</td>
                  <td className="px-6 py-4">Days to add/subtract from the view end date.</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">theme</td>
                  <td className="px-6 py-4 font-mono text-purple-400">ThemeConfig</td>
                  <td className="px-6 py-4">
                    A single theme object or a mode-based config object ({`{ mode: 'dark', dark: {...} }`}).
                  </td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">dragConfig</td>
                  <td className="px-6 py-4 font-mono text-purple-400">DragConfig</td>
                  <td className="px-6 py-4">Controls behavior for dragging and resizing tasks.</td>
                </tr>
                 <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">animationConfig</td>
                  <td className="px-6 py-4 font-mono text-purple-400">AnimationConfig</td>
                  <td className="px-6 py-4">Controls durations and easing for task animations.</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">disableToolbar</td>
                  <td className="px-6 py-4 font-mono text-purple-400">boolean</td>
                  <td className="px-6 py-4">If true, hides the top toolbar row.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )
    },
    {
      id: 'scheduler-theme',
      active: true,
      title: 'SchedulerTheme (Customization)',
      content: (
        <>
          <p className="text-gray-400 mb-6">
            Customize every aspect of the UI. Use these keys in your `theme` object.
          </p>
          <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-[#030712]">
            <table className="w-full text-left text-sm text-gray-400">
              <thead className="bg-[#111827] text-gray-200 uppercase font-medium text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4">Key</th>
                  <th className="px-6 py-4">Structure/Type</th>
                  <th className="px-6 py-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-white/5 transition-colors"><td className="px-6 py-4 font-mono text-blue-400">primary</td><td className="px-6 py-4 font-mono text-purple-400">string</td><td className="px-6 py-4">Primary accent color (buttons, active states).</td></tr>
                <tr className="hover:bg-white/5 transition-colors"><td className="px-6 py-4 font-mono text-blue-400">secondary</td><td className="px-6 py-4 font-mono text-purple-400">string</td><td className="px-6 py-4">Secondary accent color.</td></tr>
                <tr className="hover:bg-white/5 transition-colors"><td className="px-6 py-4 font-mono text-blue-400">border</td><td className="px-6 py-4 font-mono text-purple-400">string</td><td className="px-6 py-4">Global border color.</td></tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">background</td>
                  <td className="px-6 py-4 font-mono text-purple-400">{`{ primary, secondary }`}</td>
                  <td className="px-6 py-4">Main app backgrounds.</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">text</td>
                  <td className="px-6 py-4 font-mono text-purple-400">{`{ primary, secondary }`}</td>
                  <td className="px-6 py-4">Global text colors.</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">row</td>
                  <td className="px-6 py-4 font-mono text-purple-400">{`{ even, odd, hover }`}</td>
                  <td className="px-6 py-4">Timeline row backgrounds.</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">header</td>
                  <td className="px-6 py-4 font-mono text-purple-400">{`{ background, text }`}</td>
                  <td className="px-6 py-4">Top date header styles.</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">grid</td>
                  <td className="px-6 py-4 font-mono text-purple-400">{`{ color, currentDateLine }`}</td>
                  <td className="px-6 py-4">Vertical grid lines and the dashed "today" line.</td>
                </tr>
                 <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">task</td>
                  <td className="px-6 py-4 font-mono text-purple-400">{`{ even, odd, hover, text, border }`}</td>
                  <td className="px-6 py-4">Default styles for task bars.</td>
                </tr>
                 <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">toolbar</td>
                  <td className="px-6 py-4 font-mono text-purple-400">{`{ icon, background, text }`}</td>
                  <td className="px-6 py-4">Toolbar icons and button colors.</td>
                </tr>
                 <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">progressBar</td>
                  <td className="px-6 py-4 font-mono text-purple-400">{`{ background }`}</td>
                  <td className="px-6 py-4">Color of the progress indicator inside a task.</td>
                </tr>
                 <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">tooltip</td>
                  <td className="px-6 py-4 font-mono text-purple-400">{`{ background, text, border }`}</td>
                  <td className="px-6 py-4">Default tooltip styles.</td>
                </tr>
                 <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">resize</td>
                  <td className="px-6 py-4 font-mono text-purple-400">{`{ handleBackground, handleHoverBackground }`}</td>
                  <td className="px-6 py-4">Styles for the drag handles on tasks.</td>
                </tr>
                 <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">buttons</td>
                  <td className="px-6 py-4 font-mono text-purple-400">{`{ lock: {...}, today: {...} }`}</td>
                  <td className="px-6 py-4">
                    {`Styles for buttons. 'lock' and 'today' each accept { locked/active, unlocked/inactive } states with { background, color, border }.`}
                  </td>
                </tr>
                 <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">scrollbar</td>
                  <td className="px-6 py-4 font-mono text-purple-400">{`{ thumb, thumbHover, track }`}</td>
                  <td className="px-6 py-4">
                    Custom colors for the timeline scrollbar.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )
    },
    {
      id: 'tooltips',
      active: true,
      title: 'Tooltips',
      content: (
        <div className="bg-[#111827] rounded-xl border border-white/10 p-6 mb-6">
             <p className="text-gray-400 mb-4">
                The library supports fully custom tooltips. You can control the content by passing a component to the `tooltipComponent` prop, 
                and control the styling of the default wrapper via the theme.
             </p>

             <h3 className="text-lg font-medium text-white mb-3">1. Custom Content</h3>
             <p className="text-gray-400 mb-4 text-sm">
                Pass a functional component to `tooltipComponent` on the `Timeline`. This component receives the hovered `task` as a prop.
             </p>
             <div className="bg-black/30 rounded-lg p-4 font-mono text-sm text-gray-300 mb-6 border border-white/5">
                <div className="text-blue-400 mb-2">// Definition</div>
                <div className="mb-4">
{`const CustomTooltip = (task: SchedulerTask) => {
  return (
    <div>
      <b>{task.label}</b>
      <p>{task.startDate.toDateString()}</p>
    </div>
  );
};`}
                </div>
                <div className="text-blue-400 mb-2">// Usage</div>
                <div>
{`<Timeline
  tooltipComponent={CustomTooltip}
  config={{ ... }}
/>`}
                </div>
             </div>

             <h3 className="text-lg font-medium text-white mb-3">2. Theme Customization</h3>
             <p className="text-gray-400 mb-4 text-sm">
                You can style the default tooltip container (background, text color, border) using the `theme.tooltip` object. 
                This is especially useful for Dark Mode.
             </p>
             <div className="bg-black/30 rounded-lg p-4 font-mono text-sm text-gray-300 border border-white/5">
{`const theme = {
  tooltip: {
    background: "#1F2937", // Dark gray
    text: "#F3F4F6",       // Light text
    border: "#374151"      // Border color
  }
};`}
             </div>
          </div>
      )
    },
    {
      id: 'timeline-props',
      active: true,
      title: 'Timeline Props',
      content: (
        <>
          <p className="text-gray-400 mb-6">
            Props accepted by the main `&lt;Timeline /&gt;` component.
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
                  <td className="px-6 py-4">The core configuration object.</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">onRowExpand</td>
                  <td className="px-6 py-4 font-mono text-purple-400">function</td>
                  <td className="px-6 py-4"><Badge color="gray">No</Badge></td>
                  <td className="px-6 py-4">Callback for task expansion.</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">onRowShrink</td>
                  <td className="px-6 py-4 font-mono text-purple-400">function</td>
                  <td className="px-6 py-4"><Badge color="gray">No</Badge></td>
                  <td className="px-6 py-4">Callback for task shrinking.</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">onTaskClick</td>
                  <td className="px-6 py-4 font-mono text-purple-400">function</td>
                  <td className="px-6 py-4"><Badge color="gray">No</Badge></td>
                  <td className="px-6 py-4">Click handler for tasks.</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">onRowLabelClick</td>
                  <td className="px-6 py-4 font-mono text-purple-400">function</td>
                  <td className="px-6 py-4"><Badge color="gray">No</Badge></td>
                  <td className="px-6 py-4">Click handler for row labels.</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">tooltipComponent</td>
                  <td className="px-6 py-4 font-mono text-purple-400">function</td>
                  <td className="px-6 py-4"><Badge color="gray">No</Badge></td>
                  <td className="px-6 py-4">Global custom tooltip renderer.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )
    },
    {
      id: 'api-callbacks-events',
      active: true,
      title: 'API Reference: Callbacks',
      content: (

        <div className="space-y-8">
          <p className="text-gray-400">
            Detailing the interaction callbacks used for synchronizing your data.
          </p>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-xl border border-white/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 bg-[#0f1117] flex items-center justify-between">
                <code className="text-blue-400 font-bold">onRowExpand</code>
                <span className="text-xs text-gray-500 font-mono">Async function</span>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-gray-300 text-sm">
                  Triggered when a user <strong>drags</strong> a task edge outwards to increase its duration.
                </p>
                <div className="bg-black/30 rounded-lg p-4 font-mono text-xs text-gray-400 border border-white/5">
                  (groupLabel: string, groupId: string, task: SchedulerTask) =&gt; Promise&lt;void&gt;
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium mb-3">Parameters</h4>
                  <ul className="space-y-4">
                     <li className="flex gap-4">
                      <div className="w-24 shrink-0 font-mono text-xs text-purple-400">task</div>
                      <div className="text-sm text-gray-400">
                        <p className="mb-2">The <strong className="text-white">Updated Task Object</strong>.</p>
                        <p>This object matches the <a href="#1" className="text-blue-400 underline" onClick={(e) => {e.preventDefault(); document.getElementById('scheduler-task')?.scrollIntoView({behavior: 'smooth'})}}>SchedulerTask</a> structure exactly, but with:</p>
                        <ul className="list-disc list-inside mt-1 ml-1 text-gray-500">
                            <li><strong>startDate</strong>: The NEW start date (if dragged left).</li>
                            <li><strong>endDate</strong>: The NEW end date (if dragged right).</li>
                            <li>All other properties (`id`, `label`, etc.) remain unchanged.</li>
                        </ul>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-24 shrink-0 font-mono text-xs text-purple-400">groupLabel</div>
                      <div className="text-sm text-gray-400">The label of the row.</div>
                    </li>
                    <li className="flex gap-4">
                       <div className="w-24 shrink-0 font-mono text-xs text-purple-400">groupId</div>
                       <div className="text-sm text-gray-400">The ID of the row.</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-xl border border-white/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 bg-[#0f1117] flex items-center justify-between">
                <code className="text-blue-400 font-bold">onRowShrink</code>
                <span className="text-xs text-gray-500 font-mono">Async function</span>
              </div>
              <div className="p-6 space-y-4">
                 <p className="text-gray-300 text-sm">
                  Triggered when a user <strong>drags</strong> a task edge inwards to decrease its duration.
                </p>
                 <div className="bg-black/30 rounded-lg p-4 font-mono text-xs text-gray-400 border border-white/5">
                  (groupLabel: string, groupId: string, task: SchedulerTask) =&gt; Promise&lt;void&gt;
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium mb-3">Parameters</h4>
                   <ul className="space-y-4">
                     <li className="flex gap-4">
                      <div className="w-24 shrink-0 font-mono text-xs text-purple-400">task</div>
                      <div className="text-sm text-gray-400">
                        <p className="mb-2">The <strong className="text-white">Updated Task Object</strong>.</p>
                         <p>Matches the <a href="#1" className="text-blue-400 underline" onClick={(e) => {e.preventDefault(); document.getElementById('scheduler-task')?.scrollIntoView({behavior: 'smooth'})}}>SchedulerTask</a> structure with updated `startDate` and `endDate`.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-xl border border-white/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 bg-[#0f1117] flex items-center justify-between">
                <code className="text-blue-400 font-bold">onTaskClick</code>
                <span className="text-xs text-gray-500 font-mono">Sync function</span>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-gray-300 text-sm">
                  Triggered when a user <strong>clicks</strong> (left-click) on a task bar.
                </p>
                <div className="bg-black/30 rounded-lg p-4 font-mono text-xs text-gray-400 border border-white/5">
                  (task: SchedulerTask) =&gt; void
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-xl border border-white/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 bg-[#0f1117] flex items-center justify-between">
                <code className="text-blue-400 font-bold">onRowLabelClick</code>
                <span className="text-xs text-gray-500 font-mono">Sync function</span>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-gray-300 text-sm">
                  Triggered when a user <strong>clicks</strong> on the row label (resource name) in the left sidebar.
                </p>
                <div className="bg-black/30 rounded-lg p-4 font-mono text-xs text-gray-400 border border-white/5">
                  (groupLabel: string) =&gt; void
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-xl border border-white/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 bg-[#0f1117] flex items-center justify-between">
                <code className="text-blue-400 font-bold">Right Click (Context Menu)</code>
                <span className="text-xs text-gray-500 font-mono">Configuration</span>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-gray-300 text-sm">
                  Enable a right-click menu on tasks by passing the <code>rightClickOptions</code> prop to the Timeline.
                </p>
                <div className="bg-black/30 rounded-lg p-4 font-mono text-xs text-gray-400 border border-white/5">
                  <pre>{`rightClickOptions={[
  {
    id: "edit",
    label: "Edit Task",
    icon: <EditIcon />, // React Node
    onClick: (task) => console.log("Edit", task)
  },
  {
    id: "delete",
    label: "Delete",
    icon: <TrashIcon />,
    onClick: (task) => console.log("Delete", task),
    style: { color: "red" } // Custom style
  }
]}`}</pre>
                </div>
                <div>
                   <h4 className="text-white text-sm font-medium mb-3">Option Object Structure</h4>
                   <ul className="space-y-4 text-sm text-gray-400">
                     <li className="flex gap-4"><code className="w-20 text-purple-400 shrink-0">id</code> Unique string ID.</li>
                     <li className="flex gap-4"><code className="w-20 text-purple-400 shrink-0">label</code> Text to display (e.g. "Delete").</li>
                     <li className="flex gap-4"><code className="w-20 text-purple-400 shrink-0">icon</code> (Optional) React Node for the icon.</li>
                     <li className="flex gap-4"><code className="w-20 text-purple-400 shrink-0">onClick</code> (task: SchedulerTask) =&gt; void. Callback function.</li>
                   </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      )
    }
  ];

  const visibleSections = sections; 

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="prose prose-invert max-w-none">
        <h1 className="text-4xl font-bold text-white mb-2">Documentation</h1>
        <p className="text-gray-400 text-lg mb-10">
          A comprehensive guide to configuring and customizing the React Timeline Scheduler.
        </p>
        
        {/* Render sections dynamically with correct numbering */}
        {visibleSections.map((section, index) => section.active &&(
          <section key={section.id} id={section.id} className="mb-16 scroll-mt-24">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">
                {index + 1}
              </span> 
              {section.title}
            </h2>
            {section.content}
          </section>
        ))}
      </div>
    </div>
  );
};
