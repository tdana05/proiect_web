'use client'

import * as React from 'react'
import * as MenubarPrimitive from '@radix-ui/react-menubar'
import { CheckIcon, CircleIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MenubarItem(
    { className, inset, variant = 'default', ...props }
    : React.ComponentProps<typeof MenubarPrimitive.Item> & {
        inset?: boolean
        variant?: 'default' | 'destructive'
    }
) {
    return (
        <MenubarPrimitive.Item
            data-slot="menubar-item"
            data-inset={inset}
            data-variant={variant}
            className={cn(
                'relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none',
                className,
            )}
            {...props}
        />
    )
}

export function MenubarCheckboxItem(
    { className, children, ...props }
    : React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>
) {
    return (
        <MenubarPrimitive.CheckboxItem
            data-slot="menubar-checkbox-item"
            className={cn('relative flex items-center gap-2 py-1.5 pl-8 pr-2 text-sm', className)}
            {...props}
        >
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
            {children}
        </MenubarPrimitive.CheckboxItem>
    )
}

export function MenubarRadioItem(
    { className, children, ...props }
    : React.ComponentProps<typeof MenubarPrimitive.RadioItem>
) {
    return (
        <MenubarPrimitive.RadioItem
            data-slot="menubar-radio-item"
            className={cn('relative flex items-center gap-2 py-1.5 pl-8 pr-2 text-sm', className)}
            {...props}
        >
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
            {children}
        </MenubarPrimitive.RadioItem>
    )
}

export function MenubarSeparator(
    { className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Separator>
) {
    return (
        <MenubarPrimitive.Separator
            data-slot="menubar-separator"
            className={cn('bg-border -mx-1 my-1 h-px', className)}
            {...props}
        />
    )
}