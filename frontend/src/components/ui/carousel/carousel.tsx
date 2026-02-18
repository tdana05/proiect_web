'use client'

import * as React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { cn } from '@/lib/utils'
import { CarouselContext } from './carousel-context'

type CarouselProps = React.ComponentProps<'div'> & {
    opts?: Parameters<typeof useEmblaCarousel>[0]
    plugins?: Parameters<typeof useEmblaCarousel>[1]
    orientation?: 'horizontal' | 'vertical'
}

function Carousel({
                      orientation = 'horizontal',
                      opts,
                      plugins,
                      className,
                      children,
                      ...props
                  }: CarouselProps) {
    const [carouselRef, api] = useEmblaCarousel(
        { ...opts, axis: orientation === 'horizontal' ? 'x' : 'y' },
        plugins,
    )

    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    React.useEffect(() => {
        if (!api) return
        const update = () => {
            setCanScrollPrev(api.canScrollPrev())
            setCanScrollNext(api.canScrollNext())
        }
        update()
        api.on('select', update)
        api.on('reInit', update)
    }, [api])

    return (
        <CarouselContext.Provider
            value={{
                carouselRef,
                api,
                scrollPrev: () => api?.scrollPrev(),
                scrollNext: () => api?.scrollNext(),
                canScrollPrev,
                canScrollNext,
                orientation,
            }}
        >
            <div
                className={cn('relative', className)}
                role="region"
                aria-roledescription="carousel"
                data-slot="carousel"
                {...props}
            >
                {children}
            </div>
        </CarouselContext.Provider>
    )
}

export { Carousel }
