"use client";

import { useStatistics } from "@/hooks/useStatistics";
import {
    KPICards,
    SecondaryStats,
    HoursLineChart,
    TasksPieChart,
    TopVolunteersBarChart,
    HoursStatusPieChart,
} from "@/components/statistics";

export default function StatisticsPage() {
    const {
        stats,
        pieData,
        topVolunteers,
        hoursByStatus,
        taskCompletionRate,
    } = useStatistics();

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Statistici</h1>
                <p className="text-sm text-muted-foreground">
                    Vizualizarea datelor organizatiei AMiCUS
                </p>
            </div>

            <KPICards
                totalVolunteers={stats.totalVolunteers}
                totalHours={stats.totalHours}
                totalTasks={stats.totalTasks}
                activeProjects={stats.activeProjects}
            />

            <SecondaryStats
                upcomingEvents={stats.upcomingEvents}
                taskCompletionRate={taskCompletionRate}
                pendingHours={stats.pendingHours}
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <HoursLineChart data={stats.hoursByMonth} />
                <TasksPieChart data={pieData} />
                <TopVolunteersBarChart data={topVolunteers} />
                <HoursStatusPieChart data={hoursByStatus} />
            </div>
        </div>
    );
}