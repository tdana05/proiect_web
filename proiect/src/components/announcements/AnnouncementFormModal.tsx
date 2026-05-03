import { useState } from 'react'
import type { Announcement } from '../../types'
import { Modal } from '../ui/Modal'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'

interface Props {
  userId: string
  onClose: () => void
  onSubmit: (data: Omit<Announcement, 'id'>) => void
}

const priorityOptions = [
  { value: 'low', label: 'Normal' },
  { value: 'medium', label: 'Mediu' },
  { value: 'high', label: 'Urgent' },
]

export function AnnouncementFormModal({ userId, onClose, onSubmit }: Props) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [priority, setPriority] = useState<Announcement['priority']>('low')
  const [pinned, setPinned] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      title,
      content,
      priority,
      pinned,
      createdBy: userId,
      createdAt: new Date().toISOString(),
    })
  }

  return (
    <Modal onClose={onClose} title="Anunt Nou">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input id="title" label="Titlu" value={title} onChange={e => setTitle(e.target.value)} required />
        <Textarea id="content" label="Continut" value={content} onChange={e => setContent(e.target.value)} rows={4} required />
        <Select id="priority" label="Prioritate" options={priorityOptions} value={priority} onChange={e => setPriority(e.target.value as Announcement['priority'])} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={pinned} onChange={e => setPinned(e.target.checked)} className="rounded" />
          Fixeaza anuntul in partea de sus
        </label>
        <div className="flex gap-3">
          <Button type="submit">Publica</Button>
          <Button type="button" variant="outline" onClick={onClose}>Anuleaza</Button>
        </div>
      </form>
    </Modal>
  )
}
