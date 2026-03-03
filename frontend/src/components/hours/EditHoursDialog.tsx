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
import { getUserById } from "@/lib/data-service";
import type { HoursEntry } from "@/lib/types";

interface EditHoursDialogProps {
    entry: HoursEntry | null;
    onOpenChange: (open: boolean) => void;
    editHours: string;
    onEditHoursChange: (hours: string) => void;
    onSave: () => void;
}

export function EditHoursDialog({
                                    entry,
                                    onOpenChange,
                                    editHours,
                                    onEditHoursChange,
                                    onSave,
                                }: EditHoursDialogProps) {
    if (!entry) return null;

    const volunteer = getUserById(entry.volunteerId);

    return (
        <Dialog open={!!entry} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Corectare Ore</DialogTitle>
                    <DialogDescription>
                        Corectati numarul de ore inregistrate de voluntar.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="rounded-lg bg-muted/50 p-3">
                        <p className="text-sm text-foreground">{entry.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Voluntar: {volunteer?.name} | Ore curente: {entry.hours}h
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Numar de Ore Corectat</Label>
                        <Input
                            type="number"
                            min="0.5"
                            max="24"
                            step="0.5"
                            value={editHours}
                            onChange={(e) => onEditHoursChange(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Anuleaza
                    </Button>
                    <Button onClick={onSave}>Salveaza</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}