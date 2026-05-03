import { Calendar, User } from 'lucide-react'
import type { Task, TaskStatus } from '../../types'
import { dataService } from '../../services/dataService'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { formatDate } from '../../lib/utils'

interface Props {
  task: Task
  currentUserId: string
  isAdmin: boolean
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void
}

const statusConfig: Record<TaskStatus, { label: string; variant: 'default' | 'secondary' | 'warning' | 'success' | 'destructive' }> = {
  PLANNED: { label: 'Planificat', variant: 'secondary' },
  IN_PROGRESS: { label: 'In Progres', variant: 'default' },
  BLOCKED: { label: 'Blocat', variant: 'destructive' },
  REVIEW: { label: 'Review', variant: 'warning' },
  DONE: { label: 'Finalizat', variant: 'success' },
}

const transitions: Record<TaskStatus, { status: TaskStatus; label: string }[]> = {
  PLANNED: [{ status: 'IN_PROGRESS', label: 'Incepe' }],
  IN_PROGRESS: [{ status: 'REVIEW', label: 'Trimite la Review' }, { status: 'BLOCKED', label: 'Blocheaza' }],
  BLOCKED: [{ status: 'IN_PROGRESS', label: 'Deblocheaza' }],
  REVIEW: [{ status: 'IN_PROGRESS', label: 'Respinge' }, { status: 'DONE', label: 'Aproba' }],
  DONE: [],
}

export function TaskCard({ task, currentUserId, isAdmin, onStatusChange }: Props) {
  const assignee = dataService.getUserById(task.assigneeId)
  const canChangeStatus = task.assigneeId === currentUserId || task.ownerId === currentUserId
  const availableTransitions = transitions[task.status].filter(t => {
    if (t.status === 'DONE') return task.ownerId === currentUserId
    return true
  })

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold">{task.title}</h3>
            <Badge variant={statusConfig[task.status].variant}>{statusConfig[task.status].label}</Badge>
            <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'warning' : 'secondary'}>
              {task.priority === 'high' ? 'Urgent' : task.priority === 'medium' ? 'Mediu' : 'Normal'}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><User className="h-3 w-3" />{assignee?.name || 'Nealocat'}</span>
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(task.dueDate)}</span>
            <span className="px-2 py-0.5 bg-secondary rounded">{task.category}</span>
          </div>
        </div>
        {canChangeStatus && availableTransitions.length > 0 && (
          <div className="flex gap-2">
            {availableTransitions.map(t => (
              <button
                key={t.status}
                onClick={() => onStatusChange(task.id, t.status)}
                className="text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                {t.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}
