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
import { EVENT_TYPE_LABELS } from "@/types/calendar";
import type { Event } from "@/lib/types";
import type { EventFormData } from "@/types/calendar";

interface CreateEventDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: EventFormData) => void;
    errors: Record<string, string>;
}

export function CreateEventDialog({
                                      open,
                                      onOpenChange,
                                      onSubmit,
                                      errors,
                                  }: CreateEventDialogProps) {
    const [formData, setFormData] = useState<EventFormData>({
        title: "",
        description: "",
        date: "",
        endDate: "",
        location: "",
        type: "event",
    });

    useEffect(() => {
        if (!open) {
            setFormData({
                title: "",
                description: "",
                date: "",
                endDate: "",
                location: "",
                type: "event",
            });
        }
    }, [open]);

    const handleSubmit = () => {
        onSubmit(formData);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Eveniment Nou</DialogTitle>
                    <DialogDescription>
                        Creati un eveniment nou in calendarul organizatiei.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="ev-title">Titlu *</Label>
                        <Input
                            id="ev-title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Denumirea evenimentului"
                        />
                        {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="ev-desc">Descriere</Label>
                        <Textarea
                            id="ev-desc"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="ev-date">Data Inceput *</Label>
                            <Input
                                id="ev-date"
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                            {errors.date && <p className="text-xs text-destructive">{errors.date}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="ev-end">Data Sfarsit</Label>
                            <Input
                                id="ev-end"
                                type="date"
                                value={formData.endDate}
                                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                            />
                            {errors.endDate && <p className="text-xs text-destructive">{errors.endDate}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="ev-location">Locatie *</Label>
                        <Input
                            id="ev-location"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="Adresa sau link-ul evenimentului"
                        />
                        {errors.location && <p className="text-xs text-destructive">{errors.location}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Tip Eveniment</Label>
                        <Select
                            value={formData.type}
                            onValueChange={(v) => setFormData({ ...formData, type: v as Event["type"] })}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(EVENT_TYPE_LABELS).map(([val, label]) => (
                                    <SelectItem key={val} value={val}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Anuleaza
                    </Button>
                    <Button onClick={handleSubmit}>Creeaza Eveniment</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}