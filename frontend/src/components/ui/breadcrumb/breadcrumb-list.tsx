import * as React from 'react'
import { cn } from '@/lib/utils'

function BreadcrumbList(
    props: React.ComponentProps<'ol'>
) {
    const { className, ...rest } = props

    return (
        <ol
            data-slot="breadcrumb-list"
            className={cn(
                'text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5',
                className,
            )}
            {...rest}
        />
    )
}

export { BreadcrumbList }
