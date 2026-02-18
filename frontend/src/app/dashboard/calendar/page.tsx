"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCalendar } from "@/hooks/useCalendar";
import {
    CalendarGrid,
    SidePanel,
    EventDetailDialog,
    CreateEventDialog,
    DeleteConfirmDialog,
} from "@/components/calendar";

export default function CalendarPage() {
    const {
        isAdmin,
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
        todayStr,
        eventsForDate,
        selectedDayEvents,
        upcomingEvents,
        handleCreate,
        handleDelete,
    } = useCalendar();

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Calendar</h1>
                    <p className="text-sm text-muted-foreground">
                        Planificarea evenimentelor organizatiei AMiCUS
                    </p>
                </div>
                {isAdmin && (
                    <Button onClick={() => setShowCreateDialog(true)}>
                        <Plus className="mr-2 size-4" />
                        Eveniment Nou
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
                <CalendarGrid
                    currentDate={currentDate}
                    onPrevMonth={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                    onNextMonth={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                    onToday={() => setCurrentDate(new Date())}
                    eventsForDate={eventsForDate}
                    onSelectDate={setSelectedDate}
                    selectedDate={selectedDate}
                    todayStr={todayStr}
                />

                <SidePanel
                    selectedDate={selectedDate}
                    selectedDayEvents={selectedDayEvents}
                    upcomingEvents={upcomingEvents}
                    onSelectEvent={setSelectedEvent}
                />
            </div>

            <EventDetailDialog
                event={selectedEvent}
                onOpenChange={() => setSelectedEvent(null)}
                isAdmin={isAdmin}
                onDelete={setDeleteId}
            />

            <CreateEventDialog
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