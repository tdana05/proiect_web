import { mockUsers } from '../data/mockData'
import type { User } from '../types'

const SESSION_KEY = 'amicus_session'

export const authService = {
  login(email: string, password: string): User | null {
    const user = mockUsers.find(u => u.email === email && u.password === password)
    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user))
      return user
    }
    return null
  },

  logout(): void {
    localStorage.removeItem(SESSION_KEY)
  },

  getCurrentUser(): User | null {
    const data = localStorage.getItem(SESSION_KEY)
    if (!data) return null
    try {
      return JSON.parse(data) as User
    } catch {
      return null
    }
  },

  updateSession(user: User): void {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null
  },
}
