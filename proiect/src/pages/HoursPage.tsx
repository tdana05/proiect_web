import { useState, useMemo } from 'react'
import { Plus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { dataService } from '../services/dataService'
import { Button } from '../components/ui/Button'
import { HoursFilters } from '../components/hours/HoursFilters'
import { HoursList } from '../components/hours/HoursList'
import { HoursFormModal } from '../components/hours/HoursFormModal'
import type { HoursEntry, HoursStatus } from '../types'

export default function HoursPage() {
  const { user, isAdmin } = useAuth()
  const [entries, setEntries] = useState(dataService.getHoursEntries())
  const [showForm, setShowForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState<HoursStatus | 'ALL'>('ALL')

  const filteredEntries = useMemo(() => {
    let result = isAdmin ? entries : entries.filter(e => e.volunteerId === user?.id)
    if (filterStatus !== 'ALL') result = result.filter(e => e.status === filterStatus)
    return result
  }, [entries, filterStatus, isAdmin, user])

  const handleCreate = (data: Omit<HoursEntry, 'id'>) => {
    dataService.createHoursEntry(data)
    setEntries(dataService.getHoursEntries())
    setShowForm(false)
  }

  const handleStatusUpdate = (id: string, status: HoursStatus, note?: string) => {
    dataService.updateHoursStatus(id, status, note)
    setEntries(dataService.getHoursEntries())
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Ore Voluntariat</h1>
          <p className="text-muted-foreground">
            {isAdmin ? 'Verifica si aproba orele voluntarilor' : 'Inregistreaza orele tale de voluntariat'}
          </p>
        </div>
        {!isAdmin && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Adauga Ore
          </Button>
        )}
      </div>

      <HoursFilters filterStatus={filterStatus} onFilterChange={setFilterStatus} />

      <HoursList
        entries={filteredEntries}
        isAdmin={isAdmin}
        onStatusUpdate={handleStatusUpdate}
      />

      {showForm && user && (
        <HoursFormModal userId={user.id} onClose={() => setShowForm(false)} onSubmit={handleCreate} />
      )}
    </div>
  )
}
