'use client'

import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function DropdownMenuItem({
                              className,
                              ...props
                          }: React.ComponentProps<typeof DropdownMenuPrimitive.Item>) {
    return (
        <DropdownMenuPrimitive.Item
            data-slot="dropdown-menu-item"
            className={cn(
                'flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm',
                className
            )}
            {...props}
        />
    )
}

function DropdownMenuCheckboxItem({
                                      className,
                                      children,
                                      checked,
                                      ...props
                                  }: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
    return (
        <DropdownMenuPrimitive.CheckboxItem
            data-slot="dropdown-menu-checkbox-item"
            className={cn(
                'relative flex items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm',
                className
            )}
            checked={checked}
            {...props}
        >
      <span className="absolute left-2 flex items-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
            {children}
        </DropdownMenuPrimitive.CheckboxItem>
    )
}

function DropdownMenuRadioGroup(
    props: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>
) {
    return (
        <DropdownMenuPrimitive.RadioGroup
            data-slot="dropdown-menu-radio-group"
            {...props}
        />
    )
}

function DropdownMenuRadioItem({
                                   className,
                                   children,
                                   ...props
                               }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
    return (
        <DropdownMenuPrimitive.RadioItem
            data-slot="dropdown-menu-radio-item"
            className={cn(
                'relative flex items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm',
                className
            )}
            {...props}
        >
      <span className="absolute left-2 flex items-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
            {children}
        </DropdownMenuPrimitive.RadioItem>
    )
}

function DropdownMenuLabel({
                               className,
                               ...props
                           }: React.ComponentProps<typeof DropdownMenuPrimitive.Label>) {
    return (
        <DropdownMenuPrimitive.Label
            data-slot="dropdown-menu-label"
            className={cn('px-2 py-1.5 text-sm font-medium', className)}
            {...props}
        />
    )
}

function DropdownMenuSeparator({
                                   className,
                                   ...props
                               }: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
    return (
        <DropdownMenuPrimitive.Separator
            data-slot="dropdown-menu-separator"
            className={cn('bg-border my-1 h-px', className)}
            {...props}
        />
    )
}

function DropdownMenuShortcut({
                                  className,
                                  ...props
                              }: React.ComponentProps<'span'>) {
    return (
        <span
            data-slot="dropdown-menu-shortcut"
            className={cn('ml-auto text-xs text-muted-foreground', className)}
            {...props}
        />
    )
}

function DropdownMenuSubTrigger({
                                    className,
                                    children,
                                    ...props
                                }: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger>) {
    return (
        <DropdownMenuPrimitive.SubTrigger
            data-slot="dropdown-menu-sub-trigger"
            className={cn(
                'flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm',
                className
            )}
            {...props}
        >
            {children}
            <ChevronRightIcon className="ml-auto size-4" />
        </DropdownMenuPrimitive.SubTrigger>
    )
}

export {
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSubTrigger,
}