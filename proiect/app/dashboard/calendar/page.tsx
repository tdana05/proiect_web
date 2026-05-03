"use client";

import { useState, useMemo, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  getEvents,
  createEvent,
  deleteEvent,
  getUserById,
} from "@/lib/data-service";
import type { Event } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  MapPin,
  Users,
  Clock,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";

const EVENT_TYPE_LABELS: Record<string, string> = {
  meeting: "Sedinta",
  training: "Training",
  event: "Eveniment",
  workshop: "Workshop",
  fundraiser: "Fundraising",
};

const EVENT_COLORS: Record<string, string> = {
  meeting: "#0891b2",
  training: "#059669",
  event: "#d97706",
  workshop: "#7c3aed",
  fundraiser: "#dc2626",
};

const DAYS_RO = ["Lun", "Mar", "Mie", "Joi", "Vin", "Sam", "Dum"];
const MONTHS_RO = [
  "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
  "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday=0
}

export default function CalendarPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [events, setEvents] = useState<Event[]>(() => getEvents());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    endDate: "",
    location: "",
    type: "event" as Event["type"],
  });

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

  const eventsForDate = useCallback(
    (date: string) => events.filter((e) => e.date === date),
    [events]
  );

  const todayStr = useMemo(() => {
    const t = new Date();
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
  }, []);

  const selectedDayEvents = useMemo(
    () => (selectedDate ? eventsForDate(selectedDate) : []),
    [selectedDate, eventsForDate]
  );

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.title.trim()) errs.title = "Titlul este obligatoriu.";
    if (!formData.date) errs.date = "Data este obligatorie.";
    if (!formData.location.trim()) errs.location = "Locatia este obligatorie.";
    if (formData.date && new Date(formData.date) < new Date(todayStr)) {
      errs.date = "Data trebuie sa fie in viitor.";
    }
    if (formData.endDate && formData.endDate < formData.date) {
      errs.endDate = "Data sfarsit trebuie sa fie dupa data inceput.";
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCreate = () => {
    if (!validateForm() || !user) return;
    const newEvent = createEvent({
      title: formData.title,
      description: formData.description,
      date: formData.date,
      endDate: formData.endDate || undefined,
      location: formData.location,
      type: formData.type,
      createdBy: user.id,
      attendees: [user.id],
      color: EVENT_COLORS[formData.type],
    });
    setEvents((prev) => [newEvent, ...prev]);
    setShowCreateDialog(false);
    setFormData({ title: "", description: "", date: "", endDate: "", location: "", type: "event" });
    setFormErrors({});
    toast.success("Evenimentul a fost creat cu succes!");
  };

  const handleDelete = () => {
    if (!deleteId) return;
    deleteEvent(deleteId);
    setEvents((prev) => prev.filter((e) => e.id !== deleteId));
    setDeleteId(null);
    setSelectedEvent(null);
    toast.success("Evenimentul a fost sters.");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Calendar</h1>
          <p className="text-sm text-muted-foreground">
            Planificarea evenimentelor organizatiei AMiCUS
          </p>
        </div>
        {isAdmin && (
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="mr-2 size-4" />
            Eveniment Nou
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
        {/* Calendar Grid */}
        <Card className="xl:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">
              {MONTHS_RO[currentMonth]} {currentYear}
            </CardTitle>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={() =>
                  setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
                }
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
              >
                Azi
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={() =>
                  setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
                }
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-px">
              {DAYS_RO.map((day) => (
                <div key={day} className="p-2 text-center text-xs font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>
            {/* Calendar cells */}
            <div className="grid grid-cols-7 gap-px rounded-lg border border-border/50 overflow-hidden">
              {calendarDays.map((cell, i) => {
                const dayEvents = eventsForDate(cell.date);
                const isToday = cell.date === todayStr;
                const isSelected = cell.date === selectedDate;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(cell.date)}
                    className={`relative flex min-h-[80px] flex-col gap-0.5 border border-border/30 p-1.5 text-left transition-colors hover:bg-muted/50 ${
                      !cell.isCurrentMonth ? "bg-muted/20" : "bg-card"
                    } ${isSelected ? "ring-2 ring-primary ring-inset" : ""}`}
                  >
                    <span
                      className={`inline-flex size-6 items-center justify-center rounded-full text-xs font-medium ${
                        isToday
                          ? "bg-primary text-primary-foreground"
                          : cell.isCurrentMonth
                          ? "text-foreground"
                          : "text-muted-foreground/50"
                      }`}
                    >
                      {cell.day}
                    </span>
                    <div className="flex flex-col gap-0.5 overflow-hidden">
                      {dayEvents.slice(0, 2).map((ev) => (
                        <div
                          key={ev.id}
                          className="truncate rounded px-1 py-0.5 text-[10px] font-medium text-primary-foreground"
                          style={{ backgroundColor: ev.color }}
                          title={ev.title}
                        >
                          {ev.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <span className="px-1 text-[10px] text-muted-foreground">
                          +{dayEvents.length - 2} altele
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Side panel */}
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
              {selectedDayEvents.length === 0 ? (
                <p className="text-xs text-muted-foreground py-4 text-center">
                  {selectedDate ? "Nu sunt evenimente in aceasta zi." : "Faceti clic pe o zi din calendar."}
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {selectedDayEvents.map((ev) => (
                    <button
                      key={ev.id}
                      onClick={() => setSelectedEvent(ev)}
                      className="flex flex-col gap-1 rounded-lg border border-border/50 p-3 text-left transition-colors hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="size-2 shrink-0 rounded-full"
                          style={{ backgroundColor: ev.color }}
                        />
                        <span className="text-sm font-medium text-foreground">
                          {ev.title}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {ev.location}
                      </span>
                      <Badge variant="secondary" className="w-fit text-[10px]">
                        {EVENT_TYPE_LABELS[ev.type]}
                      </Badge>
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Evenimente Viitoare</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {events
                  .filter((e) => e.date >= todayStr)
                  .sort((a, b) => a.date.localeCompare(b.date))
                  .slice(0, 5)
                  .map((ev) => (
                    <button
                      key={ev.id}
                      onClick={() => setSelectedEvent(ev)}
                      className="flex items-start gap-2 rounded-md p-2 text-left transition-colors hover:bg-muted/50"
                    >
                      <div
                        className="mt-1 size-2 shrink-0 rounded-full"
                        style={{ backgroundColor: ev.color }}
                      />
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
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Event Detail Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div
                className="size-3 rounded-full"
                style={{ backgroundColor: selectedEvent?.color }}
              />
              {selectedEvent?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedEvent && EVENT_TYPE_LABELS[selectedEvent.type]}
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-foreground">{selectedEvent.description}</p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="size-4" />
                  {new Date(selectedEvent.date).toLocaleDateString("ro-RO", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                  {selectedEvent.endDate && selectedEvent.endDate !== selectedEvent.date && (
                    <>
                      {" - "}
                      {new Date(selectedEvent.endDate).toLocaleDateString("ro-RO", {
                        day: "numeric",
                        month: "long",
                      })}
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="size-4" />
                  {selectedEvent.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="size-4" />
                  {selectedEvent.attendees.length} participanti
                </div>
              </div>
              {isAdmin && (
                <div className="flex justify-end pt-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeleteId(selectedEvent.id)}
                  >
                    <Trash2 className="mr-2 size-3" />
                    Sterge
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Event Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Eveniment Nou</DialogTitle>
            <DialogDescription>
              Creati un eveniment nou in calendarul organizatiei.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="ev-title">Titlu *</Label>
              <Input
                id="ev-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Denumirea evenimentului"
              />
              {formErrors.title && <p className="text-xs text-destructive">{formErrors.title}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="ev-desc">Descriere</Label>
              <Textarea
                id="ev-desc"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="ev-date">Data Inceput *</Label>
                <Input
                  id="ev-date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
                {formErrors.date && <p className="text-xs text-destructive">{formErrors.date}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="ev-end">Data Sfarsit</Label>
                <Input
                  id="ev-end"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
                {formErrors.endDate && <p className="text-xs text-destructive">{formErrors.endDate}</p>}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="ev-location">Locatie *</Label>
              <Input
                id="ev-location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Adresa sau link-ul evenimentului"
              />
              {formErrors.location && <p className="text-xs text-destructive">{formErrors.location}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Tip Eveniment</Label>
              <Select
                value={formData.type}
                onValueChange={(v) => setFormData({ ...formData, type: v as Event["type"] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(EVENT_TYPE_LABELS).map(([val, label]) => (
                    <SelectItem key={val} value={val}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Anuleaza
            </Button>
            <Button onClick={handleCreate}>Creeaza Eveniment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmati stergerea</AlertDialogTitle>
            <AlertDialogDescription>
              Sunteti sigur ca doriti sa stergeti acest eveniment? Aceasta actiune nu poate fi anulata.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anuleaza</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Sterge
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
