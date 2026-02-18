import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface HoursLineChartProps {
    data: any[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg border border-border bg-background p-2 shadow-sm">
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">
                    Ore: <span className="font-bold text-primary">{payload[0].value}</span>
                </p>
            </div>
        );
    }
    return null;
};

export function HoursLineChart({ data }: HoursLineChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                    <TrendingUp className="size-4" />
                    Ore Voluntariat pe Luna
                </CardTitle>
                <CardDescription>Evolutia orelor de voluntariat in ultimele 6 luni</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                            <XAxis dataKey="month" className="text-xs fill-muted-foreground" fontSize={12} />
                            <YAxis className="text-xs fill-muted-foreground" fontSize={12} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                type="monotone"
                                dataKey="hours"
                                name="Ore"
                                stroke="oklch(0.55 0.15 195)"
                                strokeWidth={2}
                                dot={{ fill: "oklch(0.55 0.15 195)", r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}