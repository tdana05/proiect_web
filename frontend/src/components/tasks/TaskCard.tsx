import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ArrowRight, Clock, Trash2 } from "lucide-react";
import { getUserById } from "@/lib/data-service";
import { STATUS_CONFIG, PRIORITY_CONFIG } from "@/types/tasks";
import type { Task, TaskStatus } from "@/lib/types";

interface TaskCardProps {
    task: Task;
    isAdmin: boolean;
    todayStr: string;
    availableTransitions: TaskStatus[];
    onSelect: (task: Task) => void;
    onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
    onDelete: (id: string) => void;
}

export function TaskCard({
                             task,
                             isAdmin,
                             todayStr,
                             availableTransitions,
                             onSelect,
                             onStatusChange,
                             onDelete,
                         }: TaskCardProps) {
    const assignee = getUserById(task.assigneeId);
    const owner = getUserById(task.ownerId);
    const statusConfig = STATUS_CONFIG[task.status];
    const priorityConfig = PRIORITY_CONFIG[task.priority];
    const isOverdue = task.status !== "DONE" && task.dueDate < todayStr;

    return (
        <div
            className={`rounded-lg border transition-colors hover:bg-muted/20 ${
                isOverdue ? "border-destructive/30" : "border-border"
            }`}
        >
            <div className="p-4">
                <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge variant="secondary" className={`text-[10px] ${statusConfig.className}`}>
                                    {statusConfig.label}
                                </Badge>
                                <Badge variant="secondary" className={`text-[10px] ${priorityConfig.className}`}>
                                    {priorityConfig.label}
                                </Badge>
                                <Badge variant="outline" className="text-[10px]">
                                    {task.category}
                                </Badge>
                                {isOverdue && (
                                    <Badge variant="destructive" className="text-[10px]">
                                        Intarziat
                                    </Badge>
                                )}
                            </div>
                            <button onClick={() => onSelect(task)} className="text-left">
                                <h3 className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                                    {task.title}
                                </h3>
                            </button>
                            <p className="text-xs text-muted-foreground line-clamp-1">{task.description}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            {availableTransitions.length > 0 && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm" className="text-xs gap-1">
                                            Status <ChevronDown className="size-3" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel className="text-xs">Schimba status</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {availableTransitions.map((s) => (
                                            <DropdownMenuItem key={s} onClick={() => onStatusChange(task.id, s)}>
                                                <ArrowRight className="mr-2 size-3" />
                                                {STATUS_CONFIG[s].label}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                            {isAdmin && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-8 text-muted-foreground hover:text-destructive"
                                    onClick={() => onDelete(task.id)}
                                >
                                    <Trash2 className="size-4" />
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5">
                                <Avatar className="size-5">
                                    <AvatarFallback className="text-[8px] bg-muted">
                                        {assignee?.name?.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-muted-foreground">{assignee?.name}</span>
                            </div>
                            <span className="text-xs text-muted-foreground/50">|</span>
                            <span className="text-xs text-muted-foreground">
                Owner: {owner?.name?.split(" ")[0]}
              </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="size-3" />
                            {new Date(task.dueDate).toLocaleDateString("ro-RO", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}