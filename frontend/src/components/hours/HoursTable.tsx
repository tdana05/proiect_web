import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Filter } from "lucide-react";
import { HoursTableRow } from "./HoursTableRow";
import type { HoursEntry } from "@/lib/types";

interface HoursTableProps {
    entries: HoursEntry[];
    isAdmin: boolean;
    tasks: any[];
    events: any[];
    onReview: (entry: HoursEntry) => void;
    onEdit: (entry: HoursEntry) => void;
}

export function HoursTable({ entries, isAdmin, tasks, events, onReview, onEdit }: HoursTableProps) {
    if (entries.length === 0) {
        return (
            <div className="flex flex-col items-center gap-2 py-12">
                <Filter className="size-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Nu au fost gasite inregistrari.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        {isAdmin && <TableHead>Voluntar</TableHead>}
                        <TableHead>Data</TableHead>
                        <TableHead>Ore</TableHead>
                        <TableHead className="min-w-[200px]">Descriere</TableHead>
                        <TableHead>Referinta</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actiuni</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {entries.map((entry) => (
                        <HoursTableRow
                            key={entry.id}
                            entry={entry}
                            isAdmin={isAdmin}
                            tasks={tasks}
                            events={events}
                            onReview={onReview}
                            onEdit={onEdit}
                        />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}