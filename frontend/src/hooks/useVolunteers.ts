import { useState, useMemo } from "react";
import { useAuth } from "@/lib/auth-context";
import { getUsers } from "@/lib/data-service";
import type { User } from "@/lib/types";
import type { SortBy } from "@/types/volunteers";

export function useVolunteers() {
    const { user } = useAuth();
    const isAdmin = user?.role === "admin";
    const [users] = useState<User[]>(() => getUsers());
    const [searchQuery, setSearchQuery] = useState("");
    const [filterDepartment, setFilterDepartment] = useState<string>("all");
    const [sortBy, setSortBy] = useState<SortBy>("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const departments = useMemo(() => {
        const deps = new Set(users.map((u) => u.department).filter(Boolean));
        return Array.from(deps) as string[];
    }, [users]);

    const volunteers = useMemo(() => {
        let result = users.filter((u) => u.role === "volunteer");

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (u) =>
                    u.name.toLowerCase().includes(q) ||
                    u.email.toLowerCase().includes(q) ||
                    u.department?.toLowerCase().includes(q)
            );
        }

        if (filterDepartment !== "all") {
            result = result.filter((u) => u.department === filterDepartment);
        }

        result.sort((a, b) => {
            let cmp = 0;
            switch (sortBy) {
                case "name":
                    cmp = a.name.localeCompare(b.name);
                    break;
                case "hours":
                    cmp = a.totalHours - b.totalHours;
                    break;
                case "tasks":
                    cmp = a.tasksCompleted - b.tasksCompleted;
                    break;
                case "joinDate":
                    cmp = new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
                    break;
                default:
                    cmp = 0;
            }
            return sortOrder === "desc" ? -cmp : cmp;
        });

        return result;
    }, [users, searchQuery, filterDepartment, sortBy, sortOrder]);

    const toggleSortOrder = () => {
        setSortOrder(prev => prev === "asc" ? "desc" : "asc");
    };

    return {
        isAdmin,
        volunteers,
        departments,
        searchQuery,
        setSearchQuery,
        filterDepartment,
        setFilterDepartment,
        sortBy,
        setSortBy,
        sortOrder,
        toggleSortOrder,
        selectedUser,
        setSelectedUser,
    };
}