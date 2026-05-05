import apiClient from './apiClient';

interface UserDto {
    id: number;
    email: string;
    name: string;
    role: string;
    status: string;
    phone?: string;
    joinDate: string;
    department?: string;
    bio?: string;
    totalHours: number;
    tasksCompleted: number;
    eventsAttended: number;
}

export const userService = {
    getUserById: async (id: string): Promise<UserDto | null> => {
        try {
            const response = await apiClient.get(`/users/${id}`);
            return response.data;
        } catch (error) {
            console.error('Failed to get user:', error);
            return null;
        }
    },

    getAllUsers: async (): Promise<UserDto[]> => {
        const response = await apiClient.get('/users');
        return response.data;
    }
};