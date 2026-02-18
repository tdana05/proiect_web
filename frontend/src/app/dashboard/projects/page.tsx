"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import {
    ProjectFilters,
    ProjectCard,
    ProjectDetailDialog,
    CreateProjectDialog,
    DeleteConfirmDialog,
    EmptyState,
} from "@/components/projects";

export default function ProjectsPage() {
    const {
        isAdmin,
        projects,
        searchQuery,
        setSearchQuery,
        filterStatus,
        setFilterStatus,
        showCreateDialog,
        setShowCreateDialog,
        deleteId,
        setDeleteId,
        selectedProject,
        setSelectedProject,
        formData,
        formErrors,
        allUsers,
        handleFieldChange,
        handleCreate,
        handleDelete,
    } = useProjects();

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Proiecte</h1>
                    <p className="text-sm text-muted-foreground">
                        Proiectele organizatiei AMiCUS
                    </p>
                </div>
                {isAdmin && (
                    <Button onClick={() => setShowCreateDialog(true)}>
                        <Plus className="mr-2 size-4" />
                        Proiect Nou
                    </Button>
                )}
            </div>

            <ProjectFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                filterStatus={filterStatus}
                onStatusChange={setFilterStatus}
            />

            {projects.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            isAdmin={isAdmin}
                            onSelect={setSelectedProject}
                            onDelete={setDeleteId}
                        />
                    ))}
                </div>
            )}

            <ProjectDetailDialog
                project={selectedProject}
                onOpenChange={() => setSelectedProject(null)}
            />

            <CreateProjectDialog
                open={showCreateDialog}
                onOpenChange={setShowCreateDialog}
                formData={formData}
                errors={formErrors}
                users={allUsers}
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