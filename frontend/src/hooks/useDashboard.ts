import { useMemo } from "react";
import { useAuth } from "@/lib/auth-context";
import {
    getStats,
    getAnnouncements,
    getTasks,
    getEvents,
    getProjects,
} from "@/lib/data-service";

export function useDashboard() {
    const { user } = useAuth();

    const stats = useMemo(() => getStats(), []);

    const announcements = useMemo(() => getAnnouncements().slice(0, 3), []);

    const events = useMemo(
        () =>
            getEvents()
                .filter((e) => new Date(e.date) >= new Date())
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .slice(0, 4),
        []
    );

    const myTasks = useMemo(
        () =>
            getTasks()
                .filter((t) => t.assigneeId === user?.id || t.ownerId === user?.id)
                .filter((t) => t.status !== "DONE")
                .slice(0, 5),
        [user?.id]
    );

    const activeProjects = useMemo(
        () => getProjects().filter((p) => p.status === "active").slice(0, 3),
        []
    );

    return {
        user,
        stats,
        announcements,
        events,
        myTasks,
        activeProjects,
    };
}