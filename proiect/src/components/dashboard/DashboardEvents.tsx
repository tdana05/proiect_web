import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { dashboardService } from '../../services/dashboardService';

export function DashboardEvents() {
    const navigate = useNavigate();
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const data = await dashboardService.getRecentEvents();
                setEvents(data);
            } catch (error) {
                console.error('Failed to load events:', error);
            } finally {
                setLoading(false);
            }
        };
        loadEvents();
    }, []);

    if (loading) {
        return <Card className="h-64 animate-pulse" />;
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Evenimente Viitoare</CardTitle>
                <Button size="sm" variant="ghost" onClick={() => navigate('/dashboard/calendar')}>
                    Vezi calendar
                </Button>
            </CardHeader>
            <CardContent>
                {events.length === 0 ? (
                    <p className="text-muted-foreground text-sm">Nu sunt evenimente programate</p>
                ) : (
                    <div className="space-y-3">
                        {events.map((event) => (
                            <div key={event.id} className="p-3 rounded-lg bg-secondary/50">
                                <div className="flex items-start gap-3">
                                    <div
                                        className="w-1 h-12 rounded-full shrink-0"
                                        style={{ backgroundColor: event.color || '#3b82f6' }}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium">{event.title}</p>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {new Date(event.date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'short' })}
                                            </span>
                                            <span className="flex items-center gap-1 truncate">
                                                <MapPin className="h-3 w-3 shrink-0" />
                                                {event.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}