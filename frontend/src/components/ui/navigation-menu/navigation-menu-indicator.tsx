'use client'

import * as React from 'react'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { cn } from '@/lib/utils'

export function NavigationMenuIndicator(
    { className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>
) {
    return (
        <NavigationMenuPrimitive.Indicator
            data-slot="navigation-menu-indicator"
            className={cn(
                'top-full flex h-1.5 items-end justify-center overflow-hidden',
                className,
            )}
            {...props}
        >
            <div className="bg-border h-2 w-2 rotate-45 rounded-tl-sm" />
        </NavigationMenuPrimitive.Indicator>
    )
}