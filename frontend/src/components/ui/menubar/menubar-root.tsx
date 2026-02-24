'use client'

import * as React from 'react'
import * as MenubarPrimitive from '@radix-ui/react-menubar'
import { cn } from '@/lib/utils'

export function Menubar(
    { className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Root>
) {
    return (
        <MenubarPrimitive.Root
            data-slot="menubar"
            className={cn(
                'bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs',
                className,
            )}
            {...props}
        />
    )
}

export const MenubarMenu = (props: React.ComponentProps<typeof MenubarPrimitive.Menu>) => (
    <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />
)

export const MenubarGroup = (props: React.ComponentProps<typeof MenubarPrimitive.Group>) => (
    <MenubarPrimitive.Group data-slot="menubar-group" {...props} />
)

export const MenubarPortal = (props: React.ComponentProps<typeof MenubarPrimitive.Portal>) => (
    <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />
)

export const MenubarRadioGroup = (
    props: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>
) => (
    <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
)