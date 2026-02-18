import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton() {
    return (
        <div className="flex h-screen items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4">
                <Skeleton className="size-12 rounded-full" />
                <Skeleton className="h-4 w-48" />
            </div>
        </div>
    );
}