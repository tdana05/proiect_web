"use client";

import { useState, useMemo, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  getTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
  getUsers,
  getUserById,
} from "@/lib/data-service";
import type { Task, TaskStatus } from "@/lib/types";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Plus,
  Search,
  Trash2,
  ArrowRight,
  Clock,
  ChevronDown,
  Filter,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const STATUS_CONFIG: Record<TaskStatus, { label: string; className: string; bgClass: string }> = {
  PLANNED: { label: "Planificat", className: "bg-primary/10 text-primary border-primary/20", bgClass: "bg-primary/5 border-primary/20" },
  IN_PROGRESS: { label: "In Progres", className: "bg-warning/10 text-warning-foreground border-warning/20", bgClass: "bg-warning/5 border-warning/20" },
  BLOCKED: { label: "Blocat", className: "bg-destructive/10 text-destructive border-destructive/20", bgClass: "bg-destructive/5 border-destructive/20" },
  REVIEW: { label: "In Revizuire", className: "bg-muted text-muted-foreground border-border", bgClass: "bg-muted/50 border-border" },
  DONE: { label: "Finalizat", className: "bg-success/10 text-success border-success/20", bgClass: "bg-success/5 border-success/20" },
};

const PRIORITY_CONFIG: Record<string, { label: string; className: string }> = {
  high: { label: "Ridicata", className: "bg-destructive/10 text-destructive" },
  medium: { label: "Medie", className: "bg-warning/10 text-warning-foreground" },
  low: { label: "Scazuta", className: "bg-muted text-muted-foreground" },
};

const VALID_TRANSITIONS: Record<TaskStatus, TaskStatus[]> = {
  PLANNED: ["IN_PROGRESS"],
  IN_PROGRESS: ["BLOCKED", "REVIEW"],
  BLOCKED: ["IN_PROGRESS"],
  REVIEW: ["IN_PROGRESS", "DONE"],
  DONE: [],
};

export default function TasksPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const volunteers = useMemo(() => getUsers().filter((u) => u.role === "volunteer"), []);
  const [tasks, setTasks] = useState<Task[]>(() => getTasks());
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assigneeId: "",
    dueDate: "",
    priority: "medium" as Task["priority"],
    category: "",
  });

  const filtered = useMemo(() => {
    let result = [...tasks];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }
    if (filterStatus !== "all") {
      result = result.filter((t) => t.status === filterStatus);
    }
    if (filterPriority !== "all") {
      result = result.filter((t) => t.priority === filterPriority);
    }
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [tasks, searchQuery, filterStatus, filterPriority]);

  const todayStr = useMemo(() => new Date().toISOString().split("T")[0], []);

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.title.trim()) errs.title = "Titlul este obligatoriu.";
    if (!formData.assigneeId) errs.assigneeId = "Persoana responsabila este obligatorie.";
    if (!formData.dueDate) errs.dueDate = "Data limita este obligatorie.";
    if (formData.dueDate && formData.dueDate <= todayStr) {
      errs.dueDate = "Data limita trebuie sa fie in viitor (mai mare decat data curenta).";
    }
    if (!formData.category.trim()) errs.category = "Categoria este obligatorie.";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCreate = () => {
    if (!validateForm() || !user) return;
    const newTask = createTask({
      title: formData.title,
      description: formData.description,
      assigneeId: formData.assigneeId,
      ownerId: user.id,
      dueDate: formData.dueDate,
      priority: formData.priority,
      category: formData.category,
      status: "PLANNED",
      createdAt: new Date().toISOString(),
    });
    setTasks((prev) => [newTask, ...prev]);
    setShowCreateDialog(false);
    setFormData({ title: "", description: "", assigneeId: "", dueDate: "", priority: "medium", category: "" });
    setFormErrors({});
    toast.success("Task-ul a fost creat cu succes! Status initial: PLANNED");
  };

  const handleStatusChange = useCallback(
    (taskId: string, newStatus: TaskStatus) => {
      if (!user) return;
      const result = updateTaskStatus(taskId, newStatus, user.id);
      if (result.success) {
        setTasks(getTasks());
        if (selectedTask?.id === taskId) {
          setSelectedTask((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        toast.success(`Status-ul a fost actualizat la ${STATUS_CONFIG[newStatus].label}.`);
      } else {
        toast.error(result.error || "Eroare la actualizarea statusului.");
      }
    },
    [user, selectedTask?.id]
  );

  const handleDelete = () => {
    if (!deleteId) return;
    deleteTask(deleteId);
    setTasks((prev) => prev.filter((t) => t.id !== deleteId));
    setDeleteId(null);
    setSelectedTask(null);
    toast.success("Task-ul a fost sters.");
  };

  const getAvailableTransitions = useCallback(
    (task: Task): TaskStatus[] => {
      const transitions = VALID_TRANSITIONS[task.status];
      if (!user) return [];
      // DONE can only be set by owner
      return transitions.filter((s) => {
        if (s === "DONE" && task.ownerId !== user.id) return false;
        return true;
      });
    },
    [user]
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Task-uri</h1>
          <p className="text-sm text-muted-foreground">
            Gestionarea sarcinilor organizatiei AMiCUS
          </p>
        </div>
        {isAdmin && (
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="mr-2 size-4" />
            Task Nou
          </Button>
        )}
      </div>

      {/* Status summary */}
      <div className="flex flex-wrap gap-2">
        {(Object.entries(STATUS_CONFIG) as [TaskStatus, typeof STATUS_CONFIG[TaskStatus]][]).map(
          ([status, config]) => {
            const count = tasks.filter((t) => t.status === status).length;
            return (
              <button
                key={status}
                onClick={() => setFilterStatus(filterStatus === status ? "all" : status)}
                className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                  filterStatus === status
                    ? config.bgClass + " border-current"
                    : "border-border/50 bg-card hover:bg-muted/50"
                }`}
              >
                <span className={`inline-flex items-center justify-center rounded px-1.5 py-0.5 text-[10px] font-bold ${config.className}`}>
                  {count}
                </span>
                {config.label}
              </button>
            );
          }
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cauta task-uri..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Prioritate" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toate Prioritatile</SelectItem>
            <SelectItem value="high">Ridicata</SelectItem>
            <SelectItem value="medium">Medie</SelectItem>
            <SelectItem value="low">Scazuta</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tasks List */}
      {filtered.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-2 py-12">
            <Filter className="size-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Nu au fost gasite task-uri.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((task) => {
            const assignee = getUserById(task.assigneeId);
            const owner = getUserById(task.ownerId);
            const statusConfig = STATUS_CONFIG[task.status];
            const priorityConfig = PRIORITY_CONFIG[task.priority];
            const isOverdue = task.status !== "DONE" && task.dueDate < todayStr;
            const availableTransitions = getAvailableTransitions(task);

            return (
              <Card
                key={task.id}
                className={`transition-colors hover:bg-muted/20 ${isOverdue ? "border-destructive/30" : ""}`}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="secondary" className={`text-[10px] ${statusConfig.className}`}>
                            {statusConfig.label}
                          </Badge>
                          <Badge variant="secondary" className={`text-[10px] ${priorityConfig.className}`}>
                            {priorityConfig.label}
                          </Badge>
                          <Badge variant="outline" className="text-[10px]">
                            {task.category}
                          </Badge>
                          {isOverdue && (
                            <Badge variant="destructive" className="text-[10px]">
                              Intarziat
                            </Badge>
                          )}
                        </div>
                        <button
                          onClick={() => setSelectedTask(task)}
                          className="text-left"
                        >
                          <h3 className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                            {task.title}
                          </h3>
                        </button>
                        <p className="text-xs text-muted-foreground line-clamp-1">{task.description}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {availableTransitions.length > 0 && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm" className="text-xs gap-1">
                                Status <ChevronDown className="size-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel className="text-xs">Schimba status</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              {availableTransitions.map((s) => (
                                <DropdownMenuItem
                                  key={s}
                                  onClick={() => handleStatusChange(task.id, s)}
                                >
                                  <ArrowRight className="mr-2 size-3" />
                                  {STATUS_CONFIG[s].label}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                        {isAdmin && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-muted-foreground hover:text-destructive"
                            onClick={() => setDeleteId(task.id)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                          <Avatar className="size-5">
                            <AvatarFallback className="text-[8px] bg-muted">
                              {assignee?.name?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">{assignee?.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground/50">|</span>
                        <span className="text-xs text-muted-foreground">
                          Owner: {owner?.name?.split(" ")[0]}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3" />
                        {new Date(task.dueDate).toLocaleDateString("ro-RO", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Task Detail Dialog */}
      <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedTask?.title}</DialogTitle>
            <DialogDescription>Detaliile task-ului</DialogDescription>
          </DialogHeader>
          {selectedTask && (() => {
            const assignee = getUserById(selectedTask.assigneeId);
            const owner = getUserById(selectedTask.ownerId);
            const statusConfig = STATUS_CONFIG[selectedTask.status];
            const priorityConfig = PRIORITY_CONFIG[selectedTask.priority];
            const transitions = getAvailableTransitions(selectedTask);
            return (
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className={statusConfig.className}>
                    {statusConfig.label}
                  </Badge>
                  <Badge variant="secondary" className={priorityConfig.className}>
                    Prioritate: {priorityConfig.label}
                  </Badge>
                  <Badge variant="outline">{selectedTask.category}</Badge>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">{selectedTask.description}</p>
                <div className="grid grid-cols-2 gap-3 rounded-lg bg-muted/50 p-4">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Responsabil</p>
                    <p className="text-sm font-medium text-foreground">{assignee?.name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Owner</p>
                    <p className="text-sm font-medium text-foreground">{owner?.name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Data Limita</p>
                    <p className="text-sm font-medium text-foreground">
                      {new Date(selectedTask.dueDate).toLocaleDateString("ro-RO")}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Creat la</p>
                    <p className="text-sm font-medium text-foreground">
                      {new Date(selectedTask.createdAt).toLocaleDateString("ro-RO")}
                    </p>
                  </div>
                </div>
                {/* Status flow info */}
                <div className="rounded-lg border border-border/50 p-4">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Flux de status:</p>
                  <div className="flex flex-wrap items-center gap-1 text-[10px]">
                    {(["PLANNED", "IN_PROGRESS", "BLOCKED", "REVIEW", "DONE"] as TaskStatus[]).map((s, i) => (
                      <span key={s} className="flex items-center gap-1">
                        <span className={`rounded px-1.5 py-0.5 ${selectedTask.status === s ? STATUS_CONFIG[s].className + " font-bold" : "bg-muted text-muted-foreground"}`}>
                          {STATUS_CONFIG[s].label}
                        </span>
                        {i < 4 && <ArrowRight className="size-3 text-muted-foreground/50" />}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-[10px] text-muted-foreground">
                    DONE poate fi setat doar de owner, si doar din REVIEW.
                  </p>
                </div>
                {transitions.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <p className="w-full text-xs text-muted-foreground">Schimba status:</p>
                    {transitions.map((s) => (
                      <Button
                        key={s}
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(selectedTask.id, s)}
                        className="text-xs"
                      >
                        <ArrowRight className="mr-1 size-3" />
                        {STATUS_CONFIG[s].label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* Create Task Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Task Nou</DialogTitle>
            <DialogDescription>
              Creati un task nou. Task-ul va fi creat cu statusul PLANNED.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Titlu *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Denumirea task-ului"
              />
              {formErrors.title && <p className="text-xs text-destructive">{formErrors.title}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Descriere</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Persoana Responsabila *</Label>
                <Select
                  value={formData.assigneeId}
                  onValueChange={(v) => setFormData({ ...formData, assigneeId: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectati" />
                  </SelectTrigger>
                  <SelectContent>
                    {volunteers.map((v) => (
                      <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formErrors.assigneeId && <p className="text-xs text-destructive">{formErrors.assigneeId}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Data Limita *</Label>
                <Input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
                {formErrors.dueDate && <p className="text-xs text-destructive">{formErrors.dueDate}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Prioritate</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(v) => setFormData({ ...formData, priority: v as Task["priority"] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Scazuta</SelectItem>
                    <SelectItem value="medium">Medie</SelectItem>
                    <SelectItem value="high">Ridicata</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Categorie *</Label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Ex: Design, IT, HR"
                />
                {formErrors.category && <p className="text-xs text-destructive">{formErrors.category}</p>}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Anuleaza
            </Button>
            <Button onClick={handleCreate}>Creeaza Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmati stergerea</AlertDialogTitle>
            <AlertDialogDescription>
              Sunteti sigur ca doriti sa stergeti acest task? Aceasta actiune nu poate fi anulata.
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
