"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import {
  Users,
  Clock,
  ListTodo,
  FolderKanban,
  Calendar,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { getStats, getUsers, getHoursEntries, getTasks } from "@/lib/data-service";
import type { TaskStatus } from "@/lib/types";

const STATUS_COLORS: Record<TaskStatus, string> = {
  PLANNED: "oklch(0.55 0.15 195)",
  IN_PROGRESS: "oklch(0.72 0.14 55)",
  BLOCKED: "oklch(0.577 0.245 27.325)",
  REVIEW: "oklch(0.50 0.12 260)",
  DONE: "oklch(0.60 0.16 150)",
};

const STATUS_LABELS: Record<TaskStatus, string> = {
  PLANNED: "Planificat",
  IN_PROGRESS: "In Progres",
  BLOCKED: "Blocat",
  REVIEW: "In Revizuire",
  DONE: "Finalizat",
};

export default function StatisticsPage() {
  const stats = useMemo(() => getStats(), []);
  const users = useMemo(() => getUsers(), []);
  const hours = useMemo(() => getHoursEntries(), []);
  const tasks = useMemo(() => getTasks(), []);

  const pieData = useMemo(
    () =>
      Object.entries(stats.tasksByStatus).map(([status, count]) => ({
        name: STATUS_LABELS[status as TaskStatus],
        value: count,
        color: STATUS_COLORS[status as TaskStatus],
      })),
    [stats.tasksByStatus]
  );

  const topVolunteers = useMemo(
    () =>
      users
        .filter((u) => u.role === "volunteer")
        .sort((a, b) => b.totalHours - a.totalHours)
        .slice(0, 5)
        .map((u) => ({
          name: u.name.split(" ")[0],
          ore: u.totalHours,
          taskuri: u.tasksCompleted,
        })),
    [users]
  );

  const hoursByStatus = useMemo(() => {
    const approved = hours.filter((h) => h.status === "approved").reduce((s, h) => s + h.hours, 0);
    const pending = hours.filter((h) => h.status === "pending").reduce((s, h) => s + h.hours, 0);
    const rejected = hours.filter((h) => h.status === "rejected").reduce((s, h) => s + h.hours, 0);
    return [
      { name: "Aprobate", value: approved, color: "oklch(0.60 0.16 150)" },
      { name: "In Asteptare", value: pending, color: "oklch(0.72 0.14 55)" },
      { name: "Respinse", value: rejected, color: "oklch(0.577 0.245 27.325)" },
    ];
  }, [hours]);

  const taskCompletionRate = stats.totalTasks > 0 
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
    : 0;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Statistici</h1>
        <p className="text-sm text-muted-foreground">
          Vizualizarea datelor organizatiei AMiCUS
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Users className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.totalVolunteers}</p>
              <p className="text-xs text-muted-foreground">Voluntari Activi</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-success/10">
              <Clock className="size-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.totalHours}</p>
              <p className="text-xs text-muted-foreground">Ore Voluntariat</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
              <ListTodo className="size-5 text-accent-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.totalTasks}</p>
              <p className="text-xs text-muted-foreground">Total Task-uri</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <FolderKanban className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.activeProjects}</p>
              <p className="text-xs text-muted-foreground">Proiecte Active</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Calendar className="size-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Evenimente Viitoare</p>
                <p className="text-xs text-muted-foreground">Planificate</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-foreground">{stats.upcomingEvents}</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="size-5 text-success" />
              <div>
                <p className="text-sm font-medium text-foreground">Rata Completare</p>
                <p className="text-xs text-muted-foreground">Task-uri finalizate</p>
              </div>
            </div>
            <span className="text-2xl font-bold text-foreground">{taskCompletionRate}%</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="size-5 text-warning" />
              <div>
                <p className="text-sm font-medium text-foreground">Ore in Asteptare</p>
                <p className="text-xs text-muted-foreground">Necesita aprobare</p>
              </div>
            </div>
            <Badge variant="secondary">{stats.pendingHours}</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Hours per month */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="size-4" />
              Ore Voluntariat pe Luna
            </CardTitle>
            <CardDescription>Evolutia orelor de voluntariat in ultimele 6 luni</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.hoursByMonth}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs fill-muted-foreground" fontSize={12} />
                  <YAxis className="text-xs fill-muted-foreground" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.19 0.02 250)",
                      border: "1px solid oklch(0.30 0.02 250)",
                      borderRadius: "8px",
                      color: "oklch(0.92 0.01 220)",
                      fontSize: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="hours"
                    name="Ore"
                    stroke="oklch(0.55 0.15 195)"
                    strokeWidth={2}
                    dot={{ fill: "oklch(0.55 0.15 195)", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Tasks by status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Distributie Task-uri</CardTitle>
            <CardDescription>Status-ul curent al tuturor task-urilor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.19 0.02 250)",
                      border: "1px solid oklch(0.30 0.02 250)",
                      borderRadius: "8px",
                      color: "oklch(0.92 0.01 220)",
                      fontSize: "12px",
                    }}
                  />
                  <Legend
                    formatter={(value) => (
                      <span style={{ color: "oklch(0.50 0.02 260)", fontSize: "12px" }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top volunteers */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top Voluntari</CardTitle>
            <CardDescription>Voluntarii cu cele mai multe ore</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topVolunteers} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis type="number" className="text-xs fill-muted-foreground" fontSize={12} />
                  <YAxis type="category" dataKey="name" className="text-xs fill-muted-foreground" fontSize={12} width={60} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.19 0.02 250)",
                      border: "1px solid oklch(0.30 0.02 250)",
                      borderRadius: "8px",
                      color: "oklch(0.92 0.01 220)",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="ore" name="Ore" fill="oklch(0.55 0.15 195)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Hours by status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Ore pe Status</CardTitle>
            <CardDescription>Distributia orelor dupa starea de aprobare</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={hoursByStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {hoursByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(0.19 0.02 250)",
                      border: "1px solid oklch(0.30 0.02 250)",
                      borderRadius: "8px",
                      color: "oklch(0.92 0.01 220)",
                      fontSize: "12px",
                    }}
                  />
                  <Legend
                    formatter={(value) => (
                      <span style={{ color: "oklch(0.50 0.02 260)", fontSize: "12px" }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
