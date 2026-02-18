"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { User } from "./types";
import { login as authLogin, logout as authLogout, getCurrentUser } from "./auth-service";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => User | null;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const stored = getCurrentUser();
        setUser(stored);
        setIsLoading(false);
    }, []);

    const login = useCallback((email: string, password: string): User | null => {
        const result = authLogin(email, password);
        if (result) {
            setUser(result);
        }
        return result;
    }, []);

    const logout = useCallback(() => {
        authLogout();
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}