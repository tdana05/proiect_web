import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { formatEventDate } from "@/types/dashboard";
import type { Event } from "@/lib/types";

interface UpcomingEventsProps {
    events: Event[];
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-base">Evenimente Viitoare</CardTitle>
                    <CardDescription>Urmatoarele activitati planificate</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard/calendar">
                        Calendar <ArrowRight className="ml-1 size-3" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-3">
                    {events.map((event) => (
                        <EventItem key={event.id} event={event} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

function EventItem({ event }: { event: Event }) {
    return (
        <div className="flex items-start gap-3">
            <div
                className="mt-1 size-3 shrink-0 rounded-full"
                style={{ backgroundColor: event.color }}
            />
            <div className="flex flex-col gap-0.5">
                <p className="text-sm font-medium text-foreground leading-tight">{event.title}</p>
                <p className="text-xs text-muted-foreground">{formatEventDate(event.date)}</p>
                <p className="text-xs text-muted-foreground">{event.location}</p>
            </div>
        </div>
    );
}