
import apiClient from './apiClient';

export interface Document {
    id: number;
    name: string;
    type: "pdf" | "doc" | "spreadsheet" | "image" | "other";
    uploadedBy: number;
    uploadedAt: string;
    size: string;
    category: "policy" | "report" | "template" | "training" | "other";
    url: string;
}

export const documentService = {
    async getAll(): Promise<Document[]> {
        const response = await apiClient.get('/documents');
        return response.data;
    },
    async getById(id: number): Promise<Document> {
        const response = await apiClient.get(`/documents/${id}`);
        return response.data;
    },
    async create(data: Omit<Document, 'id' | 'uploadedAt'>): Promise<void> {
        await apiClient.post('/documents', data);
    },
    async update(id: number, data: Document): Promise<void> {
        await apiClient.put(`/documents/${id}`, data);
    },
    async delete(id: number): Promise<void> {
        await apiClient.delete(`/documents/${id}`);
    },
};