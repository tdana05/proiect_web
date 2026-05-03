"use client";

import { useState, useMemo, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  getAnnouncements,
  createAnnouncement,
  deleteAnnouncement,
  getUserById,
} from "@/lib/data-service";
import type { Announcement } from "@/lib/types";
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
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Plus,
  Pin,
  Megaphone,
  Search,
  Trash2,
  AlertTriangle,
  Info,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

const PRIORITY_CONFIG: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
  high: { label: "Ridicata", className: "bg-destructive/10 text-destructive", icon: <AlertTriangle className="size-3" /> },
  medium: { label: "Medie", className: "bg-warning/10 text-warning-foreground", icon: <AlertCircle className="size-3" /> },
  low: { label: "Scazuta", className: "bg-muted text-muted-foreground", icon: <Info className="size-3" /> },
};

export default function AnnouncementsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => getAnnouncements());
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    priority: "medium" as Announcement["priority"],
    pinned: false,
  });

  const filtered = useMemo(() => {
    let result = [...announcements];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) => a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q)
      );
    }
    if (filterPriority !== "all") {
      result = result.filter((a) => a.priority === filterPriority);
    }
    // Sort: pinned first, then by date
    result.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return result;
  }, [announcements, searchQuery, filterPriority]);

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.title.trim()) errs.title = "Titlul este obligatoriu.";
    if (formData.title.trim().length < 3) errs.title = "Titlul trebuie sa aiba minim 3 caractere.";
    if (!formData.content.trim()) errs.content = "Continutul este obligatoriu.";
    if (formData.content.trim().length < 10) errs.content = "Continutul trebuie sa aiba minim 10 caractere.";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCreate = () => {
    if (!validateForm() || !user) return;
    const newAnnouncement = createAnnouncement({
      title: formData.title,
      content: formData.content,
      priority: formData.priority,
      pinned: formData.pinned,
      createdBy: user.id,
      createdAt: new Date().toISOString(),
    });
    setAnnouncements((prev) => [newAnnouncement, ...prev]);
    setShowCreateDialog(false);
    setFormData({ title: "", content: "", priority: "medium", pinned: false });
    setFormErrors({});
    toast.success("Anuntul a fost creat cu succes!");
  };

  const handleDelete = () => {
    if (!deleteId) return;
    deleteAnnouncement(deleteId);
    setAnnouncements((prev) => prev.filter((a) => a.id !== deleteId));
    setDeleteId(null);
    toast.success("Anuntul a fost sters.");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Anunturi</h1>
          <p className="text-sm text-muted-foreground">
            Anunturile organizatiei AMiCUS
          </p>
        </div>
        {isAdmin && (
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="mr-2 size-4" />
            Anunt Nou
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cauta anunturi..."
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
            <SelectItem value="all">Toate</SelectItem>
            <SelectItem value="high">Ridicata</SelectItem>
            <SelectItem value="medium">Medie</SelectItem>
            <SelectItem value="low">Scazuta</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Announcements List */}
      {filtered.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-2 py-12">
            <Megaphone className="size-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Nu au fost gasite anunturi.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((announcement) => {
            const author = getUserById(announcement.createdBy);
            const priority = PRIORITY_CONFIG[announcement.priority];
            return (
              <Card key={announcement.id} className={announcement.pinned ? "border-primary/30" : ""}>
                <CardContent className="p-5">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          {announcement.pinned && (
                            <Badge variant="secondary" className="bg-primary/10 text-primary gap-1 text-[10px]">
                              <Pin className="size-3" /> Fixat
                            </Badge>
                          )}
                          <Badge variant="secondary" className={`gap-1 text-[10px] ${priority.className}`}>
                            {priority.icon}
                            {priority.label}
                          </Badge>
                        </div>
                        <h3 className="text-base font-semibold text-foreground">
                          {announcement.title}
                        </h3>
                      </div>
                      {isAdmin && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 shrink-0 text-muted-foreground hover:text-destructive"
                          onClick={() => setDeleteId(announcement.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      )}
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                      {announcement.content}
                    </p>
                    <div className="flex items-center gap-3 pt-1">
                      <Avatar className="size-5">
                        <AvatarFallback className="text-[8px] bg-muted">
                          {author?.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">
                        {author?.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(announcement.createdAt).toLocaleDateString("ro-RO", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Create Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Anunt Nou</DialogTitle>
            <DialogDescription>
              Creati un anunt nou pentru voluntarii organizatiei.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="ann-title">Titlu *</Label>
              <Input
                id="ann-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Titlul anuntului"
              />
              {formErrors.title && <p className="text-xs text-destructive">{formErrors.title}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="ann-content">Continut *</Label>
              <Textarea
                id="ann-content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={5}
                placeholder="Scrieti continutul anuntului..."
              />
              {formErrors.content && <p className="text-xs text-destructive">{formErrors.content}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Prioritate</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(v) => setFormData({ ...formData, priority: v as Announcement["priority"] })}
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
                <Label>Fixeaza Anuntul</Label>
                <div className="flex items-center gap-2 pt-2">
                  <Switch
                    checked={formData.pinned}
                    onCheckedChange={(v) => setFormData({ ...formData, pinned: v })}
                  />
                  <span className="text-sm text-muted-foreground">
                    {formData.pinned ? "Fixat" : "Nefixat"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Anuleaza
            </Button>
            <Button onClick={handleCreate}>Publica Anunt</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmati stergerea</AlertDialogTitle>
            <AlertDialogDescription>
              Sunteti sigur ca doriti sa stergeti acest anunt? Aceasta actiune nu poate fi anulata.
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
