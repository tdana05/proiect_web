import { useState, useMemo } from "react";
import { useAuth } from "@/lib/auth-context";
import {
    getHoursEntries,
    getHoursByVolunteer,
    createHoursEntry,
    updateHoursStatus,
    updateHoursEntry,
    getTasks,
    getEvents,
} from "@/lib/data-service";
import type { HoursEntry } from "@/lib/types";
import type { HoursFormData } from "@/types/hours";
import { toast } from "sonner";

export function useHours() {
    const { user } = useAuth();
    const isAdmin = user?.role === "admin";
    const [entries, setEntries] = useState<HoursEntry[]>(() =>
        isAdmin ? getHoursEntries() : getHoursByVolunteer(user?.id || "")
    );
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [reviewEntry, setReviewEntry] = useState<HoursEntry | null>(null);
    const [adminNote, setAdminNote] = useState("");
    const [editEntry, setEditEntry] = useState<HoursEntry | null>(null);
    const [editHours, setEditHours] = useState("");
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const tasks = useMemo(() => getTasks(), []);
    const events = useMemo(() => getEvents(), []);

    const filteredEntries = useMemo(() => {
        let result = [...entries];
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter((h) => h.description.toLowerCase().includes(q));
        }
        if (filterStatus !== "all") {
            result = result.filter((h) => h.status === filterStatus);
        }
        return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [entries, searchQuery, filterStatus]);

    const totalApproved = useMemo(
        () => filteredEntries.filter((h) => h.status === "approved").reduce((s, h) => s + h.hours, 0),
        [filteredEntries]
    );

    const totalPending = useMemo(
        () => filteredEntries.filter((h) => h.status === "pending").reduce((s, h) => s + h.hours, 0),
        [filteredEntries]
    );

    const validateForm = (formData: HoursFormData) => {
        const errs: Record<string, string> = {};
        if (!formData.date) errs.date = "Data este obligatorie.";
        if (!formData.hours || parseFloat(formData.hours) <= 0) errs.hours = "Numarul de ore trebuie sa fie pozitiv.";
        if (parseFloat(formData.hours) > 24) errs.hours = "Numarul de ore nu poate depasi 24.";
        if (!formData.description.trim()) errs.description = "Descrierea este obligatorie.";
        if (formData.description.trim().length < 5) errs.description = "Descrierea trebuie sa aiba minim 5 caractere.";
        setFormErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleAdd = (formData: HoursFormData) => {
        if (!validateForm(formData) || !user) return false;

        const newEntry = createHoursEntry({
            volunteerId: user.id,
            date: formData.date,
            hours: parseFloat(formData.hours),
            description: formData.description,
            relatedTaskId: formData.relatedTaskId || undefined,
            relatedEventId: formData.relatedEventId || undefined,
            status: "pending",
        });

        setEntries((prev) => [newEntry, ...prev]);
        toast.success("Inregistrarea de ore a fost adaugata. Asteapta aprobare de la admin.");
        return true;
    };

    const handleApprove = (id: string) => {
        const updated = updateHoursStatus(id, "approved", adminNote);
        if (updated) {
            setEntries(isAdmin ? getHoursEntries() : getHoursByVolunteer(user?.id || ""));
            setReviewEntry(null);
            setAdminNote("");
            toast.success("Orele au fost aprobate.");
        }
    };

    const handleReject = (id: string) => {
        if (!adminNote.trim()) {
            toast.error("Va rugam sa adaugati o nota explicativa pentru respingere.");
            return false;
        }
        const updated = updateHoursStatus(id, "rejected", adminNote);
        if (updated) {
            setEntries(isAdmin ? getHoursEntries() : getHoursByVolunteer(user?.id || ""));
            setReviewEntry(null);
            setAdminNote("");
            toast.success("Orele au fost respinse.");
            return true;
        }
        return false;
    };

    const handleEditHours = () => {
        if (!editEntry) return false;
        const newHours = parseFloat(editHours);
        if (isNaN(newHours) || newHours <= 0 || newHours > 24) {
            toast.error("Numarul de ore trebuie sa fie intre 0.5 si 24.");
            return false;
        }
        updateHoursEntry(editEntry.id, { hours: newHours });
        setEntries(isAdmin ? getHoursEntries() : getHoursByVolunteer(user?.id || ""));
        setEditEntry(null);
        setEditHours("");
        toast.success("Numarul de ore a fost corectat.");
        return true;
    };

    return {
        user,
        isAdmin,
        entries: filteredEntries,
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
        setFormErrors,
        tasks,
        events,
        totalApproved,
        totalPending,
        handleAdd,
        handleApprove,
        handleReject,
        handleEditHours,
    };
}