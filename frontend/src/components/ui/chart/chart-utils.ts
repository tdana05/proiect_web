import type { ChartConfig } from './chart-context'


function getPayloadConfigFromPayload(
    config: ChartConfig,
    payload: unknown,
    key: string,
) {
    if (typeof payload !== 'object' || payload === null) return undefined

    const payloadData =
        'payload' in payload &&
        typeof payload.payload === 'object' &&
        payload.payload !== null
            ? payload.payload
            : undefined

    let configKey = key

    if (key in payload && typeof (payload as any)[key] === 'string') {
        configKey = (payload as any)[key]
    } else if (
        payloadData &&
        key in payloadData &&
        typeof (payloadData as any)[key] === 'string'
    ) {
        configKey = (payloadData as any)[key]
    }

    return config[configKey] || config[key]
}

export { getPayloadConfigFromPayload }
