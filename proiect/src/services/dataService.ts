import apiClient from './apiClient';
import { UserRole } from '../types'
import {
  mockUsers, mockEvents, mockAnnouncements,
  mockTasks, mockHoursEntries, mockProjects, mockDocuments
} from '../data/mockData';
import type {
  User, Event, Announcement, Task,
  HoursEntry, Project, Document, TaskStatus, HoursStatus
} from '../types';

let users = [...mockUsers];
let events = [...mockEvents];
let announcements = [...mockAnnouncements];
let tasks = [...mockTasks];
let hoursEntries = [...mockHoursEntries];
let projects = [...mockProjects];
let documents = [...mockDocuments];

// Helper function to map backend UserDto to frontend User
const mapUserFromApi = (user: any): User => ({
  id: user.id.toString(),
  email: user.email,
  password: '',
  name: user.name,
  role: user.role === 1 ? UserRole.Admin : UserRole.Volunteer,
  status: user.status as 'pending' | 'active' | 'inactive',
  phone: user.phone,
  joinDate: user.joinDate,
  department: user.department,
  bio: user.bio,
  totalHours: user.totalHours,
  tasksCompleted: user.tasksCompleted,
  eventsAttended: user.eventsAttended,
});

// Helper function to map backend HoursEntryDto to frontend HoursEntry
const mapHoursEntryFromApi = (entry: any): HoursEntry => ({
  id: entry.id.toString(),
  volunteerId: entry.volunteerId.toString(),
  date: entry.date,
  hours: entry.hours,
  description: entry.description,
  relatedTaskId: entry.relatedTaskId?.toString(),
  relatedEventId: entry.relatedEventId?.toString(),
  status: entry.status as HoursStatus,
  adminNote: entry.adminNote,
});

// Helper function to map backend TaskDto to frontend Task
const mapTaskFromApi = (task: any): Task => ({
  id: task.id.toString(),
  title: task.title,
  description: task.description,
  status: task.status as TaskStatus,
  assigneeId: task.assigneeId.toString(),
  ownerId: task.ownerId.toString(),
  dueDate: task.dueDate,
  createdAt: task.createdAt,
  priority: task.priority as 'low' | 'medium' | 'high',
  category: task.category,
});

// Helper function to convert role from string to number
const convertRoleToNumber = (role?: string): number | undefined => {
  if (role === 'admin') return 2;
  if (role === 'volunteer') return 1;
  return undefined;
};

export const dataService = {
  // ==================== Users / Volunteers (cu axios) ====================
  getUsers: async (): Promise<User[]> => {
    const response = await apiClient.get('/users');
    return response.data.map(mapUserFromApi);
  },

  getVolunteers: async (): Promise<User[]> => {
    const response = await apiClient.get('/users');
    const users = response.data.map(mapUserFromApi);
    return users.filter((u: User) => u.role === 'volunteer');
  },

  getUserById: async (id: string): Promise<User | undefined> => {
    try {
      const response = await apiClient.get(`/users/${id}`);
      return mapUserFromApi(response.data);
    } catch {
      return undefined;
    }
  },

  updateUser: async (id: string, data: Partial<User>): Promise<User | null> => {
    const payload: any = {
      id: parseInt(id),
      email: data.email,
      name: data.name,
      status: data.status,
      phone: data.phone,
      department: data.department,
      bio: data.bio,
      totalHours: data.totalHours,
      tasksCompleted: data.tasksCompleted,
      eventsAttended: data.eventsAttended,
    };

    // Convert role from string to number if present
    const roleNumber = convertRoleToNumber(data.role);
    if (roleNumber !== undefined) {
      payload.role = roleNumber;
    }

    await apiClient.put(`/users/${id}`, payload);
    const response = await apiClient.get(`/users/${id}`);
    return mapUserFromApi(response.data);
  },

  createVolunteer: async (data: Partial<User>): Promise<User> => {
    const response = await apiClient.post('/users', {
      email: data.email,
      password: data.password || 'default123',
      name: data.name,
    });
    return mapUserFromApi(response.data.data);
  },

  updateVolunteer: async (id: string, data: Partial<User>): Promise<User | null> => {
    const payload: any = {
      id: parseInt(id),
      email: data.email,
      name: data.name,
      status: data.status,
      phone: data.phone,
      department: data.department,
      bio: data.bio,
      totalHours: data.totalHours,
      tasksCompleted: data.tasksCompleted,
      eventsAttended: data.eventsAttended,
    };

    // Convert role from string to number if present
    const roleNumber = convertRoleToNumber(data.role);
    if (roleNumber !== undefined) {
      payload.role = roleNumber;
    }

    await apiClient.put(`/users/${id}`, payload);
    const response = await apiClient.get(`/users/${id}`);
    return mapUserFromApi(response.data);
  },

  deleteVolunteer: async (id: string): Promise<boolean> => {
    await apiClient.delete(`/users/${id}`);
    return true;
  },

  // ==================== Events (mock - păstrat) ====================
  getEvents: (): Event[] => [...events],
  getEventById: (id: string): Event | undefined => events.find(e => e.id === id),
  createEvent: (data: Omit<Event, 'id'>): Event => {
    const newEvent = { ...data, id: `e${Date.now()}` };
    events = [newEvent, ...events];
    return newEvent;
  },
  updateEvent: (id: string, data: Partial<Event>): Event | null => {
    const index = events.findIndex(e => e.id === id);
    if (index === -1) return null;
    events[index] = { ...events[index], ...data };
    return events[index];
  },
  deleteEvent: (id: string): boolean => {
    const len = events.length;
    events = events.filter(e => e.id !== id);
    return events.length < len;
  },

  // ==================== Announcements (mock - păstrat) ====================
  getAnnouncements: (): Announcement[] =>
      [...announcements].sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
  createAnnouncement: (data: Omit<Announcement, 'id'>): Announcement => {
    const newAnnouncement = { ...data, id: `a${Date.now()}` };
    announcements = [newAnnouncement, ...announcements];
    return newAnnouncement;
  },
  updateAnnouncement: (id: string, data: Partial<Announcement>): Announcement | null => {
    const index = announcements.findIndex(a => a.id === id);
    if (index === -1) return null;
    announcements[index] = { ...announcements[index], ...data };
    return announcements[index];
  },
  deleteAnnouncement: (id: string): boolean => {
    const len = announcements.length;
    announcements = announcements.filter(a => a.id !== id);
    return announcements.length < len;
  },

  // ==================== Tasks (cu axios) ====================
  getTasks: async (): Promise<Task[]> => {
    const response = await apiClient.get('/tasks');
    return response.data.map(mapTaskFromApi);
  },

  getTasksByAssignee: async (assigneeId: string): Promise<Task[]> => {
    const response = await apiClient.get(`/tasks/assignee/${assigneeId}`);
    return response.data.map(mapTaskFromApi);
  },

  getTaskById: async (id: string): Promise<Task | undefined> => {
    try {
      const response = await apiClient.get(`/tasks/${id}`);
      return mapTaskFromApi(response.data);
    } catch {
      return undefined;
    }
  },

  createTask: async (data: Omit<Task, 'id'>): Promise<Task> => {
    const response = await apiClient.post('/tasks', {
      title: data.title,
      description: data.description,
      status: data.status,
      assigneeId: parseInt(data.assigneeId),
      ownerId: parseInt(data.ownerId),
      dueDate: data.dueDate,
      priority: data.priority,
      category: data.category,
    });
    return mapTaskFromApi(response.data);
  },

  updateTask: async (id: string, data: Partial<Task>): Promise<Task | null> => {
    await apiClient.put(`/tasks/${id}`, {
      id: parseInt(id),
      title: data.title,
      description: data.description,
      status: data.status,
      assigneeId: data.assigneeId ? parseInt(data.assigneeId) : undefined,
      dueDate: data.dueDate,
      priority: data.priority,
      category: data.category,
    });
    const response = await apiClient.get(`/tasks/${id}`);
    return mapTaskFromApi(response.data);
  },

  deleteTask: async (id: string): Promise<boolean> => {
    await apiClient.delete(`/tasks/${id}`);
    return true;
  },

  // ==================== Hours Entries (cu axios) ====================
  getHoursEntries: async (): Promise<HoursEntry[]> => {
    const response = await apiClient.get('/hours');
    return response.data.map(mapHoursEntryFromApi);
  },

  getHoursByVolunteer: async (volunteerId: string): Promise<HoursEntry[]> => {
    const response = await apiClient.get(`/hours/volunteer/${volunteerId}`);
    return response.data.map(mapHoursEntryFromApi);
  },

  createHoursEntry: async (data: Omit<HoursEntry, 'id'>): Promise<HoursEntry> => {
    const response = await apiClient.post('/hours', {
      volunteerId: parseInt(data.volunteerId),
      date: data.date,
      hours: data.hours,
      description: data.description,
      relatedTaskId: data.relatedTaskId ? parseInt(data.relatedTaskId) : null,
      relatedEventId: data.relatedEventId ? parseInt(data.relatedEventId) : null,
    });
    return mapHoursEntryFromApi(response.data);
  },

  updateHoursStatus: async (id: string, status: HoursStatus, adminNote?: string): Promise<HoursEntry> => {
    const response = await apiClient.put(`/hours/${id}/status`, {
      id: parseInt(id),
      status: status,
      adminNote: adminNote
    });
    return mapHoursEntryFromApi(response.data);
  },

  deleteHoursEntry: async (id: string): Promise<void> => {
    await apiClient.delete(`/hours/${id}`);
  },
};

export function updateTaskStatus(
    id: string, newStatus: TaskStatus, userId: string
): { success: boolean; error?: string } {
  const task = tasks.find(t => t.id === id);
  if (!task) return { success: false, error: 'Task-ul nu a fost gasit.' };

  if (newStatus === 'DONE') {
    if (task.ownerId !== userId) {
      return { success: false, error: 'Doar owner-ul poate marca DONE.' };
    }
    if (task.status !== 'REVIEW') {
      return { success: false, error: 'Task-ul trebuie sa fie in REVIEW.' };
    }
  }

  const valid: Record<TaskStatus, TaskStatus[]> = {
    PLANNED: ['IN_PROGRESS'],
    IN_PROGRESS: ['BLOCKED', 'REVIEW'],
    BLOCKED: ['IN_PROGRESS'],
    REVIEW: ['IN_PROGRESS', 'DONE'],
    DONE: [],
  };

  if (!valid[task.status].includes(newStatus)) {
    return { success: false, error: `Nu se poate trece de la ${task.status} la ${newStatus}.` };
  }

  const index = tasks.findIndex(t => t.id === id);
  tasks[index] = { ...tasks[index], status: newStatus };
  return { success: true };
}

export function getStats() {
  const totalVolunteers = users.filter(u => u.role === 'volunteer').length;
  const totalHours = hoursEntries.filter(h => h.status === 'approved').reduce((s, h) => s + h.hours, 0);
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'DONE').length;
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const upcomingEvents = events.filter(e => new Date(e.date) > new Date()).length;
  const pendingHours = hoursEntries.filter(h => h.status === 'pending').length;

  return {
    totalVolunteers, totalHours, totalTasks, completedTasks,
    activeProjects, upcomingEvents, pendingHours,
    tasksByStatus: {
      PLANNED: tasks.filter(t => t.status === 'PLANNED').length,
      IN_PROGRESS: tasks.filter(t => t.status === 'IN_PROGRESS').length,
      BLOCKED: tasks.filter(t => t.status === 'BLOCKED').length,
      REVIEW: tasks.filter(t => t.status === 'REVIEW').length,
      DONE: tasks.filter(t => t.status === 'DONE').length,
    },
    hoursByMonth: [
      { month: 'Ian', hours: 45 }, { month: 'Feb', hours: 62 },
      { month: 'Mar', hours: totalHours }, { month: 'Apr', hours: 0 },
    ],
    volunteerActivity: users.filter(u => u.role === 'volunteer').map(u => ({
      name: u.name.split(' ')[0], hours: u.totalHours, tasks: u.tasksCompleted,
    })),
  };
}

Object.assign(dataService, {
  // Projects
  getProjects: async (): Promise<Project[]> => {
    const response = await apiClient.get('/projects');

    return response.data.map((project: any) => ({
      id: project.id.toString(),
      name: project.name,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
      status: project.status?.toLowerCase(),
      volunteerIds: project.volunteerIds || [],
      leadId: project.leadId?.toString() || '',
      memberIds: project.memberIds || [],
      progress: project.progress || 0,
    }));
  },

  createProject: async (data: Partial<Project>): Promise<Project> => {
    const response = await apiClient.post('/projects', {
      name: data.name,
      description: data.description,
      startDate: new Date(data.startDate!).toISOString(),
      endDate: new Date(data.endDate!).toISOString(),
      status: data.status,
      volunteerIds: data.volunteerIds || [],
      leadId: data.leadId || 1,
      memberIds: data.memberIds || [],
      progress: data.progress || 0,
    });

    return response.data;
  },

  updateProject: async (
      id: string,
      data: Partial<Project>
  ): Promise<Project | null> => {

    await apiClient.put(`/projects/${id}`, {
      id: parseInt(id),
      name: data.name,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      status: data.status,
    });

    const response = await apiClient.get(`/projects/${id}`);
    return response.data;
  },

  deleteProject: async (id: string): Promise<boolean> => {
    await apiClient.delete(`/projects/${id}`);
    return true;
  },

  // Documents
  getDocuments: async (): Promise<Document[]> => {
    const response = await apiClient.get('/documents');

    return response.data.map((doc: any) => ({
      id: doc.id.toString(),
      name: doc.name,
      type: doc.type,
      uploadedBy: doc.uploadedBy,
      uploadedAt: doc.uploadedAt,
      size: doc.size,
      category: doc.category,
      url: doc.url,
    }));
  },

  createDocument: async (data: Partial<Document>): Promise<Document> => {
    const response = await apiClient.post('/documents', {
      name: data.name,
      description: data.description,
      type: data.type,
      uploadedBy: data.uploadedBy,
      uploadedAt: data.uploadedAt,
      size: data.size,
      category: data.category,
      url: data.url,
    });

    return response.data;
  },

  updateDocument: async (
      id: string,
      data: Partial<Document>
  ): Promise<Document | null> => {

    await apiClient.put(`/documents/${id}`, {
      id: parseInt(id),
      name: data.name,
      type: data.type,
      uploadedBy: data.uploadedBy,
      uploadedAt: data.uploadedAt,
      size: data.size,
      category: data.category,
      url: data.url,
    });

    const response = await apiClient.get(`/documents/${id}`);
    return response.data;
  },

  deleteDocument: async (id: string): Promise<boolean> => {
    await apiClient.delete(`/documents/${id}`);
    return true;
  },

  // Hours (alias)
  getVolunteerHours: (): HoursEntry[] => [...hoursEntries],
});