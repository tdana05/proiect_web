import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CalendarCell } from "./CalendarCell";
import { DAYS_RO, MONTHS_RO, getDaysInMonth, getFirstDayOfMonth } from "@/types/calendar";
import type { Event } from "@/lib/types";

interface CalendarGridProps {
    currentDate: Date;
    onPrevMonth: () => void;
    onNextMonth: () => void;
    onToday: () => void;
    eventsForDate: (date: string) => Event[];
    onSelectDate: (date: string) => void;
    selectedDate: string | null;
    todayStr: string;
}

export function CalendarGrid({
                                 currentDate,
                                 onPrevMonth,
                                 onNextMonth,
                                 onToday,
                                 eventsForDate,
                                 onSelectDate,
                                 selectedDate,
                                 todayStr,
                             }: CalendarGridProps) {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const calendarDays = useMemo(() => {
        const daysInMonth = getDaysInMonth(currentYear, currentMonth);
        const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
        const days: { date: string; day: number; isCurrentMonth: boolean }[] = [];

        // Previous month padding
        const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
        for (let i = firstDay - 1; i >= 0; i--) {
            const d = daysInPrevMonth - i;
            days.push({
                date: `${prevYear}-${String(prevMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
                day: d,
                isCurrentMonth: false,
            });
        }

        // Current month
        for (let d = 1; d <= daysInMonth; d++) {
            days.push({
                date: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
                day: d,
                isCurrentMonth: true,
            });
        }

        // Next month padding
        const remaining = 42 - days.length;
        const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
        const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
        for (let d = 1; d <= remaining; d++) {
            days.push({
                date: `${nextYear}-${String(nextMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
                day: d,
                isCurrentMonth: false,
            });
        }

        return days;
    }, [currentYear, currentMonth]);

    return (
        <Card className="xl:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">
                    {MONTHS_RO[currentMonth]} {currentYear}
                </CardTitle>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="size-8" onClick={onPrevMonth}>
                        <ChevronLeft className="size-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={onToday}>
                        Azi
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8" onClick={onNextMonth}>
                        <ChevronRight className="size-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-7 gap-px">
                    {DAYS_RO.map((day) => (
                        <div key={day} className="p-2 text-center text-xs font-medium text-muted-foreground">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-px rounded-lg border border-border/50 overflow-hidden">
                    {calendarDays.map((cell, i) => (
                        <CalendarCell
                            key={i}
                            date={cell.date}
                            day={cell.day}
                            isCurrentMonth={cell.isCurrentMonth}
                            isSelected={cell.date === selectedDate}
                            isToday={cell.date === todayStr}
                            events={eventsForDate(cell.date)}
                            onSelect={onSelectDate}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}