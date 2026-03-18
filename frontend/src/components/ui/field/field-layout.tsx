'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const fieldVariants = cva(
    'group/field flex w-full gap-3 data-[invalid=true]:text-destructive',
    {
        variants: {
            orientation: {
                vertical: ['flex-col [&>*]:w-full [&>.sr-only]:w-auto'],
                horizontal: [
                    'flex-row items-center',
                    '[&>[data-slot=field-label]]:flex-auto',
                ],
                responsive: [
                    'flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto',
                ],
            },
        },
        defaultVariants: {
            orientation: 'vertical',
        },
    }
)

function Field({
                   className,
                   orientation = 'vertical',
                   ...props
               }: React.ComponentProps<'div'> & VariantProps<typeof fieldVariants>) {
    return (
        <div
            role="group"
            data-slot="field"
            data-orientation={orientation}
            className={cn(fieldVariants({ orientation }), className)}
            {...props}
        />
    )
}

function FieldContent({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="field-content"
            className={cn(
                'group/field-content flex flex-1 flex-col gap-1.5 leading-snug',
                className
            )}
            {...props}
        />
    )
}

export { Field, FieldContent }