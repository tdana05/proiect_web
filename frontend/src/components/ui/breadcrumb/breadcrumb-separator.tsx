import * as React from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

function BreadcrumbSeparator(
    props: React.ComponentProps<'li'>
) {
    const { children, className, ...rest } = props

    return (
        <li
            data-slot="breadcrumb-separator"
            role="presentation"
            aria-hidden="true"
            className={cn('[&>svg]:size-3.5', className)}
            {...rest}
        >
            {children ?? <ChevronRight />}
        </li>
    )
}

export { BreadcrumbSeparator }
