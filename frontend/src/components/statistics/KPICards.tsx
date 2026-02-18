import { Card, CardContent } from "@/components/ui/card";
import { Users, Clock, ListTodo, FolderKanban } from "lucide-react";

interface KPICardsProps {
    totalVolunteers: number;
    totalHours: number;
    totalTasks: number;
    activeProjects: number;
}

export function KPICards({ totalVolunteers, totalHours, totalTasks, activeProjects }: KPICardsProps) {
    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Card>
                <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Users className="size-5 text-primary" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-foreground">{totalVolunteers}</p>
                        <p className="text-xs text-muted-foreground">Voluntari Activi</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-success/10">
                        <Clock className="size-5 text-success" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-foreground">{totalHours}</p>
                        <p className="text-xs text-muted-foreground">Ore Voluntariat</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <ListTodo className="size-5 text-accent-foreground" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-foreground">{totalTasks}</p>
                        <p className="text-xs text-muted-foreground">Total Task-uri</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <FolderKanban className="size-5 text-primary" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-foreground">{activeProjects}</p>
                        <p className="text-xs text-muted-foreground">Proiecte Active</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}