import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ProjectFormModal } from '../components/projects/ProjectFormModal';
import { dataService } from '../services/dataService';
import type { Project } from '../types';
import { Plus, FolderKanban } from 'lucide-react';

export default function ProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const data = dataService.getProjects();
    setProjects(data);
  };

  const filteredProjects = projects.filter(p =>
    filterStatus === 'all' || p.status === filterStatus
  );

  const handleEdit = (project: Project) => {
    if (!isAdmin) return;
    setEditingProject(project);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (!isAdmin) return;
    if (window.confirm('Sigur doriti sa stergeti acest proiect?')) {
      dataService.deleteProject(id);
      loadProjects();
    }
  };

  const handleSave = () => {
    loadProjects();
    setShowModal(false);
    setEditingProject(null);
  };

  const statusFilters = [
    { value: 'all', label: 'Toate' },
    { value: 'planning', label: 'Planificare' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Finalizate' },
    { value: 'on_hold', label: 'In asteptare' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Proiecte</h1>
          <p className="text-muted-foreground">Proiectele organizatiei AMiCUS</p>
        </div>
        {isAdmin && (
          <Button onClick={() => setShowModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Proiect Nou
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {statusFilters.map(filter => (
          <Button
            key={filter.value}
            variant={filterStatus === filter.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus(filter.value)}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            isAdmin={isAdmin}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FolderKanban className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Nu exista proiecte.</p>
          </CardContent>
        </Card>
      )}

      {showModal && isAdmin && (
        <ProjectFormModal
          project={editingProject}
          onClose={() => {
            setShowModal(false);
            setEditingProject(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
