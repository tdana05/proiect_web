import { useState } from 'react'
import { Clock, User, Check, X } from 'lucide-react'
import type { HoursEntry, HoursStatus } from '../../types'
import { dataService } from '../../services/dataService'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { formatDate } from '../../lib/utils'

interface Props {
  entry: HoursEntry
  isAdmin: boolean
  onStatusUpdate: (id: string, status: HoursStatus, note?: string) => void
}

const statusConfig = {
  pending: { label: 'In Asteptare', variant: 'warning' as const },
  approved: { label: 'Aprobat', variant: 'success' as const },
  rejected: { label: 'Respins', variant: 'destructive' as const },
}

export function HoursCard({ entry, isAdmin, onStatusUpdate }: Props) {
  const [showNote, setShowNote] = useState(false)
  const [note, setNote] = useState('')
  const volunteer = dataService.getUserById(entry.volunteerId)
  const task = entry.relatedTaskId ? dataService.getTaskById(entry.relatedTaskId) : null
  const event = entry.relatedEventId ? dataService.getEventById(entry.relatedEventId) : null

  const handleReject = () => {
    if (!note.trim()) return alert('Introdu un motiv pentru respingere')
    onStatusUpdate(entry.id, 'rejected', note)
    setShowNote(false)
  }

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-bold text-primary">{entry.hours}h</span>
            <Badge variant={statusConfig[entry.status].variant}>{statusConfig[entry.status].label}</Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{entry.description}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><User className="h-3 w-3" />{volunteer?.name}</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{formatDate(entry.date)}</span>
            {task && <span className="px-2 py-0.5 bg-secondary rounded">Task: {task.title}</span>}
            {event && <span className="px-2 py-0.5 bg-secondary rounded">Eveniment: {event.title}</span>}
          </div>
          {entry.adminNote && <p className="mt-2 text-sm text-destructive">Nota admin: {entry.adminNote}</p>}
        </div>
        {isAdmin && entry.status === 'pending' && (
          <div className="flex flex-col gap-2">
            {!showNote ? (
              <>
                <Button size="sm" onClick={() => onStatusUpdate(entry.id, 'approved')}>
                  <Check className="h-4 w-4 mr-1" />Aproba
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowNote(true)}>
                  <X className="h-4 w-4 mr-1" />Respinge
                </Button>
              </>
            ) : (
              <div className="space-y-2">
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Motiv respingere..."
                  className="w-48 p-2 text-sm border rounded-lg"
                  rows={2}
                />
                <div className="flex gap-2">
                  <Button size="sm" variant="destructive" onClick={handleReject}>Confirma</Button>
                  <Button size="sm" variant="ghost" onClick={() => setShowNote(false)}>Anuleaza</Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
