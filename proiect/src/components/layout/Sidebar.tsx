import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { SidebarNav } from './SidebarNav'
import { SidebarUser } from './SidebarUser'
import { Heart } from 'lucide-react'

export function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout, isAdmin } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  if (!user) return null

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <button
          onClick={() => handleNavigation('/dashboard')}
          className="flex items-center gap-2 w-full"
        >
          <div className="h-8 w-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Heart className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <span className="font-bold text-sidebar-foreground text-lg">AMiCUS</span>
        </button>
      </div>

      <SidebarNav
        isAdmin={isAdmin}
        currentPath={location.pathname}
        onNavigate={handleNavigation}
      />

      <SidebarUser user={user} onLogout={handleLogout} onNavigate={handleNavigation} />
    </aside>
  )
}
