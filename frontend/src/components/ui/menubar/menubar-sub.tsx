'use client'

import * as React from 'react'
import * as MenubarPrimitive from '@radix-ui/react-menubar'
import { ChevronRightIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export const MenubarSub = (props: React.ComponentProps<typeof MenubarPrimitive.Sub>) => (
    <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
)

export function MenubarSubTrigger(
    { className, children, inset, ...props }
    : React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & { inset?: boolean }
) {
    return (
        <MenubarPrimitive.SubTrigger
            data-slot="menubar-sub-trigger"
            data-inset={inset}
            className={cn('flex items-center px-2 py-1.5 text-sm', className)}
            {...props}
        >
            {children}
            <ChevronRightIcon className="ml-auto h-4 w-4" />
        </MenubarPrimitive.SubTrigger>
    )
}

export function MenubarSubContent(
    { className, ...props }
    : React.ComponentProps<typeof MenubarPrimitive.SubContent>
) {
    return (
        <MenubarPrimitive.SubContent
            data-slot="menubar-sub-content"
            className={cn(
                'bg-popover text-popover-foreground z-50 min-w-[8rem] rounded-md border p-1 shadow-lg',
                className,
            )}
            {...props}
        />
    )
}