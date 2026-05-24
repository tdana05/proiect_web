import { LogOut, User } from 'lucide-react'
import type { User as UserType } from '../../types'

interface Props {
    user: UserType
    onLogout: () => void
    onNavigate: (path: string) => void
}

export function SidebarUser({ user, onLogout, onNavigate }: Props) {
    return (
        <div className="p-4 border-t border-sidebar-border space-y-2">
            <button
                onClick={() => onNavigate('/dashboard/profile')}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white hover:bg-sidebar-accent/50 hover:text-white transition-colors"
            >
                <User className="h-5 w-5 shrink-0" />

                <div className="flex-1 text-left">
                    <p className="font-medium text-white">
                        {user.name}
                    </p>

                    <p className="text-xs text-white/70 capitalize">
                        {user.role}
                    </p>
                </div>
            </button>

            <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white hover:bg-red-500/10 hover:text-red-400 transition-colors"
            >
                <LogOut className="h-5 w-5 shrink-0" />
                <span>Deconectare</span>
            </button>
        </div>
    )
}