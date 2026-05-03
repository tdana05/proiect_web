import { useState, useMemo } from 'react'
import { Plus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { dataService, updateTaskStatus } from '../services/dataService'
import { Button } from '../components/ui/Button'
import { TaskFilters } from '../components/tasks/TaskFilters'
import { TaskList } from '../components/tasks/TaskList'
import { TaskFormModal } from '../components/tasks/TaskFormModal'
import type { Task, TaskStatus } from '../types'

export default function TasksPage() {
  const { user, isAdmin } = useAuth()
  const [tasks, setTasks] = useState(dataService.getTasks())
  const [showForm, setShowForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'ALL'>('ALL')
  const [search, setSearch] = useState('')

  const filteredTasks = useMemo(() => {
    let result = isAdmin ? tasks : tasks.filter(t => t.assigneeId === user?.id)
    if (filterStatus !== 'ALL') result = result.filter(t => t.status === filterStatus)
    if (search) result = result.filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
    return result
  }, [tasks, filterStatus, search, isAdmin, user])

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    if (!user) return
    const result = updateTaskStatus(taskId, newStatus, user.id)
    if (result.success) {
      setTasks(dataService.getTasks())
    } else {
      alert(result.error)
    }
  }

  const handleCreate = (data: Omit<Task, 'id'>) => {
    dataService.createTask(data)
    setTasks(dataService.getTasks())
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Task-uri</h1>
          <p className="text-muted-foreground">
            {isAdmin ? 'Gestioneaza task-urile echipei' : 'Task-urile tale'}
          </p>
        </div>
        {isAdmin && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Task Nou
          </Button>
        )}
      </div>

      <TaskFilters
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
        search={search}
        onSearchChange={setSearch}
      />

      <TaskList
        tasks={filteredTasks}
        currentUserId={user?.id || ''}
        isAdmin={isAdmin}
        onStatusChange={handleStatusChange}
      />

      {showForm && user && (
        <TaskFormModal userId={user.id} onClose={() => setShowForm(false)} onSubmit={handleCreate} />
      )}
    </div>
  )
}
