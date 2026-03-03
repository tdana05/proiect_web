'use client'

import * as React from 'react'
import * as RechartsPrimitive from 'recharts'
import { cn } from '@/lib/utils'

import { ChartContext } from './chart-context'
import type { ChartConfig } from './chart-context'

import { ChartStyle } from './chart-style'

function ChartContainer({
                            id,
                            className,
                            config,
                            children,
                            ...props
                        }: React.ComponentProps<'div'> & {
    config: ChartConfig
    children: React.ComponentProps<
        typeof RechartsPrimitive.ResponsiveContainer
    >['children']
}) {
    const uniqueId = React.useId()
    const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`

    return (
        <ChartContext.Provider value={{ config }}>
            <div
                data-slot="chart"
                data-chart={chartId}
                className={cn(
                    'flex aspect-video justify-center text-xs [&_.recharts-layer]:outline-hidden',
                    className,
                )}
                {...props}
            >
                <ChartStyle id={chartId} config={config} />
                <RechartsPrimitive.ResponsiveContainer>
                    {children}
                </RechartsPrimitive.ResponsiveContainer>
            </div>
        </ChartContext.Provider>
    )
}

export { ChartContainer }
