import { useState, useMemo } from "react";
import { useAuth } from "@/lib/auth-context";
import {
    getDocuments,
    createDocument,
    deleteDocument,
} from "@/lib/data-service";
import type { Document } from "@/lib/types";
import type { DocumentFormData } from "@/types/documents";
import { toast } from "sonner";

export function useDocuments() {
    const { user } = useAuth();
    const isAdmin = user?.role === "admin";
    const [documents, setDocuments] = useState<Document[]>(() => getDocuments());
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCategory, setFilterCategory] = useState<string>("all");
    const [showUploadDialog, setShowUploadDialog] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const filteredDocuments = useMemo(() => {
        let result = [...documents];
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter((d) => d.name.toLowerCase().includes(q));
        }
        if (filterCategory !== "all") {
            result = result.filter((d) => d.category === filterCategory);
        }
        return result;
    }, [documents, searchQuery, filterCategory]);

    const validateForm = (formData: DocumentFormData) => {
        const errs: Record<string, string> = {};
        if (!formData.name.trim()) errs.name = "Numele fisierului este obligatoriu.";
        setFormErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleUpload = (formData: DocumentFormData) => {
        if (!validateForm(formData) || !user) return false;

        const newDoc = createDocument({
            name: formData.name,
            type: formData.type,
            category: formData.category,
            uploadedBy: user.id,
            uploadedAt: new Date().toISOString(),
            size: formData.size || "1.0 MB",
            url: "#",
        });

        setDocuments((prev) => [newDoc, ...prev]);
        toast.success("Documentul a fost incarcat cu succes!");
        return true;
    };

    const handleDelete = () => {
        if (!deleteId) return;
        deleteDocument(deleteId);
        setDocuments((prev) => prev.filter((d) => d.id !== deleteId));
        setDeleteId(null);
        toast.success("Documentul a fost sters.");
    };

    return {
        user,
        isAdmin,
        documents: filteredDocuments,
        searchQuery,
        setSearchQuery,
        filterCategory,
        setFilterCategory,
        showUploadDialog,
        setShowUploadDialog,
        deleteId,
        setDeleteId,
        formErrors,
        setFormErrors,
        handleUpload,
        handleDelete,
    };
}