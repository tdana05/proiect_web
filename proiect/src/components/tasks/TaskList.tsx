import type { Task, TaskStatus } from '../../types'
import { TaskCard } from './TaskCard'

interface Props {
  tasks: Task[]
  currentUserId: string
  isAdmin: boolean
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void
}

export function TaskList({ tasks, currentUserId, isAdmin, onStatusChange }: Props) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Nu sunt task-uri de afisat</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          currentUserId={currentUserId}
          isAdmin={isAdmin}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  )
}
