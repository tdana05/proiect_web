import { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CATEGORY_LABELS, FILE_TYPES } from "@/types/documents";
import type { Document } from "@/lib/types";
import type { DocumentFormData } from "@/types/documents";

interface UploadDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: DocumentFormData) => void;
    errors: Record<string, string>;
}

export function UploadDialog({
                                 open,
                                 onOpenChange,
                                 onSubmit,
                                 errors,
                             }: UploadDialogProps) {
    const [formData, setFormData] = useState<DocumentFormData>({
        name: "",
        type: "pdf",
        category: "other",
        size: "",
    });

    useEffect(() => {
        if (!open) {
            setFormData({
                name: "",
                type: "pdf",
                category: "other",
                size: "",
            });
        }
    }, [open]);

    const handleSubmit = () => {
        onSubmit(formData);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Incarca Document</DialogTitle>
                    <DialogDescription>
                        Adaugati un document nou in arhiva organizatiei.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label>Nume Document *</Label>
                        <Input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Denumirea documentului"
                        />
                        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Tip Fisier</Label>
                            <Select
                                value={formData.type}
                                onValueChange={(v) => setFormData({ ...formData, type: v as Document["type"] })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {FILE_TYPES.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Categorie</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(v) => setFormData({ ...formData, category: v as Document["category"] })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(CATEGORY_LABELS).map(([val, label]) => (
                                        <SelectItem key={val} value={val}>{label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Dimensiune (optional)</Label>
                        <Input
                            value={formData.size}
                            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                            placeholder="Ex: 2.5 MB"
                        />
                    </div>
                    <div className="rounded-lg border-2 border-dashed border-border p-8 text-center">
                        <FileText className="mx-auto size-8 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                            Simulare upload fisier (demo)
                        </p>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Anuleaza
                    </Button>
                    <Button onClick={handleSubmit}>Incarca</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}