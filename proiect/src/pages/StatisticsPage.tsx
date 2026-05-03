import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/statistics/StatCard';
import { HoursChart } from '../components/statistics/HoursChart';
import { TasksChart } from '../components/statistics/TasksChart';
import { TopVolunteers } from '../components/statistics/TopVolunteers';
import { dataService } from '../services/dataService';
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

  useEffect(() => {
    const volunteers = dataService.getVolunteers();
    const hours = dataService.getVolunteerHours();
    const tasks = dataService.getTasks();
    const events = dataService.getEvents();

    const today = new Date();
    
    setStats({
      totalVolunteers: volunteers.length,
      activeVolunteers: volunteers.filter(v => v.status === 'active').length,
      totalHours: hours.reduce((sum, h) => sum + h.hours, 0),
      completedTasks: tasks.filter(t => t.status === 'done').length,
      totalEvents: events.length,
      upcomingEvents: events.filter(e => new Date(e.startDate) > today).length,
    });
  }, []);

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
