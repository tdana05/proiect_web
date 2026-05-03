import { useState, useMemo } from 'react'
import { Plus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { dataService } from '../services/dataService'
import { Button } from '../components/ui/Button'
import { AnnouncementCard } from '../components/announcements/AnnouncementCard'
import { AnnouncementFormModal } from '../components/announcements/AnnouncementFormModal'
import type { Announcement } from '../types'

export default function AnnouncementsPage() {
  const { user, isAdmin } = useAuth()
  const [announcements, setAnnouncements] = useState(dataService.getAnnouncements())
  const [showForm, setShowForm] = useState(false)

  const sortedAnnouncements = useMemo(() => {
    const pinned = announcements.filter(a => a.pinned)
    const unpinned = announcements.filter(a => !a.pinned)
    return [...pinned, ...unpinned]
  }, [announcements])

  const handleCreate = (data: Omit<Announcement, 'id'>) => {
    dataService.createAnnouncement(data)
    setAnnouncements(dataService.getAnnouncements())
    setShowForm(false)
  }

  const handleDelete = (id: string) => {
    if (confirm('Sigur vrei sa stergi acest anunt?')) {
      dataService.deleteAnnouncement(id)
      setAnnouncements(dataService.getAnnouncements())
    }
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
        <AnnouncementFormModal userId={user.id} onClose={() => setShowForm(false)} onSubmit={handleCreate} />
      )}
    </div>
  )
}
