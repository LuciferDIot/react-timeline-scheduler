import type { SchedulerConfig, SchedulerTask, SchedulerTheme } from "../../../dist";


export interface ExampleConfig {
  id: string;
  title: string;
  description: string;
  tasks: SchedulerTask[];
  theme?: Partial<SchedulerTheme>;
  customConfig?: Partial<SchedulerConfig>;
}

const generateDates = (offset: number, days: number) => {
    const start = new Date();
    start.setDate(start.getDate() + offset);
    const end = new Date(start);
    end.setDate(end.getDate() + days);
    return { start, end };
};

// BASIC EXAMPLE - Separate dataset with more rows and tasks
export const basicTasks: SchedulerTask[] = [
    { id: "b1", label: "Project Kickoff", groupLabel: "Planning", groupId: "g1", startDate: generateDates(0, 3).start, endDate: generateDates(0, 3).end, prevEndDate: generateDates(0, 2).end },
    { id: "b2", label: "Requirements Gathering", groupLabel: "Planning", groupId: "g1", startDate: generateDates(3, 5).start, endDate: generateDates(3, 5).end },
    { id: "b3", label: "Wireframe Design", groupLabel: "Design", groupId: "g2", startDate: generateDates(5, 4).start, endDate: generateDates(5, 4).end },
    { id: "b4", label: "UI Mockups", groupLabel: "Design", groupId: "g2", startDate: generateDates(9, 6).start, endDate: generateDates(9, 6).end, prevEndDate: generateDates(9, 4).end },
    { id: "b5", label: "Design Review", groupLabel: "Design", groupId: "g2", startDate: generateDates(15, 2).start, endDate: generateDates(15, 2).end },
    { id: "b6", label: "Backend Setup", groupLabel: "Engineering", groupId: "g3", startDate: generateDates(8, 7).start, endDate: generateDates(8, 7).end },
    { id: "b7", label: "API Development", groupLabel: "Engineering", groupId: "g3", startDate: generateDates(15, 10).start, endDate: generateDates(15, 10).end },
    { id: "b8", label: "Frontend Development", groupLabel: "Engineering", groupId: "g3", startDate: generateDates(17, 12).start, endDate: generateDates(17, 12).end, prevEndDate: generateDates(17, 10).end },
    { id: "b9", label: "Integration Testing", groupLabel: "QA", groupId: "g4", startDate: generateDates(25, 5).start, endDate: generateDates(25, 5).end },
    { id: "b10", label: "Bug Fixes", groupLabel: "QA", groupId: "g4", startDate: generateDates(30, 4).start, endDate: generateDates(30, 4).end },
    { id: "b11", label: "Performance Testing", groupLabel: "QA", groupId: "g4", startDate: generateDates(34, 3).start, endDate: generateDates(34, 3).end },
    { id: "b12", label: "Security Audit", groupLabel: "Security", groupId: "g5", startDate: generateDates(32, 5).start, endDate: generateDates(32, 5).end },
    { id: "b13", label: "Deployment Prep", groupLabel: "DevOps", groupId: "g6", startDate: generateDates(37, 3).start, endDate: generateDates(37, 3).end },
    { id: "b14", label: "Staging Deploy", groupLabel: "DevOps", groupId: "g6", startDate: generateDates(40, 2).start, endDate: generateDates(40, 2).end, prevEndDate: generateDates(40, 1).end },
    { id: "b15", label: "Production Deploy", groupLabel: "DevOps", groupId: "g6", startDate: generateDates(42, 1).start, endDate: generateDates(42, 1).end },
    { id: "b16", label: "Documentation", groupLabel: "Documentation", groupId: "g7", startDate: generateDates(25, 10).start, endDate: generateDates(25, 10).end },
    { id: "b17", label: "User Training", groupLabel: "Training", groupId: "g8", startDate: generateDates(38, 5).start, endDate: generateDates(38, 5).end },
    { id: "b18", label: "Beta Testing", groupLabel: "Testing", groupId: "g9", startDate: generateDates(35, 7).start, endDate: generateDates(35, 7).end },
    { id: "b19", label: "Marketing Campaign", groupLabel: "Marketing", groupId: "g10", startDate: generateDates(30, 15).start, endDate: generateDates(30, 15).end },
    { id: "b20", label: "Launch Event", groupLabel: "Marketing", groupId: "g10", startDate: generateDates(43, 2).start, endDate: generateDates(43, 2).end },
];

// DARK MODE EXAMPLE - Separate dataset
export const darkTasks: SchedulerTask[] = [
    { id: "d1", label: "Research Phase", groupLabel: "Research", groupId: "dr1", startDate: generateDates(0, 6).start, endDate: generateDates(0, 6).end, prevEndDate: generateDates(0, 4).end },
    { id: "d2", label: "Competitive Analysis", groupLabel: "Research", groupId: "dr1", startDate: generateDates(4, 5).start, endDate: generateDates(4, 5).end, prevEndDate: generateDates(4, 3).end },
    { id: "d3", label: "User Interviews", groupLabel: "Research", groupId: "dr1", startDate: generateDates(9, 7).start, endDate: generateDates(9, 7).end },
    { id: "d4", label: "Concept Design", groupLabel: "Design", groupId: "dd1", startDate: generateDates(10, 8).start, endDate: generateDates(10, 8).end },
    { id: "d5", label: "Prototyping", groupLabel: "Design", groupId: "dd1", startDate: generateDates(18, 6).start, endDate: generateDates(18, 6).end },
    { id: "d6", label: "User Testing", groupLabel: "Design", groupId: "dd1", startDate: generateDates(24, 4).start, endDate: generateDates(24, 4).end, prevEndDate: generateDates(24, 3).end },
    { id: "d7", label: "Architecture Planning", groupLabel: "Architecture", groupId: "da1", startDate: generateDates(15, 5).start, endDate: generateDates(15, 5).end },
    { id: "d8", label: "Database Design", groupLabel: "Architecture", groupId: "da1", startDate: generateDates(20, 4).start, endDate: generateDates(20, 4).end },
    { id: "d9", label: "API Design", groupLabel: "Architecture", groupId: "da1", startDate: generateDates(24, 6).start, endDate: generateDates(24, 6).end },
    { id: "d10", label: "Core Development", groupLabel: "Development", groupId: "de1", startDate: generateDates(25, 12).start, endDate: generateDates(25, 12).end, prevEndDate: generateDates(25, 10).end },
    { id: "d11", label: "Feature Implementation", groupLabel: "Development", groupId: "de1", startDate: generateDates(30, 10).start, endDate: generateDates(30, 10).end },
    { id: "d12", label: "Code Review", groupLabel: "Development", groupId: "de1", startDate: generateDates(35, 5).start, endDate: generateDates(35, 5).end },
    { id: "d13", label: "Unit Testing", groupLabel: "Testing", groupId: "dt1", startDate: generateDates(32, 6).start, endDate: generateDates(32, 6).end },
    { id: "d14", label: "Integration Tests", groupLabel: "Testing", groupId: "dt1", startDate: generateDates(38, 5).start, endDate: generateDates(38, 5).end },
    { id: "d15", label: "E2E Testing", groupLabel: "Testing", groupId: "dt1", startDate: generateDates(43, 4).start, endDate: generateDates(43, 4).end, prevEndDate: generateDates(43, 3).end },
    { id: "d16", label: "Infrastructure Setup", groupLabel: "Infrastructure", groupId: "di1", startDate: generateDates(20, 8).start, endDate: generateDates(20, 8).end },
    { id: "d17", label: "CI/CD Pipeline", groupLabel: "Infrastructure", groupId: "di1", startDate: generateDates(28, 5).start, endDate: generateDates(28, 5).end },
    { id: "d18", label: "Monitoring Setup", groupLabel: "Infrastructure", groupId: "di1", startDate: generateDates(40, 4).start, endDate: generateDates(40, 4).end },
    { id: "d19", label: "Analytics Integration", groupLabel: "Analytics", groupId: "dn1", startDate: generateDates(35, 6).start, endDate: generateDates(35, 6).end },
    { id: "d20", label: "Performance Monitoring", groupLabel: "Analytics", groupId: "dn1", startDate: generateDates(41, 5).start, endDate: generateDates(41, 5).end },
];

// COLORFUL TASKS - Each task has UNIQUE vibrant rainbow colors
export const colorfulTasks: SchedulerTask[] = [
    {
        id: "c1", label: "Marketing Launch", groupLabel: "Marketing", groupId: "cm1",
        startDate: generateDates(1, 8).start, endDate: generateDates(1, 8).end, prevEndDate: generateDates(1, 5).end,
        bgColor: "#10b981", borderColor: "#059669",
        extendedStyles: { backgroundColor: "#d1fae5", borderColor: "#6ee7b7" }
    },
    {
        id: "c2", label: "Social Media Campaign", groupLabel: "Marketing", groupId: "cm1",
        startDate: generateDates(9, 12).start, endDate: generateDates(9, 12).end, prevEndDate: generateDates(9, 8).end,
        bgColor: "#f59e0b", borderColor: "#d97706",
        extendedStyles: { backgroundColor: "#fef3c7", borderColor: "#fcd34d" }
    },
    {
        id: "c3", label: "Email Campaign", groupLabel: "Marketing", groupId: "cm1",
        startDate: generateDates(15, 10).start, endDate: generateDates(15, 10).end,
        bgColor: "#ef4444", borderColor: "#dc2626",
        extendedStyles: { backgroundColor: "#fee2e2", borderColor: "#fca5a5" }
    },
    {
        id: "c4", label: "Product Design", groupLabel: "Product", groupId: "cp1",
        startDate: generateDates(5, 9).start, endDate: generateDates(5, 9).end, prevEndDate: generateDates(5, 6).end,
        bgColor: "#8b5cf6", borderColor: "#7c3aed",
        extendedStyles: { backgroundColor: "#ede9fe", borderColor: "#c4b5fd" }
    },
    {
        id: "c5", label: "Feature Planning", groupLabel: "Product", groupId: "cp1",
        startDate: generateDates(14, 11).start, endDate: generateDates(14, 11).end,
        bgColor: "#3b82f6", borderColor: "#2563eb",
        extendedStyles: { backgroundColor: "#dbeafe", borderColor: "#93c5fd" }
    },
    {
        id: "c6", label: "User Research", groupLabel: "Product", groupId: "cp1",
        startDate: generateDates(25, 7).start, endDate: generateDates(25, 7).end,
        bgColor: "#ec4899", borderColor: "#db2777",
        extendedStyles: { backgroundColor: "#fce7f3", borderColor: "#f9a8d4" }
    },
    {
        id: "c7", label: "Sales Kickoff", groupLabel: "Sales", groupId: "cs1",
        startDate: generateDates(2, 6).start, endDate: generateDates(2, 6).end, prevEndDate: generateDates(2, 4).end,
        bgColor: "#6366f1", borderColor: "#4f46e5",
        extendedStyles: { backgroundColor: "#e0e7ff", borderColor: "#a5b4fc" }
    },
    {
        id: "c8", label: "Client Outreach", groupLabel: "Sales", groupId: "cs1",
        startDate: generateDates(8, 15).start, endDate: generateDates(8, 15).end,
        bgColor: "#06b6d4", borderColor: "#0891b2",
        extendedStyles: { backgroundColor: "#cffafe", borderColor: "#67e8f9" }
    },
    {
        id: "c9", label: "Partnership Deals", groupLabel: "Sales", groupId: "cs1",
        startDate: generateDates(23, 10).start, endDate: generateDates(23, 10).end,
        bgColor: "#f97316", borderColor: "#ea580c",
        extendedStyles: { backgroundColor: "#ffedd5", borderColor: "#fdba74" }
    },
    {
        id: "c10", label: "Frontend Sprint 1", groupLabel: "Engineering", groupId: "ce1",
        startDate: generateDates(10, 8).start, endDate: generateDates(10, 8).end, prevEndDate: generateDates(10, 5).end,
        bgColor: "#84cc16", borderColor: "#65a30d",
        extendedStyles: { backgroundColor: "#ecfccb", borderColor: "#bef264" }
    },
    {
        id: "c11", label: "Backend Sprint 1", groupLabel: "Engineering", groupId: "ce1",
        startDate: generateDates(11, 9).start, endDate: generateDates(11, 9).end,
        bgColor: "#14b8a6", borderColor: "#0d9488",
        extendedStyles: { backgroundColor: "#ccfbf1", borderColor: "#5eead4" }
    },
    {
        id: "c12", label: "Mobile Development", groupLabel: "Engineering", groupId: "ce1",
        startDate: generateDates(20, 12).start, endDate: generateDates(20, 12).end,
        bgColor: "#a855f7", borderColor: "#9333ea",
        extendedStyles: { backgroundColor: "#f3e8ff", borderColor: "#d8b4fe" }
    },
    {
        id: "c13", label: "QA Sprint 1", groupLabel: "Quality", groupId: "cq1",
        startDate: generateDates(18, 6).start, endDate: generateDates(18, 6).end, prevEndDate: generateDates(18, 4).end,
        bgColor: "#f43f5e", borderColor: "#e11d48",
        extendedStyles: { backgroundColor: "#ffe4e6", borderColor: "#fda4af" }
    },
    {
        id: "c14", label: "Automation Tests", groupLabel: "Quality", groupId: "cq1",
        startDate: generateDates(24, 8).start, endDate: generateDates(24, 8).end,
        bgColor: "#0ea5e9", borderColor: "#0284c7",
        extendedStyles: { backgroundColor: "#e0f2fe", borderColor: "#7dd3fc" }
    },
    {
        id: "c15", label: "Security Testing", groupLabel: "Quality", groupId: "cq1",
        startDate: generateDates(32, 5).start, endDate: generateDates(32, 5).end,
        bgColor: "#eab308", borderColor: "#ca8a04",
        extendedStyles: { backgroundColor: "#fef9c3", borderColor: "#fde047" }
    },
    {
        id: "c16", label: "Infrastructure Audit", groupLabel: "DevOps", groupId: "cd1",
        startDate: generateDates(15, 7).start, endDate: generateDates(15, 7).end, prevEndDate: generateDates(15, 5).end,
        bgColor: "#22c55e", borderColor: "#16a34a",
        extendedStyles: { backgroundColor: "#dcfce7", borderColor: "#86efac" }
    },
    {
        id: "c17", label: "Cloud Migration", groupLabel: "DevOps", groupId: "cd1",
        startDate: generateDates(22, 11).start, endDate: generateDates(22, 11).end,
        bgColor: "#fb923c", borderColor: "#f97316",
        extendedStyles: { backgroundColor: "#fed7aa", borderColor: "#fbbf24" }
    },
    {
        id: "c18", label: "Monitoring Setup", groupLabel: "DevOps", groupId: "cd1",
        startDate: generateDates(33, 6).start, endDate: generateDates(33, 6).end,
        bgColor: "#a78bfa", borderColor: "#8b5cf6",
        extendedStyles: { backgroundColor: "#e9d5ff", borderColor: "#c084fc" }
    },
    {
        id: "c19", label: "Content Creation", groupLabel: "Content", groupId: "cc1",
        startDate: generateDates(5, 14).start, endDate: generateDates(5, 14).end,
        bgColor: "#fb7185", borderColor: "#f43f5e",
        extendedStyles: { backgroundColor: "#fecdd3", borderColor: "#fda4af" }
    },
    {
        id: "c20", label: "SEO Optimization", groupLabel: "Content", groupId: "cc1",
        startDate: generateDates(19, 9).start, endDate: generateDates(19, 9).end, prevEndDate: generateDates(19, 6).end,
        bgColor: "#38bdf8", borderColor: "#0ea5e9",
        extendedStyles: { backgroundColor: "#bae6fd", borderColor: "#7dd3fc" }
    },
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
        tasks: darkTasks,
        theme: {
             primary: "#6366f1",
             background: { primary: "#0B0E14", secondary: "#151921" },
             text: { primary: "#E2E8F0", secondary: "#94A3B8" },
             row: { even: "#0B0E14", odd: "#151921", hover: "#1E293B" },
             grid: { color: "#1E293B", currentDateLine: "#6366f1" },
             header: { background: "#0F172A", text: "#F1F5F9" },
             border: "#1E293B",
             task: { even: "#3B82F6", odd: "#2563EB", hover: "#1D4ED8", text: "#FFFFFF", border: "transparent" },
             buttons: {
                 lock: {
                     unlocked: {
                         background: "transparent",
                         color: "#94A3B8", // secondary text color
                         border: "transparent"
                     },
                     locked: {
                         background: "#6366f1",
                         color: "#FFFFFF",
                         border: "transparent"
                     }
                 }
             }
        }
    },
    {
        id: "colorful",
        title: "Colorful Tasks",
        description: "Each task has unique custom colors for maximum visual distinction.",
        tasks: colorfulTasks,
        theme: {
            primary: "#6366f1",
            buttons: {
                lock: {
                    locked: { background: "#ec4899", color: "#ffffff", border: "#db2777" }, // Pink
                    unlocked: { background: "#fdf2f8", color: "#db2777", border: "#fbcfe8" } // Light pink
                }
            }
        }
    }
];
