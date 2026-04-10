import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { HOURS_STATUS_COLORS } from "@/types/statistics";

interface HoursStatusPieChartProps {
    data: Array<{
        name: string;
        value: number;
        color?: string;
    }>;
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg border border-border bg-background p-2 shadow-sm">
                <p className="text-sm font-medium text-foreground">{payload[0].name}</p>
                <p className="text-xs text-muted-foreground">
                    Ore: <span className="font-bold" style={{ color: payload[0].payload.color || payload[0].color }}>
                        {payload[0].value}
                    </span>
                </p>
            </div>
        );
    }
    return null;
};

export function HoursStatusPieChart({ data }: HoursStatusPieChartProps) {
    // Pregătim datele cu culori incluse
    const chartData = data.map((item, index) => ({
        ...item,
        fill: HOURS_STATUS_COLORS[index]?.color || "#888888"
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Ore pe Status</CardTitle>
                <CardDescription>Distributia orelor dupa starea de aprobare</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={3}
                                dataKey="value"
                                nameKey="name"
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                formatter={(value) => (
                                    <span style={{ color: "oklch(0.50 0.02 260)", fontSize: "12px" }}>{value}</span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}