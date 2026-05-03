import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { dataService } from '../../services/dataService'
import { formatDate } from '../../lib/utils'

interface Props {
  userId: string
  isAdmin: boolean
}

const statusColors: Record<string, 'default' | 'warning' | 'success' | 'destructive'> = {
  PLANNED: 'secondary',
  IN_PROGRESS: 'default',
  BLOCKED: 'destructive',
  REVIEW: 'warning',
  DONE: 'success',
}

export function DashboardTasks({ userId, isAdmin }: Props) {
  const navigate = useNavigate()

  const tasks = useMemo(() => {
    const allTasks = dataService.getTasks()
    const filtered = isAdmin
      ? allTasks.filter(t => t.status !== 'DONE')
      : allTasks.filter(t => t.assigneeId === userId && t.status !== 'DONE')
    return filtered.slice(0, 5)
  }, [userId, isAdmin])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Task-uri Recente</CardTitle>
        <Button size="sm" variant="ghost" onClick={() => navigate('/dashboard/tasks')}>
          Vezi toate
        </Button>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 ? (
          <p className="text-muted-foreground text-sm">Nu ai task-uri active</p>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{task.title}</p>
                  <p className="text-xs text-muted-foreground">Termen: {formatDate(task.dueDate)}</p>
                </div>
                <Badge variant={statusColors[task.status]}>{task.status.replace('_', ' ')}</Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
