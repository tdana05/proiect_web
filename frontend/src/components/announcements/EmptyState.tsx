import { Card, CardContent } from "@/components/ui/card";
import { Megaphone } from "lucide-react";

export function EmptyState() {
    return (
        <Card>
            <CardContent className="flex flex-col items-center gap-2 py-12">
                <Megaphone className="size-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Nu au fost gasite anunturi.</p>
            </CardContent>
        </Card>
    );
}