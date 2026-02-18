'use client'

import type { ChartConfig } from './chart-context'

const THEMES = { light: '', dark: '.dark' } as const

function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
    const colorConfig = Object.entries(config).filter(
        ([, c]) => c.color || c.theme,
    )

    if (!colorConfig.length) return null

    return (
        <style
            dangerouslySetInnerHTML={{
                __html: Object.entries(THEMES)
                    .map(
                        ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
                            .map(([key, item]) => {
                                const color = item.theme?.[theme as 'light' | 'dark'] || item.color
                                return color ? `  --color-${key}: ${color};` : null
                            })
                            .join('\n')}
}`,
                    )
                    .join('\n'),
            }}
        />
    )
}

export { ChartStyle }
