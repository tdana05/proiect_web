"use client";

import { useState, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";
import { updateUser } from "@/lib/data-service";
import { updateSession } from "@/lib/auth-service";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  Calendar,
  Building2,
  Clock,
  ListTodo,
  CalendarDays,
  Save,
  User,
} from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    department: user?.department || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "?";

  const validate = useCallback(() => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Numele este obligatoriu.";
    if (formData.name.trim().length < 2) newErrors.name = "Numele trebuie sa aiba minim 2 caractere.";
    if (formData.phone && !/^\+?[\d\s-]{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Format de telefon invalid.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSave = () => {
    if (!validate()) return;
    if (!user) return;

    const updated = updateUser(user.id, formData);
    if (updated) {
      updateSession(updated);
      toast.success("Profilul a fost actualizat cu succes!");
      setIsEditing(false);
    } else {
      toast.error("A aparut o eroare la actualizarea profilului.");
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
      bio: user?.bio || "",
      department: user?.department || "",
    });
    setErrors({});
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Profilul Meu</h1>
        <p className="text-sm text-muted-foreground">
          Vizualizati si editati informatiile contului dvs.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardContent className="flex flex-col items-center gap-4 p-6">
            <Avatar className="size-20">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h2 className="text-lg font-semibold text-foreground">{user.name}</h2>
              <Badge variant={user.role === "admin" ? "default" : "secondary"} className="mt-1">
                {user.role === "admin" ? "Administrator" : "Voluntar"}
              </Badge>
            </div>

            <Separator />

            <div className="flex w-full flex-col gap-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="size-4 text-muted-foreground" />
                <span className="text-muted-foreground">{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="size-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{user.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-sm">
                <Building2 className="size-4 text-muted-foreground" />
                <span className="text-muted-foreground">{user.department || "Nedefinit"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="size-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Membru din{" "}
                  {new Date(user.joinDate).toLocaleDateString("ro-RO", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <Separator />

            {/* Stats */}
            <div className="grid w-full grid-cols-3 gap-2">
              <div className="flex flex-col items-center gap-1 rounded-lg bg-muted/50 p-3">
                <Clock className="size-4 text-primary" />
                <span className="text-lg font-bold text-foreground">{user.totalHours}</span>
                <span className="text-[10px] text-muted-foreground">Ore</span>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-lg bg-muted/50 p-3">
                <ListTodo className="size-4 text-success" />
                <span className="text-lg font-bold text-foreground">{user.tasksCompleted}</span>
                <span className="text-[10px] text-muted-foreground">Task-uri</span>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-lg bg-muted/50 p-3">
                <CalendarDays className="size-4 text-accent-foreground" />
                <span className="text-lg font-bold text-foreground">{user.eventsAttended}</span>
                <span className="text-[10px] text-muted-foreground">Evenimente</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Form */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
                <User className="size-4" />
                Informatii Personale
              </CardTitle>
              <CardDescription>
                Actualizati informatiile profilului dvs.
              </CardDescription>
            </div>
            {!isEditing && (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                Editeaza
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Nume Complet</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive">{errors.name}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user.email} disabled />
                  <p className="text-xs text-muted-foreground">
                    Emailul nu poate fi modificat.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+373 XX XXX XXX"
                    disabled={!isEditing}
                  />
                  {errors.phone && (
                    <p className="text-xs text-destructive">{errors.phone}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="department">Departament</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="bio">Despre Mine</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  rows={4}
                  disabled={!isEditing}
                  placeholder="Cateva cuvinte despre tine..."
                />
              </div>

              {isEditing && (
                <div className="flex items-center justify-end gap-3">
                  <Button variant="outline" onClick={handleCancel}>
                    Anuleaza
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="mr-2 size-4" />
                    Salveaza
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
