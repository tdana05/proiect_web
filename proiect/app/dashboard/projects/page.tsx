"use client";

import { useState, useMemo } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  getProjects,
  createProject,
  deleteProject,
  getUserById,
  getUsers,
} from "@/lib/data-service";
import type { Project } from "@/lib/types";
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
import { Progress } from "@/components/ui/progress";
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
  FolderKanban,
  Trash2,
  Users,
  Calendar,
  Filter,
} from "lucide-react";
import { toast } from "sonner";

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  active: { label: "Activ", className: "bg-success/10 text-success" },
  planning: { label: "In Planificare", className: "bg-warning/10 text-warning-foreground" },
  completed: { label: "Finalizat", className: "bg-muted text-muted-foreground" },
};

export default function ProjectsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const allUsers = useMemo(() => getUsers(), []);
  const [projects, setProjects] = useState<Project[]>(() => getProjects());
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "planning" as Project["status"],
    leadId: "",
  });

  const filtered = useMemo(() => {
    let result = [...projects];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    if (filterStatus !== "all") {
      result = result.filter((p) => p.status === filterStatus);
    }
    return result;
  }, [projects, searchQuery, filterStatus]);

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Numele este obligatoriu.";
    if (!formData.startDate) errs.startDate = "Data de inceput este obligatorie.";
    if (!formData.endDate) errs.endDate = "Data de sfarsit este obligatorie.";
    if (formData.endDate && formData.startDate && formData.endDate < formData.startDate) {
      errs.endDate = "Data de sfarsit trebuie sa fie dupa data de inceput.";
    }
    if (!formData.leadId) errs.leadId = "Selectati un lider de proiect.";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCreate = () => {
    if (!validateForm()) return;
    const newProject = createProject({
      name: formData.name,
      description: formData.description,
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: formData.status,
      leadId: formData.leadId,
      memberIds: [formData.leadId],
      progress: 0,
    });
    setProjects((prev) => [newProject, ...prev]);
    setShowCreateDialog(false);
    setFormData({ name: "", description: "", startDate: "", endDate: "", status: "planning", leadId: "" });
    setFormErrors({});
    toast.success("Proiectul a fost creat cu succes!");
  };

  const handleDelete = () => {
    if (!deleteId) return;
    deleteProject(deleteId);
    setProjects((prev) => prev.filter((p) => p.id !== deleteId));
    setDeleteId(null);
    toast.success("Proiectul a fost sters.");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Proiecte</h1>
          <p className="text-sm text-muted-foreground">
            Proiectele organizatiei AMiCUS
          </p>
        </div>
        {isAdmin && (
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="mr-2 size-4" />
            Proiect Nou
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cauta proiecte..."
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
            <SelectItem value="all">Toate</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="planning">In Planificare</SelectItem>
            <SelectItem value="completed">Finalizate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Projects Grid */}
      {filtered.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-2 py-12">
            <FolderKanban className="size-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Nu au fost gasite proiecte.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => {
            const lead = getUserById(project.leadId);
            const statusConfig = STATUS_CONFIG[project.status];
            return (
              <Card key={project.id} className="flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className={`text-[10px] ${statusConfig.className}`}>
                      {statusConfig.label}
                    </Badge>
                    {isAdmin && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7 text-muted-foreground hover:text-destructive"
                        onClick={() => setDeleteId(project.id)}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    )}
                  </div>
                  <CardTitle
                    className="text-base cursor-pointer hover:text-primary transition-colors"
                    onClick={() => setSelectedProject(project)}
                  >
                    {project.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-xs">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 mt-auto">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Progres</span>
                      <span className="text-xs font-medium font-mono text-foreground">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-1.5" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="size-5">
                        <AvatarFallback className="text-[8px] bg-muted">{lead?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{lead?.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="size-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{project.memberIds.length}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Calendar className="size-3" />
                    {new Date(project.startDate).toLocaleDateString("ro-RO", { month: "short", year: "numeric" })}
                    {" - "}
                    {new Date(project.endDate).toLocaleDateString("ro-RO", { month: "short", year: "numeric" })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedProject?.name}</DialogTitle>
            <DialogDescription>Detalii proiect</DialogDescription>
          </DialogHeader>
          {selectedProject && (() => {
            const lead = getUserById(selectedProject.leadId);
            const members = selectedProject.memberIds.map((id) => getUserById(id)).filter(Boolean);
            const statusConfig = STATUS_CONFIG[selectedProject.status];
            return (
              <div className="flex flex-col gap-4">
                <Badge variant="secondary" className={`w-fit ${statusConfig.className}`}>
                  {statusConfig.label}
                </Badge>
                <p className="text-sm text-foreground/80 leading-relaxed">{selectedProject.description}</p>
                <div className="grid grid-cols-2 gap-3 rounded-lg bg-muted/50 p-4">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase">Lider</p>
                    <p className="text-sm font-medium text-foreground">{lead?.name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase">Progres</p>
                    <p className="text-sm font-medium text-foreground">{selectedProject.progress}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase">Inceput</p>
                    <p className="text-sm text-foreground">
                      {new Date(selectedProject.startDate).toLocaleDateString("ro-RO")}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase">Sfarsit</p>
                    <p className="text-sm text-foreground">
                      {new Date(selectedProject.endDate).toLocaleDateString("ro-RO")}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Membri Echipa</p>
                  <div className="flex flex-wrap gap-2">
                    {members.map((m) => m && (
                      <div key={m.id} className="flex items-center gap-2 rounded-full bg-muted/50 px-3 py-1">
                        <Avatar className="size-5">
                          <AvatarFallback className="text-[8px] bg-primary/10 text-primary">
                            {m.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs">{m.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Progress value={selectedProject.progress} className="h-2" />
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* Create Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Proiect Nou</DialogTitle>
            <DialogDescription>Creati un proiect nou pentru organizatie.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Nume Proiect *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Denumirea proiectului"
              />
              {formErrors.name && <p className="text-xs text-destructive">{formErrors.name}</p>}
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
                <Label>Data Inceput *</Label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
                {formErrors.startDate && <p className="text-xs text-destructive">{formErrors.startDate}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Data Sfarsit *</Label>
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
                {formErrors.endDate && <p className="text-xs text-destructive">{formErrors.endDate}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Lider Proiect *</Label>
                <Select
                  value={formData.leadId}
                  onValueChange={(v) => setFormData({ ...formData, leadId: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectati" />
                  </SelectTrigger>
                  <SelectContent>
                    {allUsers.map((u) => (
                      <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formErrors.leadId && <p className="text-xs text-destructive">{formErrors.leadId}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(v) => setFormData({ ...formData, status: v as Project["status"] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">In Planificare</SelectItem>
                    <SelectItem value="active">Activ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Anuleaza</Button>
            <Button onClick={handleCreate}>Creeaza Proiect</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmati stergerea</AlertDialogTitle>
            <AlertDialogDescription>
              Sunteti sigur ca doriti sa stergeti acest proiect? Aceasta actiune nu poate fi anulata.
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
