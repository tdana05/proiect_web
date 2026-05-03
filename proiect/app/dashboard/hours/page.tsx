"use client";

import { useState, useMemo } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  getHoursEntries,
  getHoursByVolunteer,
  createHoursEntry,
  updateHoursStatus,
  updateHoursEntry,
  getUserById,
  getTasks,
  getEvents,
} from "@/lib/data-service";
import type { HoursEntry, HoursStatus } from "@/lib/types";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Plus,
  Search,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Filter,
  Edit3,
} from "lucide-react";
import { toast } from "sonner";

const STATUS_CONFIG: Record<HoursStatus, { label: string; className: string; icon: React.ReactNode }> = {
  pending: { label: "In Asteptare", className: "bg-warning/10 text-warning-foreground", icon: <AlertCircle className="size-3" /> },
  approved: { label: "Aprobat", className: "bg-success/10 text-success", icon: <CheckCircle2 className="size-3" /> },
  rejected: { label: "Respins", className: "bg-destructive/10 text-destructive", icon: <XCircle className="size-3" /> },
};

export default function HoursPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [entries, setEntries] = useState<HoursEntry[]>(() =>
    isAdmin ? getHoursEntries() : getHoursByVolunteer(user?.id || "")
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [reviewEntry, setReviewEntry] = useState<HoursEntry | null>(null);
  const [adminNote, setAdminNote] = useState("");
  const [editEntry, setEditEntry] = useState<HoursEntry | null>(null);
  const [editHours, setEditHours] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const tasks = useMemo(() => getTasks(), []);
  const events = useMemo(() => getEvents(), []);

  const [formData, setFormData] = useState({
    date: "",
    hours: "",
    description: "",
    relatedTaskId: "",
    relatedEventId: "",
  });

  const filtered = useMemo(() => {
    let result = [...entries];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (h) => h.description.toLowerCase().includes(q)
      );
    }
    if (filterStatus !== "all") {
      result = result.filter((h) => h.status === filterStatus);
    }
    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [entries, searchQuery, filterStatus]);

  const totalApproved = useMemo(
    () => filtered.filter((h) => h.status === "approved").reduce((s, h) => s + h.hours, 0),
    [filtered]
  );
  const totalPending = useMemo(
    () => filtered.filter((h) => h.status === "pending").reduce((s, h) => s + h.hours, 0),
    [filtered]
  );

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.date) errs.date = "Data este obligatorie.";
    if (!formData.hours || parseFloat(formData.hours) <= 0) errs.hours = "Numarul de ore trebuie sa fie pozitiv.";
    if (parseFloat(formData.hours) > 24) errs.hours = "Numarul de ore nu poate depasi 24.";
    if (!formData.description.trim()) errs.description = "Descrierea este obligatorie.";
    if (formData.description.trim().length < 5) errs.description = "Descrierea trebuie sa aiba minim 5 caractere.";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAdd = () => {
    if (!validateForm() || !user) return;
    const newEntry = createHoursEntry({
      volunteerId: user.id,
      date: formData.date,
      hours: parseFloat(formData.hours),
      description: formData.description,
      relatedTaskId: formData.relatedTaskId || undefined,
      relatedEventId: formData.relatedEventId || undefined,
      status: "pending",
    });
    setEntries((prev) => [newEntry, ...prev]);
    setShowAddDialog(false);
    setFormData({ date: "", hours: "", description: "", relatedTaskId: "", relatedEventId: "" });
    setFormErrors({});
    toast.success("Inregistrarea de ore a fost adaugata. Asteapta aprobare de la admin.");
  };

  const handleApprove = (id: string) => {
    const updated = updateHoursStatus(id, "approved", adminNote);
    if (updated) {
      setEntries(isAdmin ? getHoursEntries() : getHoursByVolunteer(user?.id || ""));
      setReviewEntry(null);
      setAdminNote("");
      toast.success("Orele au fost aprobate.");
    }
  };

  const handleReject = (id: string) => {
    if (!adminNote.trim()) {
      toast.error("Va rugam sa adaugati o nota explicativa pentru respingere.");
      return;
    }
    const updated = updateHoursStatus(id, "rejected", adminNote);
    if (updated) {
      setEntries(isAdmin ? getHoursEntries() : getHoursByVolunteer(user?.id || ""));
      setReviewEntry(null);
      setAdminNote("");
      toast.success("Orele au fost respinse.");
    }
  };

  const handleEditHours = () => {
    if (!editEntry) return;
    const newHours = parseFloat(editHours);
    if (isNaN(newHours) || newHours <= 0 || newHours > 24) {
      toast.error("Numarul de ore trebuie sa fie intre 0.5 si 24.");
      return;
    }
    updateHoursEntry(editEntry.id, { hours: newHours });
    setEntries(isAdmin ? getHoursEntries() : getHoursByVolunteer(user?.id || ""));
    setEditEntry(null);
    setEditHours("");
    toast.success("Numarul de ore a fost corectat.");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Ore Voluntariat</h1>
          <p className="text-sm text-muted-foreground">
            {isAdmin
              ? "Verificati si gestionati orele voluntarilor"
              : "Inregistrati si urmariti orele de voluntariat"}
          </p>
        </div>
        {!isAdmin && (
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="mr-2 size-4" />
            Adauga Ore
          </Button>
        )}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-success/10">
              <CheckCircle2 className="size-5 text-success" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{totalApproved}h</p>
              <p className="text-xs text-muted-foreground">Ore Aprobate</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-warning/10">
              <AlertCircle className="size-5 text-warning-foreground" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{totalPending}h</p>
              <p className="text-xs text-muted-foreground">In Asteptare</p>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2 sm:col-span-1">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Clock className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{filtered.length}</p>
              <p className="text-xs text-muted-foreground">Total Inregistrari</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cauta dupa descriere..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toate Statusurile</SelectItem>
            <SelectItem value="pending">In Asteptare</SelectItem>
            <SelectItem value="approved">Aprobat</SelectItem>
            <SelectItem value="rejected">Respins</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12">
              <Filter className="size-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Nu au fost gasite inregistrari.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {isAdmin && <TableHead>Voluntar</TableHead>}
                    <TableHead>Data</TableHead>
                    <TableHead>Ore</TableHead>
                    <TableHead className="min-w-[200px]">Descriere</TableHead>
                    <TableHead>Referinta</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actiuni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((entry) => {
                    const volunteer = getUserById(entry.volunteerId);
                    const relatedTask = entry.relatedTaskId
                      ? tasks.find((t) => t.id === entry.relatedTaskId)
                      : null;
                    const relatedEvent = entry.relatedEventId
                      ? events.find((e) => e.id === entry.relatedEventId)
                      : null;
                    const statusConfig = STATUS_CONFIG[entry.status];

                    return (
                      <TableRow key={entry.id}>
                        {isAdmin && (
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="size-6">
                                <AvatarFallback className="text-[8px] bg-muted">
                                  {volunteer?.name?.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{volunteer?.name}</span>
                            </div>
                          </TableCell>
                        )}
                        <TableCell className="text-sm">
                          {new Date(entry.date).toLocaleDateString("ro-RO")}
                        </TableCell>
                        <TableCell className="text-sm font-medium">
                          {entry.hours}h
                        </TableCell>
                        <TableCell>
                          <p className="text-sm line-clamp-2">{entry.description}</p>
                          {entry.adminNote && (
                            <p className="mt-1 text-xs text-destructive italic">
                              Nota admin: {entry.adminNote}
                            </p>
                          )}
                        </TableCell>
                        <TableCell>
                          {relatedTask && (
                            <Badge variant="outline" className="text-[10px]">
                              Task: {relatedTask.title.slice(0, 20)}...
                            </Badge>
                          )}
                          {relatedEvent && (
                            <Badge variant="outline" className="text-[10px]">
                              Ev: {relatedEvent.title.slice(0, 20)}...
                            </Badge>
                          )}
                          {!relatedTask && !relatedEvent && (
                            <span className="text-xs text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={`gap-1 text-[10px] ${statusConfig.className}`}>
                            {statusConfig.icon}
                            {statusConfig.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            {isAdmin && entry.status === "pending" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-xs"
                                onClick={() => {
                                  setReviewEntry(entry);
                                  setAdminNote("");
                                }}
                              >
                                Verifica
                              </Button>
                            )}
                            {isAdmin && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-7"
                                onClick={() => {
                                  setEditEntry(entry);
                                  setEditHours(entry.hours.toString());
                                }}
                              >
                                <Edit3 className="size-3" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Hours Dialog (Volunteer) */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Adauga Ore de Voluntariat</DialogTitle>
            <DialogDescription>
              Inregistrati orele lucrate pentru o sarcina sau un eveniment.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Data *</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
                {formErrors.date && <p className="text-xs text-destructive">{formErrors.date}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Numar de Ore *</Label>
                <Input
                  type="number"
                  min="0.5"
                  max="24"
                  step="0.5"
                  value={formData.hours}
                  onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                  placeholder="Ex: 4"
                />
                {formErrors.hours && <p className="text-xs text-destructive">{formErrors.hours}</p>}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Descriere *</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="Ce activitate ati desfasurat..."
              />
              {formErrors.description && <p className="text-xs text-destructive">{formErrors.description}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Task Asociat</Label>
                <Select
                  value={formData.relatedTaskId}
                  onValueChange={(v) => setFormData({ ...formData, relatedTaskId: v, relatedEventId: "" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Optional" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Niciunul</SelectItem>
                    {tasks
                      .filter((t) => t.assigneeId === user?.id)
                      .map((t) => (
                        <SelectItem key={t.id} value={t.id}>
                          {t.title}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Eveniment Asociat</Label>
                <Select
                  value={formData.relatedEventId}
                  onValueChange={(v) => setFormData({ ...formData, relatedEventId: v, relatedTaskId: "" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Optional" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Niciunul</SelectItem>
                    {events.map((e) => (
                      <SelectItem key={e.id} value={e.id}>
                        {e.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Anuleaza
            </Button>
            <Button onClick={handleAdd}>Adauga Ore</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review Dialog (Admin) */}
      <Dialog open={!!reviewEntry} onOpenChange={() => setReviewEntry(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verifica Ore Voluntariat</DialogTitle>
            <DialogDescription>
              Aprobati sau respingeti inregistrarea de ore.
            </DialogDescription>
          </DialogHeader>
          {reviewEntry && (
            <div className="flex flex-col gap-4">
              <div className="rounded-lg bg-muted/50 p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase">Voluntar</p>
                    <p className="text-sm font-medium text-foreground">
                      {getUserById(reviewEntry.volunteerId)?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase">Ore Declarate</p>
                    <p className="text-sm font-medium text-foreground">{reviewEntry.hours}h</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase">Data</p>
                    <p className="text-sm text-foreground">
                      {new Date(reviewEntry.date).toLocaleDateString("ro-RO")}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase">Referinta</p>
                    <p className="text-sm text-foreground">
                      {reviewEntry.relatedTaskId
                        ? tasks.find((t) => t.id === reviewEntry.relatedTaskId)?.title
                        : reviewEntry.relatedEventId
                        ? events.find((e) => e.id === reviewEntry.relatedEventId)?.title
                        : "Fara referinta"}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-[10px] text-muted-foreground uppercase">Descriere</p>
                  <p className="text-sm text-foreground">{reviewEntry.description}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Nota Admin (obligatorie pentru respingere)</Label>
                <Textarea
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  rows={2}
                  placeholder="Adaugati o nota explicativa..."
                />
              </div>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="destructive"
                  onClick={() => handleReject(reviewEntry.id)}
                >
                  <XCircle className="mr-2 size-4" />
                  Respinge
                </Button>
                <Button
                  onClick={() => handleApprove(reviewEntry.id)}
                  className="bg-success text-success-foreground hover:bg-success/90"
                >
                  <CheckCircle2 className="mr-2 size-4" />
                  Aproba
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Hours Dialog (Admin) */}
      <Dialog open={!!editEntry} onOpenChange={() => setEditEntry(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Corectare Ore</DialogTitle>
            <DialogDescription>
              Corectati numarul de ore inregistrate de voluntar.
            </DialogDescription>
          </DialogHeader>
          {editEntry && (
            <div className="flex flex-col gap-4">
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-sm text-foreground">{editEntry.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Voluntar: {getUserById(editEntry.volunteerId)?.name} |
                  Ore curente: {editEntry.hours}h
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Numar de Ore Corectat</Label>
                <Input
                  type="number"
                  min="0.5"
                  max="24"
                  step="0.5"
                  value={editHours}
                  onChange={(e) => setEditHours(e.target.value)}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditEntry(null)}>
              Anuleaza
            </Button>
            <Button onClick={handleEditHours}>Salveaza</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
