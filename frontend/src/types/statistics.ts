import type { TaskStatus } from "@/lib/types";

export const STATUS_COLORS: Record<TaskStatus, string> = {
    PLANNED: "oklch(0.55 0.15 195)",
    IN_PROGRESS: "oklch(0.72 0.14 55)",
    BLOCKED: "oklch(0.577 0.245 27.325)",
    REVIEW: "oklch(0.50 0.12 260)",
    DONE: "oklch(0.60 0.16 150)",
};

export const STATUS_LABELS: Record<TaskStatus, string> = {
    PLANNED: "Planificat",
    IN_PROGRESS: "In Progres",
    BLOCKED: "Blocat",
    REVIEW: "In Revizuire",
    DONE: "Finalizat",
};

export const HOURS_STATUS_COLORS = [
    { name: "Aprobate", color: "oklch(0.60 0.16 150)" },
    { name: "In Asteptare", color: "oklch(0.72 0.14 55)" },
    { name: "Respinse", color: "oklch(0.577 0.245 27.325)" },
];

export interface TopVolunteer {
    name: string;
    ore: number;
    taskuri: number;
}

export interface ChartTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
}