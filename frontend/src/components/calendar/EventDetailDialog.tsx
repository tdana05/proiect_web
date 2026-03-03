import { Clock, MapPin, Users, Trash2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EVENT_TYPE_LABELS } from "@/types/calendar";
import type { Event } from "@/lib/types";

interface EventDetailDialogProps {
    event: Event | null;
    onOpenChange: (open: boolean) => void;
    isAdmin: boolean;
    onDelete: (id: string) => void;
}

export function EventDetailDialog({
                                      event,
                                      onOpenChange,
                                      isAdmin,
                                      onDelete,
                                  }: EventDetailDialogProps) {
    if (!event) return null;

    return (
        <Dialog open={!!event} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <div className="size-3 rounded-full" style={{ backgroundColor: event.color }} />
                        {event.title}
                    </DialogTitle>
                    <DialogDescription>{EVENT_TYPE_LABELS[event.type]}</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-3">
                    {event.description && (
                        <p className="text-sm text-foreground">{event.description}</p>
                    )}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="size-4" />
                            {new Date(event.date).toLocaleDateString("ro-RO", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                            {event.endDate && event.endDate !== event.date && (
                                <>
                                    {" - "}
                                    {new Date(event.endDate).toLocaleDateString("ro-RO", {
                                        day: "numeric",
                                        month: "long",
                                    })}
                                </>
                            )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="size-4" />
                            {event.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="size-4" />
                            {event.attendees.length} participanti
                        </div>
                    </div>
                    {isAdmin && (
                        <div className="flex justify-end pt-2">
                            <Button variant="destructive" size="sm" onClick={() => onDelete(event.id)}>
                                <Trash2 className="mr-2 size-3" />
                                Sterge
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}