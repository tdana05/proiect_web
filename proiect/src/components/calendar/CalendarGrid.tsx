import { useMemo } from 'react'
import type { Event } from '../../types'
import { cn } from '../../lib/utils'

interface Props {
  currentDate: Date
  events: Event[]
  onEventClick: (event: Event) => void
}

const weekDays = ['Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sam', 'Dum']

export function CalendarGrid({ currentDate, events, onEventClick }: Props) {
  const days = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startPad = (firstDay.getDay() + 6) % 7
    const result: (number | null)[] = Array(startPad).fill(null)
    for (let d = 1; d <= lastDay.getDate(); d++) result.push(d)
    while (result.length % 7 !== 0) result.push(null)
    return result
  }, [currentDate])

  const today = new Date()
  const isToday = (day: number) =>
    day === today.getDate() &&
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear()

  const getEventsForDay = (day: number) =>
    events.filter(e => new Date(e.date).getDate() === day)

  return (
    <div className="border rounded-xl overflow-hidden bg-card">
      <div className="grid grid-cols-7 border-b">
        {weekDays.map(d => (
          <div key={d} className="p-3 text-center text-sm font-medium text-muted-foreground bg-secondary/50">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((day, i) => {
          const dayEvents = day ? getEventsForDay(day) : []
          return (
            <div key={i} className={cn('min-h-24 p-2 border-r border-b', day ? 'bg-card' : 'bg-secondary/30')}>
              {day && (
                <>
                  <span className={cn(
                    'inline-flex h-7 w-7 items-center justify-center rounded-full text-sm',
                    isToday(day) && 'bg-primary text-primary-foreground font-bold'
                  )}>
                    {day}
                  </span>
                  <div className="mt-1 space-y-1">
                    {dayEvents.slice(0, 2).map(e => (
                      <button
                        key={e.id}
                        onClick={() => onEventClick(e)}
                        className="w-full text-left text-xs p-1 rounded truncate text-white"
                        style={{ backgroundColor: e.color }}
                      >
                        {e.title}
                      </button>
                    ))}
                    {dayEvents.length > 2 && (
                      <p className="text-xs text-muted-foreground">+{dayEvents.length - 2} altele</p>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
