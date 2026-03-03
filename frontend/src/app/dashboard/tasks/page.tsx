"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";
import {
    StatusSummary,
    TaskFilters,
    TaskCard,
    TaskDetailDialog,
    CreateTaskDialog,
    DeleteConfirmDialog,
    EmptyState,
} from "@/components/tasks";

export default function TasksPage() {
    const {
        user,
        isAdmin,
        volunteers,
        tasks,
        statsByStatus,
        searchQuery,
        setSearchQuery,
        filterStatus,
        setFilterStatus,
        filterPriority,
        setFilterPriority,
        showCreateDialog,
        setShowCreateDialog,
        deleteId,
        setDeleteId,
        selectedTask,
        setSelectedTask,
        formData,
        formErrors,
        todayStr,
        handleFieldChange,
        handleCreate,
        handleStatusChange,
        handleDelete,
        getAvailableTransitions,
    } = useTasks();

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Task-uri</h1>
                    <p className="text-sm text-muted-foreground">
                        Gestionarea sarcinilor organizatiei AMiCUS
                    </p>
                </div>
                {isAdmin && (
                    <Button onClick={() => setShowCreateDialog(true)}>
                        <Plus className="mr-2 size-4" />
                        Task Nou
                    </Button>
                )}
            </div>

            <StatusSummary
                stats={statsByStatus}
                currentFilter={filterStatus}
                onFilterChange={setFilterStatus}
            />

            <TaskFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                filterPriority={filterPriority}
                onPriorityChange={setFilterPriority}
            />

            {tasks.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="flex flex-col gap-3">
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            isAdmin={isAdmin}
                            todayStr={todayStr}
                            availableTransitions={getAvailableTransitions(task)}
                            onSelect={setSelectedTask}
                            onStatusChange={handleStatusChange}
                            onDelete={setDeleteId}
                        />
                    ))}
                </div>
            )}

            <TaskDetailDialog
                task={selectedTask}
                onOpenChange={() => setSelectedTask(null)}
                availableTransitions={selectedTask ? getAvailableTransitions(selectedTask) : []}
                onStatusChange={handleStatusChange}
            />

            <CreateTaskDialog
                open={showCreateDialog}
                onOpenChange={setShowCreateDialog}
                formData={formData}
                errors={formErrors}
                volunteers={volunteers}
                onFieldChange={handleFieldChange}
                onSubmit={handleCreate}
            />

            <DeleteConfirmDialog
                open={!!deleteId}
                onOpenChange={() => setDeleteId(null)}
                onConfirm={handleDelete}
            />
        </div>
    );
}