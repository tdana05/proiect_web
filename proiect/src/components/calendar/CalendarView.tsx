import { useState, useEffect } from 'react'
import { CalendarGrid } from './CalendarGrid'
import { CalendarHeader } from './CalendarHeader'
import { EventModal } from './EventModal'
import { EventFormModal } from './EventFormModal'
import type { Event } from '../../types'
import { eventService } from '../../services/eventService' 
import { useAuth } from '../../context/AuthContext'  

export function CalendarView() {
    const { user, isAdmin } = useAuth()  // ← folosește auth real
    const [currentDate, setCurrentDate] = useState(new Date())
    const [events, setEvents] = useState<Event[]>([])
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingEvent, setEditingEvent] = useState<Event | null>(null)
    const [loading, setLoading] = useState(true)

    // Încarcă evenimente la schimbarea lunii
    useEffect(() => {
        loadEvents()
    }, [currentDate])

    const loadEvents = async () => {
        setLoading(true)
        try {
            const month = currentDate.getMonth() + 1
            const year = currentDate.getFullYear()
            const data = await eventService.getAll(month, year)
            setEvents(data)
        } catch (error) {
            console.error('Failed to load events:', error)
        } finally {
            setLoading(false)
        }
    }

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
    }

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
    }

    const handleToday = () => {
        setCurrentDate(new Date())
    }

    const handleAddEvent = () => {
        setEditingEvent(null)
        setIsFormOpen(true)
    }

    const handleEditEvent = (event: Event) => {
        setEditingEvent(event)
        setIsFormOpen(true)
        setSelectedEvent(null)
    }

    const handleDeleteEvent = async (eventId: string) => {
        if (confirm('Sigur dorești să ștergi acest eveniment?')) {
            try {
                await eventService.delete(eventId)
                await loadEvents()
                setSelectedEvent(null)
            } catch (error) {
                console.error('Failed to delete event:', error)
                alert('Eroare la ștergerea evenimentului')
            }
        }
    }

    const handleSubmitEvent = async (eventData: Omit<Event, 'id'>) => {
        if (!user) return
        try {
            await eventService.create(eventData, parseInt(user.id))
            await loadEvents()
            setIsFormOpen(false)
        } catch (error) {
            console.error('Failed to create event:', error)
            alert('Eroare la crearea evenimentului')
        }
    }

    const handleUpdateEvent = async (id: string, eventData: Omit<Event, 'id'>) => {
        try {
            const attendeeIds = eventData.attendees.map(a => parseInt(a))
            await eventService.update(id, eventData, attendeeIds)
            await loadEvents()
            setIsFormOpen(false)
            setEditingEvent(null)
        } catch (error) {
            console.error('Failed to update event:', error)
            alert('Eroare la actualizarea evenimentului')
        }
    }

    const handleToggleAttend = async (eventId: string) => {
        if (!user) return
        try {
            await eventService.toggleAttend(eventId, parseInt(user.id))
            await loadEvents()
            const updatedEvent = events.find(e => e.id === eventId)
            if (updatedEvent) {
                setSelectedEvent(updatedEvent)
            }
        } catch (error) {
            console.error('Failed to toggle attendance:', error)
            alert('Eroare la modificarea participării')
        }
    }

    if (loading) {
        return <div className="flex justify-center p-8">Se încarcă...</div>
    }

    return (
        <div className="space-y-4">
            <CalendarHeader
                currentDate={currentDate}
                onPrev={handlePrevMonth}
                onNext={handleNextMonth}
                onToday={handleToday}
                onAdd={isAdmin ? handleAddEvent : undefined}
                isAdmin={isAdmin}
            />

            <CalendarGrid
                currentDate={currentDate}
                events={events}
                onEventClick={setSelectedEvent}
            />

            {selectedEvent && (
                <EventModal
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                    onEdit={isAdmin ? handleEditEvent : undefined}
                    onDelete={isAdmin ? handleDeleteEvent : undefined}
                    onToggleAttend={!isAdmin ? handleToggleAttend : undefined}
                    isAdmin={isAdmin}
                    currentUserId={user?.id}
                />
            )}

            {isFormOpen && isAdmin && (
                <EventFormModal
                    onClose={() => {
                        setIsFormOpen(false)
                        setEditingEvent(null)
                    }}
                    onSubmit={handleSubmitEvent}
                    onUpdate={handleUpdateEvent}
                    initialEvent={editingEvent}
                    isEditing={!!editingEvent}
                />
            )}
        </div>
    )
}