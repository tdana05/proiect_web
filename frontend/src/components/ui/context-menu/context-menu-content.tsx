'use client'

import * as React from 'react'
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import { cn } from '../../../lib/utils'

function ContextMenuContent(
    props: React.ComponentProps<typeof ContextMenuPrimitive.Content>
) {
    const { className, ...rest } = props

    return (
        <ContextMenuPrimitive.Portal>
            <ContextMenuPrimitive.Content
                data-slot="context-menu-content"
                className={cn(
                    'bg-popover text-popover-foreground z-50 min-w-[8rem] rounded-md border p-1 shadow-md',
                    className
                )}
                {...rest}
            />
        </ContextMenuPrimitive.Portal>
    )
}

function ContextMenuSeparator(
    props: React.ComponentProps<typeof ContextMenuPrimitive.Separator>
) {
    const { className, ...rest } = props
    return (
        <ContextMenuPrimitive.Separator
            className={cn('bg-border my-1 h-px', className)}
            {...rest}
        />
    )
}

export { ContextMenuContent, ContextMenuSeparator }