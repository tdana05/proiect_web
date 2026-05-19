import { useState, useMemo, useEffect } from 'react'
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
  const [entries, setEntries] = useState<HoursEntry[]>([])
  const [showForm, setShowForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState<HoursStatus | 'ALL'>('ALL')
  const [loading, setLoading] = useState(true)

  const loadEntries = async () => {
    setLoading(true)
    try {
      let data: HoursEntry[]
      if (isAdmin) {
        data = await dataService.getHoursEntries()
      } else {
        data = await dataService.getHoursByVolunteer(user?.id || '')
      }
      setEntries(data)
    } catch (error) {
      console.error('Failed to load hours entries:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEntries()
  }, [isAdmin, user?.id])

  const filteredEntries = useMemo(() => {
    let result = entries
    if (filterStatus !== 'ALL') result = result.filter(e => e.status === filterStatus)
    return result
  }, [entries, filterStatus])

  const handleCreate = async (data: Omit<HoursEntry, 'id'>) => {
    try {
      await dataService.createHoursEntry(data)
      await loadEntries()
      setShowForm(false)
    } catch (error) {
      console.error('Failed to create hours entry:', error)
    }
  }

  const handleStatusUpdate = async (id: string, status: HoursStatus, note?: string) => {
    try {
      await dataService.updateHoursStatus(id, status, note)
      await loadEntries()
    } catch (error) {
      console.error('Failed to update hours status:', error)
    }
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

        {loading ? (
            <div className="text-center py-8 text-muted-foreground">Se incarca orele...</div>
        ) : (
            <HoursList
                entries={filteredEntries}
                isAdmin={isAdmin}
                onStatusUpdate={handleStatusUpdate}
            />
        )}

        {showForm && user && (
            <HoursFormModal userId={user.id} onClose={() => setShowForm(false)} onSubmit={handleCreate} />
        )}
      </div>
  )
}