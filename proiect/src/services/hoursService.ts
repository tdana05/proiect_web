import apiClient from './apiClient';

interface HoursEntryDto {
    id: number;
    volunteerId: number;
    volunteerName: string;
    date: string;
    hours: number;
    description: string;
    relatedTaskId?: number;
    relatedEventId?: number;
    status: 'pending' | 'approved' | 'rejected';
    adminNote?: string;
    createdAt: string;
}

interface CreateHoursEntryDto {
    volunteerId: number;
    date: string;
    hours: number;
    description: string;
    relatedTaskId?: number;
    relatedEventId?: number;
}

export const hoursService = {
    // Pentru admin - obține toate orele
    getAll: async (): Promise<HoursEntryDto[]> => {
        const response = await apiClient.get('/hours');
        return response.data;
    },

    // Pentru voluntar - obține orele proprii
    getMyHours: async (volunteerId: number): Promise<HoursEntryDto[]> => {
        const response = await apiClient.get(`/hours/volunteer/${volunteerId}`);
        return response.data;
    },

    // Creează o înregistrare de ore
    create: async (data: CreateHoursEntryDto): Promise<void> => {
        await apiClient.post('/hours', data);
    },

    // Admin - aprobă/respinge ore
    updateStatus: async (id: number, status: string, adminNote?: string): Promise<void> => {
        await apiClient.put(`/hours/${id}/status`, { status, adminNote });
    },

    // Șterge o înregistrare (admin)
    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`/hours/${id}`);
    }
};