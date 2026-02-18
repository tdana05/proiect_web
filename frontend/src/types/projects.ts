import type { Project } from "@/lib/types";

export const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
    active: { label: "Activ", className: "bg-success/10 text-success" },
    planning: { label: "In Planificare", className: "bg-warning/10 text-warning-foreground" },
    completed: { label: "Finalizat", className: "bg-muted text-muted-foreground" },
};

export const STATUS_OPTIONS = [
    { value: "all", label: "Toate" },
    { value: "active", label: "Active" },
    { value: "planning", label: "In Planificare" },
    { value: "completed", label: "Finalizate" },
];

export interface ProjectFormData {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: Project["status"];
    leadId: string;
}

export function validateProjectForm(formData: ProjectFormData): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = "Numele este obligatoriu.";
    if (!formData.startDate) errors.startDate = "Data de inceput este obligatorie.";
    if (!formData.endDate) errors.endDate = "Data de sfarsit este obligatorie.";
    if (formData.endDate && formData.startDate && formData.endDate < formData.startDate) {
        errors.endDate = "Data de sfarsit trebuie sa fie dupa data de inceput.";
    }
    if (!formData.leadId) errors.leadId = "Selectati un lider de proiect.";

    return errors;
}