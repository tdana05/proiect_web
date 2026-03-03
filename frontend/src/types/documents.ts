import { FileText, File, FileSpreadsheet, FileImage } from "lucide-react";
import type { Document } from "@/lib/types";

export const TYPE_ICONS: Record<string, React.ReactNode> = {
    pdf: <FileText className="size-5 text-destructive" />,
    doc: <File className="size-5 text-primary" />,
    spreadsheet: <FileSpreadsheet className="size-5 text-success" />,
    image: <FileImage className="size-5 text-accent-foreground" />,
    other: <File className="size-5 text-muted-foreground" />,
};

export const CATEGORY_LABELS: Record<string, string> = {
    policy: "Politici",
    report: "Rapoarte",
    template: "Template",
    training: "Training",
    other: "Altele",
};

export const FILE_TYPES = [
    { value: "pdf", label: "PDF" },
    { value: "doc", label: "Document" },
    { value: "spreadsheet", label: "Spreadsheet" },
    { value: "image", label: "Imagine" },
    { value: "other", label: "Altul" },
] as const;

export interface DocumentFormData {
    name: string;
    type: Document["type"];
    category: Document["category"];
    size: string;
}