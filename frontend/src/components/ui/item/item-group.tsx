'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export function ItemGroup({
                              className,
                              ...props
                          }: React.ComponentProps<'div'>) {
    return (
        <div
            role="list"
            data-slot="item-group"
            className={cn('group/item-group flex flex-col', className)}
            {...props}
        />
    )
}