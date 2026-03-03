import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";

interface HoursSummaryProps {
    totalApproved: number;
    totalPending: number;
    totalEntries: number;
}

export function HoursSummary({ totalApproved, totalPending, totalEntries }: HoursSummaryProps) {
    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Card>
                <CardContent className="flex items-center gap-3 p-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-success/10">
                        <CheckCircle2 className="size-5 text-success" />
                    </div>
                    <div>
                        <p className="text-xl font-bold text-foreground">{totalApproved}h</p>
                        <p className="text-xs text-muted-foreground">Ore Aprobate</p>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="flex items-center gap-3 p-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-warning/10">
                        <AlertCircle className="size-5 text-warning-foreground" />
                    </div>
                    <div>
                        <p className="text-xl font-bold text-foreground">{totalPending}h</p>
                        <p className="text-xs text-muted-foreground">In Asteptare</p>
                    </div>
                </CardContent>
            </Card>
            <Card className="col-span-2 sm:col-span-1">
                <CardContent className="flex items-center gap-3 p-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Clock className="size-5 text-primary" />
                    </div>
                    <div>
                        <p className="text-xl font-bold text-foreground">{totalEntries}</p>
                        <p className="text-xs text-muted-foreground">Total Inregistrari</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}