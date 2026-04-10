'use client'

import * as React from 'react'
import {CircleIcon} from 'lucide-react'
import {cn} from '@/lib/utils'

interface RadioGroupContextValue {
    value?: string
    onValueChange?: (value: string) => void
    name?: string
    disabled?: boolean
}

const RadioGroupContext = React.createContext<RadioGroupContextValue>({})

const useRadioGroup = () => {
    return React.useContext(RadioGroupContext)
}

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: string
    onValueChange?: (value: string) => void
    name?: string
    disabled?: boolean
    orientation?: 'horizontal' | 'vertical'
}

function RadioGroup({
                        className,
                        value,
                        onValueChange,
                        name,
                        disabled = false,
                        orientation = 'vertical',
                        children,
                        ...props
                    }: RadioGroupProps) {
    return (
        <RadioGroupContext.Provider value={{ value, onValueChange, name, disabled }}>
            <div
                role="radiogroup"
                aria-orientation={orientation}
                className={cn(
                    'flex',
                    orientation === 'vertical' ? 'flex-col gap-2' : 'flex-row gap-4 flex-wrap',
                    className
                )}
                {...props}
            >
                {children}
            </div>
        </RadioGroupContext.Provider>
    )
}
RadioGroup.displayName = 'RadioGroup'

export interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'checked' | 'onChange'> {
    value: string
    className?: string
    children?: React.ReactNode
    disabled?: boolean
}

function RadioGroupItem({
                            className,
                            value: itemValue,
                            children,
                            disabled: itemDisabled,
                            ...props
                        }: RadioGroupItemProps) {
    const group = useRadioGroup()
    const id = React.useId() // Generare ID unică și stabilă

    const checked = group.value === itemValue
    const disabled = group.disabled || itemDisabled
    const name = group.name

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (group.onValueChange) {
            group.onValueChange(e.target.value)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault()
            if (!disabled && group.onValueChange) {
                group.onValueChange(itemValue)
            }
        }
    }

    return (
        <label
            htmlFor={id}
            className={cn(
                'flex items-center gap-2 cursor-pointer select-none',
                disabled && 'cursor-not-allowed opacity-50'
            )}
            onKeyDown={handleKeyDown}
            tabIndex={disabled ? -1 : 0}
            role="radio"
            aria-checked={checked}
            aria-disabled={disabled}
        >
            <div className="relative flex items-center justify-center">
                <input
                    type="radio"
                    id={id}
                    value={itemValue}
                    checked={checked}
                    onChange={handleChange}
                    disabled={disabled}
                    name={name}
                    className="peer absolute opacity-0 w-0 h-0"
                    {...props}
                />
                <div
                    className={cn(
                        // Stiluri de bază
                        'aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-all duration-200',
                        // Stiluri pentru stări
                        'border-input bg-background',
                        'peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2',
                        'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
                        // Stiluri pentru checked
                        'peer-checked:border-primary peer-checked:bg-primary',
                        // Clase personalizate
                        className
                    )}
                >
                    {checked && (
                        <CircleIcon
                            className="fill-background text-background absolute inset-0 m-auto size-2"
                            aria-hidden="true"
                        />
                    )}
                </div>
            </div>
            {children && (
                <span className="text-sm text-foreground">{children}</span>
            )}
        </label>
    )
}
RadioGroupItem.displayName = 'RadioGroupItem'

export interface RadioGroupIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
    forceMount?: boolean
}

function RadioGroupIndicator({
                                 className,
                                 forceMount,
                                 ...props
                             }: RadioGroupIndicatorProps) {
    const group = useRadioGroup()
    const checked = group.value !== undefined

    if (!forceMount && !checked) return null

    return (
        <span
            className={cn('relative flex items-center justify-center', className)}
            {...props}
        >
            <CircleIcon className="fill-primary absolute size-2" />
        </span>
    )
}
RadioGroupIndicator.displayName = 'RadioGroupIndicator'

export {
    RadioGroup,
    RadioGroupItem,
    RadioGroupIndicator,
    useRadioGroup,
}