import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { statisticsService } from '../../services/statisticsService';

export function HoursChart() {
    const [monthlyData, setMonthlyData] = useState<{ month: string; hours: number }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await statisticsService.getMonthlyHours();
            setMonthlyData(data);
        } catch (error) {
            console.error('Failed to load monthly hours:', error);
        } finally {
            setLoading(false);
        }
    };

    const maxHours = Math.max(...monthlyData.map(d => d.hours), 1);

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Ore Voluntariat pe Luna</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-48 flex items-center justify-center">
                        <div className="animate-pulse text-muted-foreground">Se încarcă...</div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Ore Voluntariat pe Luna</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-end gap-2 h-48">
                    {monthlyData.map((d, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                            <div
                                className="w-full bg-primary rounded-t transition-all"
                                style={{ height: `${(d.hours / maxHours) * 100}%`, minHeight: '4px' }}
                            />
                            <span className="text-xs text-muted-foreground">{d.month}</span>
                            <span className="text-xs font-medium">{d.hours}h</span>
                        </div>
                    ))}
                </div>
                {monthlyData.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                        Nu exista date disponibile.
                    </p>
                )}
            </CardContent>
        </Card>
    );
}