import { useState } from 'react'
import type { Task } from '../../types'
import { dataService } from '../../services/dataService'
import { Modal } from '../ui/Modal'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'

interface Props {
  userId: string
  onClose: () => void
  onSubmit: (data: Omit<Task, 'id'>) => void
}

const priorityOptions = [
  { value: 'low', label: 'Normal' },
  { value: 'medium', label: 'Mediu' },
  { value: 'high', label: 'Urgent' },
]

const categoryOptions = [
  { value: 'Design', label: 'Design' },
  { value: 'Comunicare', label: 'Comunicare' },
  { value: 'IT', label: 'IT' },
  { value: 'Evenimente', label: 'Evenimente' },
  { value: 'Fundraising', label: 'Fundraising' },
  { value: 'HR', label: 'HR' },
  { value: 'Administrativ', label: 'Administrativ' },
  { value: 'Educatie', label: 'Educatie' },
]

export function TaskFormModal({ userId, onClose, onSubmit }: Props) {
  const users = dataService.getUsers().filter(u => u.role === 'volunteer')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [assigneeId, setAssigneeId] = useState(users[0]?.id || '')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState<Task['priority']>('medium')
  const [category, setCategory] = useState('Comunicare')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const today = new Date().toISOString().split('T')[0]
    if (dueDate <= today) return alert('Data limita trebuie sa fie in viitor')
    onSubmit({
      title, description, assigneeId, dueDate, priority, category,
      status: 'PLANNED', ownerId: userId, createdAt: new Date().toISOString(),
    })
  }

  const userOptions = users.map(u => ({ value: u.id, label: u.name }))

  return (
    <Modal onClose={onClose} title="Task Nou">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input id="title" label="Titlu" value={title} onChange={e => setTitle(e.target.value)} required />
        <Textarea id="desc" label="Descriere" value={description} onChange={e => setDescription(e.target.value)} rows={3} />
        <Select id="assignee" label="Responsabil" options={userOptions} value={assigneeId} onChange={e => setAssigneeId(e.target.value)} />
        <Input id="dueDate" label="Data Limita" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
        <Select id="priority" label="Prioritate" options={priorityOptions} value={priority} onChange={e => setPriority(e.target.value as Task['priority'])} />
        <Select id="category" label="Categorie" options={categoryOptions} value={category} onChange={e => setCategory(e.target.value)} />
        <div className="flex gap-3">
          <Button type="submit">Creeaza</Button>
          <Button type="button" variant="outline" onClick={onClose}>Anuleaza</Button>
        </div>
      </form>
    </Modal>
  )
}
