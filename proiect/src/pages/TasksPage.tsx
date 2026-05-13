import { useState, useEffect, useMemo } from 'react'
import { Plus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { dataService } from '../services/dataService'
import { Button } from '../components/ui/Button'
import { TaskFilters } from '../components/tasks/TaskFilters'
import { TaskList } from '../components/tasks/TaskList'
import { TaskFormModal } from '../components/tasks/TaskFormModal'
import type { Task, TaskStatus } from '../types'

export default function TasksPage() {
  const { user, isAdmin } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [showForm, setShowForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'ALL'>('ALL')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const loadTasks = async () => {
    setLoading(true)
    try {
      let data: Task[]
      if (isAdmin) {
        data = await dataService.getTasks()
      } else {
        data = await dataService.getTasksByAssignee(user?.id || '')
      }
      setTasks(data)
    } catch (error) {
      console.error('Failed to load tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [isAdmin, user?.id])

  const filteredTasks = useMemo(() => {
    let result = tasks
    if (filterStatus !== 'ALL') result = result.filter(t => t.status === filterStatus)
    if (search) result = result.filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
    return result
  }, [tasks, filterStatus, search])

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    if (!user) return

    // Validation logic for status change
    const task = tasks.find(t => t.id === taskId)
    if (!task) return

    if (newStatus === 'DONE') {
      if (task.ownerId !== user.id) {
        alert('Doar owner-ul poate marca DONE.')
        return
      }
      if (task.status !== 'REVIEW') {
        alert('Task-ul trebuie sa fie in REVIEW inainte de DONE.')
        return
      }
    }

    const valid: Record<TaskStatus, TaskStatus[]> = {
      PLANNED: ['IN_PROGRESS'],
      IN_PROGRESS: ['BLOCKED', 'REVIEW'],
      BLOCKED: ['IN_PROGRESS'],
      REVIEW: ['IN_PROGRESS', 'DONE'],
      DONE: [],
    }

    if (!valid[task.status].includes(newStatus)) {
      alert(`Nu se poate trece de la ${task.status} la ${newStatus}.`)
      return
    }

    try {
      await dataService.updateTask(taskId, { status: newStatus })
      await loadTasks()
    } catch (error) {
      console.error('Failed to update task status:', error)
      alert('A aparut o eroare la actualizarea statusului.')
    }
  }

  const handleCreate = async (data: Omit<Task, 'id'>) => {
    try {
      await dataService.createTask(data)
      await loadTasks()
      setShowForm(false)
    } catch (error) {
      console.error('Failed to create task:', error)
      alert('A aparut o eroare la crearea task-ului.')
    }
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

        {loading ? (
            <div className="text-center py-8 text-muted-foreground">Se incarca task-urile...</div>
        ) : (
            <TaskList
                tasks={filteredTasks}
                currentUserId={user?.id || ''}
                isAdmin={isAdmin}
                onStatusChange={handleStatusChange}
            />
        )}

        {showForm && user && (
            <TaskFormModal
                userId={user.id}
                onClose={() => setShowForm(false)}
                onSubmit={handleCreate}
            />
        )}
      </div>
  )
}