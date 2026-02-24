'use client'

import * as React from 'react'
import { useMemo } from 'react'
import { cn } from '@/lib/utils'

function FieldError({
                        className,
                        children,
                        errors,
                        ...props
                    }: React.ComponentProps<'div'> & {
    errors?: Array<{ message?: string } | undefined>
}) {
    const content = useMemo(() => {
        if (children) return children
        if (!errors) return null
        if (errors.length === 1 && errors[0]?.message)
            return errors[0].message

        return (
            <ul className="ml-4 list-disc">
                {errors.map(
                    (error, index) =>
                        error?.message && <li key={index}>{error.message}</li>
                )}
            </ul>
        )
    }, [children, errors])

    if (!content) return null

    return (
        <div
            role="alert"
            data-slot="field-error"
            className={cn('text-destructive text-sm', className)}
            {...props}
        >
            {content}
        </div>
    )
}

export { FieldError }