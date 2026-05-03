import { useAuth } from '../context/AuthContext'
import { DashboardStats } from '../components/dashboard/DashboardStats'
import { DashboardTasks } from '../components/dashboard/DashboardTasks'
import { DashboardEvents } from '../components/dashboard/DashboardEvents'
import { DashboardAnnouncements } from '../components/dashboard/DashboardAnnouncements'

export default function DashboardPage() {
  const { user, isAdmin } = useAuth()

  if (!user) return null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Bun venit, {user.name.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground">
          Iata un sumar al activitatii tale in AMiCUS
        </p>
      </div>

      <DashboardStats userId={user.id} isAdmin={isAdmin} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardTasks userId={user.id} isAdmin={isAdmin} />
        <DashboardEvents />
      </div>

      <DashboardAnnouncements />
    </div>
  )
}
