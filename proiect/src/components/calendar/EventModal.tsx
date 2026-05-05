import { useState, useEffect } from 'react'
import { Calendar, MapPin, Users, Pencil, Trash2, UserPlus, UserCheck } from 'lucide-react'
import type { Event } from '../../types'
import { Modal } from '../ui/Modal'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { formatDate } from '../../lib/utils'
import { userService } from '../../services/userService'

interface Props {
    event: Event
    onClose: () => void
    onEdit?: (event: Event) => void
    onDelete?: (eventId: string) => void
    onToggleAttend?: (eventId: string) => void
    isAdmin?: boolean
    currentUserId?: string
}

const typeLabels: Record<string, string> = {
    meeting: 'Sedinta',
    training: 'Training',
    event: 'Eveniment',
    workshop: 'Workshop',
    fundraiser: 'Fundraiser',
}

export function EventModal({
                               event,
                               onClose,
                               onEdit,
                               onDelete,
                               onToggleAttend,
                               isAdmin = false,
                               currentUserId
                           }: Props) {
    const [attendeeNames, setAttendeeNames] = useState<string[]>([])

    useEffect(() => {
        const loadAttendeeNames = async () => {
            const names = await Promise.all(
                event.attendees.map(async (userId) => {
                    const user = await userService.getUserById(userId)
                    return user?.name || userId
                })
            )
            setAttendeeNames(names)
        }
        loadAttendeeNames()
    }, [event.attendees])

    const isAttending = currentUserId && event.attendees.includes(currentUserId)

    const handleDelete = () => {
        if (confirm(`Sigur dorești să ștergi evenimentul "${event.title}"?`)) {
            onDelete?.(event.id)
            onClose()
        }
    }

    const handleToggleAttend = () => {
        onToggleAttend?.(event.id)
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
                        <span>{attendeeNames.join(', ') || 'Niciun participant'}</span>
                    </div>
                </div>

                {!isAdmin && currentUserId && onToggleAttend && (
                    <div className="pt-4 border-t">
                        {isAttending ? (
                            <Button
                                onClick={handleToggleAttend}
                                variant="destructive"
                                className="w-full"
                            >
                                <UserCheck className="h-4 w-4 mr-2" />
                                Mă retrag de la eveniment
                            </Button>
                        ) : (
                            <Button
                                onClick={handleToggleAttend}
                                variant="primary"
                                className="w-full"
                            >
                                <UserPlus className="h-4 w-4 mr-2" />
                                Mă înscriu la eveniment
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </Modal>
    )
}