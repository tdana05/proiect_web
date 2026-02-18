'use client'

import * as React from 'react'
import { DayPicker, getDefaultClassNames } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

import { CalendarDayButton } from './calendar-day-button'
import {
    CalendarRoot,
    CalendarChevron,
    CalendarWeekNumber,
} from './calendar-components'

function Calendar({
                      className,
                      classNames,
                      showOutsideDays = true,
                      captionLayout = 'label',
                      buttonVariant = 'default',
                      formatters,
                      components,
                      ...props
                  }: React.ComponentProps<typeof DayPicker> & {
    buttonVariant?: 'default' | 'outline'
}) {
    const defaultClassNames = getDefaultClassNames()

    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            captionLayout={captionLayout}
            className={cn(
                'bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
                String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
                String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
                className,
            )}
            formatters={{
                formatMonthDropdown: (date: Date) =>
                    date.toLocaleString('default', { month: 'short' }),
                ...formatters,
            }}
            classNames={{
                root: cn('w-fit', defaultClassNames.root),
                months: cn(
                    'flex gap-4 flex-col md:flex-row relative',
                    defaultClassNames.months,
                ),
                nav: cn(
                    'flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between',
                    defaultClassNames.nav,
                ),
                button_previous: cn(
                    buttonVariants({ variant: buttonVariant }),
                    'size-(--cell-size) p-0',
                    defaultClassNames.button_previous,
                ),
                button_next: cn(
                    buttonVariants({ variant: buttonVariant }),
                    'size-(--cell-size) p-0',
                    defaultClassNames.button_next,
                ),
                ...classNames,
            }}
            components={{
                Root: CalendarRoot,
                Chevron: CalendarChevron,
                DayButton: CalendarDayButton,
                WeekNumber: CalendarWeekNumber,
                ...components,
            }}
            {...props}
        />
    )
}

export { Calendar }
