'use client'

import * as React from 'react'
import { Command as CommandPrimitive } from 'cmdk'

function CommandList(
    props: React.ComponentProps<typeof CommandPrimitive.List>
) {
    return (
        <CommandPrimitive.List
            data-slot="command-list"
            className="max-h-[300px] overflow-y-auto"
            {...props}
        />
    )
}

function CommandEmpty(
    props: React.ComponentProps<typeof CommandPrimitive.Empty>
) {
    return (
        <CommandPrimitive.Empty
            data-slot="command-empty"
            className="py-6 text-center text-sm"
            {...props}
        />
    )
}

function CommandGroup(
    props: React.ComponentProps<typeof CommandPrimitive.Group>
) {
    return (
        <CommandPrimitive.Group
            data-slot="command-group"
            className="p-1"
            {...props}
        />
    )
}

function CommandItem(
    props: React.ComponentProps<typeof CommandPrimitive.Item>
) {
    return (
        <CommandPrimitive.Item
            data-slot="command-item"
            className="flex items-center gap-2 px-2 py-1.5 text-sm cursor-default"
            {...props}
        />
    )
}

function CommandSeparator(
    props: React.ComponentProps<typeof CommandPrimitive.Separator>
) {
    return (
        <CommandPrimitive.Separator
            data-slot="command-separator"
            className="bg-border my-1 h-px"
            {...props}
        />
    )
}

function CommandShortcut(
    props: React.ComponentProps<'span'>
) {
    return (
        <span
            data-slot="command-shortcut"
            className="ml-auto text-xs text-muted-foreground"
            {...props}
        />
    )
}

export {
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandSeparator,
    CommandShortcut,
}