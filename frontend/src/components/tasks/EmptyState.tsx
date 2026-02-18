import { Card, CardContent } from "@/components/ui/card";
import { Filter } from "lucide-react";

export function EmptyState() {
    return (
        <Card>
            <CardContent className="flex flex-col items-center gap-2 py-12">
                <Filter className="size-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Nu au fost gasite task-uri.</p>
            </CardContent>
        </Card>
    );
}