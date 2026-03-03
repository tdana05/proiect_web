import type { Task } from "@/lib/types";

export const STATUS_STYLES: Record<string, string> = {
    PLANNED: "bg-primary/10 text-primary",
    IN_PROGRESS: "bg-warning/10 text-warning-foreground",
    BLOCKED: "bg-destructive/10 text-destructive",
    REVIEW: "bg-muted text-muted-foreground",
    DONE: "bg-success/10 text-success",
};

export function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return "Buna dimineata";
    if (hour < 18) return "Buna ziua";
    return "Buna seara";
}

export function formatEventDate(date: string): string {
    return new Date(date).toLocaleDateString("ro-RO", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export function formatTaskDueDate(date: string): string {
    return new Date(date).toLocaleDateString("ro-RO");
}

export function formatStatusLabel(status: string): string {
    return status.replace("_", " ");
}