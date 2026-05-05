import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { eventService } from '../services/eventService'; // ← schimbă aici
import { CalendarHeader } from '../components/calendar/CalendarHeader';
import { CalendarGrid } from '../components/calendar/CalendarGrid';
import { EventModal } from '../components/calendar/EventModal';
import { EventFormModal } from '../components/calendar/EventFormModal';
import type { Event } from '../types';

export default function CalendarPage() {
  const { user, isAdmin } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Încarcă evenimente la schimbarea lunii
  useEffect(() => {
    loadEvents();
  }, [currentDate]);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const data = await eventService.getAll(month, year);
      setEvents(data);
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const eventDate = new Date(e.date);
      return eventDate.getMonth() === currentDate.getMonth() &&
          eventDate.getFullYear() === currentDate.getFullYear();
    });
  }, [events, currentDate]);

  const handleCreateEvent = async (data: Omit<Event, 'id'>) => {
    if (!user) return;
    try {
      await eventService.create(data, parseInt(user.id));
      await loadEvents();
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create event:', error);
      alert('Eroare la crearea evenimentului');
    }
  };

  const handleUpdateEvent = async (id: string, data: Omit<Event, 'id'>) => {
    try {
      const attendeeIds = data.attendees.map(a => parseInt(a));
      await eventService.update(id, data, attendeeIds);
      await loadEvents();
      setShowForm(false);
      setEditingEvent(null);
    } catch (error) {
      console.error('Failed to update event:', error);
      alert('Eroare la actualizarea evenimentului');
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (confirm('Sigur dorești să ștergi acest eveniment?')) {
      try {
        await eventService.delete(eventId);
        await loadEvents();
        setSelectedEvent(null);
      } catch (error) {
        console.error('Failed to delete event:', error);
        alert('Eroare la ștergerea evenimentului');
      }
    }
  };

  const handleToggleAttend = async (eventId: string) => {
    if (!user) return;
    try {
      await eventService.toggleAttend(eventId, parseInt(user.id));

      // Reîncarcă toate evenimentele (pentru grid)
      await loadEvents();

      // Reîncarcă evenimentul selectat (pentru modal)
      const updatedEvent = await eventService.getById(eventId);
      if (updatedEvent) {
        setSelectedEvent(updatedEvent);
      }
    } catch (error) {
      console.error('Failed to toggle attendance:', error);
      alert('Eroare la modificarea participării');
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Se încarcă...</div>;
  }

  return (
      <div className="space-y-6">
        <CalendarHeader
            currentDate={currentDate}
            onPrev={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            onNext={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            onToday={() => setCurrentDate(new Date())}
            onAdd={isAdmin ? () => setShowForm(true) : undefined}
            isAdmin={isAdmin}
        />

        <CalendarGrid
            currentDate={currentDate}
            events={filteredEvents}
            onEventClick={setSelectedEvent}
        />

        {selectedEvent && (
            <EventModal
                event={selectedEvent}
                onClose={() => setSelectedEvent(null)}
                onEdit={isAdmin ? (event) => {
                  setEditingEvent(event);
                  setSelectedEvent(null);
                  setShowForm(true);
                } : undefined}
                onDelete={isAdmin ? handleDeleteEvent : undefined}
                onToggleAttend={!isAdmin ? handleToggleAttend : undefined}
                isAdmin={isAdmin}
                currentUserId={user?.id}
            />
        )}

        {showForm && isAdmin && (
            <EventFormModal
                onClose={() => {
                  setShowForm(false);
                  setEditingEvent(null);
                }}
                onSubmit={handleCreateEvent}
                onUpdate={handleUpdateEvent}
                initialEvent={editingEvent}
                isEditing={!!editingEvent}
            />
        )}
      </div>
  );
}