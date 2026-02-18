import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getUserById } from "@/lib/data-service";
import { STATUS_CONFIG, PRIORITY_CONFIG, STATUS_ORDER } from "@/types/tasks";
import type { Task, TaskStatus } from "@/lib/types";

interface TaskDetailDialogProps {
    task: Task | null;
    onOpenChange: (open: boolean) => void;
    availableTransitions: TaskStatus[];
    onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
}

export function TaskDetailDialog({
                                     task,
                                     onOpenChange,
                                     availableTransitions,
                                     onStatusChange,
                                 }: TaskDetailDialogProps) {
    if (!task) return null;

    const assignee = getUserById(task.assigneeId);
    const owner = getUserById(task.ownerId);
    const statusConfig = STATUS_CONFIG[task.status];
    const priorityConfig = PRIORITY_CONFIG[task.priority];

    return (
        <Dialog open={!!task} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>{task.title}</DialogTitle>
                    <DialogDescription>Detaliile task-ului</DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className={statusConfig.className}>
                            {statusConfig.label}
                        </Badge>
                        <Badge variant="secondary" className={priorityConfig.className}>
                            Prioritate: {priorityConfig.label}
                        </Badge>
                        <Badge variant="outline">{task.category}</Badge>
                    </div>

                    <p className="text-sm text-foreground/80 leading-relaxed">{task.description}</p>

                    <div className="grid grid-cols-2 gap-3 rounded-lg bg-muted/50 p-4">
                        <div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Responsabil</p>
                            <p className="text-sm font-medium text-foreground">{assignee?.name}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Owner</p>
                            <p className="text-sm font-medium text-foreground">{owner?.name}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Data Limita</p>
                            <p className="text-sm font-medium text-foreground">
                                {new Date(task.dueDate).toLocaleDateString("ro-RO")}
                            </p>
                        </div>
                        <div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Creat la</p>
                            <p className="text-sm font-medium text-foreground">
                                {new Date(task.createdAt).toLocaleDateString("ro-RO")}
                            </p>
                        </div>
                    </div>

                    {/* Status flow info */}
                    <div className="rounded-lg border border-border/50 p-4">
                        <p className="text-xs font-medium text-muted-foreground mb-2">Flux de status:</p>
                        <div className="flex flex-wrap items-center gap-1 text-[10px]">
                            {STATUS_ORDER.map((s, i) => (
                                <span key={s} className="flex items-center gap-1">
                  <span
                      className={`rounded px-1.5 py-0.5 ${
                          task.status === s
                              ? STATUS_CONFIG[s].className + " font-bold"
                              : "bg-muted text-muted-foreground"
                      }`}
                  >
                    {STATUS_CONFIG[s].label}
                  </span>
                                    {i < STATUS_ORDER.length - 1 && (
                                        <ArrowRight className="size-3 text-muted-foreground/50" />
                                    )}
                </span>
                            ))}
                        </div>
                        <p className="mt-2 text-[10px] text-muted-foreground">
                            DONE poate fi setat doar de owner, si doar din REVIEW.
                        </p>
                    </div>

                    {availableTransitions.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            <p className="w-full text-xs text-muted-foreground">Schimba status:</p>
                            {availableTransitions.map((s) => (
                                <Button
                                    key={s}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onStatusChange(task.id, s)}
                                    className="text-xs"
                                >
                                    <ArrowRight className="mr-1 size-3" />
                                    {STATUS_CONFIG[s].label}
                                </Button>
                            ))}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}