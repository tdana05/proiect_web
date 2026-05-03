import type { ChangeEventHandler } from 'react'
import { cn } from '../../lib/utils'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  id?: string
  name?: string
  value?: string
  defaultValue?: string
  label?: string
  error?: string
  options: SelectOption[]
  disabled?: boolean
  required?: boolean
  className?: string
  onChange?: ChangeEventHandler<HTMLSelectElement>
}

export function Select({
  id,
  name,
  value,
  defaultValue,
  label,
  error,
  options,
  disabled = false,
  required = false,
  className,
  onChange,
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        required={required}
        onChange={onChange}
        className={cn(
          'h-10 w-full rounded-lg border border-input bg-background px-3 text-sm',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-destructive focus:ring-destructive',
          className
        )}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  )
}
