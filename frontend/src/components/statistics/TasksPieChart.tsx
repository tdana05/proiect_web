import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { STATUS_COLORS } from "@/types/statistics";

interface TasksPieChartProps {
    data: Array<{
        name: string;
        value: number;
        status: string;
        color?: string;
    }>;
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg border border-border bg-background p-2 shadow-sm">
                <p className="text-sm font-medium text-foreground">{payload[0].name}</p>
                <p className="text-xs text-muted-foreground">
                    Task-uri: <span className="font-bold" style={{ color: payload[0].payload.fill }}>
                        {payload[0].value}
                    </span>
                </p>
            </div>
        );
    }
    return null;
};

export function TasksPieChart({ data }: TasksPieChartProps) {
    // Pregătim datele cu culori incluse pe baza status-ului
    const chartData = data.map((item) => ({
        ...item,
        fill: STATUS_COLORS[item.status as keyof typeof STATUS_COLORS] || "#888888"
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Distributie Task-uri</CardTitle>
                <CardDescription>Status-ul curent al tuturor task-urilor</CardDescription>
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