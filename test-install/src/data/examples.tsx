import type { SchedulerTask } from 'react-timeline-scheduler';

export interface ExampleConfig {
  id: string;
  title: string;
  description: string;
  tasks: SchedulerTask[];
  theme?: any; // Using any for flexibility in this demo, strict types in real app
  customConfig?: any;
}

const generateDates = (offset: number, days: number) => {
    const start = new Date();
    start.setDate(start.getDate() + offset);
    const end = new Date(start);
    end.setDate(end.getDate() + days);
    return { start, end };
};

const basicTasks: SchedulerTask[] = [
    {
        id: "t1",
        label: "Requirement Analysis",
        groupLabel: "Product",
        groupId: "g1",
        startDate: generateDates(0, 5).start,
        endDate: generateDates(0, 5).end,
        tooltipComponent: (task) => (
            <div style={{ padding: "8px", background: "#333", color: "white", borderRadius: "4px" }}>
                <strong>{task.label}</strong>
                <div>Custom Tooltip Node</div>
            </div>
        )
    },
    {
        id: "t2",
        label: "Design Phase",
        groupLabel: "Design",
        groupId: "g2",
        startDate: generateDates(3, 4).start,
        endDate: generateDates(3, 4).end,
    },
    {
        id: "t3",
        label: "Development",
        groupLabel: "Engineering",
        groupId: "g3",
        startDate: generateDates(6, 10).start,
        endDate: generateDates(6, 10).end,
    }
];

const colorfulTasks: SchedulerTask[] = [
    {
        id: "c1",
        label: "Marketing Campaign",
        groupLabel: "Marketing",
        groupId: "m1",
        startDate: generateDates(1, 4).start,
        endDate: generateDates(1, 4).end,
        variant: "success" // Assuming variant support or custom style handling
    },
    {
        id: "c2",
        label: "Sales Outreach",
        groupLabel: "Sales",
        groupId: "s1",
        startDate: generateDates(2, 6).start,
        endDate: generateDates(2, 6).end,
        variant: "warning"
    },
    {
        id: "c3",
        label: "Client Meeting",
        groupLabel: "Sales",
        groupId: "s1",
        startDate: generateDates(8, 2).start,
        endDate: generateDates(8, 2).end,
        variant: "error",
        // Demo custom tooltip
        tooltipComponent: (task) => (
             <div className="p-2 bg-white text-black rounded shadow-lg border border-gray-200">
                 <p className="font-bold">{task.label}</p>
                 <p className="text-xs text-gray-500">Custom Tooltip Demo</p>
                 <p className="text-xs text-blue-500">{task.startDate.toLocaleDateString()}</p>
             </div>
        )
    }
];

export const examples: ExampleConfig[] = [
    {
        id: "basic",
        title: "Basic Usage",
        description: "Standard timeline with default grouping and styling.",
        tasks: basicTasks,
    },
    {
        id: "dark-mode",
        title: "Dark Theme",
        description: "Full dark mode integration suitable for modern dashboards.",
        tasks: basicTasks,
        theme: {
             primary: "#6366f1",
             background: { primary: "#0B0E14", secondary: "#151921" }, // Deep dark background
             text: { primary: "#E2E8F0", secondary: "#94A3B8" },
             row: { even: "#0B0E14", odd: "#151921", hover: "#1E293B" },
             grid: { color: "#1E293B", currentDateLine: "#6366f1" },
             header: { background: "#0F172A", text: "#F1F5F9" }, // Dark header
             border: "#1E293B",
             disableToolbar: false,
             // toolbar: { background: "#0F172A", text: "#F1F5F9", icon: "#F1F5F9"}, // Commented out to test default theme fallback
             task: { even: "#3B82F6", odd: "#2563EB", hover: "#1D4ED8", text: "#FFFFFF", border: "transparent" }
        }
    },
    {
        id: "colorful",
        title: "Colorful Tasks",
        description: "Using task variants to differentiate categories.",
        tasks: colorfulTasks,
        theme: {
            primary: "#10b981", // Green theme
        }
    }
];
