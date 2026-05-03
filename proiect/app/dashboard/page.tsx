"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Clock,
  ListTodo,
  Calendar,
  Megaphone,
  FolderKanban,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import {
  getStats,
  getAnnouncements,
  getTasks,
  getEvents,
  getProjects,
  getUserById,
} from "@/lib/data-service";

const STATUS_STYLES: Record<string, string> = {
  PLANNED: "bg-primary/10 text-primary",
  IN_PROGRESS: "bg-warning/10 text-warning-foreground",
  BLOCKED: "bg-destructive/10 text-destructive",
  REVIEW: "bg-muted text-muted-foreground",
  DONE: "bg-success/10 text-success",
};

export default function DashboardPage() {
  const { user } = useAuth();
  const stats = useMemo(() => getStats(), []);
  const announcements = useMemo(() => getAnnouncements().slice(0, 3), []);
  const events = useMemo(
    () =>
      getEvents()
        .filter((e) => new Date(e.date) >= new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 4),
    []
  );
  const myTasks = useMemo(
    () =>
      getTasks()
        .filter((t) => t.assigneeId === user?.id || t.ownerId === user?.id)
        .filter((t) => t.status !== "DONE")
        .slice(0, 5),
    [user?.id]
  );
  const activeProjects = useMemo(
    () => getProjects().filter((p) => p.status === "active").slice(0, 3),
    []
  );

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buna dimineata";
    if (hour < 18) return "Buna ziua";
    return "Buna seara";
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {greeting}, {user?.name?.split(" ")[0]}!
        </h1>
        <p className="text-sm text-muted-foreground">
          Iata un rezumat al activitatilor organizatiei AMiCUS.
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Users className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.totalVolunteers}</p>
              <p className="text-xs text-muted-foreground">Voluntari</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-success/10">
              <Clock className="size-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.totalHours}</p>
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
                {stats.completedTasks}/{stats.totalTasks}
              </p>
              <p className="text-xs text-muted-foreground">Task-uri</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Calendar className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.upcomingEvents}</p>
              <p className="text-xs text-muted-foreground">Evenimente</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* My Tasks */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Task-urile Mele</CardTitle>
              <CardDescription>Task-uri active asignate tie</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/tasks">
                Toate <ArrowRight className="ml-1 size-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {myTasks.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-8 text-muted-foreground">
                <CheckCircle2 className="size-8" />
                <p className="text-sm">Nu ai task-uri active!</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {myTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between rounded-lg border border-border/50 p-3"
                  >
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-foreground">{task.title}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{task.category}</span>
                        <span className="text-xs text-muted-foreground">
                          Termen: {new Date(task.dueDate).toLocaleDateString("ro-RO")}
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className={STATUS_STYLES[task.status]}
                    >
                      {task.status.replace("_", " ")}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
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
                <div key={event.id} className="flex items-start gap-3">
                  <div
                    className="mt-1 size-3 shrink-0 rounded-full"
                    style={{ backgroundColor: event.color }}
                  />
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-medium text-foreground leading-tight">
                      {event.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(event.date).toLocaleDateString("ro-RO", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-muted-foreground">{event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Announcements */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
                <Megaphone className="size-4" />
                Anunturi Recente
              </CardTitle>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/announcements">
                Toate <ArrowRight className="ml-1 size-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {announcements.map((a) => (
                <div
                  key={a.id}
                  className="flex flex-col gap-1 rounded-lg border border-border/50 p-3"
                >
                  <div className="flex items-center gap-2">
                    {a.pinned && (
                      <Badge variant="secondary" className="bg-warning/10 text-warning-foreground text-[10px]">
                        Fixat
                      </Badge>
                    )}
                    <span className="text-sm font-medium text-foreground">{a.title}</span>
                  </div>
                  <p className="line-clamp-2 text-xs text-muted-foreground">{a.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Projects */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
                <FolderKanban className="size-4" />
                Proiecte Active
              </CardTitle>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/projects">
                Toate <ArrowRight className="ml-1 size-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {activeProjects.map((project) => {
                const lead = getUserById(project.leadId);
                return (
                  <div key={project.id} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{project.name}</p>
                      <span className="text-xs text-muted-foreground font-mono">
                        {project.progress}%
                      </span>
                    </div>
                    <Progress value={project.progress} className="h-1.5" />
                    <div className="flex items-center gap-2">
                      <Avatar className="size-4">
                        <AvatarFallback className="text-[8px] bg-muted">
                          {lead?.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">
                        {lead?.name} - {project.memberIds.length} membri
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
