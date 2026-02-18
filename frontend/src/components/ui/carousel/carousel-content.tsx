'use client'

import { cn } from '@/lib/utils'
import { useCarousel } from './carousel-context'

function CarouselContent({ className, ...props }: React.ComponentProps<'div'>) {
    const { carouselRef, orientation } = useCarousel()

    return (
        <div ref={carouselRef} className="overflow-hidden">
            <div
                className={cn(
                    'flex',
                    orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
                    className,
                )}
                data-slot="carousel-content"
                {...props}
            />
        </div>
    )
}

export { CarouselContent }
