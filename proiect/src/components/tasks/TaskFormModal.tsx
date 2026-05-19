import { useState, useEffect } from 'react'
import type { Task, User } from '../../types'
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
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [assigneeId, setAssigneeId] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState<Task['priority']>('medium')
  const [category, setCategory] = useState('Comunicare')

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true)
      try {
        const allUsers = await dataService.getUsers()
        const volunteers = allUsers.filter(u => u.role === 'volunteer')
        setUsers(volunteers)
        if (volunteers.length > 0) {
          setAssigneeId(volunteers[0].id)
        }
      } catch (error) {
        console.error('Failed to load users:', error)
      } finally {
        setLoading(false)
      }
    }
    loadUsers()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const today = new Date().toISOString().split('T')[0]
    if (dueDate <= today) {
      alert('Data limita trebuie sa fie in viitor')
      return
    }

    setSubmitting(true)
    try {
      await onSubmit({
        title,
        description,
        assigneeId,
        dueDate,
        priority,
        category,
        status: 'PLANNED',
        ownerId: userId,
        createdAt: new Date().toISOString(),
      })
    } finally {
      setSubmitting(false)
    }
  }

  const userOptions = users.map(u => ({ value: u.id, label: u.name }))

  return (
      <Modal onClose={onClose} title="Task Nou">
        <form onSubmit={handleSubmit} className="space-y-4">
          {loading ? (
              <div className="text-center py-4 text-muted-foreground">Se incarca voluntarii...</div>
          ) : (
              <>
                <Input id="title" label="Titlu" value={title} onChange={e => setTitle(e.target.value)} required />
                <Textarea id="desc" label="Descriere" value={description} onChange={e => setDescription(e.target.value)} rows={3} />
                <Select
                    id="assignee"
                    label="Responsabil"
                    options={userOptions}
                    value={assigneeId}
                    onChange={e => setAssigneeId(e.target.value)}
                    required
                />
                <Input id="dueDate" label="Data Limita" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
                <Select id="priority" label="Prioritate" options={priorityOptions} value={priority} onChange={e => setPriority(e.target.value as Task['priority'])} />
                <Select id="category" label="Categorie" options={categoryOptions} value={category} onChange={e => setCategory(e.target.value)} />
                <div className="flex gap-3">
                  <Button type="submit" disabled={submitting}>
                    {submitting ? 'Se creeaza...' : 'Creeaza'}
                  </Button>
                  <Button type="button" variant="outline" onClick={onClose}>
                    Anuleaza
                  </Button>
                </div>
              </>
          )}
        </form>
      </Modal>
  )
}