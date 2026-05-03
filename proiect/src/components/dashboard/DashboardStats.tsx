import { useMemo } from 'react'
import { Users, Clock, ListTodo, Calendar } from 'lucide-react'
import { Card } from '../ui/Card'
import { dataService } from '../../services/dataService'

interface Props {
  userId: string
  isAdmin: boolean
}

export function DashboardStats({ userId, isAdmin }: Props) {
  const stats = useMemo(() => {
    const tasks = dataService.getTasks()
    const hours = dataService.getHoursEntries()
    const events = dataService.getEvents()
    const users = dataService.getUsers()

    if (isAdmin) {
      return [
        { label: 'Total Voluntari', value: users.filter(u => u.role === 'volunteer').length, icon: Users, color: 'text-blue-500' },
        { label: 'Ore Aprobate', value: hours.filter(h => h.status === 'approved').reduce((s, h) => s + h.hours, 0), icon: Clock, color: 'text-green-500' },
        { label: 'Task-uri Active', value: tasks.filter(t => t.status !== 'DONE').length, icon: ListTodo, color: 'text-amber-500' },
        { label: 'Evenimente Viitoare', value: events.filter(e => new Date(e.date) > new Date()).length, icon: Calendar, color: 'text-purple-500' },
      ]
    }

    return [
      { label: 'Orele Mele', value: hours.filter(h => h.volunteerId === userId && h.status === 'approved').reduce((s, h) => s + h.hours, 0), icon: Clock, color: 'text-green-500' },
      { label: 'Task-uri Active', value: tasks.filter(t => t.assigneeId === userId && t.status !== 'DONE').length, icon: ListTodo, color: 'text-amber-500' },
      { label: 'Evenimente Viitoare', value: events.filter(e => new Date(e.date) > new Date() && e.attendees.includes(userId)).length, icon: Calendar, color: 'text-purple-500' },
      { label: 'Task-uri Finalizate', value: tasks.filter(t => t.assigneeId === userId && t.status === 'DONE').length, icon: ListTodo, color: 'text-blue-500' },
    ]
  }, [userId, isAdmin])

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label} className="flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-secondary ${stat.color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
