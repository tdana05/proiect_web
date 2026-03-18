'use client'

import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

function DropdownMenu(
    props: React.ComponentProps<typeof DropdownMenuPrimitive.Root>
) {
    return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal(
    props: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>
) {
    return (
        <DropdownMenuPrimitive.Portal
            data-slot="dropdown-menu-portal"
            {...props}
        />
    )
}

function DropdownMenuTrigger(
    props: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>
) {
    return (
        <DropdownMenuPrimitive.Trigger
            data-slot="dropdown-menu-trigger"
            {...props}
        />
    )
}

function DropdownMenuGroup(
    props: React.ComponentProps<typeof DropdownMenuPrimitive.Group>
) {
    return (
        <DropdownMenuPrimitive.Group
            data-slot="dropdown-menu-group"
            {...props}
        />
    )
}

function DropdownMenuSub(
    props: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>
) {
    return (
        <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
    )
}

export {
    DropdownMenu,
    DropdownMenuPortal,
    DropdownMenuTrigger,
    DropdownMenuGroup,
    DropdownMenuSub,
}