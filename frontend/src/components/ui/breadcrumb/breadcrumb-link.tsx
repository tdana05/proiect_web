import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

type BreadcrumbLinkProps =
    React.ComponentProps<'a'> & {
    asChild?: boolean
}

function BreadcrumbLink(props: BreadcrumbLinkProps) {
    const { asChild, className, ...rest } = props
    const Comp = asChild ? Slot : 'a'

    return (
        <Comp
            data-slot="breadcrumb-link"
            className={cn('hover:text-foreground transition-colors', className)}
            {...rest}
        />
    )
}

export { BreadcrumbLink }
