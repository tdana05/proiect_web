'use client'

import * as React from 'react'
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import { ChevronRightIcon } from 'lucide-react'
import { cn } from '../../../lib/utils'

function ContextMenuSub(
    props: React.ComponentProps<typeof ContextMenuPrimitive.Sub>
) {
    return <ContextMenuPrimitive.Sub {...props} />
}

function ContextMenuSubTrigger(
    props: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger>
) {
    const { className, children, ...rest } = props

    return (
        <ContextMenuPrimitive.SubTrigger
            className={cn('flex items-center px-2 py-1.5 text-sm', className)}
            {...rest}
        >
            {children}
            <ChevronRightIcon className="ml-auto size-4" />
        </ContextMenuPrimitive.SubTrigger>
    )
}

function ContextMenuSubContent(
    props: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>
) {
    const { className, ...rest } = props

    return (
        <ContextMenuPrimitive.SubContent
            className={cn(
                'bg-popover min-w-[8rem] rounded-md border p-1 shadow-lg',
                className
            )}
            {...rest}
        />
    )
}

export { ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent }