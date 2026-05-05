import apiClient from './apiClient';
import type { Event } from '../types';

const API_ENDPOINT = '/events';

interface CreateEventDto {
    title: string;
    description: string;
    date: string;
    endDate?: string;
    location: string;
    type: string;
    createdBy: number;
    color: string;
    attendeeIds: number[];
}

interface EventDto {
    id: number;
    title: string;
    description: string;
    date: string;
    endDate?: string;
    location: string;
    type: string;
    createdBy: string;
    createdByName: string;
    attendees: string[];
    attendeeIds: number[];
    color: string;
}

const mapToEvent = (dto: EventDto): Event => ({
    id: dto.id.toString(),
    title: dto.title,
    description: dto.description,
    date: dto.date,
    endDate: dto.endDate,
    location: dto.location,
    type: dto.type as Event['type'],
    createdBy: dto.createdBy,
    attendees: dto.attendeeIds.map(id => id.toString()),
    color: dto.color
});

export const eventService = {
    getAll: async (month?: number, year?: number): Promise<Event[]> => {
        let url = API_ENDPOINT;
        if (month !== undefined && year !== undefined) {
            url += `?month=${month}&year=${year}`;
        }
        const response = await apiClient.get<EventDto[]>(url);
        return response.data.map(mapToEvent);
    },

    getById: async (id: string): Promise<Event | null> => {
        const response = await apiClient.get<EventDto>(`${API_ENDPOINT}/${id}`);
        if (response.data) {
            return mapToEvent(response.data);
        }
        return null;
    },

    create: async (data: Omit<Event, 'id'>, userId: number): Promise<Event> => {
        const createData: CreateEventDto = {
            title: data.title,
            description: data.description,
            date: data.date,
            endDate: data.endDate,
            location: data.location,
            type: data.type,
            createdBy: userId,
            color: data.color,
            attendeeIds: data.attendees.map(id => parseInt(id))
        };

        const response = await apiClient.post(API_ENDPOINT, createData);

        if (response.data.isSuccess) {
            const events = await eventService.getAll();
            return events.find(e => e.id === response.data.data?.id?.toString()) || events[0];
        }
        throw new Error(response.data.message);
    },

    update: async (id: string, data: Partial<Event>, attendeeIds: number[]): Promise<Event> => {
        const response = await apiClient.put(`${API_ENDPOINT}/${id}`, {
            title: data.title,
            description: data.description,
            date: data.date,
            endDate: data.endDate,
            location: data.location,
            type: data.type,
            color: data.color,
            attendeeIds: attendeeIds
        });

        if (response.data.isSuccess) {
            const updated = await eventService.getById(id);
            if (!updated) throw new Error('Event not found after update');
            return updated;
        }
        throw new Error(response.data.message);
    },

    delete: async (id: string): Promise<void> => {
        const response = await apiClient.delete(`${API_ENDPOINT}/${id}`);
        if (!response.data.isSuccess) {
            throw new Error(response.data.message);
        }
    },

    toggleAttend: async (eventId: string, userId: number): Promise<void> => {
        await apiClient.post(`${API_ENDPOINT}/${eventId}/attend`, userId);
    }
};