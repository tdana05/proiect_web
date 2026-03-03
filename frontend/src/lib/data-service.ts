import {
    mockUsers,
    mockEvents,
    mockAnnouncements,
    mockTasks,
    mockHoursEntries,
    mockProjects,
    mockDocuments,
} from "./mock-data";
import type {
    User,
    Event,
    Announcement,
    Task,
    HoursEntry,
    Project,
    Document,
    TaskStatus,
    HoursStatus,
} from "./types";

// In-memory state (simulating a database)
let users = [...mockUsers];
let events = [...mockEvents];
let announcements = [...mockAnnouncements];
let tasks = [...mockTasks];
let hoursEntries = [...mockHoursEntries];
let projects = [...mockProjects];
let documents = [...mockDocuments];

// ============ USERS ============
export function getUsers(): User[] {
    return [...users];
}

export function getUserById(id: string): User | undefined {
    return users.find((u) => u.id === id);
}

export function updateUser(id: string, data: Partial<User>): User | null {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    users[index] = { ...users[index], ...data };
    return users[index];
}

// ============ EVENTS ============
export function getEvents(): Event[] {
    return [...events];
}

export function getEventById(id: string): Event | undefined {
    return events.find((e) => e.id === id);
}

export function createEvent(data: Omit<Event, "id">): Event {
    const newEvent: Event = {
        ...data,
        id: `e${Date.now()}`,
    };
    events = [newEvent, ...events];
    return newEvent;
}

export function updateEvent(id: string, data: Partial<Event>): Event | null {
    const index = events.findIndex((e) => e.id === id);
    if (index === -1) return null;
    events[index] = { ...events[index], ...data };
    return events[index];
}

export function deleteEvent(id: string): boolean {
    const len = events.length;
    events = events.filter((e) => e.id !== id);
    return events.length < len;
}

// ============ ANNOUNCEMENTS ============
export function getAnnouncements(): Announcement[] {
    return [...announcements].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

export function createAnnouncement(
    data: Omit<Announcement, "id">
): Announcement {
    const newAnnouncement: Announcement = {
        ...data,
        id: `a${Date.now()}`,
    };
    announcements = [newAnnouncement, ...announcements];
    return newAnnouncement;
}

export function updateAnnouncement(
    id: string,
    data: Partial<Announcement>
): Announcement | null {
    const index = announcements.findIndex((a) => a.id === id);
    if (index === -1) return null;
    announcements[index] = { ...announcements[index], ...data };
    return announcements[index];
}

export function deleteAnnouncement(id: string): boolean {
    const len = announcements.length;
    announcements = announcements.filter((a) => a.id !== id);
    return announcements.length < len;
}

// ============ TASKS ============
export function getTasks(): Task[] {
    return [...tasks];
}

export function getTaskById(id: string): Task | undefined {
    return tasks.find((t) => t.id === id);
}

export function createTask(data: Omit<Task, "id">): Task {
    const newTask: Task = {
        ...data,
        id: `t${Date.now()}`,
        status: "PLANNED",
    };
    tasks = [newTask, ...tasks];
    return newTask;
}

export function updateTask(id: string, data: Partial<Task>): Task | null {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return null;
    tasks[index] = { ...tasks[index], ...data };
    return tasks[index];
}

export function updateTaskStatus(
    id: string,
    newStatus: TaskStatus,
    userId: string
): { success: boolean; error?: string } {
    const task = tasks.find((t) => t.id === id);
    if (!task) return { success: false, error: "Task-ul nu a fost gasit." };

    // DONE can only be set by owner, and only from REVIEW
    if (newStatus === "DONE") {
        if (task.ownerId !== userId) {
            return {
                success: false,
                error: "Doar owner-ul task-ului poate marca DONE.",
            };
        }
        if (task.status !== "REVIEW") {
            return {
                success: false,
                error: "Task-ul trebuie sa fie in REVIEW pentru a fi marcat DONE.",
            };
        }
    }

    // Valid transitions
    const validTransitions: Record<TaskStatus, TaskStatus[]> = {
        PLANNED: ["IN_PROGRESS"],
        IN_PROGRESS: ["BLOCKED", "REVIEW"],
        BLOCKED: ["IN_PROGRESS"],
        REVIEW: ["IN_PROGRESS", "DONE"],
        DONE: [],
    };

    if (!validTransitions[task.status].includes(newStatus)) {
        return {
            success: false,
            error: `Nu se poate trece de la ${task.status} la ${newStatus}.`,
        };
    }

    const index = tasks.findIndex((t) => t.id === id);
    tasks[index] = { ...tasks[index], status: newStatus };
    return { success: true };
}

export function deleteTask(id: string): boolean {
    const len = tasks.length;
    tasks = tasks.filter((t) => t.id !== id);
    return tasks.length < len;
}

// ============ HOURS ============
export function getHoursEntries(): HoursEntry[] {
    return [...hoursEntries].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getHoursByVolunteer(volunteerId: string): HoursEntry[] {
    return hoursEntries
        .filter((h) => h.volunteerId === volunteerId)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function createHoursEntry(data: Omit<HoursEntry, "id">): HoursEntry {
    const newEntry: HoursEntry = {
        ...data,
        id: `h${Date.now()}`,
    };
    hoursEntries = [newEntry, ...hoursEntries];
    return newEntry;
}

export function updateHoursEntry(
    id: string,
    data: Partial<HoursEntry>
): HoursEntry | null {
    const index = hoursEntries.findIndex((h) => h.id === id);
    if (index === -1) return null;
    hoursEntries[index] = { ...hoursEntries[index], ...data };
    return hoursEntries[index];
}

export function updateHoursStatus(
    id: string,
    status: HoursStatus,
    adminNote?: string
): HoursEntry | null {
    const index = hoursEntries.findIndex((h) => h.id === id);
    if (index === -1) return null;
    hoursEntries[index] = {
        ...hoursEntries[index],
        status,
        adminNote: adminNote || hoursEntries[index].adminNote,
    };
    return hoursEntries[index];
}

// ============ PROJECTS ============
export function getProjects(): Project[] {
    return [...projects];
}

export function getProjectById(id: string): Project | undefined {
    return projects.find((p) => p.id === id);
}

export function createProject(data: Omit<Project, "id">): Project {
    const newProject: Project = {
        ...data,
        id: `p${Date.now()}`,
    };
    projects = [newProject, ...projects];
    return newProject;
}

export function updateProject(
    id: string,
    data: Partial<Project>
): Project | null {
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) return null;
    projects[index] = { ...projects[index], ...data };
    return projects[index];
}

export function deleteProject(id: string): boolean {
    const len = projects.length;
    projects = projects.filter((p) => p.id !== id);
    return projects.length < len;
}

// ============ DOCUMENTS ============
export function getDocuments(): Document[] {
    return [...documents].sort(
        (a, b) =>
            new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
}

export function createDocument(data: Omit<Document, "id">): Document {
    const newDoc: Document = {
        ...data,
        id: `d${Date.now()}`,
    };
    documents = [newDoc, ...documents];
    return newDoc;
}

export function deleteDocument(id: string): boolean {
    const len = documents.length;
    documents = documents.filter((d) => d.id !== id);
    return documents.length < len;
}

// ============ STATISTICS ============
export function getStats() {
    const totalVolunteers = users.filter((u) => u.role === "volunteer").length;
    const totalHours = hoursEntries
        .filter((h) => h.status === "approved")
        .reduce((sum, h) => sum + h.hours, 0);
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === "DONE").length;
    const activeProjects = projects.filter((p) => p.status === "active").length;
    const upcomingEvents = events.filter(
        (e) => new Date(e.date) > new Date()
    ).length;
    const pendingHours = hoursEntries.filter(
        (h) => h.status === "pending"
    ).length;

    const tasksByStatus = {
        PLANNED: tasks.filter((t) => t.status === "PLANNED").length,
        IN_PROGRESS: tasks.filter((t) => t.status === "IN_PROGRESS").length,
        BLOCKED: tasks.filter((t) => t.status === "BLOCKED").length,
        REVIEW: tasks.filter((t) => t.status === "REVIEW").length,
        DONE: tasks.filter((t) => t.status === "DONE").length,
    };

    const hoursByMonth = [
        { month: "Sep", hours: 45 },
        { month: "Oct", hours: 62 },
        { month: "Nov", hours: 78 },
        { month: "Dec", hours: 55 },
        { month: "Ian", hours: 82 },
        { month: "Feb", hours: totalHours },
    ];

    const volunteerActivity = users
        .filter((u) => u.role === "volunteer")
        .map((u) => ({
            name: u.name.split(" ")[0],
            hours: u.totalHours,
            tasks: u.tasksCompleted,
        }));

    return {
        totalVolunteers,
        totalHours,
        totalTasks,
        completedTasks,
        activeProjects,
        upcomingEvents,
        pendingHours,
        tasksByStatus,
        hoursByMonth,
        volunteerActivity,
    };
}
