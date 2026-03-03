import { Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getUserById } from "@/lib/data-service";
import { TYPE_ICONS, CATEGORY_LABELS } from "@/types/documents";
import type { Document } from "@/lib/types";

interface DocumentRowProps {
    document: Document;
    isAdmin: boolean;
    onDelete: (id: string) => void;
}

export function DocumentRow({ document, isAdmin, onDelete }: DocumentRowProps) {
    const uploader = getUserById(document.uploadedBy);

    return (
        <TableRow>
            <TableCell>
                <div className="flex items-center gap-3">
                    {TYPE_ICONS[document.type]}
                    <div>
                        <p className="text-sm font-medium text-foreground">{document.name}</p>
                        <p className="text-xs text-muted-foreground uppercase">{document.type}</p>
                    </div>
                </div>
            </TableCell>
            <TableCell>
                <Badge variant="outline" className="text-xs">
                    {CATEGORY_LABELS[document.category]}
                </Badge>
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">{document.size}</TableCell>
            <TableCell className="text-sm text-muted-foreground">{uploader?.name}</TableCell>
            <TableCell className="text-sm text-muted-foreground">
                {new Date(document.uploadedAt).toLocaleDateString("ro-RO")}
            </TableCell>
            <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="size-8">
                        <Download className="size-4" />
                    </Button>
                    {isAdmin && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-muted-foreground hover:text-destructive"
                            onClick={() => onDelete(document.id)}
                        >
                            <Trash2 className="size-4" />
                        </Button>
                    )}
                </div>
            </TableCell>
        </TableRow>
    );
}