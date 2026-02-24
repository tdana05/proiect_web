'use client'

import * as React from 'react'
import * as MenubarPrimitive from '@radix-ui/react-menubar'
import { cn } from '@/lib/utils'
import { MenubarPortal } from './menubar-root'

export function MenubarTrigger(
    { className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Trigger>
) {
    return (
        <MenubarPrimitive.Trigger
            data-slot="menubar-trigger"
            className={cn(
                'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none',
                className,
            )}
            {...props}
        />
    )
}

export function MenubarContent(
    {
        className,
        align = 'start',
        alignOffset = -4,
        sideOffset = 8,
        ...props
    }: React.ComponentProps<typeof MenubarPrimitive.Content>
) {
    return (
        <MenubarPortal>
            <MenubarPrimitive.Content
                data-slot="menubar-content"
                align={align}
                alignOffset={alignOffset}
                sideOffset={sideOffset}
                className={cn(
                    'bg-popover text-popover-foreground z-50 min-w-[12rem] overflow-hidden rounded-md border p-1 shadow-md',
                    className,
                )}
                {...props}
            />
        </MenubarPortal>
    )
}