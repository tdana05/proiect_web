'use client'

import * as RechartsPrimitive from 'recharts'

import { cn } from '@/lib/utils'
import { getPayloadConfigFromPayload } from './chart-utils'
import { useChart } from './chart-context'

const ChartTooltip = RechartsPrimitive.Tooltip

type TooltipPayloadItem = {
    name?: string
    value?: number
    color?: string
    dataKey?: string
    payload?: Record<string, unknown>
}

function ChartTooltipContent({
                                 active,
                                 payload,
                                 className,
                             }: {
    active?: boolean
    payload?: TooltipPayloadItem[]
    className?: string
}) {
    const { config } = useChart()

    if (!active || !payload?.length) {
        return null
    }

    return (
        <div
            className={cn(
                'border-border/50 bg-background grid min-w-[8rem] gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl',
                className,
            )}
        >
            {payload.map((item, index) => {
                const key = String(item.dataKey ?? item.name ?? index)
                const itemConfig = getPayloadConfigFromPayload(config, item, key)

                return (
                    <div
                        key={key}
                        className="flex items-center justify-between gap-2"
                    >
            <span className="text-muted-foreground">
              {itemConfig?.label ?? item.name}
            </span>
                        <span className="font-mono">
              {item.value?.toLocaleString()}
            </span>
                    </div>
                )
            })}
        </div>
    )
}

export { ChartTooltip, ChartTooltipContent }
