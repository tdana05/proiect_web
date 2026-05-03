import { Search } from 'lucide-react'
import type { TaskStatus } from '../../types'
import { cn } from '../../lib/utils'

interface Props {
  filterStatus: TaskStatus | 'ALL'
  onFilterChange: (status: TaskStatus | 'ALL') => void
  search: string
  onSearchChange: (search: string) => void
}

const statuses: { value: TaskStatus | 'ALL'; label: string }[] = [
  { value: 'ALL', label: 'Toate' },
  { value: 'PLANNED', label: 'Planificate' },
  { value: 'IN_PROGRESS', label: 'In Progres' },
  { value: 'BLOCKED', label: 'Blocate' },
  { value: 'REVIEW', label: 'Review' },
  { value: 'DONE', label: 'Finalizate' },
]

export function TaskFilters({ filterStatus, onFilterChange, search, onSearchChange }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Cauta task..."
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          className="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
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
    </div>
  )
}
