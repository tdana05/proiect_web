'use client'

import * as React from 'react'
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import { CheckIcon, CircleIcon } from 'lucide-react'
import { cn } from '../../../lib/utils'

function ContextMenuItem(
    props: React.ComponentProps<typeof ContextMenuPrimitive.Item>
) {
    const { className, ...rest } = props
    return (
        <ContextMenuPrimitive.Item
            className={cn(
                'flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm',
                className
            )}
            {...rest}
        />
    )
}

function ContextMenuCheckboxItem(
    props: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>
) {
    const { className, children, ...rest } = props

    return (
        <ContextMenuPrimitive.CheckboxItem
            className={cn('relative pl-8 text-sm', className)}
            {...rest}
        >
      <span className="absolute left-2 flex items-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
            {children}
        </ContextMenuPrimitive.CheckboxItem>
    )
}

function ContextMenuRadioItem(
    props: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>
) {
    const { className, children, ...rest } = props

    return (
        <ContextMenuPrimitive.RadioItem
            className={cn('relative pl-8 text-sm', className)}
            {...rest}
        >
      <span className="absolute left-2 flex items-center">
        <ContextMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
            {children}
        </ContextMenuPrimitive.RadioItem>
    )
}
export {
    ContextMenuItem,
    ContextMenuCheckboxItem,
    ContextMenuRadioItem,
}