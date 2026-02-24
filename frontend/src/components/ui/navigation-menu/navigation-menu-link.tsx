'use client'

import * as React from 'react'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { cn } from '@/lib/utils'

export function NavigationMenuLink(
    { className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Link>
) {
    return (
        <NavigationMenuPrimitive.Link
            data-slot="navigation-menu-link"
            className={cn(
                'flex flex-col gap-1 rounded-sm p-2 text-sm outline-none',
                className,
            )}
            {...props}
        />
    )
}