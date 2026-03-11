import * as React from 'react'
import { cn } from '@/lib/utils'

function BreadcrumbItem(
    props: React.ComponentProps<'li'>
) {
    const { className, ...rest } = props

    return (
        <li
            data-slot="breadcrumb-item"
            className={cn('inline-flex items-center gap-1.5', className)}
            {...rest}
        />
    )
}

export { BreadcrumbItem }
