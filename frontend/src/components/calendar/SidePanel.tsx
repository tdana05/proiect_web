import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectedDayEvents } from "./SelectedDayEvents";
import { UpcomingEvents } from "./UpcomingEvents";
import type { Event } from "@/lib/types";

interface SidePanelProps {
    selectedDate: string | null;
    selectedDayEvents: Event[];
    upcomingEvents: Event[];
    onSelectEvent: (event: Event) => void;
}

export function SidePanel({
                              selectedDate,
                              selectedDayEvents,
                              upcomingEvents,
                              onSelectEvent,
                          }: SidePanelProps) {
    return (
        <div className="flex flex-col gap-4">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                        {selectedDate
                            ? new Date(selectedDate + "T00:00:00").toLocaleDateString("ro-RO", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                            })
                            : "Selectati o zi"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <SelectedDayEvents
                        events={selectedDayEvents}
                        selectedDate={selectedDate}
                        onSelectEvent={onSelectEvent}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Evenimente Viitoare</CardTitle>
                </CardHeader>
                <CardContent>
                    <UpcomingEvents events={upcomingEvents} onSelectEvent={onSelectEvent} />
                </CardContent>
            </Card>
        </div>
    );
}