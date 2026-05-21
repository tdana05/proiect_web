import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { statisticsService } from '../../services/statisticsService';

interface TaskStats {
  status: string;
  count: number;
  color: string;
}

export function TasksChart() {
  const [taskStats, setTaskStats] = useState<TaskStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await statisticsService.getTaskStatus();
      setTaskStats(data);
    } catch (error) {
      console.error('Failed to load task status:', error);
    } finally {
      setLoading(false);
    }
  };

  const total = taskStats.reduce((sum, s) => sum + s.count, 0);

  if (loading) {
    return (
        <Card>
          <CardHeader>
            <CardTitle>Status Task-uri</CardTitle>
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
          <CardTitle>Status Task-uri</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {taskStats.map((stat, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{stat.status}</span>
                    <span className="font-medium">{stat.count}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                        className={`h-full ${stat.color} transition-all`}
                        style={{ width: total > 0 ? `${(stat.count / total) * 100}%` : '0%' }}
                    />
                  </div>
                </div>
            ))}
          </div>
          {total === 0 && (
              <p className="text-center text-muted-foreground py-8">
                Nu exista task-uri.
              </p>
          )}
        </CardContent>
      </Card>
  );
}