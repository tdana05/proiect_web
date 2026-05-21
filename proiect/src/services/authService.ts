import apiClient from './apiClient';
import type { User } from '../types';
import { UserRole } from '../types'; 

const SESSION_KEY = 'amicus_session';
const TOKEN_KEY = 'amicus_token';

interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: number; 
    status: string;
    phone?: string;
    joinDate: string;
    department?: string;
    bio?: string;
    totalHours: number;
    tasksCompleted: number;
    eventsAttended: number;
  };
}

interface RegisterResponse {
  isSuccess: boolean;
  message: string;
}

const mapToUser = (data: any): User => ({
  id: data.id.toString(),
  email: data.email,
  password: '',
  name: data.name,
  role: data.role === 2 ? UserRole.Admin : UserRole.Volunteer,  
  status: data.status as 'pending' | 'active' | 'inactive',
  phone: data.phone,
  joinDate: data.joinDate,
  department: data.department,
  bio: data.bio,
  totalHours: data.totalHours,
  tasksCompleted: data.tasksCompleted,
  eventsAttended: data.eventsAttended,
});

export const authService = {
  login: async (email: string, password: string): Promise<User | null> => {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', { email, password });

      if (response.data && response.data.token) {
        localStorage.setItem(TOKEN_KEY, response.data.token);
        localStorage.setItem(SESSION_KEY, JSON.stringify(mapToUser(response.data.user)));

        return mapToUser(response.data.user);
      }
      return null;
    } catch (error) {
      console.error('Login failed:', error);
      return null;
    }
  },

  register: async (data: {
    email: string;
    password: string;
    name: string;
    phone?: string;
    department?: string;
    bio?: string;
  }): Promise<RegisterResponse> => {
    try {
      const response = await apiClient.post<RegisterResponse>('/auth/register', data);
      return response.data;
    } catch (error) {
      console.error('Registration failed:', error);
      return { isSuccess: false, message: 'Registration failed' };
    }
  },

  logout: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(SESSION_KEY);
  },

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(SESSION_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data) as User;
    } catch {
      return null;
    }
  },

  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  updateSession: (user: User): void => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  },

  isAuthenticated: (): boolean => {
    const currentUser = authService.getCurrentUser();
    const token = authService.getToken();
    return currentUser !== null && token !== null;
  },
};
    
  
  
  
  
  