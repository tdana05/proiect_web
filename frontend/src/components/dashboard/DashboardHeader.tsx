import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import type { User } from "@/lib/types";

interface DashboardHeaderProps {
    user: User;
}

function getCurrentDate(): string {
    return new Date().toLocaleDateString("ro-RO", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
    return (
        <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-card px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex flex-1 items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {user.role === "admin" ? "Administrator" : "Voluntar"}
        </span>
                <span className="text-xs text-muted-foreground font-mono">
          {getCurrentDate()}
        </span>
            </div>
        </header>
    );
}