"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useDocuments } from "@/hooks/useDocuments";
import {
    DocumentFilters,
    DocumentTable,
    DocumentEmptyState,
    UploadDialog,
    DeleteConfirmDialog,
} from "@/components/documents";

export default function DocumentsPage() {
    const {
        isAdmin,
        documents,
        searchQuery,
        setSearchQuery,
        filterCategory,
        setFilterCategory,
        showUploadDialog,
        setShowUploadDialog,
        deleteId,
        setDeleteId,
        formErrors,
        handleUpload,
        handleDelete,
    } = useDocuments();

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Documente</h1>
                    <p className="text-sm text-muted-foreground">
                        Resursele si documentele organizatiei AMiCUS
                    </p>
                </div>
                {isAdmin && (
                    <Button onClick={() => setShowUploadDialog(true)}>
                        <Plus className="mr-2 size-4" />
                        Incarca Document
                    </Button>
                )}
            </div>

            <DocumentFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                filterCategory={filterCategory}
                onCategoryChange={setFilterCategory}
            />

            <Card>
                <CardContent className="p-0">
                    {documents.length === 0 ? (
                        <DocumentEmptyState />
                    ) : (
                        <DocumentTable
                            documents={documents}
                            isAdmin={isAdmin}
                            onDelete={setDeleteId}
                        />
                    )}
                </CardContent>
            </Card>

            <UploadDialog
                open={showUploadDialog}
                onOpenChange={setShowUploadDialog}
                onSubmit={handleUpload}
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