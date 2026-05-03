import { Pin, Trash2 } from 'lucide-react'
import type { Announcement } from '../../types'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { formatDateTime } from '../../lib/utils'

interface Props {
  announcement: Announcement
  isAdmin: boolean
  onDelete: () => void
}

const priorityConfig = {
  low: { label: 'Normal', variant: 'secondary' as const },
  medium: { label: 'Mediu', variant: 'warning' as const },
  high: { label: 'Urgent', variant: 'destructive' as const },
}

export function AnnouncementCard({ announcement, isAdmin, onDelete }: Props) {
  const priority = priorityConfig[announcement.priority]

  return (
    <Card className={announcement.pinned ? 'border-primary/50 bg-primary/5' : ''}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {announcement.pinned && <Pin className="h-4 w-4 text-primary" />}
            <h3 className="font-semibold text-lg">{announcement.title}</h3>
            <Badge variant={priority.variant}>{priority.label}</Badge>
          </div>
          <p className="text-muted-foreground whitespace-pre-wrap">{announcement.content}</p>
          <p className="text-sm text-muted-foreground mt-4">{formatDateTime(announcement.createdAt)}</p>
        </div>
        {isAdmin && (
          <Button variant="ghost" size="sm" onClick={onDelete} className="text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </Card>
  )
}
