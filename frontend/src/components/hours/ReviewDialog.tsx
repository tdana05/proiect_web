import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, XCircle } from "lucide-react";
import { getUserById } from "@/lib/data-service";
import type { HoursEntry } from "@/lib/types";

interface ReviewDialogProps {
    entry: HoursEntry | null;
    onOpenChange: (open: boolean) => void;
    adminNote: string;
    onAdminNoteChange: (note: string) => void;
    onApprove: (id: string) => void;
    onReject: (id: string) => void;
    tasks: any[];
    events: any[];
}

export function ReviewDialog({
                                 entry,
                                 onOpenChange,
                                 adminNote,
                                 onAdminNoteChange,
                                 onApprove,
                                 onReject,
                                 tasks,
                                 events,
                             }: ReviewDialogProps) {
    if (!entry) return null;

    const volunteer = getUserById(entry.volunteerId);
    const relatedTask = entry.relatedTaskId
        ? tasks.find((t) => t.id === entry.relatedTaskId)
        : null;
    const relatedEvent = entry.relatedEventId
        ? events.find((e) => e.id === entry.relatedEventId)
        : null;

    return (
        <Dialog open={!!entry} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Verifica Ore Voluntariat</DialogTitle>
                    <DialogDescription>
                        Aprobati sau respingeti inregistrarea de ore.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="rounded-lg bg-muted/50 p-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <p className="text-[10px] text-muted-foreground uppercase">Voluntar</p>
                                <p className="text-sm font-medium text-foreground">{volunteer?.name}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-muted-foreground uppercase">Ore Declarate</p>
                                <p className="text-sm font-medium text-foreground">{entry.hours}h</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-muted-foreground uppercase">Data</p>
                                <p className="text-sm text-foreground">
                                    {new Date(entry.date).toLocaleDateString("ro-RO")}
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] text-muted-foreground uppercase">Referinta</p>
                                <p className="text-sm text-foreground">
                                    {relatedTask?.title || relatedEvent?.title || "Fara referinta"}
                                </p>
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="text-[10px] text-muted-foreground uppercase">Descriere</p>
                            <p className="text-sm text-foreground">{entry.description}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Nota Admin (obligatorie pentru respingere)</Label>
                        <Textarea
                            value={adminNote}
                            onChange={(e) => onAdminNoteChange(e.target.value)}
                            rows={2}
                            placeholder="Adaugati o nota explicativa..."
                        />
                    </div>
                    <div className="flex gap-3 justify-end">
                        <Button variant="destructive" onClick={() => onReject(entry.id)}>
                            <XCircle className="mr-2 size-4" />
                            Respinge
                        </Button>
                        <Button
                            onClick={() => onApprove(entry.id)}
                            className="bg-success text-success-foreground hover:bg-success/90"
                        >
                            <CheckCircle2 className="mr-2 size-4" />
                            Aproba
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}