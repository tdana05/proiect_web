import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { STATUS_OPTIONS } from "@/types/projects";

interface ProjectFiltersProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    filterStatus: string;
    onStatusChange: (value: string) => void;
}

export function ProjectFilters({
                                   searchQuery,
                                   onSearchChange,
                                   filterStatus,
                                   onStatusChange,
                               }: ProjectFiltersProps) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Cauta proiecte..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-9"
                />
            </div>
            <Select value={filterStatus} onValueChange={onStatusChange}>
                <SelectTrigger className="w-full sm:w-44">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    {STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}