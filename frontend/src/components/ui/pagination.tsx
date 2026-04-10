import * as React from 'react'
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    MoreHorizontalIcon,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'

interface PaginationProps extends React.ComponentProps<'nav'> {}

function Pagination({ className, ...props }: PaginationProps) {
    return (
        <nav
            role="navigation"
            aria-label="pagination"
            data-slot="pagination"
            className={cn('mx-auto flex w-full justify-center', className)}
            {...props}
        />
    )
}

interface PaginationContentProps extends React.ComponentProps<'ul'> {}

function PaginationContent({
                               className,
                               ...props
                           }: PaginationContentProps) {
    return (
        <ul
            data-slot="pagination-content"
            className={cn('flex flex-row items-center gap-1', className)}
            {...props}
        />
    )
}

interface PaginationItemProps extends React.ComponentProps<'li'> {}

function PaginationItem({ ...props }: PaginationItemProps) {
    return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
    isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
    React.ComponentProps<'a'>

function PaginationLink({
                            className,
                            isActive,
                            size = 'sm',
                            ...props
                        }: PaginationLinkProps) {
    return (
        <a
            aria-current={isActive ? 'page' : undefined}
            data-slot="pagination-link"
            data-active={isActive}
            className={cn(
                buttonVariants({
                    variant: isActive ? 'outline' : 'outline',
                    size,
                }),
                isActive ? '' : 'border-0 hover:bg-accent',
                className,
            )}
            {...props}
        />
    )
}

interface PaginationPreviousProps extends React.ComponentProps<typeof PaginationLink> {}

function PaginationPrevious({
                                className,
                                ...props
                            }: PaginationPreviousProps) {
    return (
        <PaginationLink
            aria-label="Go to previous page"
            size="sm"
            className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
            {...props}
        >
            <ChevronLeftIcon className="size-4" />
            <span className="hidden sm:block">Previous</span>
        </PaginationLink>
    )
}

interface PaginationNextProps extends React.ComponentProps<typeof PaginationLink> {}

function PaginationNext({
                            className,
                            ...props
                        }: PaginationNextProps) {
    return (
        <PaginationLink
            aria-label="Go to next page"
            size="sm"
            className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
            {...props}
        >
            <span className="hidden sm:block">Next</span>
            <ChevronRightIcon className="size-4" />
        </PaginationLink>
    )
}

interface PaginationEllipsisProps extends React.ComponentProps<'span'> {}

function PaginationEllipsis({
                                className,
                                ...props
                            }: PaginationEllipsisProps) {
    return (
        <span
            aria-hidden
            data-slot="pagination-ellipsis"
            className={cn('flex size-9 items-center justify-center', className)}
            {...props}
        >
            <MoreHorizontalIcon className="size-4" />
            <span className="sr-only">More pages</span>
        </span>
    )
}

export {
    Pagination,
    PaginationContent,
    PaginationLink,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
}