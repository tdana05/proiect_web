import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Mail,
    Phone,
    Building2,
    Calendar,
    Clock,
    ListTodo,
    CalendarDays,
} from "lucide-react";
import { getInitials, formatFullJoinDate } from "@/types/volunteers";
import type { User } from "@/lib/types";

interface VolunteerDetailDialogProps {
    volunteer: User | null;
    onOpenChange: (open: boolean) => void;
}

export function VolunteerDetailDialog({ volunteer, onOpenChange }: VolunteerDetailDialogProps) {
    if (!volunteer) return null;

    const initials = getInitials(volunteer.name);

    return (
        <Dialog open={!!volunteer} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Profil Voluntar</DialogTitle>
                    <DialogDescription>Detalii complete despre voluntar</DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="size-14">
                            <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="text-lg font-semibold text-foreground">{volunteer.name}</h3>
                            <Badge variant="secondary" className="mt-1">Voluntar</Badge>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex flex-col gap-2">
                        <InfoRow icon={<Mail className="size-4 text-muted-foreground" />} text={volunteer.email} />
                        {volunteer.phone && <InfoRow icon={<Phone className="size-4 text-muted-foreground" />} text={volunteer.phone} />}
                        <InfoRow icon={<Building2 className="size-4 text-muted-foreground" />} text={volunteer.department} />
                        <InfoRow
                            icon={<Calendar className="size-4 text-muted-foreground" />}
                            text={`Membru din ${formatFullJoinDate(volunteer.joinDate)}`}
                        />
                    </div>

                    {volunteer.bio && (
                        <>
                            <Separator />
                            <p className="text-sm text-foreground/80 leading-relaxed">{volunteer.bio}</p>
                        </>
                    )}

                    <Separator />

                    <StatsGrid volunteer={volunteer} />
                </div>
            </DialogContent>
        </Dialog>
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

function StatsGrid({ volunteer }: { volunteer: User }) {
    return (
        <div className="grid grid-cols-3 gap-4">
            <StatItem
                icon={<Clock className="size-4 text-primary" />}
                value={volunteer.totalHours}
                label="Ore"
            />
            <StatItem
                icon={<ListTodo className="size-4 text-success" />}
                value={volunteer.tasksCompleted}
                label="Task-uri"
            />
            <StatItem
                icon={<CalendarDays className="size-4 text-accent-foreground" />}
                value={volunteer.eventsAttended}
                label="Evenimente"
            />
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