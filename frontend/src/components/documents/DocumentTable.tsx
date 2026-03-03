import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DocumentRow } from "./DocumentRow";
import type { Document } from "@/lib/types";

interface DocumentTableProps {
    documents: Document[];
    isAdmin: boolean;
    onDelete: (id: string) => void;
}

export function DocumentTable({ documents, isAdmin, onDelete }: DocumentTableProps) {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Document</TableHead>
                        <TableHead>Categorie</TableHead>
                        <TableHead>Dimensiune</TableHead>
                        <TableHead>Incarcat de</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead className="text-right">Actiuni</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {documents.map((doc) => (
                        <DocumentRow
                            key={doc.id}
                            document={doc}
                            isAdmin={isAdmin}
                            onDelete={onDelete}
                        />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}