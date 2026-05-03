"use client";

import { useState, useMemo } from "react";
import { useAuth } from "@/lib/auth-context";
import { getUsers } from "@/lib/data-service";
import type { User } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Users,
  Mail,
  Phone,
  Building2,
  Calendar,
  Clock,
  ListTodo,
  CalendarDays,
  Eye,
  SortAsc,
  SortDesc,
} from "lucide-react";

export default function VolunteersPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [users] = useState<User[]>(() => getUsers());
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const departments = useMemo(() => {
    const deps = new Set(users.map((u) => u.department).filter(Boolean));
    return Array.from(deps) as string[];
  }, [users]);

  const volunteers = useMemo(() => {
    let result = users.filter((u) => u.role === "volunteer");
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.department?.toLowerCase().includes(q)
      );
    }
    if (filterDepartment !== "all") {
      result = result.filter((u) => u.department === filterDepartment);
    }
    result.sort((a, b) => {
      let cmp = 0;
      switch (sortBy) {
        case "name": cmp = a.name.localeCompare(b.name); break;
        case "hours": cmp = a.totalHours - b.totalHours; break;
        case "tasks": cmp = a.tasksCompleted - b.tasksCompleted; break;
        case "joinDate": cmp = new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime(); break;
        default: cmp = 0;
      }
      return sortOrder === "desc" ? -cmp : cmp;
    });
    return result;
  }, [users, searchQuery, filterDepartment, sortBy, sortOrder]);

  // Redirect non-admin to 403
  if (!isAdmin) {
    if (typeof window !== "undefined") {
      window.location.href = "/error/403";
    }
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Voluntari</h1>
        <p className="text-sm text-muted-foreground">
          Gestionarea voluntarilor organizatiei AMiCUS
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Users className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{volunteers.length}</p>
              <p className="text-xs text-muted-foreground">Total Voluntari</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-success/10">
              <Clock className="size-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {volunteers.reduce((s, v) => s + v.totalHours, 0)}
              </p>
              <p className="text-xs text-muted-foreground">Ore Totale</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
              <ListTodo className="size-5 text-accent-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {volunteers.reduce((s, v) => s + v.tasksCompleted, 0)}
              </p>
              <p className="text-xs text-muted-foreground">Task-uri Finalizate</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{departments.length}</p>
              <p className="text-xs text-muted-foreground">Departamente</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cauta voluntari..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterDepartment} onValueChange={setFilterDepartment}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Departament" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toate Departamentele</SelectItem>
            {departments.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Sorteaza" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nume</SelectItem>
            <SelectItem value="hours">Ore</SelectItem>
            <SelectItem value="tasks">Task-uri</SelectItem>
            <SelectItem value="joinDate">Data Inscrierii</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          {sortOrder === "asc" ? <SortAsc className="size-4" /> : <SortDesc className="size-4" />}
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Voluntar</TableHead>
                  <TableHead>Departament</TableHead>
                  <TableHead>Ore</TableHead>
                  <TableHead>Task-uri</TableHead>
                  <TableHead>Evenimente</TableHead>
                  <TableHead>Membru din</TableHead>
                  <TableHead className="text-right">Actiuni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {volunteers.map((vol) => {
                  const initials = vol.name.split(" ").map((n) => n[0]).join("").toUpperCase();
                  return (
                    <TableRow key={vol.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-8">
                            <AvatarFallback className="text-xs bg-primary/10 text-primary">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-foreground">{vol.name}</p>
                            <p className="text-xs text-muted-foreground">{vol.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {vol.department}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{vol.totalHours}h</TableCell>
                      <TableCell>{vol.tasksCompleted}</TableCell>
                      <TableCell>{vol.eventsAttended}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(vol.joinDate).toLocaleDateString("ro-RO", {
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedUser(vol)}
                          className="text-xs"
                        >
                          <Eye className="mr-1 size-3" /> Detalii
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Volunteer Detail Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Profil Voluntar</DialogTitle>
            <DialogDescription>Detalii complete despre voluntar</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="size-14">
                  <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                    {selectedUser.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{selectedUser.name}</h3>
                  <Badge variant="secondary" className="mt-1">Voluntar</Badge>
                </div>
              </div>
              <Separator />
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="size-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{selectedUser.email}</span>
                </div>
                {selectedUser.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="size-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{selectedUser.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm">
                  <Building2 className="size-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{selectedUser.department}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="size-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Membru din {new Date(selectedUser.joinDate).toLocaleDateString("ro-RO", { month: "long", year: "numeric" })}
                  </span>
                </div>
              </div>
              {selectedUser.bio && (
                <>
                  <Separator />
                  <p className="text-sm text-foreground/80 leading-relaxed">{selectedUser.bio}</p>
                </>
              )}
              <Separator />
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center gap-1 rounded-lg bg-muted/50 p-3">
                  <Clock className="size-4 text-primary" />
                  <span className="text-lg font-bold text-foreground">{selectedUser.totalHours}</span>
                  <span className="text-[10px] text-muted-foreground">Ore</span>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-lg bg-muted/50 p-3">
                  <ListTodo className="size-4 text-success" />
                  <span className="text-lg font-bold text-foreground">{selectedUser.tasksCompleted}</span>
                  <span className="text-[10px] text-muted-foreground">Task-uri</span>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-lg bg-muted/50 p-3">
                  <CalendarDays className="size-4 text-accent-foreground" />
                  <span className="text-lg font-bold text-foreground">{selectedUser.eventsAttended}</span>
                  <span className="text-[10px] text-muted-foreground">Evenimente</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
