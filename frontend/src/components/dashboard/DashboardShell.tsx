"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";
import { DashboardHeader } from "./DashboardHeader";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

interface DashboardShellProps {
    children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
    const { user, isLoading } = useAuthRedirect("/");

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    if (!user) return null;

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <DashboardHeader user={user} />
                <div className="flex-1 overflow-auto p-4 md:p-6">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}