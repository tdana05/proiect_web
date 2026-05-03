import type { HoursStatus } from '../../types'
import { cn } from '../../lib/utils'

interface Props {
  filterStatus: HoursStatus | 'ALL'
  onFilterChange: (status: HoursStatus | 'ALL') => void
}

const statuses: { value: HoursStatus | 'ALL'; label: string }[] = [
  { value: 'ALL', label: 'Toate' },
  { value: 'pending', label: 'In Asteptare' },
  { value: 'approved', label: 'Aprobate' },
  { value: 'rejected', label: 'Respinse' },
]

export function HoursFilters({ filterStatus, onFilterChange }: Props) {
  return (
    <div className="flex gap-1 flex-wrap">
      {statuses.map(s => (
        <button
          key={s.value}
          onClick={() => onFilterChange(s.value)}
          className={cn(
            'px-3 py-1.5 text-sm rounded-lg transition-colors',
            filterStatus === s.value
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          )}
        >
          {s.label}
        </button>
      ))}
    </div>
  )
}
