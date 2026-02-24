'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

function FieldLabel({
                        className,
                        ...props
                    }: React.ComponentProps<typeof Label>) {
    return (
        <Label
            data-slot="field-label"
            className={cn('flex w-fit gap-2 leading-snug', className)}
            {...props}
        />
    )
}

function FieldTitle({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="field-title"
            className={cn('text-sm font-medium', className)}
            {...props}
        />
    )
}

function FieldDescription({ className, ...props }: React.ComponentProps<'p'>) {
    return (
        <p
            data-slot="field-description"
            className={cn('text-muted-foreground text-sm', className)}
            {...props}
        />
    )
}

function FieldSeparator({
                            children,
                            className,
                            ...props
                        }: React.ComponentProps<'div'> & {
    children?: React.ReactNode
}) {
    return (
        <div
            data-slot="field-separator"
            className={cn('relative -my-2 h-5 text-sm', className)}
            {...props}
        >
            <Separator className="absolute inset-0 top-1/2" />
            {children && (
                <span className="bg-background relative mx-auto px-2">
          {children}
        </span>
            )}
        </div>
    )
}

export {
    FieldLabel,
    FieldTitle,
    FieldDescription,
    FieldSeparator,
}