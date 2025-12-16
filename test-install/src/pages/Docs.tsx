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
      id: 'timeline-props',
      active: true,
      title: 'Timeline Props',
      content: (
        <>
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
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">onRowExpand</td>
                  <td className="px-6 py-4 font-mono text-purple-400">function</td>
                  <td className="px-6 py-4"><Badge color="gray">No</Badge></td>
                  <td className="px-6 py-4">Async callback when a task duration increases. See <a href="#api-callbacks-events" className="text-blue-400 hover:underline">API & Callbacks</a>.</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-blue-400">onRowShrink</td>
                  <td className="px-6 py-4 font-mono text-purple-400">function</td>
                  <td className="px-6 py-4"><Badge color="gray">No</Badge></td>
                  <td className="px-6 py-4">Async callback when a task duration decreases. See <a href="#api-callbacks-events" className="text-blue-400 hover:underline">API & Callbacks</a>.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )
    },
    {
      id: 'scheduler-task',
      active: true,
      title: 'SchedulerTask',
      content: (
        <>
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
        </>
      )
    },
    {
      id: 'scheduler-theme',
      active: true,
      title: 'SchedulerTheme',
      content: (
        <>
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
        </>
      )
    },
    {
      id: 'tooltip',
      active: false,
      title: 'Tooltip',
      content: (
        <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-[#030712] p-4 text-sm text-gray-300">
          <h3 className="text-white font-medium mb-2">Default behavior</h3>
          <p className="mb-3 text-gray-400">By default, the library will render the task's tooltip content and automatically position it relative to the mouse. It uses `pointer-events: none` to avoid interfering with mouse events and animates in using `framer-motion`.</p>

          <h3 className="text-white font-medium mb-2">Customization</h3>
          <p className="mb-2 text-gray-400">You can customize tooltip content in two ways:</p>
          <ol className="list-decimal list-inside mb-3 text-gray-400">
            <li>Provide a `tooltipComponent` function on the `Timeline` config to render a global custom tooltip for all tasks.</li>
            <li>Provide a `tooltipComponent` on an individual `SchedulerTask` to override the tooltip for that task.</li>
          </ol>

          <div className="bg-[#0b1220] p-3 rounded border border-white/5 font-mono text-xs text-gray-300 mb-3">
            <div className="mb-2 text-yellow-300">Example: global tooltip via `config`</div>
            <pre className="whitespace-pre-wrap">
              {`<Timeline
  config={{
    data: tasks,
    tooltipComponent: (task) => (
      <div className="p-2">
        <div className="font-semibold">${"${task.label}"}</div>
        <div className="text-xs text-gray-400">Custom details here</div>
      </div>
    )
  }}
/>`}
            </pre>
          </div>

          <div className="bg-[#0b1220] p-3 rounded border border-white/5 font-mono text-xs text-gray-300">
            <div className="mb-2 text-yellow-300">Example: per-task tooltip</div>
            <pre className="whitespace-pre-wrap">
              {`const tasks = [{
  id: '1',
  label: 'Requirement Analysis',
  groupLabel: 'Product',
  groupId: 'product',
  startDate: new Date(),
  endDate: new Date(),
  tooltipComponent: (task) => (
    <div className="p-2">
      <div className="font-semibold">Custom for {task.label}</div>
      <div className="text-xs text-gray-400">Additional per-task info</div>
    </div>
  )
}];`}
            </pre>
          </div>

          <p className="mt-3 text-gray-400">Styling: the tooltip uses the library's theme colors by default but you can provide any JSX for your tooltip content and style it with Tailwind or inline styles.</p>
        </div>
      )
    },
    {
      id: 'drag-resize-expand-shrink',
      active: true,
      title: 'Drag / Resize / Expand & Shrink',
      content: (
        <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-[#030712] p-4 text-sm text-gray-300">
          <p className="mb-3 text-gray-400">Tasks support resizing by dragging the left or right edge. You can configure which handles are available using the `dragConfig` and respond to size changes with callbacks.</p>

          <h3 className="text-white font-medium mb-2">DragConfig</h3>
          <ul className="text-gray-400 list-disc list-inside mb-3">
            <li><strong>enableLeftResize</strong>: boolean — show left handle.</li>
            <li><strong>enableRightResize</strong>: boolean — show right handle.</li>
            <li><strong>autoScroll</strong>: object — when dragging near viewport edges, auto-scrolls. Contains <em>enabled</em>, <em>edgeZone</em> (px), and <em>maxSpeed</em> (px/frame).</li>
            <li><strong>snapToGrid</strong>: boolean — snap resize to cell grid when calculating days changed.</li>
            <li><strong>minTaskDuration</strong>: number — minimum duration (days) a task can be resized to.</li>
          </ul>

          <h3 className="text-white font-medium mb-2">Expand / Shrink callbacks</h3>
          <p className="text-gray-400 mb-3">When a resize results in a change of start/end dates, the library will call the optional callbacks passed via `Timeline` props:</p>
          <ul className="text-gray-400 list-disc list-inside mb-3">
            <li><strong>onRowExpand(groupLabel, groupId, updatedTask)</strong> — called when the task is expanded (duration increases).</li>
            <li><strong>onRowShrink(groupLabel, groupId, updatedTask)</strong> — called when the task shrinks (duration decreases).</li>
          </ul>
        </div>
      )
    },
    {
      id: 'context-menu',
      active: true,
      title: 'Context Menu (Right Click)',
      content: (
        <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-[#030712] p-4 text-sm text-gray-300">
          <p className="mb-3 text-gray-400">Right-clicking a task will open a contextual menu if you provide `rightClickOptions` to the `Timeline` component. Each option is an object with <em>icon</em>, <em>label</em>, and <em>onAction</em>(task) callback.</p>
          <p className="text-gray-400">The menu position is also calculated using the current mouse coordinates so it appears next to the cursor.</p>
        </div>
      )
    },
    {
      id: 'toolbar-header',
      active: true,
      title: 'Toolbar & Header',
      content: (
        <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-[#030712] p-4 text-sm text-gray-300">
          <p className="mb-3 text-gray-400">The header contains the timeline dates, month label and optional toolbar icons (lock, go-to-today). You can hide the toolbar with `disableToolbar`.</p>
          <p className="mb-3 text-gray-400">Toolbar icons show small header tooltips and are themed using the `theme.toolbar` properties.</p>
        </div>
      )
    },
    {
      id: 'grouping-rows',
      active: true,
      title: 'Grouping & Rows',
      content: (
        <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-[#030712] p-4 text-sm text-gray-300">
          <p className="mb-3 text-gray-400">Tasks are grouped by `groupLabel` and `groupId`. Use the optional `resources` array on `config` to define fixed row ordering. Rows can be expanded or collapsed via callbacks used with the resize behavior.</p>
        </div>
      )
    },
    {
      id: 'api-callbacks-events',
      active: true,
      title: 'API, Callbacks & Events',
      content: (

        <div className="space-y-8">
          <p className="text-gray-400">
            The Timeline component exposes several callbacks to handle user interactions and state changes. These are critical for syncing changes back to your backend (e.g., when a task is resized).
          </p>

          <div className="space-y-6">
            <div className="bg-[#111827] rounded-xl border border-white/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 bg-[#0f1117] flex items-center justify-between">
                <code className="text-blue-400 font-bold">onRowExpand</code>
                <span className="text-xs text-gray-500 font-mono">Async Prop</span>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-gray-300 text-sm">
                  Called when a task's duration is <strong>increased</strong> (start date moved earlier or end date moved later) via the resize handles.
                </p>
                <div className="bg-black/30 rounded-lg p-4 font-mono text-xs text-gray-400 border border-white/5">
                  (groupLabel: string, groupId: string, task: SchedulerTask) =&gt; Promise&lt;void&gt;
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium mb-3">Parameters</h4>
                  <ul className="space-y-3">
                    <li className="flex gap-4">
                      <code className="text-purple-400 text-xs mt-1 shrink-0">groupLabel</code>
                      <span className="text-gray-400 text-sm">The label of the row/group where the task resides (e.g., "Project A").</span>
                    </li>
                    <li className="flex gap-4">
                      <code className="text-purple-400 text-xs mt-1 shrink-0">groupId</code>
                      <span className="text-gray-400 text-sm">The unique ID of the row/group.</span>
                    </li>
                    <li className="flex gap-4">
                      <code className="text-purple-400 text-xs mt-1 shrink-0">task</code>
                      <span className="text-gray-400 text-sm">The <strong>updated</strong> task object containing the new <code>startDate</code> and <code>endDate</code>. Use this to update your state/DB.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-xl border border-white/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 bg-[#0f1117] flex items-center justify-between">
                <code className="text-blue-400 font-bold">onRowShrink</code>
                <span className="text-xs text-gray-500 font-mono">Async Prop</span>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-gray-300 text-sm">
                  Called when a task's duration is <strong>decreased</strong> (start date moved later or end date moved earlier) via the resize handles.
                </p>
                <div className="bg-black/30 rounded-lg p-4 font-mono text-xs text-gray-400 border border-white/5">
                  (groupLabel: string, groupId: string, task: SchedulerTask) =&gt; Promise&lt;void&gt;
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium mb-3">Parameters</h4>
                  <ul className="space-y-3">
                    <li className="flex gap-4">
                      <code className="text-purple-400 text-xs mt-1 shrink-0">groupLabel</code>
                      <span className="text-gray-400 text-sm">The label of the row/group where the task resides.</span>
                    </li>
                    <li className="flex gap-4">
                      <code className="text-purple-400 text-xs mt-1 shrink-0">groupId</code>
                      <span className="text-gray-400 text-sm">The unique ID of the row/group.</span>
                    </li>
                    <li className="flex gap-4">
                      <code className="text-purple-400 text-xs mt-1 shrink-0">task</code>
                      <span className="text-gray-400 text-sm">The <strong>updated</strong> task object with the new condensed date range.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-xl border border-white/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 bg-[#0f1117] flex items-center justify-between">
                <code className="text-blue-400 font-bold">onTaskClick</code>
                <span className="text-xs text-gray-500 font-mono">Prop</span>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-gray-300 text-sm">
                  Fired when a user clicks on the body of a task bar. Useful for opening a detailed view or modal.
                </p>
                <div className="bg-black/30 rounded-lg p-4 font-mono text-xs text-gray-400 border border-white/5">
                  (task: SchedulerTask) =&gt; void
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium mb-3">Parameters</h4>
                  <ul className="space-y-3">
                    <li className="flex gap-4">
                      <code className="text-purple-400 text-xs mt-1 shrink-0">task</code>
                      <span className="text-gray-400 text-sm">The task object that was clicked.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#111827] rounded-xl border border-white/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 bg-[#0f1117] flex items-center justify-between">
                <code className="text-blue-400 font-bold">onRowLabelClick</code>
                <span className="text-xs text-gray-500 font-mono">Prop</span>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-gray-300 text-sm">
                  Fired when a user clicks on the text label of a row (the resource name on the left).
                </p>
                <div className="bg-black/30 rounded-lg p-4 font-mono text-xs text-gray-400 border border-white/5">
                  (groupLabel: string) =&gt; void
                </div>
              </div>
            </div>

          </div>
        </div>
      )
    },
    {
      id: 'styling-theming-tips',
      active: true,
      title: 'Styling & Theming Tips',
      content: (
        <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-[#030712] p-4 text-sm text-gray-300">
          <p className="text-gray-400 mb-3">The library provides a `theme` object to fully customize colors. For small customizations you can also pass `extendedStyles` on each `SchedulerTask` to override background/border and other CSS properties.</p>
          <p className="text-gray-400">Tooltips accept arbitrary JSX so you can style them with Tailwind or inline styles. If you need the tooltip to behave differently (for example prefer above/left), you can provide your own `Tooltip` component by forking the atom or overriding the `tooltipComponent` return node content.</p>
        </div>
      )
    }
  ];

  // Filter out sections you don't want to show (optional)
  // Example: To hide a section, simply remove it from the array or comment it out
  const visibleSections = sections; // Use this if you want all sections
  // const visibleSections = sections.filter(section => section.id !== 'tooltip'); // Example: Hide tooltip section

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="prose prose-invert max-w-none">
        <h1 className="text-4xl font-bold text-white mb-2">Documentation</h1>
        <p className="text-gray-400 text-lg mb-10">
          A comprehensive guide to configuring and customizing the React Timeline Scheduler.
        </p>
        
        {/* Render sections dynamically with correct numbering */}
        {visibleSections.map((section, index) => section.active &&(
          <section key={section.id} className="mb-16">
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-500">{(index + 1).toString().padStart(2, '0')}.</span> {section.title}
            </h2>
            {section.content}
          </section>
        ))}
      </div>
    </div>
  );
};
