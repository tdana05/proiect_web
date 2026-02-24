'use client'

'use client'

import * as React from 'react'
import { Input } from '../input'
import { Textarea } from '../textarea'
import { cn } from '@/lib/utils'

export function InputGroupText({
                                   className,
                                   ...props
                               }: React.ComponentProps<'span'>) {
    return (
        <span
            className={cn(
                "text-muted-foreground flex items-center gap-2 text-sm [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
                className
            )}
            {...props}
        />
    )
}

export function InputGroupInput({
                                    className,
                                    ...props
                                }: React.ComponentProps<'input'>) {
    return (
        <Input
            data-slot="input-group-control"
            className={cn(
                'flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent',
                className
            )}
            {...props}
        />
    )
}

export function InputGroupTextarea({
                                       className,
                                       ...props
                                   }: React.ComponentProps<'textarea'>) {
    return (
        <Textarea
            data-slot="input-group-control"
            className={cn(
                'flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent',
                className
            )}
            {...props}
        />
    )
}