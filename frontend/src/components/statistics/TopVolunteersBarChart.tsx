import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import type { TopVolunteer } from "@/types/statistics";

interface TopVolunteersBarChartProps {
    data: TopVolunteer[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg border border-border bg-background p-2 shadow-sm">
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">
                    Ore: <span className="font-bold text-primary">{payload[0].value}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                    Task-uri: <span className="font-bold text-success">{payload[0].payload.taskuri}</span>
                </p>
            </div>
        );
    }
    return null;
};

export function TopVolunteersBarChart({ data }: TopVolunteersBarChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Top Voluntari</CardTitle>
                <CardDescription>Voluntarii cu cele mai multe ore</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                            <XAxis type="number" className="text-xs fill-muted-foreground" fontSize={12} />
                            <YAxis
                                type="category"
                                dataKey="name"
                                className="text-xs fill-muted-foreground"
                                fontSize={12}
                                width={60}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar
                                dataKey="ore"
                                name="Ore"
                                fill="oklch(0.55 0.15 195)"
                                radius={[0, 4, 4, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}