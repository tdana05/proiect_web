'use client'

import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { cn } from '@/lib/utils'

function DropdownMenuContent({
                                 className,
                                 sideOffset = 4,
                                 ...props
                             }: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
    return (
        <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
                data-slot="dropdown-menu-content"
                sideOffset={sideOffset}
                className={cn(
                    'bg-popover text-popover-foreground z-50 min-w-[8rem] rounded-md border p-1 shadow-md',
                    className
                )}
                {...props}
            />
        </DropdownMenuPrimitive.Portal>
    )
}

function DropdownMenuSubContent({
                                    className,
                                    ...props
                                }: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
    return (
        <DropdownMenuPrimitive.SubContent
            data-slot="dropdown-menu-sub-content"
            className={cn(
                'bg-popover text-popover-foreground z-50 min-w-[8rem] rounded-md border p-1 shadow-lg',
                className
            )}
            {...props}
        />
    )
}

export { DropdownMenuContent, DropdownMenuSubContent }