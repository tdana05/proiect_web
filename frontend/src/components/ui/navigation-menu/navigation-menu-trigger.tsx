'use client'

import * as React from 'react'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { ChevronDownIcon } from 'lucide-react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export const navigationMenuTriggerStyle = cva(
    'group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px]'
)

export function NavigationMenuTrigger(
    { className, children, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>
) {
    return (
        <NavigationMenuPrimitive.Trigger
            data-slot="navigation-menu-trigger"
            className={cn(navigationMenuTriggerStyle(), className)}
            {...props}
        >
            {children}
            <ChevronDownIcon
                className="ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
            />
        </NavigationMenuPrimitive.Trigger>
    )
}