import type { Event } from "@/lib/types";

interface UpcomingEventsProps {
    events: Event[];
    onSelectEvent: (event: Event) => void;
}

export function UpcomingEvents({ events, onSelectEvent }: UpcomingEventsProps) {
    return (
        <div className="flex flex-col gap-2">
            {events.map((ev) => (
                <button
                    key={ev.id}
                    onClick={() => onSelectEvent(ev)}
                    className="flex items-start gap-2 rounded-md p-2 text-left transition-colors hover:bg-muted/50"
                >
                    <div className="mt-1 size-2 shrink-0 rounded-full" style={{ backgroundColor: ev.color }} />
                    <div>
                        <p className="text-xs font-medium text-foreground">{ev.title}</p>
                        <p className="text-[10px] text-muted-foreground">
                            {new Date(ev.date).toLocaleDateString("ro-RO", {
                                day: "numeric",
                                month: "short",
                            })}
                        </p>
                    </div>
                </button>
            ))}
        </div>
    );
}