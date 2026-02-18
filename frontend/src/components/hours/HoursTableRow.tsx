import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit3 } from "lucide-react";
import { getUserById } from "@/lib/data-service";
import { STATUS_CONFIG } from "@/types/hours";
import type { HoursEntry } from "@/lib/types";

interface HoursTableRowProps {
    entry: HoursEntry;
    isAdmin: boolean;
    tasks: any[];
    events: any[];
    onReview: (entry: HoursEntry) => void;
    onEdit: (entry: HoursEntry) => void;
}

export function HoursTableRow({
                                  entry,
                                  isAdmin,
                                  tasks,
                                  events,
                                  onReview,
                                  onEdit,
                              }: HoursTableRowProps) {
    const volunteer = getUserById(entry.volunteerId);
    const relatedTask = entry.relatedTaskId
        ? tasks.find((t) => t.id === entry.relatedTaskId)
        : null;
    const relatedEvent = entry.relatedEventId
        ? events.find((e) => e.id === entry.relatedEventId)
        : null;
    const statusConfig = STATUS_CONFIG[entry.status];

    return (
        <TableRow>
            {isAdmin && (
                <TableCell>
                    <div className="flex items-center gap-2">
                        <Avatar className="size-6">
                            <AvatarFallback className="text-[8px] bg-muted">
                                {volunteer?.name?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{volunteer?.name}</span>
                    </div>
                </TableCell>
            )}
            <TableCell className="text-sm">
                {new Date(entry.date).toLocaleDateString("ro-RO")}
            </TableCell>
            <TableCell className="text-sm font-medium">
                {entry.hours}h
            </TableCell>
            <TableCell>
                <p className="text-sm line-clamp-2">{entry.description}</p>
                {entry.adminNote && (
                    <p className="mt-1 text-xs text-destructive italic">
                        Nota admin: {entry.adminNote}
                    </p>
                )}
            </TableCell>
            <TableCell>
                {relatedTask && (
                    <Badge variant="outline" className="text-[10px]">
                        Task: {relatedTask.title.slice(0, 20)}...
                    </Badge>
                )}
                {relatedEvent && (
                    <Badge variant="outline" className="text-[10px]">
                        Ev: {relatedEvent.title.slice(0, 20)}...
                    </Badge>
                )}
                {!relatedTask && !relatedEvent && (
                    <span className="text-xs text-muted-foreground">-</span>
                )}
            </TableCell>
            <TableCell>
                <Badge variant="secondary" className={`gap-1 text-[10px] ${statusConfig.className}`}>
                    {statusConfig.icon}
                    {statusConfig.label}
                </Badge>
            </TableCell>
            <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                    {isAdmin && entry.status === "pending" && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => onReview(entry)}
                        >
                            Verifica
                        </Button>
                    )}
                    {isAdmin && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-7"
                            onClick={() => onEdit(entry)}
                        >
                            <Edit3 className="size-3" />
                        </Button>
                    )}
                </div>
            </TableCell>
        </TableRow>
    );
}