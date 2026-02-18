import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import type { HoursEntry, HoursStatus } from "@/lib/types";

export const STATUS_CONFIG: Record<HoursStatus, { label: string; className: string; icon: React.ReactNode }> = {
    pending: {
        label: "In Asteptare",
        className: "bg-warning/10 text-warning-foreground",
        icon: <AlertCircle className="size-3" />
    },
    approved: {
        label: "Aprobat",
        className: "bg-success/10 text-success",
        icon: <CheckCircle2 className="size-3" />
    },
    rejected: {
        label: "Respins",
        className: "bg-destructive/10 text-destructive",
        icon: <XCircle className="size-3" />
    },
};

export const STATUS_OPTIONS = [
    { value: "all", label: "Toate Statusurile" },
    { value: "pending", label: "In Asteptare" },
    { value: "approved", label: "Aprobat" },
    { value: "rejected", label: "Respins" },
];

export interface HoursFormData {
    date: string;
    hours: string;
    description: string;
    relatedTaskId: string;
    relatedEventId: string;
}