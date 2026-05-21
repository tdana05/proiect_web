import apiClient from './apiClient';

interface StatisticsDto {
    totalVolunteers: number;
    activeVolunteers: number;
    totalHours: number;
    completedTasks: number;
    totalEvents: number;
    upcomingEvents: number;
}

interface MonthlyHoursDto {
    month: string;
    hours: number;
}

interface TaskStatusDto {
    status: string;
    count: number;
    color: string;
}

interface TopVolunteerDto {
    id: number;
    name: string;
    hours: number;
    rank: number;
}

export const statisticsService = {
    getStatistics: async (): Promise<StatisticsDto> => {
        const response = await apiClient.get('/statistics');
        return response.data;
    },

    getMonthlyHours: async (): Promise<MonthlyHoursDto[]> => {
        const response = await apiClient.get('/statistics/monthly-hours');
        return response.data;
    },

    getTaskStatus: async (): Promise<TaskStatusDto[]> => {
        const response = await apiClient.get('/statistics/task-status');
        return response.data;
    },

    getTopVolunteers: async (top: number = 5): Promise<TopVolunteerDto[]> => {
        const response = await apiClient.get(`/statistics/top-volunteers?top=${top}`);
        return response.data;
    },
};