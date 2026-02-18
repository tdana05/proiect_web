import * as React from 'react'
import { MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

function BreadcrumbEllipsis(
    props: React.ComponentProps<'span'>
) {
    const { className, ...rest } = props

    return (
        <span
            data-slot="breadcrumb-ellipsis"
            role="presentation"
            aria-hidden="true"
            className={cn('flex size-9 items-center justify-center', className)}
            {...rest}
        >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
    )
}

export { BreadcrumbEllipsis }
