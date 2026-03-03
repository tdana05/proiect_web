"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useHours } from "@/hooks/useHours";
import {
    HoursSummary,
    HoursFilters,
    HoursTable,
    AddHoursDialog,
    ReviewDialog,
    EditHoursDialog,
} from "@/components/hours";

export default function HoursPage() {
    const {
        user,
        isAdmin,
        entries,
        searchQuery,
        setSearchQuery,
        filterStatus,
        setFilterStatus,
        showAddDialog,
        setShowAddDialog,
        reviewEntry,
        setReviewEntry,
        adminNote,
        setAdminNote,
        editEntry,
        setEditEntry,
        editHours,
        setEditHours,
        formErrors,
        tasks,
        events,
        totalApproved,
        totalPending,
        handleAdd,
        handleApprove,
        handleReject,
        handleEditHours,
    } = useHours();

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Ore Voluntariat</h1>
                    <p className="text-sm text-muted-foreground">
                        {isAdmin
                            ? "Verificati si gestionati orele voluntarilor"
                            : "Inregistrati si urmariti orele de voluntariat"}
                    </p>
                </div>
                {!isAdmin && (
                    <Button onClick={() => setShowAddDialog(true)}>
                        <Plus className="mr-2 size-4" />
                        Adauga Ore
                    </Button>
                )}
            </div>

            <HoursSummary
                totalApproved={totalApproved}
                totalPending={totalPending}
                totalEntries={entries.length}
            />

            <HoursFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                filterStatus={filterStatus}
                onStatusChange={setFilterStatus}
            />

            <Card>
                <CardContent className="p-0">
                    <HoursTable
                        entries={entries}
                        isAdmin={isAdmin}
                        tasks={tasks}
                        events={events}
                        onReview={setReviewEntry}
                        onEdit={setEditEntry}
                    />
                </CardContent>
            </Card>

            <AddHoursDialog
                open={showAddDialog}
                onOpenChange={setShowAddDialog}
                onSubmit={handleAdd}
                errors={formErrors}
                tasks={tasks}
                events={events}
                userId={user?.id || ""}
            />

            <ReviewDialog
                entry={reviewEntry}
                onOpenChange={() => setReviewEntry(null)}
                adminNote={adminNote}
                onAdminNoteChange={setAdminNote}
                onApprove={handleApprove}
                onReject={handleReject}
                tasks={tasks}
                events={events}
            />

            <EditHoursDialog
                entry={editEntry}
                onOpenChange={() => setEditEntry(null)}
                editHours={editHours}
                onEditHoursChange={setEditHours}
                onSave={handleEditHours}
            />
        </div>
    );
}