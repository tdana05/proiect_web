import { useState, useMemo } from "react";
import { useAuth } from "@/lib/auth-context";
import {
    getAnnouncements,
    createAnnouncement,
    deleteAnnouncement,
} from "@/lib/data-service";
import type { Announcement } from "@/lib/types";
import type { AnnouncementFormData } from "@/types/announcements";
import { toast } from "sonner";

export function useAnnouncements() {
    const { user } = useAuth();
    const isAdmin = user?.role === "admin";
    const [announcements, setAnnouncements] = useState<Announcement[]>(() => getAnnouncements());
    const [searchQuery, setSearchQuery] = useState("");
    const [filterPriority, setFilterPriority] = useState<string>("all");
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const filteredAnnouncements = useMemo(() => {
        let result = [...announcements];
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (a) => a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q)
            );
        }
        if (filterPriority !== "all") {
            result = result.filter((a) => a.priority === filterPriority);
        }
        result.sort((a, b) => {
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        return result;
    }, [announcements, searchQuery, filterPriority]);

    const validateForm = (formData: AnnouncementFormData) => {
        const errs: Record<string, string> = {};
        if (!formData.title.trim()) errs.title = "Titlul este obligatoriu.";
        if (formData.title.trim().length < 3) errs.title = "Titlul trebuie sa aiba minim 3 caractere.";
        if (!formData.content.trim()) errs.content = "Continutul este obligatoriu.";
        if (formData.content.trim().length < 10) errs.content = "Continutul trebuie sa aiba minim 10 caractere.";
        setFormErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleCreate = (formData: AnnouncementFormData) => {
        if (!validateForm(formData) || !user) return false;

        const newAnnouncement = createAnnouncement({
            title: formData.title,
            content: formData.content,
            priority: formData.priority,
            pinned: formData.pinned,
            createdBy: user.id,
            createdAt: new Date().toISOString(),
        });

        setAnnouncements((prev) => [newAnnouncement, ...prev]);
        toast.success("Anuntul a fost creat cu succes!");
        return true;
    };

    const handleDelete = () => {
        if (!deleteId) return;
        deleteAnnouncement(deleteId);
        setAnnouncements((prev) => prev.filter((a) => a.id !== deleteId));
        setDeleteId(null);
        toast.success("Anuntul a fost sters.");
    };

    return {
        user,
        isAdmin,
        announcements: filteredAnnouncements,
        searchQuery,
        setSearchQuery,
        filterPriority,
        setFilterPriority,
        showCreateDialog,
        setShowCreateDialog,
        deleteId,
        setDeleteId,
        formErrors,
        setFormErrors,
        handleCreate,
        handleDelete,
    };
}