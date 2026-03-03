import { useMemo } from "react";
import { getStats, getUsers, getHoursEntries, getTasks } from "@/lib/data-service";
import type { TopVolunteer } from "@/types/statistics";
import { STATUS_LABELS } from "@/types/statistics";

export function useStatistics() {
    const stats = useMemo(() => getStats(), []);
    const users = useMemo(() => getUsers(), []);
    const hours = useMemo(() => getHoursEntries(), []);
    const tasks = useMemo(() => getTasks(), []);

    const pieData = useMemo(
        () =>
            Object.entries(stats.tasksByStatus).map(([status, count]) => ({
                name: STATUS_LABELS[status as keyof typeof STATUS_LABELS],
                value: count,
                status: status,
            })),
        [stats.tasksByStatus]
    );

    const topVolunteers = useMemo<TopVolunteer[]>(
        () =>
            users
                .filter((u) => u.role === "volunteer")
                .sort((a, b) => b.totalHours - a.totalHours)
                .slice(0, 5)
                .map((u) => ({
                    name: u.name.split(" ")[0],
                    ore: u.totalHours,
                    taskuri: u.tasksCompleted,
                })),
        [users]
    );

    const hoursByStatus = useMemo(() => {
        const approved = hours.filter((h) => h.status === "approved").reduce((s, h) => s + h.hours, 0);
        const pending = hours.filter((h) => h.status === "pending").reduce((s, h) => s + h.hours, 0);
        const rejected = hours.filter((h) => h.status === "rejected").reduce((s, h) => s + h.hours, 0);
        return [
            { name: "Aprobate", value: approved },
            { name: "In Asteptare", value: pending },
            { name: "Respinse", value: rejected },
        ];
    }, [hours]);

    const taskCompletionRate = stats.totalTasks > 0
        ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
        : 0;

    return {
        stats,
        users,
        hours,
        tasks,
        pieData,
        topVolunteers,
        hoursByStatus,
        taskCompletionRate,
    };
}