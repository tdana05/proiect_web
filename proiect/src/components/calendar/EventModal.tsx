import { Calendar, MapPin, Users, Pencil, Trash2 } from 'lucide-react'
import type { Event } from '../../types'
import { dataService } from '../../services/dataService'
import { Modal } from '../ui/Modal'
import { Badge } from '../ui/Badge'
import { formatDate } from '../../lib/utils'
import { Button } from '../ui/Button'

interface Props {
  event: Event
  onClose: () => void
  onEdit?: (event: Event) => void
  onDelete?: (eventId: string) => void  
  isAdmin?: boolean
}

const typeLabels: Record<string, string> = {
  meeting: 'Sedinta',
  training: 'Training',
  event: 'Eveniment',
  workshop: 'Workshop',
  fundraiser: 'Fundraiser',
}

export function EventModal({ event, onClose, onEdit, onDelete, isAdmin }: Props) {
  const users = dataService.getUsers()
  const attendees = event.attendees.map(id => users.find(u => u.id === id)?.name).filter(Boolean)

  const handleDelete = () => {
    if (confirm(`Sigur dorești să ștergi evenimentul "${event.title}"?`)) {
      onDelete?.(event.id)
      onClose()
    }
  }

  return (
      <Modal onClose={onClose} title={event.title}>
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <Badge>{typeLabels[event.type] || event.type}</Badge>
            {isAdmin && (
                <div className="flex gap-2">
                  <button
                      onClick={() => onEdit?.(event)}
                      className="p-1 hover:bg-secondary rounded transition-colors"
                      title="Editează"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                      onClick={handleDelete}
                      className="p-1 hover:bg-destructive/10 text-destructive rounded transition-colors"
                      title="Șterge"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
            )}
          </div>

          <p className="text-muted-foreground">{event.description}</p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{formatDate(event.date)}</span>
              {event.endDate && event.endDate !== event.date && (
                  <span>- {formatDate(event.endDate)}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-start gap-2">
              <Users className="h-4 w-4 text-muted-foreground mt-0.5" />
              <span>{attendees.join(', ') || 'Niciun participant'}</span>
            </div>
          </div>
        </div>
      </Modal>
  )
}