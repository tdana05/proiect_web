import { Badge } from "@/components/ui/badge";
import { EVENT_TYPE_LABELS } from "@/types/calendar";
import type { Event } from "@/lib/types";

interface SelectedDayEventsProps {
    events: Event[];
    selectedDate: string | null;
    onSelectEvent: (event: Event) => void;
}

export function SelectedDayEvents({ events, selectedDate, onSelectEvent }: SelectedDayEventsProps) {
    if (events.length === 0) {
        return (
            <p className="text-xs text-muted-foreground py-4 text-center">
                {selectedDate ? "Nu sunt evenimente in aceasta zi." : "Faceti clic pe o zi din calendar."}
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            {events.map((ev) => (
                <button
                    key={ev.id}
                    onClick={() => onSelectEvent(ev)}
                    className="flex flex-col gap-1 rounded-lg border border-border/50 p-3 text-left transition-colors hover:bg-muted/50"
                >
                    <div className="flex items-center gap-2">
                        <div className="size-2 shrink-0 rounded-full" style={{ backgroundColor: ev.color }} />
                        <span className="text-sm font-medium text-foreground">{ev.title}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{ev.location}</span>
                    <Badge variant="secondary" className="w-fit text-[10px]">
                        {EVENT_TYPE_LABELS[ev.type]}
                    </Badge>
                </button>
            ))}
        </div>
    );
}