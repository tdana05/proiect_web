import { Search, SortAsc, SortDesc } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SORT_OPTIONS } from "@/types/volunteers";
import type { SortBy } from "@/types/volunteers";

interface VolunteerFiltersProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    filterDepartment: string;
    onDepartmentChange: (value: string) => void;
    sortBy: SortBy;
    onSortByChange: (value: SortBy) => void;
    sortOrder: "asc" | "desc";
    onSortOrderToggle: () => void;
    departments: string[];
}

export function VolunteerFilters({
                                     searchQuery,
                                     onSearchChange,
                                     filterDepartment,
                                     onDepartmentChange,
                                     sortBy,
                                     onSortByChange,
                                     sortOrder,
                                     onSortOrderToggle,
                                     departments,
                                 }: VolunteerFiltersProps) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Cauta voluntari..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-9"
                />
            </div>

            <Select value={filterDepartment} onValueChange={onDepartmentChange}>
                <SelectTrigger className="w-full sm:w-44">
                    <SelectValue placeholder="Departament" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Toate Departamentele</SelectItem>
                    {departments.map((d) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(v) => onSortByChange(v as SortBy)}>
                <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Sorteaza" />
                </SelectTrigger>
                <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Button variant="outline" size="icon" onClick={onSortOrderToggle}>
                {sortOrder === "asc" ? <SortAsc className="size-4" /> : <SortDesc className="size-4" />}
            </Button>
        </div>
    );
}