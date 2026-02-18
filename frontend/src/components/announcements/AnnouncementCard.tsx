import { Pin, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getUserById } from "@/lib/data-service";
import type { Announcement } from "@/lib/types";
import { PRIORITY_CONFIG } from "@/types/announcements";

interface AnnouncementCardProps {
    announcement: Announcement;
    isAdmin: boolean;
    onDelete: (id: string) => void;
}

export function AnnouncementCard({ announcement, isAdmin, onDelete }: AnnouncementCardProps) {
    const author = getUserById(announcement.createdBy);
    const priority = PRIORITY_CONFIG[announcement.priority];

    return (
        <Card className={announcement.pinned ? "border-primary/30" : ""}>
            <CardContent className="p-5">
                <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-wrap items-center gap-2">
                                {announcement.pinned && (
                                    <Badge variant="secondary" className="bg-primary/10 text-primary gap-1 text-[10px]">
                                        <Pin className="size-3" /> Fixat
                                    </Badge>
                                )}
                                <Badge variant="secondary" className={`gap-1 text-[10px] ${priority.className}`}>
                                    {priority.icon}
                                    {priority.label}
                                </Badge>
                            </div>
                            <h3 className="text-base font-semibold text-foreground">
                                {announcement.title}
                            </h3>
                        </div>
                        {isAdmin && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="size-8 shrink-0 text-muted-foreground hover:text-destructive"
                                onClick={() => onDelete(announcement.id)}
                            >
                                <Trash2 className="size-4" />
                            </Button>
                        )}
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                        {announcement.content}
                    </p>
                    <div className="flex items-center gap-3 pt-1">
                        <Avatar className="size-5">
                            <AvatarFallback className="text-[8px] bg-muted">
                                {author?.name?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">
              {author?.name}
            </span>
                        <span className="text-xs text-muted-foreground">
              {new Date(announcement.createdAt).toLocaleDateString("ro-RO", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
              })}
            </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}