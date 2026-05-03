import { Clock, CheckCircle, Calendar } from 'lucide-react'
import type { User } from '../../types'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card'

interface Props {
  user: User
}

export function ProfileStats({ user }: Props) {
  const stats = [
    { icon: Clock, label: 'Ore Voluntariat', value: user.totalHours, color: 'text-green-500' },
    { icon: CheckCircle, label: 'Task-uri Finalizate', value: user.tasksCompleted, color: 'text-blue-500' },
    { icon: Calendar, label: 'Evenimente Participari', value: user.eventsAttended, color: 'text-purple-500' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistici</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="text-center p-4 rounded-lg bg-secondary/50">
                <Icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
