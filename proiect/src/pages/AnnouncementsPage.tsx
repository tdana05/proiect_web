import { useState, useEffect, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { announcementService } from '../services/announcementService';
import { Button } from '../components/ui/Button';
import { AnnouncementCard } from '../components/announcements/AnnouncementCard';
import { AnnouncementFormModal } from '../components/announcements/AnnouncementFormModal';
import type { Announcement } from '../types';

export default function AnnouncementsPage() {
  const { user, isAdmin } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    setLoading(true);
    try {
      const data = await announcementService.getAll();
      setAnnouncements(data);
    } catch (error) {
      console.error('Failed to load announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortedAnnouncements = useMemo(() => {
    const pinned = announcements.filter(a => a.pinned);
    const unpinned = announcements.filter(a => !a.pinned);
    return [...pinned, ...unpinned];
  }, [announcements]);

  const handleCreate = async (data: Omit<Announcement, 'id'>) => {
    try {
      await announcementService.create(data);
      await loadAnnouncements();
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create announcement:', error);
      alert('Eroare la crearea anunțului');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Sigur vrei să ștergi acest anunț?')) {
      try {
        await announcementService.delete(id);
        await loadAnnouncements();
      } catch (error) {
        console.error('Failed to delete announcement:', error);
        alert('Eroare la ștergerea anunțului');
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Se încarcă...</div>;
  }

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Anunturi</h1>
            <p className="text-muted-foreground">Anunturile organizatiei AMiCUS</p>
          </div>
          {isAdmin && (
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Adauga Anunt
              </Button>
          )}
        </div>

        <div className="space-y-4">
          {sortedAnnouncements.map(announcement => (
              <AnnouncementCard
                  key={announcement.id}
                  announcement={announcement}
                  isAdmin={isAdmin}
                  onDelete={() => handleDelete(announcement.id)}
              />
          ))}
          {sortedAnnouncements.length === 0 && (
              <p className="text-center text-muted-foreground py-8">Nu exista anunturi</p>
          )}
        </div>

        {showForm && user && (
            <AnnouncementFormModal
                userId={user.id}
                onClose={() => setShowForm(false)}
                onSubmit={handleCreate}
            />
        )}
      </div>
  );
}