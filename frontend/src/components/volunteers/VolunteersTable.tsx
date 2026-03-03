import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { VolunteerRow } from "./VolunteerRow";
import type { User } from "@/lib/types";

interface VolunteersTableProps {
    volunteers: User[];
    onSelectVolunteer: (volunteer: User) => void;
}

export function VolunteersTable({ volunteers, onSelectVolunteer }: VolunteersTableProps) {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Voluntar</TableHead>
                        <TableHead>Departament</TableHead>
                        <TableHead>Ore</TableHead>
                        <TableHead>Task-uri</TableHead>
                        <TableHead>Evenimente</TableHead>
                        <TableHead>Membru din</TableHead>
                        <TableHead className="text-right">Actiuni</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {volunteers.map((vol) => (
                        <VolunteerRow
                            key={vol.id}
                            volunteer={vol}
                            onSelect={onSelectVolunteer}
                        />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}