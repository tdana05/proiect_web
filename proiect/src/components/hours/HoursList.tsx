import type { HoursEntry, HoursStatus } from '../../types'
import { HoursCard } from './HoursCard'

interface Props {
  entries: HoursEntry[]
  isAdmin: boolean
  onStatusUpdate: (id: string, status: HoursStatus, note?: string) => void
}

export function HoursList({ entries, isAdmin, onStatusUpdate }: Props) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Nu sunt inregistrari de afisat</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {entries.map(entry => (
        <HoursCard
          key={entry.id}
          entry={entry}
          isAdmin={isAdmin}
          onStatusUpdate={onStatusUpdate}
        />
      ))}
    </div>
  )
}
