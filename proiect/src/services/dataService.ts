import {
  mockUsers, mockEvents, mockAnnouncements,
  mockTasks, mockHoursEntries, mockProjects, mockDocuments
} from '../data/mockData'
import type {
  User, Event, Announcement, Task,
  HoursEntry, Project, Document, TaskStatus, HoursStatus
} from '../types'

let users = [...mockUsers]
let events = [...mockEvents]
let announcements = [...mockAnnouncements]
let tasks = [...mockTasks]
let hoursEntries = [...mockHoursEntries]
let projects = [...mockProjects]
let documents = [...mockDocuments]

export const dataService = {
  // Users / Volunteers
  getUsers: (): User[] => [...users],
  getVolunteers: (): User[] => users.filter(u => u.role === 'volunteer'),
  getUserById: (id: string): User | undefined => users.find(u => u.id === id),
  updateUser: (id: string, data: Partial<User>): User | null => {
    const index = users.findIndex(u => u.id === id)
    if (index === -1) return null
    users[index] = { ...users[index], ...data }
    return users[index]
  },
  createVolunteer: (data: Partial<User>): User => {
    const newUser: User = {
      id: `u${Date.now()}`,
      email: data.email || '',
      password: data.password || 'parola123',
      name: data.name || '',
      role: data.role || 'volunteer',
      status: data.status || 'pending',
      phone: data.phone,
      totalHours: 0,
      tasksCompleted: 0,
      eventsAttended: 0,  
      joinDate: new Date().toISOString(),
    }
    users = [...users, newUser]
    return newUser
  },
  updateVolunteer: (id: string, data: Partial<User>): User | null => {
    const index = users.findIndex(u => u.id === id)
    if (index === -1) return null
    users[index] = { ...users[index], ...data }
    return users[index]
  },
  deleteVolunteer: (id: string): boolean => {
    const len = users.length
    users = users.filter(u => u.id !== id)
    return users.length < len
  },

  // Events
  getEvents: (): Event[] => [...events],
  getEventById: (id: string): Event | undefined => events.find(e => e.id === id),
  createEvent: (data: Omit<Event, 'id'>): Event => {
    const newEvent = { ...data, id: `e${Date.now()}` }
    events = [newEvent, ...events]
    return newEvent
  },
  updateEvent: (id: string, data: Partial<Event>): Event | null => {
    const index = events.findIndex(e => e.id === id)
    if (index === -1) return null
    events[index] = { ...events[index], ...data }
    return events[index]
  },
  deleteEvent: (id: string): boolean => {
    const len = events.length
    events = events.filter(e => e.id !== id)
    return events.length < len
  },

  // Announcements
  getAnnouncements: (): Announcement[] => 
    [...announcements].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ),
  createAnnouncement: (data: Omit<Announcement, 'id'>): Announcement => {
    const newAnnouncement = { ...data, id: `a${Date.now()}` }
    announcements = [newAnnouncement, ...announcements]
    return newAnnouncement
  },
  updateAnnouncement: (id: string, data: Partial<Announcement>): Announcement | null => {
    const index = announcements.findIndex(a => a.id === id)
    if (index === -1) return null
    announcements[index] = { ...announcements[index], ...data }
    return announcements[index]
  },
  deleteAnnouncement: (id: string): boolean => {
    const len = announcements.length
    announcements = announcements.filter(a => a.id !== id)
    return announcements.length < len
  },

  // Tasks
  getTasks: (): Task[] => [...tasks],
  getTaskById: (id: string): Task | undefined => tasks.find(t => t.id === id),
  createTask: (data: Omit<Task, 'id'>): Task => {
    const newTask: Task = { ...data, id: `t${Date.now()}`, status: 'PLANNED' }
    tasks = [newTask, ...tasks]
    return newTask
  },
  updateTask: (id: string, data: Partial<Task>): Task | null => {
    const index = tasks.findIndex(t => t.id === id)
    if (index === -1) return null
    tasks[index] = { ...tasks[index], ...data }
    return tasks[index]
  },
  deleteTask: (id: string): boolean => {
    const len = tasks.length
    tasks = tasks.filter(t => t.id !== id)
    return tasks.length < len
  },

  // Hours
  getHoursEntries: (): HoursEntry[] =>
    [...hoursEntries].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ),
  getHoursByVolunteer: (volunteerId: string): HoursEntry[] =>
    hoursEntries.filter(h => h.volunteerId === volunteerId),
  createHoursEntry: (data: Omit<HoursEntry, 'id'>): HoursEntry => {
    const newEntry = { ...data, id: `h${Date.now()}` }
    hoursEntries = [newEntry, ...hoursEntries]
    return newEntry
  },
  updateHoursStatus: (id: string, status: HoursStatus, adminNote?: string): HoursEntry | null => {
    const index = hoursEntries.findIndex(h => h.id === id)
    if (index === -1) return null
    hoursEntries[index] = { ...hoursEntries[index], status, adminNote }
    return hoursEntries[index]
  },
}

export function updateTaskStatus(
  id: string, newStatus: TaskStatus, userId: string
): { success: boolean; error?: string } {
  const task = tasks.find(t => t.id === id)
  if (!task) return { success: false, error: 'Task-ul nu a fost gasit.' }

  if (newStatus === 'DONE') {
    if (task.ownerId !== userId) {
      return { success: false, error: 'Doar owner-ul poate marca DONE.' }
    }
    if (task.status !== 'REVIEW') {
      return { success: false, error: 'Task-ul trebuie sa fie in REVIEW.' }
    }
  }

  const valid: Record<TaskStatus, TaskStatus[]> = {
    PLANNED: ['IN_PROGRESS'],
    IN_PROGRESS: ['BLOCKED', 'REVIEW'],
    BLOCKED: ['IN_PROGRESS'],
    REVIEW: ['IN_PROGRESS', 'DONE'],
    DONE: [],
  }

  if (!valid[task.status].includes(newStatus)) {
    return { success: false, error: `Nu se poate trece de la ${task.status} la ${newStatus}.` }
  }

  const index = tasks.findIndex(t => t.id === id)
  tasks[index] = { ...tasks[index], status: newStatus }
  return { success: true }
}

export function getStats() {
  const totalVolunteers = users.filter(u => u.role === 'volunteer').length
  const totalHours = hoursEntries.filter(h => h.status === 'approved').reduce((s, h) => s + h.hours, 0)
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.status === 'DONE').length
  const activeProjects = projects.filter(p => p.status === 'active').length
  const upcomingEvents = events.filter(e => new Date(e.date) > new Date()).length
  const pendingHours = hoursEntries.filter(h => h.status === 'pending').length

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
  }
}

// Add methods to dataService object instead
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
    }
    projects = [np, ...projects]
    return np
  },
  updateProject: (id: string, data: Partial<Project>): Project | null => {
    const index = projects.findIndex(p => p.id === id)
    if (index === -1) return null
    projects[index] = { ...projects[index], ...data }
    return projects[index]
  },
  deleteProject: (id: string): boolean => {
    const len = projects.length
    projects = projects.filter(p => p.id !== id)
    return projects.length < len
  },
  
  // Documents
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
    }
    documents = [nd, ...documents]
    return nd
  },
  
  updateDocument: (id: string, data: Partial<Document>): Document | null => {
    const index = documents.findIndex(d => d.id === id)
    if (index === -1) return null
    documents[index] = { ...documents[index], ...data }
    return documents[index]
  },
  deleteDocument: (id: string): boolean => {
    const len = documents.length
    documents = documents.filter(d => d.id !== id)
    return documents.length < len
  },
  
  // Hours (alias)
  getVolunteerHours: (): HoursEntry[] => [...hoursEntries],
})
