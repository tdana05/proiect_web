"use client";

import { useState, useMemo } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  getDocuments,
  createDocument,
  deleteDocument,
  getUserById,
} from "@/lib/data-service";
import type { Document } from "@/lib/types";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Search,
  FileText,
  File,
  FileSpreadsheet,
  FileImage,
  Trash2,
  Download,
  Filter,
} from "lucide-react";
import { toast } from "sonner";

const TYPE_ICONS: Record<string, React.ReactNode> = {
  pdf: <FileText className="size-5 text-destructive" />,
  doc: <File className="size-5 text-primary" />,
  spreadsheet: <FileSpreadsheet className="size-5 text-success" />,
  image: <FileImage className="size-5 text-accent-foreground" />,
  other: <File className="size-5 text-muted-foreground" />,
};

const CATEGORY_LABELS: Record<string, string> = {
  policy: "Politici",
  report: "Rapoarte",
  template: "Template",
  training: "Training",
  other: "Altele",
};

export default function DocumentsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [documents, setDocuments] = useState<Document[]>(() => getDocuments());
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: "",
    type: "pdf" as Document["type"],
    category: "other" as Document["category"],
    size: "",
  });

  const filtered = useMemo(() => {
    let result = [...documents];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((d) => d.name.toLowerCase().includes(q));
    }
    if (filterCategory !== "all") {
      result = result.filter((d) => d.category === filterCategory);
    }
    return result;
  }, [documents, searchQuery, filterCategory]);

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Numele fisierului este obligatoriu.";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleUpload = () => {
    if (!validateForm() || !user) return;
    const newDoc = createDocument({
      name: formData.name,
      type: formData.type,
      category: formData.category,
      uploadedBy: user.id,
      uploadedAt: new Date().toISOString(),
      size: formData.size || "1.0 MB",
      url: "#",
    });
    setDocuments((prev) => [newDoc, ...prev]);
    setShowUploadDialog(false);
    setFormData({ name: "", type: "pdf", category: "other", size: "" });
    setFormErrors({});
    toast.success("Documentul a fost incarcat cu succes!");
  };

  const handleDelete = () => {
    if (!deleteId) return;
    deleteDocument(deleteId);
    setDocuments((prev) => prev.filter((d) => d.id !== deleteId));
    setDeleteId(null);
    toast.success("Documentul a fost sters.");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Documente</h1>
          <p className="text-sm text-muted-foreground">
            Resursele si documentele organizatiei AMiCUS
          </p>
        </div>
        {isAdmin && (
          <Button onClick={() => setShowUploadDialog(true)}>
            <Plus className="mr-2 size-4" />
            Incarca Document
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cauta documente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Categorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toate Categoriile</SelectItem>
            {Object.entries(CATEGORY_LABELS).map(([val, label]) => (
              <SelectItem key={val} value={val}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Documents Table */}
      <Card>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12">
              <Filter className="size-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Nu au fost gasite documente.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Categorie</TableHead>
                    <TableHead>Dimensiune</TableHead>
                    <TableHead>Incarcat de</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Actiuni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((doc) => {
                    const uploader = getUserById(doc.uploadedBy);
                    return (
                      <TableRow key={doc.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {TYPE_ICONS[doc.type]}
                            <div>
                              <p className="text-sm font-medium text-foreground">{doc.name}</p>
                              <p className="text-xs text-muted-foreground uppercase">{doc.type}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {CATEGORY_LABELS[doc.category]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{doc.size}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{uploader?.name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(doc.uploadedAt).toLocaleDateString("ro-RO")}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="size-8">
                              <Download className="size-4" />
                            </Button>
                            {isAdmin && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8 text-muted-foreground hover:text-destructive"
                                onClick={() => setDeleteId(doc.id)}
                              >
                                <Trash2 className="size-4" />
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

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Incarca Document</DialogTitle>
            <DialogDescription>
              Adaugati un document nou in arhiva organizatiei.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Nume Document *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Denumirea documentului"
              />
              {formErrors.name && <p className="text-xs text-destructive">{formErrors.name}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Tip Fisier</Label>
                <Select
                  value={formData.type}
                  onValueChange={(v) => setFormData({ ...formData, type: v as Document["type"] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="doc">Document</SelectItem>
                    <SelectItem value="spreadsheet">Spreadsheet</SelectItem>
                    <SelectItem value="image">Imagine</SelectItem>
                    <SelectItem value="other">Altul</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Categorie</Label>
                <Select
                  value={formData.category}
                  onValueChange={(v) => setFormData({ ...formData, category: v as Document["category"] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(CATEGORY_LABELS).map(([val, label]) => (
                      <SelectItem key={val} value={val}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Dimensiune (optional)</Label>
              <Input
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                placeholder="Ex: 2.5 MB"
              />
            </div>
            <div className="rounded-lg border-2 border-dashed border-border p-8 text-center">
              <FileText className="mx-auto size-8 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Simulare upload fisier (demo)
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUploadDialog(false)}>Anuleaza</Button>
            <Button onClick={handleUpload}>Incarca</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmati stergerea</AlertDialogTitle>
            <AlertDialogDescription>
              Sunteti sigur ca doriti sa stergeti acest document? Aceasta actiune nu poate fi anulata.
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
