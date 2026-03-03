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
import type { Task, TaskFormData } from "@/types/tasks";

interface CreateTaskDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    formData: TaskFormData;
    errors: Record<string, string>;
    volunteers: User[];
    onFieldChange: (field: keyof TaskFormData, value: string) => void;
    onSubmit: () => void;
}

export function CreateTaskDialog({
                                     open,
                                     onOpenChange,
                                     formData,
                                     errors,
                                     volunteers,
                                     onFieldChange,
                                     onSubmit,
                                 }: CreateTaskDialogProps) {
    // Reset form when dialog closes
    useEffect(() => {
        if (!open) {
            onFieldChange("title", "");
            onFieldChange("description", "");
            onFieldChange("assigneeId", "");
            onFieldChange("dueDate", "");
            onFieldChange("priority", "medium");
            onFieldChange("category", "");
        }
    }, [open, onFieldChange]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Task Nou</DialogTitle>
                    <DialogDescription>
                        Creati un task nou. Task-ul va fi creat cu statusul PLANNED.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label>Titlu *</Label>
                        <Input
                            value={formData.title}
                            onChange={(e) => onFieldChange("title", e.target.value)}
                            placeholder="Denumirea task-ului"
                        />
                        {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
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
                            <Label>Persoana Responsabila *</Label>
                            <Select
                                value={formData.assigneeId}
                                onValueChange={(v) => onFieldChange("assigneeId", v)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selectati" />
                                </SelectTrigger>
                                <SelectContent>
                                    {volunteers.map((v) => (
                                        <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.assigneeId && <p className="text-xs text-destructive">{errors.assigneeId}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Data Limita *</Label>
                            <Input
                                type="date"
                                value={formData.dueDate}
                                onChange={(e) => onFieldChange("dueDate", e.target.value)}
                            />
                            {errors.dueDate && <p className="text-xs text-destructive">{errors.dueDate}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Prioritate</Label>
                            <Select
                                value={formData.priority}
                                onValueChange={(v) => onFieldChange("priority", v as Task["priority"])}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">Scazuta</SelectItem>
                                    <SelectItem value="medium">Medie</SelectItem>
                                    <SelectItem value="high">Ridicata</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Categorie *</Label>
                            <Input
                                value={formData.category}
                                onChange={(e) => onFieldChange("category", e.target.value)}
                                placeholder="Ex: Design, IT, HR"
                            />
                            {errors.category && <p className="text-xs text-destructive">{errors.category}</p>}
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Anuleaza
                    </Button>
                    <Button onClick={onSubmit}>Creeaza Task</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}