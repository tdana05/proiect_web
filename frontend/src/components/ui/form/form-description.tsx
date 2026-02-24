'use client'

import { cn } from '@/lib/utils'
import { useFormField } from './use-form-field'

export function FormDescription({
                                    className,
                                    ...props
                                }: React.ComponentProps<'p'>) {
    const { formDescriptionId } = useFormField()

    return (
        <p
            data-slot="form-description"
            id={formDescriptionId}
            className={cn('text-muted-foreground text-sm', className)}
            {...props}
        />
    )
}