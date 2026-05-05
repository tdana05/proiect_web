import { useState, useEffect } from 'react';
import { Users, Clock, ListTodo, Calendar, Hourglass } from 'lucide-react';
import { Card } from '../ui/Card';
import { dashboardService } from '../../services/dashboardService';

interface Props {
  userId: string;
  isAdmin: boolean;
}

export function DashboardStats({ userId, isAdmin }: Props) {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await dashboardService.getStats(isAdmin ? undefined : userId, isAdmin);
        setStats(data);
      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, [userId, isAdmin]);

  if (loading) {
    return <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
          <Card key={i} className="h-24 animate-pulse" />
      ))}
    </div>;
  }

  const statItems = isAdmin ? [
    { label: 'Total Voluntari', value: stats?.totalVolunteers || 0, icon: Users, color: 'text-blue-500' },
    { label: 'Ore Aprobate', value: stats?.totalApprovedHours || 0, icon: Clock, color: 'text-green-500' },
    { label: 'Task-uri Active', value: stats?.totalActiveTasks || 0, icon: ListTodo, color: 'text-amber-500' },
    { label: 'Evenimente', value: stats?.totalUpcomingEvents || 0, icon: Calendar, color: 'text-purple-500' },
  ] : [
    { label: 'Orele Mele', value: stats?.myHours || 0, icon: Clock, color: 'text-green-500' },
    { label: 'Task-uri Active', value: stats?.myActiveTasks || 0, icon: ListTodo, color: 'text-amber-500' },
    { label: 'Evenimente', value: stats?.myUpcomingEvents || 0, icon: Calendar, color: 'text-purple-500' },
    { label: 'Finalizate', value: stats?.myCompletedTasks || 0, icon: ListTodo, color: 'text-blue-500' },
  ];

  if (stats?.pendingHours && stats.pendingHours > 0 && !isAdmin) {
    statItems.push({
      label: 'Ore în Așteptare',
      value: stats.pendingHours,
      icon: Hourglass,
      color: 'text-yellow-500'
    });
  }

  return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((stat) => {
          const Icon = stat.icon;
          return (
              <Card key={stat.label} className="flex items-center gap-4 p-4">
                <div className={`p-3 rounded-lg bg-secondary ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </Card>
          );
        })}
      </div>
  );
}