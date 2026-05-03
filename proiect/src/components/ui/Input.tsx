import type { ChangeEventHandler } from 'react'
import { cn } from '../../lib/utils'

interface InputProps {
  id?: string
  name?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'datetime-local' | 'tel' | 'url'
  value?: string | number
  defaultValue?: string | number
  placeholder?: string
  label?: string
  error?: string
  disabled?: boolean
  required?: boolean
  min?: string | number
  max?: string | number
  step?: string | number
  className?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export function Input({
  id,
  name,
  type = 'text',
  value,
  defaultValue,
  placeholder,
  label,
  error,
  disabled = false,
  required = false,
  min,
  max,
  step,
  className,
  onChange,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        className={cn(
          'h-10 w-full rounded-lg border border-input bg-background px-3 text-sm',
          'placeholder:text-muted-foreground',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-destructive focus:ring-destructive',
          className
        )}
      />
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  )
}
