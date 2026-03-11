'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export function ItemContent({
                                className,
                                ...props
                            }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="item-content"
            className={cn(
                'flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none',
                className
            )}
            {...props}
        />
    )
}

export function ItemTitle({
                              className,
                              ...props
                          }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="item-title"
            className={cn(
                'flex w-fit items-center gap-2 text-sm leading-snug font-medium',
                className
            )}
            {...props}
        />
    )
}

export function ItemDescription({
                                    className,
                                    ...props
                                }: React.ComponentProps<'p'>) {
    return (
        <p
            data-slot="item-description"
            className={cn(
                'text-muted-foreground line-clamp-2 text-sm leading-normal font-normal text-balance',
                '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
                className
            )}
            {...props}
        />
    )
}

export function ItemActions({
                                className,
                                ...props
                            }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="item-actions"
            className={cn('flex items-center gap-2', className)}
            {...props}
        />
    )
}

export function ItemHeader({
                               className,
                               ...props
                           }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="item-header"
            className={cn(
                'flex basis-full items-center justify-between gap-2',
                className
            )}
            {...props}
        />
    )
}

export function ItemFooter({
                               className,
                               ...props
                           }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="item-footer"
            className={cn(
                'flex basis-full items-center justify-between gap-2',
                className
            )}
            {...props}
        />
    )
}