'use client'

import * as React from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'
import { cn } from '@/lib/utils'

function DrawerHeader(
    props: React.ComponentProps<'div'>
) {
    const { className, ...rest } = props

    return (
        <div
            data-slot="drawer-header"
            className={cn(
                'flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left',
                className
            )}
            {...rest}
        />
    )
}

function DrawerFooter(
    props: React.ComponentProps<'div'>
) {
    const { className, ...rest } = props

    return (
        <div
            data-slot="drawer-footer"
            className={cn(
                'mt-auto flex flex-col gap-2 p-4',
                className
            )}
            {...rest}
        />
    )
}

function DrawerTitle(
    props: React.ComponentProps<typeof DrawerPrimitive.Title>
) {
    const { className, ...rest } = props

    return (
        <DrawerPrimitive.Title
            data-slot="drawer-title"
            className={cn(
                'text-foreground font-semibold',
                className
            )}
            {...rest}
        />
    )
}

function DrawerDescription(
    props: React.ComponentProps<typeof DrawerPrimitive.Description>
) {
    const { className, ...rest } = props

    return (
        <DrawerPrimitive.Description
            data-slot="drawer-description"
            className={cn(
                'text-muted-foreground text-sm',
                className
            )}
            {...rest}
        />
    )
}

export {
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription,
}