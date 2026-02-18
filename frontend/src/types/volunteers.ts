import type { User } from "@/lib/types";

export interface VolunteersSummary {
    totalVolunteers: number;
    totalHours: number;
    totalTasks: number;
    totalDepartments: number;
}

export const SORT_OPTIONS = [
    { value: "name", label: "Nume" },
    { value: "hours", label: "Ore" },
    { value: "tasks", label: "Task-uri" },
    { value: "joinDate", label: "Data Inscrierii" },
] as const;

export type SortBy = typeof SORT_OPTIONS[number]["value"];

export function calculateSummary(volunteers: User[]): VolunteersSummary {
    return {
        totalVolunteers: volunteers.length,
        totalHours: volunteers.reduce((s, v) => s + v.totalHours, 0),
        totalTasks: volunteers.reduce((s, v) => s + v.tasksCompleted, 0),
        totalDepartments: new Set(volunteers.map((v) => v.department).filter(Boolean)).size,
    };
}

export function getInitials(name: string): string {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase();
}

export function formatJoinDate(date: string): string {
    return new Date(date).toLocaleDateString("ro-RO", {
        month: "short",
        year: "numeric",
    });
}

export function formatFullJoinDate(date: string): string {
    return new Date(date).toLocaleDateString("ro-RO", {
        month: "long",
        year: "numeric",
    });
}