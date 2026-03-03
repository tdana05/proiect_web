import { useState, useMemo, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";
import {
    getEvents,
    createEvent,
    deleteEvent,
} from "@/lib/data-service";
import type { Event } from "@/lib/types";
import type { EventFormData } from "@/types/calendar";
import { EVENT_COLORS, getTodayString } from "@/types/calendar";
import { toast } from "sonner";

export function useCalendar() {
    const { user } = useAuth();
    const isAdmin = user?.role === "admin";
    const [events, setEvents] = useState<Event[]>(() => getEvents());
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const todayStr = useMemo(() => getTodayString(), []);

    const eventsForDate = useCallback(
        (date: string) => events.filter((e) => e.date === date),
        [events]
    );

    const selectedDayEvents = useMemo(
        () => (selectedDate ? eventsForDate(selectedDate) : []),
        [selectedDate, eventsForDate]
    );

    const upcomingEvents = useMemo(() => {
        return events
            .filter((e) => e.date >= todayStr)
            .sort((a, b) => a.date.localeCompare(b.date))
            .slice(0, 5);
    }, [events, todayStr]);

    const validateForm = (formData: EventFormData) => {
        const errs: Record<string, string> = {};
        if (!formData.title.trim()) errs.title = "Titlul este obligatoriu.";
        if (!formData.date) errs.date = "Data este obligatorie.";
        if (!formData.location.trim()) errs.location = "Locatia este obligatorie.";
        if (formData.date && new Date(formData.date) < new Date(todayStr)) {
            errs.date = "Data trebuie sa fie in viitor.";
        }
        if (formData.endDate && formData.endDate < formData.date) {
            errs.endDate = "Data sfarsit trebuie sa fie dupa data inceput.";
        }
        setFormErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleCreate = (formData: EventFormData) => {
        if (!validateForm(formData) || !user) return false;

        const newEvent = createEvent({
            title: formData.title,
            description: formData.description,
            date: formData.date,
            endDate: formData.endDate || undefined,
            location: formData.location,
            type: formData.type,
            createdBy: user.id,
            attendees: [user.id],
            color: EVENT_COLORS[formData.type],
        });

        setEvents((prev) => [newEvent, ...prev]);
        toast.success("Evenimentul a fost creat cu succes!");
        return true;
    };

    const handleDelete = () => {
        if (!deleteId) return;
        deleteEvent(deleteId);
        setEvents((prev) => prev.filter((e) => e.id !== deleteId));
        setDeleteId(null);
        setSelectedEvent(null);
        toast.success("Evenimentul a fost sters.");
    };

    return {
        user,
        isAdmin,
        events,
        currentDate,
        setCurrentDate,
        selectedDate,
        setSelectedDate,
        selectedEvent,
        setSelectedEvent,
        showCreateDialog,
        setShowCreateDialog,
        deleteId,
        setDeleteId,
        formErrors,
        setFormErrors,
        todayStr,
        eventsForDate,
        selectedDayEvents,
        upcomingEvents,
        handleCreate,
        handleDelete,
    };
}