import { STATUS_CONFIG } from "@/types/tasks";
import type { TaskStatus } from "@/lib/types";

interface StatusSummaryProps {
    stats: Record<string, number>;
    currentFilter: string;
    onFilterChange: (status: string) => void;
}

export function StatusSummary({ stats, currentFilter, onFilterChange }: StatusSummaryProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {(Object.entries(STATUS_CONFIG) as [TaskStatus, typeof STATUS_CONFIG[TaskStatus]][]).map(
                ([status, config]) => {
                    const count = stats[status] || 0;
                    return (
                        <button
                            key={status}
                            onClick={() => onFilterChange(currentFilter === status ? "all" : status)}
                            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                                currentFilter === status
                                    ? config.bgClass + " border-current"
                                    : "border-border/50 bg-card hover:bg-muted/50"
                            }`}
                        >
              <span className={`inline-flex items-center justify-center rounded px-1.5 py-0.5 text-[10px] font-bold ${config.className}`}>
                {count}
              </span>
                            {config.label}
                        </button>
                    );
                }
            )}
        </div>
    );
}