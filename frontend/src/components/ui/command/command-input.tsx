'use client'

import * as React from 'react'
import { SearchIcon } from 'lucide-react'
import { Command as CommandPrimitive } from 'cmdk'
import { cn } from '@/lib/utils'

function CommandInput({
                          className,
                          ...props
                      }: React.ComponentProps<typeof CommandPrimitive.Input>) {
    return (
        <div
            data-slot="command-input-wrapper"
            className="flex h-9 items-center gap-2 border-b px-3"
        >
            <SearchIcon className="size-4 shrink-0 opacity-50" />

            <CommandPrimitive.Input
                data-slot="command-input"
                className={cn(
                    'placeholder:text-muted-foreground flex h-10 w-full bg-transparent py-3 text-sm outline-none',
                    className,
                )}
                {...props}
            />
        </div>
    )
}

export { CommandInput }