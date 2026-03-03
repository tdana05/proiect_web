import type { Task, TaskStatus } from "@/lib/types";

export const STATUS_CONFIG: Record<TaskStatus, { label: string; className: string; bgClass: string }> = {
    PLANNED: {
        label: "Planificat",
        className: "bg-primary/10 text-primary border-primary/20",
        bgClass: "bg-primary/5 border-primary/20"
    },
    IN_PROGRESS: {
        label: "In Progres",
        className: "bg-warning/10 text-warning-foreground border-warning/20",
        bgClass: "bg-warning/5 border-warning/20"
    },
    BLOCKED: {
        label: "Blocat",
        className: "bg-destructive/10 text-destructive border-destructive/20",
        bgClass: "bg-destructive/5 border-destructive/20"
    },
    REVIEW: {
        label: "In Revizuire",
        className: "bg-muted text-muted-foreground border-border",
        bgClass: "bg-muted/50 border-border"
    },
    DONE: {
        label: "Finalizat",
        className: "bg-success/10 text-success border-success/20",
        bgClass: "bg-success/5 border-success/20"
    },
};

export const PRIORITY_CONFIG: Record<string, { label: string; className: string }> = {
    high: { label: "Ridicata", className: "bg-destructive/10 text-destructive" },
    medium: { label: "Medie", className: "bg-warning/10 text-warning-foreground" },
    low: { label: "Scazuta", className: "bg-muted text-muted-foreground" },
};

export const VALID_TRANSITIONS: Record<TaskStatus, TaskStatus[]> = {
    PLANNED: ["IN_PROGRESS"],
    IN_PROGRESS: ["BLOCKED", "REVIEW"],
    BLOCKED: ["IN_PROGRESS"],
    REVIEW: ["IN_PROGRESS", "DONE"],
    DONE: [],
};

export const STATUS_ORDER: TaskStatus[] = ["PLANNED", "IN_PROGRESS", "BLOCKED", "REVIEW", "DONE"];

export interface TaskFormData {
    title: string;
    description: string;
    assigneeId: string;
    dueDate: string;
    priority: Task["priority"];
    category: string;
}

export function validateTaskForm(formData: TaskFormData, todayStr: string): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!formData.title.trim()) errors.title = "Titlul este obligatoriu.";
    if (!formData.assigneeId) errors.assigneeId = "Persoana responsabila este obligatorie.";
    if (!formData.dueDate) errors.dueDate = "Data limita este obligatorie.";
    if (formData.dueDate && formData.dueDate <= todayStr) {
        errors.dueDate = "Data limita trebuie sa fie in viitor (mai mare decat data curenta).";
    }
    if (!formData.category.trim()) errors.category = "Categoria este obligatorie.";

    return errors;
}