'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'

function DialogHeader(
    props: React.ComponentProps<'div'>
) {
    const { className, ...rest } = props

    return (
        <div
            data-slot="dialog-header"
            className={cn(
                'flex flex-col gap-2 text-center sm:text-left',
                className
            )}
            {...rest}
        />
    )
}

function DialogFooter(
    props: React.ComponentProps<'div'>
) {
    const { className, ...rest } = props

    return (
        <div
            data-slot="dialog-footer"
            className={cn(
                'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
                className
            )}
            {...rest}
        />
    )
}

function DialogTitle(
    props: React.ComponentProps<typeof DialogPrimitive.Title>
) {
    const { className, ...rest } = props

    return (
        <DialogPrimitive.Title
            data-slot="dialog-title"
            className={cn('text-lg font-semibold', className)}
            {...rest}
        />
    )
}

function DialogDescription(
    props: React.ComponentProps<typeof DialogPrimitive.Description>
) {
    const { className, ...rest } = props

    return (
        <DialogPrimitive.Description
            data-slot="dialog-description"
            className={cn('text-sm text-muted-foreground', className)}
            {...rest}
        />
    )
}

export {
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
}