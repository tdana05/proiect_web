import { useState } from 'react'
import { CalendarGrid } from './CalendarGrid'
import { CalendarHeader } from './CalendarHeader'
import { EventModal } from './EventModal'
import { EventFormModal } from './EventFormModal'
import type { Event } from '../../types'
import { dataService } from '../../services/dataService'

export function CalendarView() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [events, setEvents] = useState<Event[]>(dataService.getEvents())
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingEvent, setEditingEvent] = useState<Event | null>(null)

    // Verifică dacă utilizatorul este admin (ajustează după structura ta)
    const user = { role: 'admin' } // Înlocuiește cu auth real
    const isAdmin = user?.role === 'admin'

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
        setSelectedEvent(null) // Închide modalul de vizualizare
    }

    const handleDeleteEvent = (eventId: string) => {
        dataService.deleteEvent(eventId)
        setEvents(dataService.getEvents())
    }

    const handleSubmitEvent = (eventData: Omit<Event, 'id'>) => {
        const newEvent = dataService.addEvent(eventData)
        setEvents([...events, newEvent])
    }

    const handleUpdateEvent = (id: string, eventData: Omit<Event, 'id'>) => {
        dataService.updateEvent(id, eventData)
        setEvents(dataService.getEvents())
    }

    return (
        <div className="space-y-4">
            <CalendarHeader
                currentDate={currentDate}
                onPrev={handlePrevMonth}
                onNext={handleNextMonth}
                onToday={handleToday}
                onAdd={handleAddEvent}
                isAdmin={isAdmin}
            />

            <CalendarGrid
                currentDate={currentDate}
                events={events}
                onEventClick={setSelectedEvent}
            />

            {/* Modal vizualizare eveniment */}
            {selectedEvent && (
                <EventModal
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                    onEdit={handleEditEvent}
                    onDelete={handleDeleteEvent}
                    isAdmin={isAdmin}
                />
            )}

            {/* Modal adăugare/editare eveniment */}
            {isFormOpen && (
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