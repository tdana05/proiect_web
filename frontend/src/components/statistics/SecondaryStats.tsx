import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle2, AlertCircle } from "lucide-react";

interface SecondaryStatsProps {
    upcomingEvents: number;
    taskCompletionRate: number;
    pendingHours: number;
}

export function SecondaryStats({ upcomingEvents, taskCompletionRate, pendingHours }: SecondaryStatsProps) {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
                <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <Calendar className="size-5 text-primary" />
                        <div>
                            <p className="text-sm font-medium text-foreground">Evenimente Viitoare</p>
                            <p className="text-xs text-muted-foreground">Planificate</p>
                        </div>
                    </div>
                    <span className="text-2xl font-bold text-foreground">{upcomingEvents}</span>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="size-5 text-success" />
                        <div>
                            <p className="text-sm font-medium text-foreground">Rata Completare</p>
                            <p className="text-xs text-muted-foreground">Task-uri finalizate</p>
                        </div>
                    </div>
                    <span className="text-2xl font-bold text-foreground">{taskCompletionRate}%</span>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <AlertCircle className="size-5 text-warning" />
                        <div>
                            <p className="text-sm font-medium text-foreground">Ore in Asteptare</p>
                            <p className="text-xs text-muted-foreground">Necesita aprobare</p>
                        </div>
                    </div>
                    <Badge variant="secondary">{pendingHours}</Badge>
                </CardContent>
            </Card>
        </div>
    );
}