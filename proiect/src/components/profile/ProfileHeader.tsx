import { Edit2 } from 'lucide-react'
import type { User } from '../../types'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'

interface Props {
  user: User
  isEditing: boolean
  onEdit: () => void
}

export function ProfileHeader({ user, isEditing, onEdit }: Props) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
          {user.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-muted-foreground">{user.email}</p>
          <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className="mt-2">
            {user.role === 'admin' ? 'Administrator' : 'Voluntar'}
          </Badge>
        </div>
      </div>
      {!isEditing && (
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Edit2 className="h-4 w-4 mr-2" />
          Editeaza
        </Button>
      )}
    </div>
  )
}
