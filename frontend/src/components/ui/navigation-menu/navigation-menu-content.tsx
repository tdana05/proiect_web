'use client'

import * as React from 'react'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { cn } from '@/lib/utils'

export function NavigationMenuContent(
    { className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Content>
) {
    return (
        <NavigationMenuPrimitive.Content
            data-slot="navigation-menu-content"
            className={cn(
                'top-0 left-0 w-full p-2 md:absolute md:w-auto',
                className,
            )}
            {...props}
        />
    )
}