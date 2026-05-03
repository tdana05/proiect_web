import { useState } from 'react'
import type { HoursEntry } from '../../types'
import { dataService } from '../../services/dataService'
import { Modal } from '../ui/Modal'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'

interface Props {
  userId: string
  onClose: () => void
  onSubmit: (data: Omit<HoursEntry, 'id'>) => void
}

export function HoursFormModal({ userId, onClose, onSubmit }: Props) {
  const tasks = dataService.getTasks().filter(t => t.assigneeId === userId)
  const events = dataService.getEvents()
  const [hours, setHours] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [relationType, setRelationType] = useState<'task' | 'event' | 'none'>('none')
  const [relatedId, setRelatedId] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const hoursNum = parseFloat(hours)
    if (isNaN(hoursNum) || hoursNum <= 0 || hoursNum > 24) return alert('Ore invalide (1-24)')
    onSubmit({
      volunteerId: userId,
      date,
      hours: hoursNum,
      description,
      status: 'pending',
      relatedTaskId: relationType === 'task' ? relatedId : undefined,
      relatedEventId: relationType === 'event' ? relatedId : undefined,
    })
  }

  const relationOptions = [
    { value: 'none', label: 'Fara asociere' },
    { value: 'task', label: 'Task' },
    { value: 'event', label: 'Eveniment' },
  ]
  const taskOptions = tasks.map(t => ({ value: t.id, label: t.title }))
  const eventOptions = events.map(e => ({ value: e.id, label: e.title }))

  return (
    <Modal onClose={onClose} title="Inregistreaza Ore">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input id="hours" label="Numar de Ore" type="number" min="0.5" max="24" step="0.5" value={hours} onChange={e => setHours(e.target.value)} required />
        <Input id="date" label="Data" type="date" value={date} onChange={e => setDate(e.target.value)} required />
        <Textarea id="desc" label="Descriere Activitate" value={description} onChange={e => setDescription(e.target.value)} rows={3} required />
        <Select id="relType" label="Asociaza cu" options={relationOptions} value={relationType} onChange={e => { setRelationType(e.target.value as 'task' | 'event' | 'none'); setRelatedId('') }} />
        {relationType === 'task' && taskOptions.length > 0 && (
          <Select id="taskId" label="Selecteaza Task" options={taskOptions} value={relatedId} onChange={e => setRelatedId(e.target.value)} />
        )}
        {relationType === 'event' && (
          <Select id="eventId" label="Selecteaza Eveniment" options={eventOptions} value={relatedId} onChange={e => setRelatedId(e.target.value)} />
        )}
        <div className="flex gap-3">
          <Button type="submit">Trimite</Button>
          <Button type="button" variant="outline" onClick={onClose}>Anuleaza</Button>
        </div>
      </form>
    </Modal>
  )
}
