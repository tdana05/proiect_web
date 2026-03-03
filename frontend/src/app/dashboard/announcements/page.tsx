"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import {
    AnnouncementCard,
    AnnouncementFilters,
    CreateAnnouncementDialog,
    DeleteConfirmDialog,
    EmptyState,
} from "@/components/announcements";

export default function AnnouncementsPage() {
    const {
        isAdmin,
        announcements,
        searchQuery,
        setSearchQuery,
        filterPriority,
        setFilterPriority,
        showCreateDialog,
        setShowCreateDialog,
        deleteId,
        setDeleteId,
        formErrors,
        handleCreate,
        handleDelete,
    } = useAnnouncements();

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Anunturi</h1>
                    <p className="text-sm text-muted-foreground">
                        Anunturile organizatiei AMiCUS
                    </p>
                </div>
                {isAdmin && (
                    <Button onClick={() => setShowCreateDialog(true)}>
                        <Plus className="mr-2 size-4" />
                        Anunt Nou
                    </Button>
                )}
            </div>

            <AnnouncementFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                filterPriority={filterPriority}
                onPriorityChange={setFilterPriority}
            />

            {announcements.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="flex flex-col gap-4">
                    {announcements.map((announcement) => (
                        <AnnouncementCard
                            key={announcement.id}
                            announcement={announcement}
                            isAdmin={isAdmin}
                            onDelete={setDeleteId}
                        />
                    ))}
                </div>
            )}

            <CreateAnnouncementDialog
                open={showCreateDialog}
                onOpenChange={setShowCreateDialog}
                onSubmit={handleCreate}
                errors={formErrors}
            />

            <DeleteConfirmDialog
                open={!!deleteId}
                onOpenChange={() => setDeleteId(null)}
                onConfirm={handleDelete}
            />
        </div>
    );
}