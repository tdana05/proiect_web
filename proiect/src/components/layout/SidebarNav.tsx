import {
  LayoutDashboard, Users, Calendar, Megaphone, ListTodo,
  Clock, BarChart3, FolderKanban, FileText
} from 'lucide-react'
import { cn } from '../../lib/utils'

interface NavItem {
  title: string
  path: string
  icon: React.ComponentType<{ className?: string }>
}

const adminNavItems: NavItem[] = [
  { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { title: 'Voluntari', path: '/dashboard/volunteers', icon: Users },
  { title: 'Calendar', path: '/dashboard/calendar', icon: Calendar },
  { title: 'Anunturi', path: '/dashboard/announcements', icon: Megaphone },
  { title: 'Task-uri', path: '/dashboard/tasks', icon: ListTodo },
  { title: 'Ore Voluntariat', path: '/dashboard/hours', icon: Clock },
  { title: 'Statistici', path: '/dashboard/statistics', icon: BarChart3 },
  { title: 'Proiecte', path: '/dashboard/projects', icon: FolderKanban },
  { title: 'Documente', path: '/dashboard/documents', icon: FileText },
]

const volunteerNavItems: NavItem[] = [
  { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { title: 'Calendar', path: '/dashboard/calendar', icon: Calendar },
  { title: 'Anunturi', path: '/dashboard/announcements', icon: Megaphone },
  { title: 'Task-uri', path: '/dashboard/tasks', icon: ListTodo },
  { title: 'Ore Voluntariat', path: '/dashboard/hours', icon: Clock },
  { title: 'Statistici', path: '/dashboard/statistics', icon: BarChart3 },
  { title: 'Proiecte', path: '/dashboard/projects', icon: FolderKanban },
  { title: 'Documente', path: '/dashboard/documents', icon: FileText },
]

interface Props {
  isAdmin: boolean
  currentPath: string
  onNavigate: (path: string) => void
}

export function SidebarNav({ isAdmin, currentPath, onNavigate }: Props) {
  const navItems = isAdmin ? adminNavItems : volunteerNavItems

  return (
    <nav className="flex-1 overflow-y-auto p-4 space-y-1">
      {navItems.map((item) => {
        const isActive = currentPath === item.path
        const Icon = item.icon
        return (
          <button
            key={item.path}
            onClick={() => onNavigate(item.path)}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
              isActive
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
            )}
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span>{item.title}</span>
          </button>
        )
      })}
    </nav>
  )
}
