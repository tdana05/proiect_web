import apiClient from './apiClient';
import type { Announcement } from '../types';

const API_ENDPOINT = '/announcements';

// Tip pentru răspunsul de succes de la backend
interface ApiResponse<T = any> {
    isSuccess: boolean;
    message: string;
    data?: T;
}

// Tip pentru DTO-ul de Announcement de la backend
interface AnnouncementDto {
    id: number;
    title: string;
    content: string;
    createdBy: string;
    createdAt: string;
    priority: string;
    pinned: boolean;
}

// Helper pentru a converti DTO-ul din backend la interfața frontend
const mapToAnnouncement = (dto: AnnouncementDto): Announcement => ({
    id: dto.id.toString(),
    title: dto.title,
    content: dto.content,
    createdBy: dto.createdBy,
    createdAt: dto.createdAt,
    priority: dto.priority as Announcement['priority'],
    pinned: dto.pinned,
});

export const announcementService = {
    // Get all announcements
    getAll: async (): Promise<Announcement[]> => {
        const response = await apiClient.get<AnnouncementDto[]>(API_ENDPOINT);
        return response.data.map(mapToAnnouncement);
    },

    // Get single announcement
    getById: async (id: string): Promise<Announcement | null> => {
        const response = await apiClient.get<AnnouncementDto>(`${API_ENDPOINT}/${id}`);
        if (response.data) {
            return mapToAnnouncement(response.data);
        }
        return null;
    },

    // Create announcement
    create: async (data: Omit<Announcement, 'id'>): Promise<Announcement> => {
        const response = await apiClient.post<ApiResponse>(API_ENDPOINT, {
            title: data.title,
            content: data.content,
            createdBy: data.createdBy,
            priority: data.priority,
            pinned: data.pinned,
        });

        if (response.data.isSuccess) {
            const allAnnouncements = await announcementService.getAll();
            return allAnnouncements[0];
        }
        throw new Error(response.data.message);
    },

    // Update announcement
    update: async (id: string, data: Partial<Announcement>): Promise<Announcement> => {
        const existing = await announcementService.getById(id);
        if (!existing) throw new Error('Announcement not found');

        const response = await apiClient.put<ApiResponse>(`${API_ENDPOINT}/${id}`, {
            id: parseInt(id),
            title: data.title || existing.title,
            content: data.content || existing.content,
            createdBy: data.createdBy || existing.createdBy,
            priority: data.priority || existing.priority,
            pinned: data.pinned !== undefined ? data.pinned : existing.pinned,
        });

        if (response.data.isSuccess) {
            return { ...existing, ...data };
        }
        throw new Error(response.data.message);
    },

    // Delete announcement
    delete: async (id: string): Promise<void> => {
        const response = await apiClient.delete<ApiResponse>(`${API_ENDPOINT}/${id}`);
        if (!response.data.isSuccess) {
            throw new Error(response.data.message);
        }
    },
};