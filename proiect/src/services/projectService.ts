
import apiClient from './apiClient';


export interface Project {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: "active" | "completed" | "planning";
    volunteerIds: string[];
    leadId: number;
    memberIds?: string[];
    progress?: number;
}

export const projectService = {
    async getAll(): Promise<Project[]> {
        const response = await apiClient.get('/projects');
        return response.data;
    },
    async getById(id: number): Promise<Project> {
        const response = await apiClient.get(`/projects/${id}`);
        return response.data;
    },
    async create(data: Omit<Project, 'id'>): Promise<void> {
        await apiClient.post('/projects', data);
    },
    async update(id: number, data: Project): Promise<void> {
        await apiClient.put(`/projects/${id}`, data);
    },
    async delete(id: number): Promise<void> {
        await apiClient.delete(`/projects/${id}`);
    },
};