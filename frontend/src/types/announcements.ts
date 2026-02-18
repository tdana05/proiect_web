import { Announcement } from "@/lib/types";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";

export interface AnnouncementFormData {
    title: string;
    content: string;
    priority: Announcement["priority"];
    pinned: boolean;
}

export const PRIORITY_CONFIG = {
    high: {
        label: "Ridicata",
        className: "bg-destructive/10 text-destructive",
        icon: <AlertTriangle className="size-3" />
    },
    medium: {
        label: "Medie",
        className: "bg-warning/10 text-warning-foreground",
        icon: <AlertCircle className="size-3" />
    },
    low: {
        label: "Scazuta",
        className: "bg-muted text-muted-foreground",
        icon: <Info className="size-3" />
    },
} as const;