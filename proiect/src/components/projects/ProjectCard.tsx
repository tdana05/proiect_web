import type { Project } from '../../types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Edit, Trash2, Users, Calendar } from 'lucide-react';
import { formatDate } from '../../lib/utils';

interface ProjectCardProps {
  project: Project;
  isAdmin: boolean;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export function ProjectCard({ project, isAdmin, onEdit, onDelete }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'completed': return 'default';
      case 'planning': return 'warning';
      case 'on_hold': return 'secondary';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Activ';
      case 'completed': return 'Finalizat';
      case 'planning': return 'Planificare';
      case 'on_hold': return 'In asteptare';
      default: return status;
    }
  };

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <Badge variant={getStatusColor(project.status)}>
          {getStatusLabel(project.status)}
        </Badge>
      </div>

      <h3 className="font-semibold text-foreground mb-2">{project.name}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
        {project.description}
      </p>

      <div className="space-y-2 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>
            {formatDate(project.startDate)} - {formatDate(project.endDate)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>{project.volunteerIds?.length || 0} voluntari</span>
        </div>
      </div>

      {isAdmin && (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(project)}>
            <Edit className="mr-1 h-3 w-3" />
            Editeaza
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onDelete(project.id)}>
            <Trash2 className="mr-1 h-3 w-3" />
            Sterge
          </Button>
        </div>
      )}
    </div>
  );
}
