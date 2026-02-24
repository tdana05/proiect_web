'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

function EmptyTitle({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="empty-title"
            className={cn('text-lg font-medium tracking-tight', className)}
            {...props}
        />
    )
}

function EmptyDescription({
                              className,
                              ...props
                          }: React.ComponentProps<'p'>) {
    return (
        <div
            data-slot="empty-description"
            className={cn(
                'text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4',
                className
            )}
            {...props}
        />
    )
}

function EmptyContent({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="empty-content"
            className={cn(
                'flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance',
                className
            )}
            {...props}
        />
    )
}

export { EmptyTitle, EmptyDescription, EmptyContent }