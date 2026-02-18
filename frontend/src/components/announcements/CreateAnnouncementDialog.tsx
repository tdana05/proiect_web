import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { Announcement } from "@/lib/types";
import type { AnnouncementFormData } from "@/types/announcements";

interface CreateAnnouncementDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: AnnouncementFormData) => void;
    errors: Record<string, string>;
}

export function CreateAnnouncementDialog({
                                             open,
                                             onOpenChange,
                                             onSubmit,
                                             errors,
                                         }: CreateAnnouncementDialogProps) {
    const [formData, setFormData] = useState<AnnouncementFormData>({
        title: "",
        content: "",
        priority: "medium",
        pinned: false,
    });

    // Reset form when dialog closes
    useEffect(() => {
        if (!open) {
            setFormData({ title: "", content: "", priority: "medium", pinned: false });
        }
    }, [open]);

    const handleSubmit = () => {
        onSubmit(formData);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Anunt Nou</DialogTitle>
                    <DialogDescription>
                        Creati un anunt nou pentru voluntarii organizatiei.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="ann-title">Titlu *</Label>
                        <Input
                            id="ann-title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Titlul anuntului"
                        />
                        {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="ann-content">Continut *</Label>
                        <Textarea
                            id="ann-content"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            rows={5}
                            placeholder="Scrieti continutul anuntului..."
                        />
                        {errors.content && <p className="text-xs text-destructive">{errors.content}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Prioritate</Label>
                            <Select
                                value={formData.priority}
                                onValueChange={(v) => setFormData({ ...formData, priority: v as Announcement["priority"] })}
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
                            <Label>Fixeaza Anuntul</Label>
                            <div className="flex items-center gap-2 pt-2">
                                <Switch
                                    checked={formData.pinned}
                                    onCheckedChange={(v) => setFormData({ ...formData, pinned: v })}
                                />
                                <span className="text-sm text-muted-foreground">
                  {formData.pinned ? "Fixat" : "Nefixat"}
                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Anuleaza
                    </Button>
                    <Button onClick={handleSubmit}>Publica Anunt</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}