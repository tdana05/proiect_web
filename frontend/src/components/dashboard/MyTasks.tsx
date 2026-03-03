import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { STATUS_STYLES, formatTaskDueDate, formatStatusLabel } from "@/types/dashboard";
import type { Task } from "@/lib/types";

interface MyTasksProps {
    tasks: Task[];
}

export function MyTasks({ tasks }: MyTasksProps) {
    return (
        <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-base">Task-urile Mele</CardTitle>
                    <CardDescription>Task-uri active asignate tie</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard/tasks">
                        Toate <ArrowRight className="ml-1 size-3" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                {tasks.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 py-8 text-muted-foreground">
                        <CheckCircle2 className="size-8" />
                        <p className="text-sm">Nu ai task-uri active!</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {tasks.map((task) => (
                            <TaskItem key={task.id} task={task} />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function TaskItem({ task }: { task: Task }) {
    return (
        <div className="flex items-center justify-between rounded-lg border border-border/50 p-3">
            <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-foreground">{task.title}</p>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{task.category}</span>
                    <span className="text-xs text-muted-foreground">
            Termen: {formatTaskDueDate(task.dueDate)}
          </span>
                </div>
            </div>
            <Badge variant="secondary" className={STATUS_STYLES[task.status]}>
                {formatStatusLabel(task.status)}
            </Badge>
        </div>
    );
}