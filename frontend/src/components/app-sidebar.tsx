"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    LayoutDashboard,
    Users,
    Calendar,
    Megaphone,
    ListTodo,
    Clock,
    FolderKanban,
    FileText,
    BarChart3,
    LogOut,
    Heart,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const adminNavItems = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Voluntari", href: "/dashboard/volunteers", icon: Users },
    { title: "Calendar", href: "/dashboard/calendar", icon: Calendar },
    { title: "Anunturi", href: "/dashboard/announcements", icon: Megaphone },
    { title: "Task-uri", href: "/dashboard/tasks", icon: ListTodo },
    { title: "Ore Voluntariat", href: "/dashboard/hours", icon: Clock },
    { title: "Statistici", href: "/dashboard/statistics", icon: BarChart3 },
    { title: "Proiecte", href: "/dashboard/projects", icon: FolderKanban },
    { title: "Documente", href: "/dashboard/documents", icon: FileText },
];

const volunteerNavItems = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Calendar", href: "/dashboard/calendar", icon: Calendar },
    { title: "Anunturi", href: "/dashboard/announcements", icon: Megaphone },
    { title: "Task-uri", href: "/dashboard/tasks", icon: ListTodo },
    { title: "Ore Voluntariat", href: "/dashboard/hours", icon: Clock },
    { title: "Statistici", href: "/dashboard/statistics", icon: BarChart3 },
    { title: "Proiecte", href: "/dashboard/projects", icon: FolderKanban },
    { title: "Documente", href: "/dashboard/documents", icon: FileText },
];

export function AppSidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const navItems = user?.role === "admin" ? adminNavItems : volunteerNavItems;

    const initials = user?.name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "?";

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="p-4">
                <Link href="/dashboard" className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary">
                        <Heart className="size-4 text-sidebar-primary-foreground" />
                    </div>
                    <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-bold tracking-wide text-sidebar-foreground">
              AMiCUS
            </span>
                        <span className="text-[10px] text-sidebar-foreground/60">
              Chisinau, Moldova
            </span>
                    </div>
                </Link>
            </SidebarHeader>

            <SidebarSeparator />

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigare</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={
                                            pathname === item.href ||
                                            (item.href !== "/dashboard" &&
                                                pathname.startsWith(item.href))
                                        }
                                        tooltip={item.title}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="size-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarSeparator />
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Profil">
                            <Link href="/dashboard/profile">
                                <Avatar className="size-5">
                                    <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-[10px]">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                                    <span className="text-xs font-medium">{user?.name}</span>
                                    <span className="text-[10px] text-sidebar-foreground/60 capitalize">
                    {user?.role === "admin" ? "Administrator" : "Voluntar"}
                  </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            tooltip="Deconectare"
                            onClick={() => {
                                logout();
                                window.location.href = "/";
                            }}
                        >
                            <LogOut className="size-4" />
                            <span>Deconectare</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
