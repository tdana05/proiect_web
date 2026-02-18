import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface AnnouncementFiltersProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    filterPriority: string;
    onPriorityChange: (value: string) => void;
}

export function AnnouncementFilters({
                                        searchQuery,
                                        onSearchChange,
                                        filterPriority,
                                        onPriorityChange,
                                    }: AnnouncementFiltersProps) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Cauta anunturi..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-9"
                />
            </div>
            <Select value={filterPriority} onValueChange={onPriorityChange}>
                <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Prioritate" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Toate</SelectItem>
                    <SelectItem value="high">Ridicata</SelectItem>
                    <SelectItem value="medium">Medie</SelectItem>
                    <SelectItem value="low">Scazuta</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}