'use client'

import { cn } from '@/lib/utils'

interface ProgressProps {
    value?: number
    className?: string
}

function Progress({ className, value = 0, ...props }: ProgressProps) {

    const percentage = Math.min(100, Math.max(0, value))

    return (
        <div
            className={cn(
                'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
                className
            )}
            {...props}
        >
            <div
                className="h-full w-full flex-1 bg-primary transition-all"
                style={{ transform: `translateX(-${100 - percentage}%)` }}
            />
        </div>
    )
}

export { Progress }