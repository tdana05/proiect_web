"use client";

import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useVolunteers } from "@/hooks/useVolunteers";
import {
    VolunteersSummary,
    VolunteerFilters,
    VolunteersTable,
    VolunteerDetailDialog,
} from "@/components/volunteers";
import { calculateSummary } from "@/types/volunteers";

export default function VolunteersPage() {
    const {
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
    } = useVolunteers();

    // Redirect non-admin to 403
    useEffect(() => {
        if (!isAdmin && typeof window !== "undefined") {
            window.location.href = "/403";
        }
    }, [isAdmin]);

    if (!isAdmin) return null;

    const summary = calculateSummary(volunteers);

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Voluntari</h1>
                <p className="text-sm text-muted-foreground">
                    Gestionarea voluntarilor organizatiei AMiCUS
                </p>
            </div>

            <VolunteersSummary
                totalVolunteers={summary.totalVolunteers}
                totalHours={summary.totalHours}
                totalTasks={summary.totalTasks}
                totalDepartments={summary.totalDepartments}
            />

            <VolunteerFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                filterDepartment={filterDepartment}
                onDepartmentChange={setFilterDepartment}
                sortBy={sortBy}
                onSortByChange={setSortBy}
                sortOrder={sortOrder}
                onSortOrderToggle={toggleSortOrder}
                departments={departments}
            />

            <Card>
                <CardContent className="p-0">
                    <VolunteersTable
                        volunteers={volunteers}
                        onSelectVolunteer={setSelectedUser}
                    />
                </CardContent>
            </Card>

            <VolunteerDetailDialog
                volunteer={selectedUser}
                onOpenChange={() => setSelectedUser(null)}
            />
        </div>
    );
}