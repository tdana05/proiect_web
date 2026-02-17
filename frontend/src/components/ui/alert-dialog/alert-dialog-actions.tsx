'use client'

import '../../types'
import * as React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { cn } from '../../../lib/utils'
import { buttonVariants } from '../button'

function AlertDialogTitle({
                              className,
                              ...props
                          }: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
    return (
        <AlertDialogPrimitive.Title
            data-slot="alert-dialog-title"
            className={cn('text-lg font-semibold', className)}
            {...props}
        />
    )
}

function AlertDialogDescription({
                                    className,
                                    ...props
                                }: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
    return (
        <AlertDialogPrimitive.Description
            data-slot="alert-dialog-description"
            className={cn('text-muted-foreground text-sm', className)}
            {...props}
        />
    )
}

function AlertDialogAction({
                               className,
                               ...props
                           }: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
    return (
        <AlertDialogPrimitive.Action
            className={cn(buttonVariants(), className)}
            {...props}
        />
    )
}

function AlertDialogCancel({
                               className,
                               ...props
                           }: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
    return (
        <AlertDialogPrimitive.Cancel
            className={cn(buttonVariants({ variant: 'outline' }), className)}
            {...props}
        />
    )
}

export {
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
}
