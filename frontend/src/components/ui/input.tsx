'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type = 'text', ...props }, ref) => {
        return (
            <input
                ref={ref}
                type={type}
                data-slot="input"
                className={cn(
                    // base
                    'h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm',

                    // background (dark mode support)
                    'dark:bg-input/30',

                    // file styles
                    'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',

                    // placeholder & selection
                    'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',

                    // disabled
                    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',

                    // focus
                    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',

                    // invalid
                    'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',

                    className
                )}
                {...props}
            />
        )
    }
)

Input.displayName = 'Input'