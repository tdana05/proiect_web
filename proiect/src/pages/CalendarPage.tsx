import { useState, useMemo } from 'react'
import { useAuth } from '../context/AuthContext'
import { dataService } from '../services/dataService'
import { CalendarHeader } from '../components/calendar/CalendarHeader'
import { CalendarGrid } from '../components/calendar/CalendarGrid'
import { EventModal } from '../components/calendar/EventModal'
import { EventFormModal } from '../components/calendar/EventFormModal'
import type { Event } from '../types'

export default function CalendarPage() {
  const { isAdmin } = useAuth()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null) // Nou: evenimentul care se editează
  const [events, setEvents] = useState(dataService.getEvents())

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const eventDate = new Date(e.date)
      return eventDate.getMonth() === currentDate.getMonth() &&
          eventDate.getFullYear() === currentDate.getFullYear()
    })
  }, [events, currentDate])

  // Adăugare eveniment nou
  const handleCreateEvent = (data: Omit<Event, 'id'>) => {
    const newEvent = dataService.createEvent(data)
    setEvents(dataService.getEvents())
    setShowForm(false)
  }

  // Editare eveniment existent
  const handleEditEvent = (event: Event) => {
    setEditingEvent(event)
    setSelectedEvent(null) // Închide modalul de vizualizare
    setShowForm(true) // Deschide formularul de editare
  }

  
  // Actualizare eveniment
  const handleUpdateEvent = (id: string, data: Omit<Event, 'id'>) => {
    dataService.updateEvent(id, data) 
    setEvents(dataService.getEvents())
    setShowForm(false)
    setEditingEvent(null)
  }

  // Ștergere eveniment
  const handleDeleteEvent = (eventId: string) => {
    if (confirm('Sigur dorești să ștergi acest eveniment?')) {
      dataService.deleteEvent(eventId)
      setEvents(dataService.getEvents())
      setSelectedEvent(null) // Închide modalul dacă e deschis
    }
  }

  // Deschide formularul pentru eveniment nou
  const handleOpenCreateForm = () => {
    setEditingEvent(null)
    setShowForm(true)
  }

  return (
      <div className="space-y-6">
        <CalendarHeader
            currentDate={currentDate}
            onPrev={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            onNext={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            onToday={() => setCurrentDate(new Date())}
            onAdd={isAdmin ? handleOpenCreateForm : undefined}
            isAdmin={isAdmin}
        />

        <CalendarGrid
            currentDate={currentDate}
            events={filteredEvents}
            onEventClick={setSelectedEvent}
        />

        {/* Modal vizualizare eveniment - acum cu butoane de edit/ștergere */}
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
        {showForm && isAdmin && (
            <EventFormModal
                onClose={() => {
                  setShowForm(false)
                  setEditingEvent(null)
                }}
                onSubmit={handleCreateEvent}
                onUpdate={handleUpdateEvent}
                initialEvent={editingEvent}
                isEditing={!!editingEvent}
            />
        )}
      </div>
  )
}