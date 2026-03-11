'use client'

import * as React from 'react'
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'

type CarouselApi = UseEmblaCarouselType[1]

type CarouselContextProps = {
    carouselRef: ReturnType<typeof useEmblaCarousel>[0]
    api: CarouselApi
    scrollPrev: () => void
    scrollNext: () => void
    canScrollPrev: boolean
    canScrollNext: boolean
    orientation: 'horizontal' | 'vertical'
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
    const context = React.useContext(CarouselContext)
    if (!context) {
        throw new Error('useCarousel must be used within a <Carousel />')
    }
    return context
}

export { CarouselContext, useCarousel }
export type { CarouselApi }
