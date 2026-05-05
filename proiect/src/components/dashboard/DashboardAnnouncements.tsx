import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pin } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { dashboardService } from '../../services/dashboardService';
import { formatDateTime } from '../../lib/utils';

const priorityColors = {
    low: 'secondary',
    medium: 'warning',
    high: 'destructive',
} as const;

export function DashboardAnnouncements() {
    const navigate = useNavigate();
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAnnouncements = async () => {
            try {
                const data = await dashboardService.getRecentAnnouncements();
                setAnnouncements(data);
            } catch (error) {
                console.error('Failed to load announcements:', error);
            } finally {
                setLoading(false);
            }
        };
        loadAnnouncements();
    }, []);

    if (loading) {
        return <Card className="h-64 animate-pulse" />;
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Anunturi Recente</CardTitle>
                <Button size="sm" variant="ghost" onClick={() => navigate('/dashboard/announcements')}>
                    Vezi toate
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {announcements.map((announcement) => (
                        <div key={announcement.id} className="p-4 rounded-lg bg-secondary/50">
                            <div className="flex items-start justify-between gap-2 mb-2">
                                <div className="flex items-center gap-2">
                                    {announcement.pinned && <Pin className="h-4 w-4 text-primary" />}
                                    <h4 className="font-medium">{announcement.title}</h4>
                                </div>
                                <Badge variant={priorityColors[announcement.priority as keyof typeof priorityColors]}>
                                    {announcement.priority === 'high' ? 'Urgent' : announcement.priority === 'medium' ? 'Mediu' : 'Normal'}
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">{announcement.content}</p>
                            <p className="text-xs text-muted-foreground mt-2">{formatDateTime(announcement.createdAt)}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}