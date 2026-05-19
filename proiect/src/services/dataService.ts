import apiClient from './apiClient';
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
  role: user.role as 'admin' | 'volunteer',
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

export const dataService = {
  // ==================== Users / Volunteers (cu axios) ====================
  getUsers: async (): Promise<User[]> => {
    const response = await apiClient.get('/users');
    return response.data.map(mapUserFromApi);
  },

  getVolunteers: async (): Promise<User[]> => {
    const response = await apiClient.get('/users');
    const users = response.data.map(mapUserFromApi);
    return users.filter(u => u.role === 'volunteer');
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
    await apiClient.put(`/users/${id}`, {
      id: parseInt(id),
      email: data.email,
      name: data.name,
      role: data.role,
      status: data.status,
      phone: data.phone,
      department: data.department,
      bio: data.bio,
      totalHours: data.totalHours,
      tasksCompleted: data.tasksCompleted,
      eventsAttended: data.eventsAttended,
    });
    const response = await apiClient.get(`/users/${id}`);
    return mapUserFromApi(response.data);
  },

  createVolunteer: async (data: Partial<User>): Promise<User> => {
    const response = await apiClient.post('/users', {
      email: data.email,
      password: data.password || 'default123',
      name: data.name,
      role: data.role || 'volunteer',
      status: data.status || 'active',
      phone: data.phone,
      department: data.department,
      bio: data.bio,
    });
    return mapUserFromApi(response.data.data);
  },

  updateVolunteer: async (id: string, data: Partial<User>): Promise<User | null> => {
    await apiClient.put(`/users/${id}`, {
      id: parseInt(id),
      email: data.email,
      name: data.name,
      role: data.role,
      status: data.status,
      phone: data.phone,
      department: data.department,
      bio: data.bio,
      totalHours: data.totalHours,
      tasksCompleted: data.tasksCompleted,
      eventsAttended: data.eventsAttended,
    });
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
  getProjects: (): Project[] => [...projects],
  createProject: (data: Partial<Project>): Project => {
    const np: Project = {
      id: `p${Date.now()}`,
      name: data.name || '',
      description: data.description || '',
      startDate: data.startDate || new Date().toISOString(),
      endDate: data.endDate || new Date().toISOString(),
      status: data.status || 'planning',
      volunteerIds: data.volunteerIds || [],
      leadId: data.leadId || '',
      memberIds: data.memberIds || [],
      progress: data.progress || 0,
    };
    projects = [np, ...projects];
    return np;
  },
  updateProject: (id: string, data: Partial<Project>): Project | null => {
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) return null;
    projects[index] = { ...projects[index], ...data };
    return projects[index];
  },
  deleteProject: (id: string): boolean => {
    const len = projects.length;
    projects = projects.filter(p => p.id !== id);
    return projects.length < len;
  },

  // Documents
  getDocuments: (): Document[] => [...documents],
  createDocument: (data: Partial<Document>): Document => {
    const nd: Document = {
      id: `d${Date.now()}`,
      name: data.name || '',
      type: data.type || 'other',
      uploadedBy: data.uploadedBy || 'admin',
      uploadedAt: data.uploadedAt || new Date().toISOString(),
      size: data.size || '0 KB',
      category: data.category || 'other',
      url: data.url || '',
    };
    documents = [nd, ...documents];
    return nd;
  },
  updateDocument: (id: string, data: Partial<Document>): Document | null => {
    const index = documents.findIndex(d => d.id === id);
    if (index === -1) return null;
    documents[index] = { ...documents[index], ...data };
    return documents[index];
  },
  deleteDocument: (id: string): boolean => {
    const len = documents.length;
    documents = documents.filter(d => d.id !== id);
    return documents.length < len;
  },

  // Hours (alias)
  getVolunteerHours: (): HoursEntry[] => [...hoursEntries],
});