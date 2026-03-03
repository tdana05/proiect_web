import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { STATUS_COLORS } from "@/types/statistics";

interface TasksPieChartProps {
    data: any[];
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg border border-border bg-background p-2 shadow-sm">
                <p className="text-sm font-medium text-foreground">{payload[0].name}</p>
                <p className="text-xs text-muted-foreground">
                    Task-uri: <span className="font-bold" style={{ color: payload[0].payload.color }}>
            {payload[0].value}
          </span>
                </p>
            </div>
        );
    }
    return null;
};

export function TasksPieChart({ data }: TasksPieChartProps) {
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
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={3}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.status as keyof typeof STATUS_COLORS]} />
                                ))}
                            </Pie>
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