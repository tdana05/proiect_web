import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { VolunteerCard } from '../components/volunteers/VolunteerCard';
import { VolunteerFormModal } from '../components/volunteers/VolunteerFormModal';
import { dataService } from '../services/dataService';
import type { User } from '../types';
import { Plus, Search, Users } from 'lucide-react';

export default function VolunteersPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [volunteers, setVolunteers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingVolunteer, setEditingVolunteer] = useState<User | null>(null);

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (!isAdmin) {
      navigate('/error/403');
      return;
    }
    loadVolunteers();
  }, [isAdmin, navigate]);

  const loadVolunteers = () => {
    const data = dataService.getVolunteers();
    setVolunteers(data);
  };

  const filteredVolunteers = volunteers.filter(v =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (volunteer: User) => {
    setEditingVolunteer(volunteer);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Sigur doriti sa stergeti acest voluntar?')) {
      dataService.deleteVolunteer(id);
      loadVolunteers();
    }
  };

  const handleSave = () => {
    loadVolunteers();
    setShowModal(false);
    setEditingVolunteer(null);
  };

  if (!isAdmin) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Voluntari</h1>
          <p className="text-muted-foreground">Gestioneaza voluntarii organizatiei</p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Adauga Voluntar
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cauta voluntari..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{filteredVolunteers.length} voluntari</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVolunteers.map(volunteer => (
              <VolunteerCard
                key={volunteer.id}
                volunteer={volunteer}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
          {filteredVolunteers.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              Nu au fost gasiti voluntari.
            </p>
          )}
        </CardContent>
      </Card>

      {showModal && (
        <VolunteerFormModal
          volunteer={editingVolunteer}
          onClose={() => {
            setShowModal(false);
            setEditingVolunteer(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
