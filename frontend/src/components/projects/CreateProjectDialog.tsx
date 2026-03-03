import { useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { User } from "@/lib/types";
import type { ProjectFormData } from "@/types/projects";

interface CreateProjectDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    formData: ProjectFormData;
    errors: Record<string, string>;
    users: User[];
    onFieldChange: (field: keyof ProjectFormData, value: string) => void;
    onSubmit: () => void;
}

export function CreateProjectDialog({
                                        open,
                                        onOpenChange,
                                        formData,
                                        errors,
                                        users,
                                        onFieldChange,
                                        onSubmit,
                                    }: CreateProjectDialogProps) {
    // Reset form when dialog closes
    useEffect(() => {
        if (!open) {
            onFieldChange("name", "");
            onFieldChange("description", "");
            onFieldChange("startDate", "");
            onFieldChange("endDate", "");
            onFieldChange("leadId", "");
            onFieldChange("status", "planning");
        }
    }, [open, onFieldChange]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Proiect Nou</DialogTitle>
                    <DialogDescription>Creati un proiect nou pentru organizatie.</DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label>Nume Proiect *</Label>
                        <Input
                            value={formData.name}
                            onChange={(e) => onFieldChange("name", e.target.value)}
                            placeholder="Denumirea proiectului"
                        />
                        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Descriere</Label>
                        <Textarea
                            value={formData.description}
                            onChange={(e) => onFieldChange("description", e.target.value)}
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Data Inceput *</Label>
                            <Input
                                type="date"
                                value={formData.startDate}
                                onChange={(e) => onFieldChange("startDate", e.target.value)}
                            />
                            {errors.startDate && <p className="text-xs text-destructive">{errors.startDate}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Data Sfarsit *</Label>
                            <Input
                                type="date"
                                value={formData.endDate}
                                onChange={(e) => onFieldChange("endDate", e.target.value)}
                            />
                            {errors.endDate && <p className="text-xs text-destructive">{errors.endDate}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Lider Proiect *</Label>
                            <Select
                                value={formData.leadId}
                                onValueChange={(v) => onFieldChange("leadId", v)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selectati" />
                                </SelectTrigger>
                                <SelectContent>
                                    {users.map((u) => (
                                        <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.leadId && <p className="text-xs text-destructive">{errors.leadId}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Status</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(v) => onFieldChange("status", v as any)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="planning">In Planificare</SelectItem>
                                    <SelectItem value="active">Activ</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Anuleaza</Button>
                    <Button onClick={onSubmit}>Creeaza Proiect</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}