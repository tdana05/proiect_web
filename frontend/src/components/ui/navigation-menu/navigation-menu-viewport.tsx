'use client'

import * as React from 'react'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { cn } from '@/lib/utils'

export function NavigationMenuViewport(
    { className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>
) {
    return (
        <div className="absolute top-full left-0 isolate z-50 flex justify-center">
            <NavigationMenuPrimitive.Viewport
                data-slot="navigation-menu-viewport"
                className={cn(
                    'bg-popover text-popover-foreground relative mt-1.5 overflow-hidden rounded-md border shadow',
                    className,
                )}
                {...props}
            />
        </div>
    )
}