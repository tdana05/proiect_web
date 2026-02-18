import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Eye } from "lucide-react";
import { getInitials, formatJoinDate } from "@/types/volunteers";
import type { User } from "@/lib/types";

interface VolunteerRowProps {
    volunteer: User;
    onSelect: (volunteer: User) => void;
}

export function VolunteerRow({ volunteer, onSelect }: VolunteerRowProps) {
    const initials = getInitials(volunteer.name);

    return (
        <TableRow>
            <TableCell>
                <div className="flex items-center gap-3">
                    <Avatar className="size-8">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium text-foreground">{volunteer.name}</p>
                        <p className="text-xs text-muted-foreground">{volunteer.email}</p>
                    </div>
                </div>
            </TableCell>
            <TableCell>
                <Badge variant="outline" className="text-xs">
                    {volunteer.department}
                </Badge>
            </TableCell>
            <TableCell className="font-medium">{volunteer.totalHours}h</TableCell>
            <TableCell>{volunteer.tasksCompleted}</TableCell>
            <TableCell>{volunteer.eventsAttended}</TableCell>
            <TableCell className="text-sm text-muted-foreground">
                {formatJoinDate(volunteer.joinDate)}
            </TableCell>
            <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={() => onSelect(volunteer)} className="text-xs">
                    <Eye className="mr-1 size-3" /> Detalii
                </Button>
            </TableCell>
        </TableRow>
    );
}