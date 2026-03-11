'use client'

import * as RechartsPrimitive from 'recharts'

import { cn } from '@/lib/utils'
import { useChart } from './chart-context'

type LegendItem = {
    value?: string
    dataKey?: string
    color?: string
}

type ChartLegendContentProps = {
    payload?: LegendItem[]
    verticalAlign?: 'top' | 'bottom'
    className?: string
    hideIcon?: boolean
    nameKey?: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ChartLegend = RechartsPrimitive.Legend

function ChartLegendContent({
                                className,
                                hideIcon = false,
                                payload = [],
                                verticalAlign = 'bottom',
                                nameKey,
                            }: ChartLegendContentProps) {
    const { config } = useChart()

    if (!payload.length) {
        return null
    }

    return (
        <div
            className={cn(
                'flex items-center justify-center gap-4',
                verticalAlign === 'top' ? 'pb-3' : 'pt-3',
                className,
            )}
        >
            {payload.map((item) => {
                const key = `${nameKey || item.dataKey || item.value || 'value'}`
                const itemConfig = config[key]

                return (
                    <div key={key} className="flex items-center gap-1.5">
                        {!hideIcon && (
                            <div
                                className="h-2 w-2 rounded-sm"
                                style={{ backgroundColor: item.color }}
                            />
                        )}
                        <span className="text-xs">
              {itemConfig?.label ?? item.value}
            </span>
                    </div>
                )
            })}
        </div>
    )
}

export {
    ChartLegend,
    ChartLegendContent,
}
