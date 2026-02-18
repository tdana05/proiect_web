import { mockUsers } from "./mock-data";
import type { User } from "./types";

const SESSION_KEY = "amicus_session";

export function login(email: string, password: string): User | null {
    const user = mockUsers.find(
        (u) => u.email === email && u.password === password
    );
    if (user) {
        const sessionUser = { ...user };
        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
        return sessionUser;
    }
    return null;
}

export function logout(): void {
    localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser(): User | null {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem(SESSION_KEY);
    if (!data) return null;
    try {
        return JSON.parse(data) as User;
    } catch {
        return null;
    }
}

export function isAuthenticated(): boolean {
    return getCurrentUser() !== null;
}

export function isAdmin(): boolean {
    const user = getCurrentUser();
    return user?.role === "admin";
}

export function updateSession(user: User): void {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}