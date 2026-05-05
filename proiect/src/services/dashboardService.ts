import apiClient from './apiClient';
import type { Task, Event, Announcement } from '../types';

interface DashboardStats {
    // Admin stats
    totalVolunteers?: number;
    totalApprovedHours?: number;
    totalActiveTasks?: number;
    totalUpcomingEvents?: number;
    // Volunteer stats
    myHours?: number;
    myActiveTasks?: number;
    myCompletedTasks?: number;
    myUpcomingEvents?: number;
    // Common
    pendingHours?: number;
    tasksByStatus?: {
        PLANNED: number;
        IN_PROGRESS: number;
        BLOCKED: number;
        REVIEW: number;
        DONE: number;
    };
    hoursByMonth?: Array<{ month: string; hours: number }>;
    volunteerActivity?: Array<{ name: string; hours: number; tasks: number }>;
}

interface RecentTaskDto {
    id: number;
    title: string;
    status: string;
    dueDate: string;
    assigneeName: string;
}

interface RecentEventDto {
    id: number;
    title: string;
    date: string;
    location: string;
    color: string;
}

interface RecentAnnouncementDto {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    priority: string;
    pinned: boolean;
}

// Map functions
const mapToTask = (dto: RecentTaskDto): Task => ({
    id: dto.id.toString(),
    title: dto.title,
    description: '',
    status: dto.status as any,
    assigneeId: '',
    ownerId: '',
    dueDate: dto.dueDate,
    createdAt: new Date().toISOString(),
    priority: 'medium',
    category: ''
});

const mapToEvent = (dto: RecentEventDto): Event => ({
    id: dto.id.toString(),
    title: dto.title,
    description: '',
    date: dto.date,
    location: dto.location,
    type: 'event',
    createdBy: '',
    attendees: [],
    color: dto.color
});

const mapToAnnouncement = (dto: RecentAnnouncementDto): Announcement => ({
    id: dto.id.toString(),
    title: dto.title,
    content: dto.content,
    createdBy: '',
    createdAt: dto.createdAt,
    priority: dto.priority as any,
    pinned: dto.pinned
});

export const dashboardService = {
    getStats: async (userId?: string, isAdmin: boolean = false): Promise<DashboardStats> => {
        let url = '/dashboard/stats';
        const params = new URLSearchParams();

        if (userId) {
            params.append('userId', userId);
        }
        params.append('isAdmin', isAdmin.toString());

        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        const response = await apiClient.get(url);
        return response.data;
    },

    getRecentTasks: async (userId: string, isAdmin: boolean = false): Promise<Task[]> => {
        const response = await apiClient.get(`/dashboard/recent-tasks?userId=${userId}&isAdmin=${isAdmin}`);
        return response.data.map(mapToTask);
    },

    getRecentEvents: async (): Promise<Event[]> => {
        const response = await apiClient.get('/dashboard/recent-events');
        return response.data.map(mapToEvent);
    },

    getRecentAnnouncements: async (): Promise<Announcement[]> => {
        const response = await apiClient.get('/dashboard/recent-announcements');
        return response.data.map(mapToAnnouncement);
    }
};