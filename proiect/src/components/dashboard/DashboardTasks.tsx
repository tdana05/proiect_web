import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { dashboardService } from '../../services/dashboardService';
import { formatDate } from '../../lib/utils';

interface Props {
  userId: string;
  isAdmin: boolean;
}

const statusColors: Record<string, 'default' | 'warning' | 'success' | 'destructive'> = {
  PLANNED: 'secondary',
  IN_PROGRESS: 'default',
  BLOCKED: 'destructive',
  REVIEW: 'warning',
  DONE: 'success',
};

export function DashboardTasks({ userId, isAdmin }: Props) {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await dashboardService.getRecentTasks(userId, isAdmin);
        setTasks(data);
      } catch (error) {
        console.error('Failed to load tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, [userId, isAdmin]);

  if (loading) {
    return <Card className="h-64 animate-pulse" />;
  }

  return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Task-uri Recente</CardTitle>
          <Button size="sm" variant="ghost" onClick={() => navigate('/dashboard/tasks')}>
            Vezi toate
          </Button>
        </CardHeader>
        <CardContent>
          {tasks.length === 0 ? (
              <p className="text-muted-foreground text-sm">Nu ai task-uri active</p>
          ) : (
              <div className="space-y-3">
                {tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{task.title}</p>
                        <p className="text-xs text-muted-foreground">Termen: {formatDate(task.dueDate)}</p>
                      </div>
                      <Badge variant={statusColors[task.status]}>
                        {task.status?.replace('_', ' ') || 'PLANNED'}
                      </Badge>
                    </div>
                ))}
              </div>
          )}
        </CardContent>
      </Card>
  );
}