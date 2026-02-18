import type { Event } from "@/lib/types";

interface CalendarCellProps {
    date: string;
    day: number;
    isCurrentMonth: boolean;
    isSelected: boolean;
    isToday: boolean;
    events: Event[];
    onSelect: (date: string) => void;
}

export function CalendarCell({
                                 date,
                                 day,
                                 isCurrentMonth,
                                 isSelected,
                                 isToday,
                                 events,
                                 onSelect,
                             }: CalendarCellProps) {
    return (
        <button
            onClick={() => onSelect(date)}
            className={`relative flex min-h-[80px] flex-col gap-0.5 border border-border/30 p-1.5 text-left transition-colors hover:bg-muted/50 ${
                !isCurrentMonth ? "bg-muted/20" : "bg-card"
            } ${isSelected ? "ring-2 ring-primary ring-inset" : ""}`}
        >
      <span
          className={`inline-flex size-6 items-center justify-center rounded-full text-xs font-medium ${
              isToday
                  ? "bg-primary text-primary-foreground"
                  : isCurrentMonth
                      ? "text-foreground"
                      : "text-muted-foreground/50"
          }`}
      >
        {day}
      </span>
            <div className="flex flex-col gap-0.5 overflow-hidden">
                {events.slice(0, 2).map((ev) => (
                    <div
                        key={ev.id}
                        className="truncate rounded px-1 py-0.5 text-[10px] font-medium text-primary-foreground"
                        style={{ backgroundColor: ev.color }}
                        title={ev.title}
                    >
                        {ev.title}
                    </div>
                ))}
                {events.length > 2 && (
                    <span className="px-1 text-[10px] text-muted-foreground">
            +{events.length - 2} altele
          </span>
                )}
            </div>
        </button>
    );
}