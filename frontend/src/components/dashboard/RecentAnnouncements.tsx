import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Megaphone, ArrowRight } from "lucide-react";
import type { Announcement } from "@/lib/types";

interface RecentAnnouncementsProps {
    announcements: Announcement[];
}

export function RecentAnnouncements({ announcements }: RecentAnnouncementsProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="flex items-center gap-2 text-base">
                        <Megaphone className="size-4" />
                        Anunturi Recente
                    </CardTitle>
                </div>
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard/announcements">
                        Toate <ArrowRight className="ml-1 size-3" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-3">
                    {announcements.map((a) => (
                        <AnnouncementItem key={a.id} announcement={a} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

function AnnouncementItem({ announcement }: { announcement: Announcement }) {
    return (
        <div className="flex flex-col gap-1 rounded-lg border border-border/50 p-3">
            <div className="flex items-center gap-2">
                {announcement.pinned && (
                    <Badge variant="secondary" className="bg-warning/10 text-warning-foreground text-[10px]">
                        Fixat
                    </Badge>
                )}
                <span className="text-sm font-medium text-foreground">{announcement.title}</span>
            </div>
            <p className="line-clamp-2 text-xs text-muted-foreground">{announcement.content}</p>
        </div>
    );
}