import type { ChangeEventHandler } from 'react'
import { cn } from '../../lib/utils'

interface TextareaProps {
  id?: string
  name?: string
  value?: string
  defaultValue?: string
  placeholder?: string
  label?: string
  error?: string
  rows?: number
  disabled?: boolean
  required?: boolean
  className?: string
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
}

export function Textarea({
  id,
  name,
  value,
  defaultValue,
  placeholder,
  label,
  error,
  rows = 4,
  disabled = false,
  required = false,
  className,
  onChange,
}: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        required={required}
        onChange={onChange}
        className={cn(
          'w-full rounded-lg border border-input bg-background px-3 py-2 text-sm',
          'placeholder:text-muted-foreground resize-none',
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
