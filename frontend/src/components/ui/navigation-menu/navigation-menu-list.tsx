'use client'

import * as React from 'react'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { cn } from '@/lib/utils'

export function NavigationMenuList(
    { className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.List>
) {
    return (
        <NavigationMenuPrimitive.List
            data-slot="navigation-menu-list"
            className={cn(
                'group flex flex-1 list-none items-center justify-center gap-1',
                className,
            )}
            {...props}
        />
    )
}

export function NavigationMenuItem(
    { className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Item>
) {
    return (
        <NavigationMenuPrimitive.Item
            data-slot="navigation-menu-item"
            className={cn('relative', className)}
            {...props}
        />
    )
}