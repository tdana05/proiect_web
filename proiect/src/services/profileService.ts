
import apiClient from './apiClient';

interface BackendUserDto {
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

export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    department?: string;
    bio?: string;
    role: 'admin' | 'volunteer'; 
    totalHours: number;
    tasksCompleted: number;
    eventsAttended: number;
    joinDate: string;
}


export interface UpdateProfileData {
    name: string;
    phone?: string;
    department?: string;
    bio?: string;
}

function mapToFrontendUser(backendUser: BackendUserDto): User {
    return {
        id: backendUser.id,
        name: backendUser.name,
        email: backendUser.email,
        phone: backendUser.phone,
        department: backendUser.department,
        bio: backendUser.bio,
        role: backendUser.role === 'admin' ? 'admin' : 'volunteer',
        totalHours: backendUser.totalHours,
        tasksCompleted: backendUser.tasksCompleted,
        eventsAttended: backendUser.eventsAttended,
        joinDate: backendUser.joinDate,
    };
}

function buildBackendUpdateDto(
    currentUser: BackendUserDto,
    updates: UpdateProfileData
): BackendUserDto {
    return {
        ...currentUser,
        name: updates.name,
        phone: updates.phone ?? currentUser.phone,
        department: updates.department ?? currentUser.department,
        bio: updates.bio ?? currentUser.bio,
       
    };
}

export const profileService = {
 
    async getUser(id: number): Promise<User> {
        const response = await apiClient.get<BackendUserDto>(`/users/${id}`);
        return mapToFrontendUser(response.data);
    },

    async updateProfile(id: number, updates: UpdateProfileData): Promise<void> {
      
        const currentUserResponse = await apiClient.get<BackendUserDto>(`/users/${id}`);
        const currentUser = currentUserResponse.data;

       
        const updatedUser = buildBackendUpdateDto(currentUser, updates);

      
        await apiClient.put(`/users/${id}`, updatedUser);
    },

    async changePassword(id: number, data: { currentPassword: string; newPassword: string; confirmPassword: string }): Promise<void> {
        // Momentan punem o eroare, până adăugăm endpoint-ul în backend
        throw new Error('Schimbarea parolei nu este încă implementată în backend. Vezi instrucțiunile pentru a adăuga endpoint-ul.');
    },
};