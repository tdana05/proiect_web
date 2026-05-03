import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import type { Event } from '../../types'
import { Modal } from '../ui/Modal'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'

interface Props {
  onClose: () => void
  onSubmit: (data: Omit<Event, 'id'>) => void
  onUpdate?: (id: string, data: Omit<Event, 'id'>) => void
  initialEvent?: Event | null
  isEditing?: boolean
}

const typeOptions = [
  { value: 'meeting', label: 'Sedinta' },
  { value: 'training', label: 'Training' },
  { value: 'event', label: 'Eveniment' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'fundraiser', label: 'Fundraiser' },
]

const colorOptions = [
  { value: '#0891b2', label: 'Cyan' },
  { value: '#059669', label: 'Verde' },
  { value: '#d97706', label: 'Portocaliu' },
  { value: '#7c3aed', label: 'Violet' },
  { value: '#dc2626', label: 'Rosu' },
]

export function EventFormModal({ onClose, onSubmit, onUpdate, initialEvent, isEditing = false }: Props) {
  const { user } = useAuth()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [type, setType] = useState<Event['type']>('event')
  const [color, setColor] = useState('#0891b2')

  // Populează formularul dacă edităm un eveniment existent
  useEffect(() => {
    if (initialEvent && isEditing) {
      setTitle(initialEvent.title)
      setDescription(initialEvent.description || '')
      setDate(initialEvent.date)
      setLocation(initialEvent.location)
      setType(initialEvent.type)
      setColor(initialEvent.color || '#0891b2')
    }
  }, [initialEvent, isEditing])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    if (!isEditing) {
      // Adăugare eveniment nou
      const minDate = new Date().toISOString().split('T')[0]
      if (date < minDate) return alert('Data trebuie sa fie in viitor')
      onSubmit({
        title,
        description,
        date,
        location,
        type,
        color,
        createdBy: user.id,
        attendees: [user.id]
      })
    } else {
      // Actualizare eveniment existent
      if (initialEvent) {
        onUpdate?.(initialEvent.id, {
          title,
          description,
          date,
          location,
          type,
          color,
          createdBy: initialEvent.createdBy,
          attendees: initialEvent.attendees
        })
      }
    }
    onClose()
  }

  return (
      <Modal onClose={onClose} title={isEditing ? "Editează Eveniment" : "Eveniment Nou"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
              id="title"
              label="Titlu"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
          />
          <Textarea
              id="desc"
              label="Descriere"
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
          />
          <Input
              id="date"
              label="Data"
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
          />
          <Input
              id="loc"
              label="Locatie"
              value={location}
              onChange={e => setLocation(e.target.value)}
              required
          />
          <Select
              id="type"
              label="Tip"
              options={typeOptions}
              value={type}
              onChange={e => setType(e.target.value as Event['type'])}
          />
          <Select
              id="color"
              label="Culoare"
              options={colorOptions}
              value={color}
              onChange={e => setColor(e.target.value)}
          />
          <div className="flex gap-3">
            <Button type="submit">{isEditing ? "Actualizează" : "Salvează"}</Button>
            <Button type="button" variant="outline" onClick={onClose}>Anulează</Button>
          </div>
        </form>
      </Modal>
  )
}