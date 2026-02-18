import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Calendar } from './components/ui/calendar'
import { Alert, AlertTitle, AlertDescription } from './components/ui/alert'
import { AspectRatio } from './components/ui/aspect-ratio'
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbEllipsis,
    BreadcrumbSeparator,
} from './components/ui/breadcrumb'
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from './components/ui/accordion'
import {
    ButtonGroup,
    ButtonGroupSeparator,
    ButtonGroupText,
} from './components/ui/button-group'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    CardAction,
} from './components/ui/card'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from './components/ui/carousel'

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from './components/ui/chart'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            {/* Breadcrumb */}
            <div style={{ maxWidth: 400, margin: '1rem auto' }}>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <span>Home</span>
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbSeparator />

                        <BreadcrumbEllipsis />

                        <BreadcrumbSeparator />

                        <BreadcrumbItem>
                            <BreadcrumbPage>Dashboard</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>


            {/* Logos */}
            <div>
                <a href="https://vite.dev" target="_blank" rel="noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank" rel="noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>

            <h1>Vite + React</h1>

            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
            </div>

            {/* Accordion */}
            <div style={{ maxWidth: 400, margin: '2rem auto' }}>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Întrebare 1</AccordionTrigger>
                        <AccordionContent>
                            Acesta este un exemplu de Accordion.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            {/* Alert */}
            <div style={{ maxWidth: 400, margin: '2rem auto' }}>
                <Alert>
                    <AlertTitle>Informație</AlertTitle>
                    <AlertDescription>
                        Aceasta este o alertă de test.
                    </AlertDescription>
                </Alert>
            </div>

            {/* AspectRatio */}
            <div style={{ maxWidth: 300, margin: '2rem auto' }}>
                <AspectRatio ratio={16 / 9}>
                    <img
                        src={viteLogo}
                        alt="Exemplu"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </AspectRatio>
            </div>

            {/* ButtonGroup */}
            <div style={{ maxWidth: 400, margin: '2rem auto' }}>
                <ButtonGroup>
                    <ButtonGroupText>Group</ButtonGroupText>
                    <ButtonGroupSeparator />
                    <button>Left</button>
                    <button>Right</button>
                </ButtonGroup>
            </div>

            {/* Card (CU CardAction) */}
            <div style={{ maxWidth: 400, margin: '2rem auto' }}>
                <Card>
                    <CardHeader>
                        <CardTitle>Card titlu</CardTitle>
                        <CardDescription>Descriere card</CardDescription>

                        <CardAction>
                            <button>X</button>
                        </CardAction>
                    </CardHeader>

                    <CardContent>
                        Conținutul cardului.
                    </CardContent>

                    <CardFooter>
                        Footer card
                    </CardFooter>
                </Card>
            </div>

            {/* Calendar */}
            <div style={{ maxWidth: 350, margin: '2rem auto' }}>
                <Calendar />
            </div>
            <div style={{ maxWidth: 400, margin: '2rem auto' }}>
                <Carousel>
                    <CarouselContent>
                        <CarouselItem>Slide 1</CarouselItem>
                        <CarouselItem>Slide 2</CarouselItem>
                        <CarouselItem>Slide 3</CarouselItem>
                    </CarouselContent>

                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            {/* Chart – doar ca să fie folosit */}
            <div style={{ maxWidth: 400, margin: '2rem auto' }}>
                <ChartContainer
                    config={{
                        value: { label: 'Value', color: '#2563eb' },
                    }}
                >
                    {/* momentan gol – e OK */}
                    <ChartLegend content={<ChartLegendContent />} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                </ChartContainer>
            </div>

        </>
    )
}

export default App
