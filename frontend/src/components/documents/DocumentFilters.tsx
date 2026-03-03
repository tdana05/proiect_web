import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CATEGORY_LABELS } from "@/types/documents";

interface DocumentFiltersProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    filterCategory: string;
    onCategoryChange: (value: string) => void;
}

export function DocumentFilters({
                                    searchQuery,
                                    onSearchChange,
                                    filterCategory,
                                    onCategoryChange,
                                }: DocumentFiltersProps) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Cauta documente..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-9"
                />
            </div>
            <Select value={filterCategory} onValueChange={onCategoryChange}>
                <SelectTrigger className="w-full sm:w-44">
                    <SelectValue placeholder="Categorie" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Toate Categoriile</SelectItem>
                    {Object.entries(CATEGORY_LABELS).map(([val, label]) => (
                        <SelectItem key={val} value={val}>{label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}