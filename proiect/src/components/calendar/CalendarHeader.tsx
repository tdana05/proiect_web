import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Button } from '../ui/Button'

interface Props {
  currentDate: Date
  onPrev: () => void
  onNext: () => void
  onToday: () => void
  onAdd?: () => void
  isAdmin: boolean
}

export function CalendarHeader({ currentDate, onPrev, onNext, onToday, onAdd, isAdmin }: Props) {
  const monthYear = currentDate.toLocaleDateString('ro-RO', { month: 'long', year: 'numeric' })

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold capitalize">{monthYear}</h1>
        <p className="text-muted-foreground">Calendarul evenimentelor AMiCUS</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onToday}>Astazi</Button>
        <div className="flex items-center border rounded-lg">
          <button onClick={onPrev} className="p-2 hover:bg-secondary transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={onNext} className="p-2 hover:bg-secondary transition-colors">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        {isAdmin && onAdd && (
          <Button onClick={onAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Adauga Eveniment
          </Button>
        )}
      </div>
    </div>
  )
}
