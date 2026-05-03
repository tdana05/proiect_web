import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { dataService } from '../../services/dataService';

interface TaskStats {
  status: string;
  count: number;
  color: string;
}

export function TasksChart() {
  const [taskStats, setTaskStats] = useState<TaskStats[]>([]);

  useEffect(() => {
    const tasks = dataService.getTasks();
    
    const statusConfig = [
      { status: 'planned', label: 'Planificat', color: 'bg-slate-400' },
      { status: 'in_progress', label: 'In progres', color: 'bg-blue-500' },
      { status: 'blocked', label: 'Blocat', color: 'bg-red-500' },
      { status: 'review', label: 'Review', color: 'bg-amber-500' },
      { status: 'done', label: 'Finalizat', color: 'bg-green-500' },
    ];

    const stats = statusConfig.map(config => ({
      status: config.label,
      count: tasks.filter(t => t.status === config.status).length,
      color: config.color,
    }));

    setTaskStats(stats);
  }, []);

  const total = taskStats.reduce((sum, s) => sum + s.count, 0);

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
