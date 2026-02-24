'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const itemMediaVariants = cva(
    'flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none group-has-[[data-slot=item-description]]/item:translate-y-0.5',
    {
        variants: {
            variant: {
                default: 'bg-transparent',
                icon: 'size-8 border rounded-sm bg-muted [&_svg:not([class*="size-"])]:size-4',
                image:
                    'size-10 rounded-sm overflow-hidden [&_img]:size-full [&_img]:object-cover',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
)

export function ItemMedia({
                              className,
                              variant = 'default',
                              ...props
                          }: React.ComponentProps<'div'> &
    VariantProps<typeof itemMediaVariants>) {
    return (
        <div
            data-slot="item-media"
            data-variant={variant}
            className={cn(itemMediaVariants({ variant, className }))}
            {...props}
        />
    )
}