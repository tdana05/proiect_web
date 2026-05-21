import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/statistics/StatCard';
import { HoursChart } from '../components/statistics/HoursChart';
import { TasksChart } from '../components/statistics/TasksChart';
import { TopVolunteers } from '../components/statistics/TopVolunteers';
import { statisticsService } from '../services/statisticsService';
import { Users, Clock, CheckSquare, Calendar } from 'lucide-react';

export default function StatisticsPage() {
  const [stats, setStats] = useState({
    totalVolunteers: 0,
    activeVolunteers: 0,
    totalHours: 0,
    completedTasks: 0,
    totalEvents: 0,
    upcomingEvents: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    setLoading(true);
    try {
      const data = await statisticsService.getStatistics();
      setStats({
        totalVolunteers: data.totalVolunteers,
        activeVolunteers: data.activeVolunteers,
        totalHours: data.totalHours,
        completedTasks: data.completedTasks,
        totalEvents: data.totalEvents,
        upcomingEvents: data.upcomingEvents,
      });
    } catch (error) {
      console.error('Failed to load statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Se încarcă...</div>;
  }

  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Statistici</h1>
          <p className="text-muted-foreground">Prezentare generala a organizatiei</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
              title="Total Voluntari"
              value={stats.totalVolunteers}
              subtitle={`${stats.activeVolunteers} activi`}
              icon={<Users className="h-5 w-5" />}
          />
          <StatCard
              title="Ore Voluntariat"
              value={stats.totalHours}
              subtitle="Total ore inregistrate"
              icon={<Clock className="h-5 w-5" />}
          />
          <StatCard
              title="Task-uri Finalizate"
              value={stats.completedTasks}
              subtitle="Din totalul task-urilor"
              icon={<CheckSquare className="h-5 w-5" />}
          />
          <StatCard
              title="Evenimente"
              value={stats.totalEvents}
              subtitle={`${stats.upcomingEvents} viitoare`}
              icon={<Calendar className="h-5 w-5" />}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <HoursChart />
          <TasksChart />
        </div>

        <TopVolunteers />
      </div>
  );
}