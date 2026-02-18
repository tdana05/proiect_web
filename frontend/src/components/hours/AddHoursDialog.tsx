import { useState, useEffect } from "react";
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
import type { HoursFormData } from "@/types/hours";

interface AddHoursDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: HoursFormData) => void;
    errors: Record<string, string>;
    tasks: any[];
    events: any[];
    userId: string;
}

export function AddHoursDialog({
                                   open,
                                   onOpenChange,
                                   onSubmit,
                                   errors,
                                   tasks,
                                   events,
                                   userId,
                               }: AddHoursDialogProps) {
    const [formData, setFormData] = useState<HoursFormData>({
        date: "",
        hours: "",
        description: "",
        relatedTaskId: "",
        relatedEventId: "",
    });

    useEffect(() => {
        if (!open) {
            setFormData({
                date: "",
                hours: "",
                description: "",
                relatedTaskId: "",
                relatedEventId: "",
            });
        }
    }, [open]);

    const handleSubmit = () => {
        onSubmit(formData);
    };

    const userTasks = tasks.filter((t) => t.assigneeId === userId);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Adauga Ore de Voluntariat</DialogTitle>
                    <DialogDescription>
                        Inregistrati orele lucrate pentru o sarcina sau un eveniment.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Data *</Label>
                            <Input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                            {errors.date && <p className="text-xs text-destructive">{errors.date}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Numar de Ore *</Label>
                            <Input
                                type="number"
                                min="0.5"
                                max="24"
                                step="0.5"
                                value={formData.hours}
                                onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                                placeholder="Ex: 4"
                            />
                            {errors.hours && <p className="text-xs text-destructive">{errors.hours}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Descriere *</Label>
                        <Textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                            placeholder="Ce activitate ati desfasurat..."
                        />
                        {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Task Asociat</Label>
                            <Select
                                value={formData.relatedTaskId}
                                onValueChange={(v) => setFormData({ ...formData, relatedTaskId: v, relatedEventId: "" })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Optional" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">Niciunul</SelectItem>
                                    {userTasks.map((t) => (
                                        <SelectItem key={t.id} value={t.id}>
                                            {t.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Eveniment Asociat</Label>
                            <Select
                                value={formData.relatedEventId}
                                onValueChange={(v) => setFormData({ ...formData, relatedEventId: v, relatedTaskId: "" })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Optional" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">Niciunul</SelectItem>
                                    {events.map((e) => (
                                        <SelectItem key={e.id} value={e.id}>
                                            {e.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Anuleaza
                    </Button>
                    <Button onClick={handleSubmit}>Adauga Ore</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}