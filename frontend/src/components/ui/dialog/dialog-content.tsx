'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DialogPortal } from './dialog-root'

function DialogOverlay(
    props: React.ComponentProps<typeof DialogPrimitive.Overlay>
) {
    const { className, ...rest } = props

    return (
        <DialogPrimitive.Overlay
            data-slot="dialog-overlay"
            className={cn(
                'fixed inset-0 z-50 bg-black/50',
                className
            )}
            {...rest}
        />
    )
}

function DialogContent(
    props: React.ComponentProps<typeof DialogPrimitive.Content> & {
        showCloseButton?: boolean
    }
) {
    const {
        className,
        children,
        showCloseButton = true,
        ...rest
    } = props

    return (
        <DialogPortal>
            <DialogOverlay />
            <DialogPrimitive.Content
                data-slot="dialog-content"
                className={cn(
                    'fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-6 shadow-lg',
                    className
                )}
                {...rest}
            >
                {children}

                {showCloseButton && (
                    <DialogPrimitive.Close
                        className="absolute top-4 right-4 opacity-70 hover:opacity-100"
                    >
                        <XIcon />
                    </DialogPrimitive.Close>
                )}
            </DialogPrimitive.Content>
        </DialogPortal>
    )
}

export {
    DialogOverlay,
    DialogContent,
}