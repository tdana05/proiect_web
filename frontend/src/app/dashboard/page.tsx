"use client";

import { useDashboard } from "@/hooks/useDashboard";
import {
    KPICards,
    MyTasks,
    UpcomingEvents,
    RecentAnnouncements,
    ActiveProjects,
} from "@/components/dashboard";
import { getGreeting } from "@/types/dashboard";

export default function DashboardPage() {
    const { user, stats, announcements, events, myTasks, activeProjects } = useDashboard();
    const greeting = getGreeting();

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                    {greeting}, {user?.name?.split(" ")[0]}!
                </h1>
                <p className="text-sm text-muted-foreground">
                    Iata un rezumat al activitatilor organizatiei AMiCUS.
                </p>
            </div>

            <KPICards
                totalVolunteers={stats.totalVolunteers}
                totalHours={stats.totalHours}
                completedTasks={stats.completedTasks}
                totalTasks={stats.totalTasks}
                upcomingEvents={stats.upcomingEvents}
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <MyTasks tasks={myTasks} />
                <UpcomingEvents events={events} />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <RecentAnnouncements announcements={announcements} />
                <ActiveProjects projects={activeProjects} />
            </div>
        </div>
    );
}