// ============ ENUMS ============
export type UserRole = "admin" | "volunteer";

export type TaskStatus = "PLANNED" | "IN_PROGRESS" | "BLOCKED" | "REVIEW" | "DONE";

export type HoursStatus = "pending" | "approved" | "rejected";

// ============ MODELS ============
export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    role: UserRole;
    avatar?: string;
    phone?: string;
    joinDate: string;
    department?: string;
    bio?: string;
    totalHours: number;
    tasksCompleted: number;
    eventsAttended: number;
}

export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    endDate?: string;
    location: string;
    type: "meeting" | "training" | "event" | "workshop" | "fundraiser";
    createdBy: string;
    attendees: string[];
    color: string;
}

export interface Announcement {
    id: string;
    title: string;
    content: string;
    createdBy: string;
    createdAt: string;
    priority: "low" | "medium" | "high";
    pinned: boolean;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    assigneeId: string;
    ownerId: string;
    dueDate: string;
    createdAt: string;
    priority: "low" | "medium" | "high";
    category: string;
}

export interface HoursEntry {
    id: string;
    volunteerId: string;
    date: string;
    hours: number;
    description: string;
    relatedTaskId?: string;
    relatedEventId?: string;
    status: HoursStatus;
    adminNote?: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: "active" | "completed" | "planning";
    leadId: string;
    memberIds: string[];
    progress: number;
}

export interface Document {
    id: string;
    name: string;
    type: "pdf" | "doc" | "spreadsheet" | "image" | "other";
    uploadedBy: string;
    uploadedAt: string;
    size: string;
    category: "policy" | "report" | "template" | "training" | "other";
    url: string;
}