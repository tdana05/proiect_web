import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
    Mail,
    Phone,
    Calendar,
    Building2,
    Clock,
    ListTodo,
    CalendarDays,
} from "lucide-react";
import type { User } from "@/lib/types";
import { getInitials } from "@/types/profile";

interface ProfileCardProps {
    user: User;
}

export function ProfileCard({ user }: ProfileCardProps) {
    const initials = getInitials(user.name);

    return (
        <Card className="lg:col-span-1">
            <CardContent className="flex flex-col items-center gap-4 p-6">
                <Avatar className="size-20">
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                        {initials}
                    </AvatarFallback>
                </Avatar>

                <div className="text-center">
                    <h2 className="text-lg font-semibold text-foreground">{user.name}</h2>
                    <Badge variant={user.role === "admin" ? "default" : "secondary"} className="mt-1">
                        {user.role === "admin" ? "Administrator" : "Voluntar"}
                    </Badge>
                </div>

                <Separator />

                <div className="flex w-full flex-col gap-3">
                    <InfoRow icon={<Mail className="size-4 text-muted-foreground" />} text={user.email} />
                    {user.phone && <InfoRow icon={<Phone className="size-4 text-muted-foreground" />} text={user.phone} />}
                    <InfoRow icon={<Building2 className="size-4 text-muted-foreground" />} text={user.department || "Nedefinit"} />
                    <InfoRow
                        icon={<Calendar className="size-4 text-muted-foreground" />}
                        text={`Membru din ${new Date(user.joinDate).toLocaleDateString("ro-RO", {
                            month: "long",
                            year: "numeric",
                        })}`}
                    />
                </div>

                <Separator />

                <StatsGrid user={user} />
            </CardContent>
        </Card>
    );
}

function InfoRow({ icon, text }: { icon: React.ReactNode; text: string }) {
    return (
        <div className="flex items-center gap-3 text-sm">
            {icon}
            <span className="text-muted-foreground">{text}</span>
        </div>
    );
}

function StatsGrid({ user }: { user: User }) {
    return (
        <div className="grid w-full grid-cols-3 gap-2">
            <StatItem icon={<Clock className="size-4 text-primary" />} value={user.totalHours} label="Ore" />
            <StatItem icon={<ListTodo className="size-4 text-success" />} value={user.tasksCompleted} label="Task-uri" />
            <StatItem icon={<CalendarDays className="size-4 text-accent-foreground" />} value={user.eventsAttended} label="Evenimente" />
        </div>
    );
}

function StatItem({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
    return (
        <div className="flex flex-col items-center gap-1 rounded-lg bg-muted/50 p-3">
            {icon}
            <span className="text-lg font-bold text-foreground">{value}</span>
            <span className="text-[10px] text-muted-foreground">{label}</span>
        </div>
    );
}