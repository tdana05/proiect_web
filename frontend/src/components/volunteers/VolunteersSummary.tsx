import { Card, CardContent } from "@/components/ui/card";
import { Users, Clock, ListTodo, Building2 } from "lucide-react";

interface VolunteersSummaryProps {
    totalVolunteers: number;
    totalHours: number;
    totalTasks: number;
    totalDepartments: number;
}

export function VolunteersSummary({
                                      totalVolunteers,
                                      totalHours,
                                      totalTasks,
                                      totalDepartments,
                                  }: VolunteersSummaryProps) {
    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Card>
                <CardContent className="flex items-center gap-3 p-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Users className="size-5 text-primary" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-foreground">{totalVolunteers}</p>
                        <p className="text-xs text-muted-foreground">Total Voluntari</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="flex items-center gap-3 p-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-success/10">
                        <Clock className="size-5 text-success" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-foreground">{totalHours}</p>
                        <p className="text-xs text-muted-foreground">Ore Totale</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="flex items-center gap-3 p-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <ListTodo className="size-5 text-accent-foreground" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-foreground">{totalTasks}</p>
                        <p className="text-xs text-muted-foreground">Task-uri Finalizate</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="flex items-center gap-3 p-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Building2 className="size-5 text-primary" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-foreground">{totalDepartments}</p>
                        <p className="text-xs text-muted-foreground">Departamente</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}