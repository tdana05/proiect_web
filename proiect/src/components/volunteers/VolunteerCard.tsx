import type { User } from '../../types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Edit, Trash2, Mail, Phone, Clock } from 'lucide-react';

interface VolunteerCardProps {
  volunteer: User;
  onEdit: (volunteer: User) => void;
  onDelete: (id: string) => void;
}

export function VolunteerCard({ volunteer, onEdit, onDelete }: VolunteerCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'secondary';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Activ';
      case 'inactive': return 'Inactiv';
      case 'pending': return 'In asteptare';
      default: return status;
    }
  };

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
            {volunteer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{volunteer.name}</h3>
            <Badge variant={getStatusColor(volunteer.status)}>
              {getStatusLabel(volunteer.status)}
            </Badge>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          <span>{volunteer.email}</span>
        </div>
        {volunteer.phone && (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>{volunteer.phone}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{volunteer.totalHours || 0} ore voluntariat</span>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Button variant="outline" size="sm" onClick={() => onEdit(volunteer)}>
          <Edit className="mr-1 h-3 w-3" />
          Editeaza
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(volunteer.id)}>
          <Trash2 className="mr-1 h-3 w-3" />
          Sterge
        </Button>
      </div>
    </div>
  );
}
