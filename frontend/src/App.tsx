import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Checkbox } from './components/ui/checkbox'
import { Badge } from './components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from './components/ui/avatar'
import { Calendar } from './components/ui/calendar'
import { useForm } from 'react-hook-form'
import { Kbd, KbdGroup } from '@/components/ui/kbd'

import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogAction,
    AlertDialogCancel,
} from './components/ui/alert-dialog'

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

import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from './components/ui/collapsible'

import {
    CommandDialog,
    CommandInput,
    CommandList,
    CommandItem,
    CommandEmpty,
    CommandGroup,
    CommandSeparator,
    CommandShortcut,
} from './components/ui/command'

import {
    ContextMenu,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuCheckboxItem,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuGroup,
    ContextMenuPortal,
    ContextMenuRadioGroup,
    ContextMenuSub,
    ContextMenuSubTrigger,
    ContextMenuSubContent,
} from './components/ui/context-menu'


import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from './components/ui/dialog'

import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription,
    DrawerClose,  
} from '@/components/ui/drawer'

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuPortal,
    DropdownMenuGroup,
} from '@/components/ui/dropdown-menu'

import {
    Empty,
    EmptyHeader,
    EmptyTitle,
    EmptyDescription,
    EmptyContent,
    EmptyMedia,
} from '@/components/ui/empty'

import {
    Field,
    FieldLabel,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    FieldContent,
    FieldTitle,
} from '@/components/ui/field'

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form'

import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
} from '@/components/ui/hover-card'

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupButton,
    InputGroupText,
} from '@/components/ui/input-group'

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator,
} from '@/components/ui/input-otp'

import {
    Item,
    ItemMedia,
    ItemContent,
    ItemActions,
    ItemGroup,
    ItemSeparator,
    ItemTitle,
    ItemDescription,
    ItemHeader,
    ItemFooter,
} from '@/components/ui/item'

import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarGroup,
    MenubarSeparator,
    MenubarItem,
    MenubarCheckboxItem,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSub,
    MenubarSubTrigger,
    MenubarSubContent,
} from '@/components/ui/menubar'

import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
    NavigationMenuIndicator,
} from '@/components/ui/navigation-menu'

function App() {
    const [count, setCount] = useState(0)
    const [checked, setChecked] = useState(false)
    const [commandOpen, setCommandOpen] = useState(false)
    const [open, setOpen] = useState(false)
    const form = useForm({
        defaultValues: {
            email: '',
        },
    })
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
                <button onClick={() => setCount((c) => c + 1)}>
                    count is {count}
                </button>
            </div>

            {/* Command Button */}
            <div style={{ maxWidth: 400, margin: '2rem auto' }}>
                <button onClick={() => setCommandOpen(true)}>
                    Open Command Palette
                </button>
            </div>

            {/* Avatar + Badge */}
            <div style={{ maxWidth: 400, margin: '2rem auto', display: 'flex', gap: 12 }}>
                <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/100" />
                    <AvatarFallback>AL</AvatarFallback>
                </Avatar>
                <Badge>Admin</Badge>
            </div>

            {/* Checkbox */}
            <div style={{ maxWidth: 400, margin: '2rem auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Checkbox
                        checked={checked}
                        onCheckedChange={(value) => setChecked(!!value)}
                    />
                    <span>Accept terms</span>
                </div>
            </div>

            {/* AlertDialog */}
            <div style={{ maxWidth: 400, margin: '2rem auto' }}>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button>Open Dialog</button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirm action</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to continue?
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Confirm</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
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

            {/* Card */}
            <div style={{ maxWidth: 400, margin: '2rem auto' }}>
                <Card>
                    <CardHeader>
                        <CardTitle>Card titlu</CardTitle>
                        <CardDescription>Descriere card</CardDescription>
                        <CardAction>
                            <button>X</button>
                        </CardAction>
                    </CardHeader>
                    <CardContent>Conținutul cardului.</CardContent>
                    <CardFooter>Footer card</CardFooter>
                </Card>
            </div>

            {/* Calendar */}
            <div style={{ maxWidth: 350, margin: '2rem auto' }}>
                <Calendar />
            </div>

            {/* Carousel */}
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

            {/* Chart */}
            <div style={{ maxWidth: 400, margin: '2rem auto' }}>
                <ChartContainer
                    config={{
                        value: { label: 'Value', color: '#2563eb' },
                    }}
                >
                    <ChartLegend content={<ChartLegendContent />} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                </ChartContainer>
            </div>

            {/* Collapsible */}
            <div style={{ maxWidth: 400, margin: '2rem auto' }}>
                <Collapsible>
                    <CollapsibleTrigger>
                        <button>Toggle Content</button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <div style={{ padding: 10 }}>
                            This is collapsible content.
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>

            {/* Command Dialog */}
            <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
                <CommandInput placeholder="Search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>

                    <CommandGroup heading="Pages">
                        <CommandItem>
                            Calendar
                            <CommandShortcut>⌘K</CommandShortcut>
                        </CommandItem>
                        <CommandItem>Announcements</CommandItem>
                    </CommandGroup>

                    <CommandSeparator />

                    <CommandGroup heading="Settings">
                        <CommandItem>Profile</CommandItem>
                        <CommandItem>Logout</CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>

            <ContextMenu>
                <ContextMenuTrigger>
                    <div
                        style={{
                            width: 250,
                            height: 150,
                            background: '#1e1e1e',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 8,
                            cursor: 'context-menu',
                        }}
                    >
                        Click dreapta aici
                    </div>
                </ContextMenuTrigger>

                <ContextMenuPortal>
                    <ContextMenuContent>

                        <ContextMenuGroup>
                            <ContextMenuItem>Profil</ContextMenuItem>
                            <ContextMenuItem>Setări</ContextMenuItem>
                        </ContextMenuGroup>

                        <ContextMenuSeparator />

                        <ContextMenuCheckboxItem checked>
                            Activare notificări
                        </ContextMenuCheckboxItem>

                        <ContextMenuSeparator />

                        <ContextMenuRadioGroup value="1">
                            <ContextMenuRadioItem value="1">
                                Opțiunea 1
                            </ContextMenuRadioItem>
                            <ContextMenuRadioItem value="2">
                                Opțiunea 2
                            </ContextMenuRadioItem>
                        </ContextMenuRadioGroup>

                        <ContextMenuSeparator />

                        <ContextMenuSub>
                            <ContextMenuSubTrigger>
                                Mai multe
                            </ContextMenuSubTrigger>
                            <ContextMenuSubContent>
                                <ContextMenuItem>Sub element 1</ContextMenuItem>
                                <ContextMenuItem>Sub element 2</ContextMenuItem>
                            </ContextMenuSubContent>
                        </ContextMenuSub>

                    </ContextMenuContent>
                </ContextMenuPortal>
            </ContextMenu>
            
            {/* Dialog */}
            <div style={{ maxWidth: 400, margin: '2rem auto' }}>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <button
                            style={{
                                padding: '10px 20px',
                                background: '#16a34a',
                                color: 'white',
                                borderRadius: 8,
                                border: 'none',
                            }}
                        >
                            Open Custom Dialog
                        </button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Dialog personalizat</DialogTitle>
                            <DialogDescription>
                                Acesta este un dialog complet funcțional.
                            </DialogDescription>
                        </DialogHeader>

                        <div style={{ margin: '20px 0' }}>
                            Conținutul dialogului este aici.
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <button
                                    style={{
                                        padding: '8px 16px',
                                        background: '#ef4444',
                                        color: 'white',
                                        borderRadius: 6,
                                        border: 'none',
                                    }}
                                >
                                    Închide
                                </button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            {/* Drawer */}
            <div style={{ maxWidth: 400, margin: '2rem auto' }}>
                <Drawer>
                    <DrawerTrigger asChild>
                        <button
                            style={{
                                padding: '10px 20px',
                                background: '#0ea5e9',
                                color: 'white',
                                borderRadius: 8,
                                border: 'none',
                            }}
                        >
                            Open Drawer
                        </button>
                    </DrawerTrigger>

                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Titlu Drawer</DrawerTitle>
                            <DrawerDescription>
                                Acesta este un exemplu de Drawer.
                            </DrawerDescription>
                        </DrawerHeader>

                        <div style={{ padding: 16 }}>
                            Conținutul drawer-ului este aici.
                        </div>

                        <DrawerFooter>
                            <DrawerClose asChild>
                                <button
                                    style={{
                                        padding: '8px 16px',
                                        background: '#ef4444',
                                        color: 'white',
                                        borderRadius: 6,
                                        border: 'none',
                                    }}
                                >
                                    Închide
                                </button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </div>

            {/* DropdownMenu */}
            <div style={{ maxWidth: 400, margin: '2rem auto' }}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            style={{
                                padding: '10px 20px',
                                background: '#6366f1',
                                color: 'white',
                                borderRadius: 8,
                                border: 'none',
                            }}
                        >
                            Open Dropdown
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuPortal>
                        <DropdownMenuContent>

                        <DropdownMenuLabel>Account</DropdownMenuLabel>


                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    Profile
                                    <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    Settings
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            
                            
                        <DropdownMenuSeparator />

                        <DropdownMenuCheckboxItem checked>
                            Notifications
                        </DropdownMenuCheckboxItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuRadioGroup value="1">
                            <DropdownMenuRadioItem value="1">
                                Option 1
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="2">
                                Option 2
                            </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>

                        <DropdownMenuSeparator />

                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                More
                            </DropdownMenuSubTrigger>

                            <DropdownMenuSubContent>
                                <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
                                <DropdownMenuItem>Sub Item 2</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>

                        </DropdownMenuContent>
                    </DropdownMenuPortal>
                </DropdownMenu>
            </div>

            {/* Empty */}
            <div style={{ maxWidth: 400, margin: '2rem auto' }}>
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            📂
                        </EmptyMedia>

                        <EmptyTitle>No Data</EmptyTitle>

                        <EmptyDescription>
                            There is nothing to display right now.
                        </EmptyDescription>
                    </EmptyHeader>

                    <EmptyContent>
                        <button
                            style={{
                                padding: '8px 16px',
                                background: '#16a34a',
                                color: 'white',
                                borderRadius: 6,
                                border: 'none',
                            }}
                        >
                            Add Item
                        </button>
                    </EmptyContent>
                </Empty>
            </div>

            {/* Field */}
            <div style={{ maxWidth: 400, margin: '2rem auto' }}>
                <FieldSet>
                    <FieldLegend>Account Information</FieldLegend>

                    <FieldGroup>
                        <Field>
                            <FieldLabel>
                                <FieldTitle>Email</FieldTitle>
                            </FieldLabel>
                            <FieldContent>
                                <input
                                    type="email"
                                    placeholder="Enter email"
                                    style={{
                                        padding: 8,
                                        borderRadius: 6,
                                        border: '1px solid #ccc',
                                    }}
                                />
                                <FieldDescription>
                                    We will not share your email.
                                </FieldDescription>
                            </FieldContent>
                        </Field>

                        <FieldSeparator>OR</FieldSeparator>

                        <Field>
                            <FieldLabel>Password</FieldLabel>
                            <FieldContent>
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    style={{
                                        padding: 8,
                                        borderRadius: 6,
                                        border: '1px solid #ccc',
                                    }}
                                />
                                <FieldError
                                    errors={[{ message: 'Password is required' }]}
                                />
                            </FieldContent>
                        </Field>
                    </FieldGroup>
                </FieldSet>
            </div>
            {/* React Hook Form */}
            <div style={{ maxWidth: 400, margin: '2rem auto' }}>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit((data) => console.log(data))}
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <input
                                            {...field}
                                            placeholder="Enter email"
                                            style={{
                                                padding: 8,
                                                borderRadius: 6,
                                                border: '1px solid #ccc',
                                                width: '100%',
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <button
                            type="submit"
                            style={{
                                marginTop: 12,
                                padding: '8px 16px',
                                background: '#2563eb',
                                color: 'white',
                                borderRadius: 6,
                                border: 'none',
                            }}
                        >
                            Submit
                        </button>
                    </form>
                </Form>
            </div>
            {/* Hover Card */}
            <div style={{ maxWidth: 400, margin: '2rem auto' }}>
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <button
                            style={{
                                padding: '10px 20px',
                                background: '#8b5cf6',
                                color: 'white',
                                borderRadius: 8,
                                border: 'none',
                            }}
                        >
                            Hover me
                        </button>
                    </HoverCardTrigger>

                    <HoverCardContent>
                        <div>
                            <strong>Hover Card Title</strong>
                            <p style={{ marginTop: 8 }}>
                                This content appears when you hover.
                            </p>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </div>
            
            {/* Input Group */}
            <div style={{ maxWidth: 400, margin: '2rem auto' }}>
                <InputGroup>
                    <InputGroupAddon align="inline-start">
                        <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>

                    <InputGroupInput placeholder="Username" />

                    <InputGroupAddon align="inline-end">
                        <InputGroupButton>
                            Check
                        </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </div>

            {/* Input-otp */}
            <div style={{ maxWidth: 400, margin: '2rem auto' }}>
                <InputOTP maxLength={6}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSeparator />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
            </div>
            
            {/* Item */}
            <div style={{ maxWidth: 500, margin: '2rem auto' }}>
                <ItemGroup>

                    <Item variant="outline">
                        <ItemMedia variant="icon">⭐</ItemMedia>

                        <ItemContent>
                            <ItemTitle>Premium Plan</ItemTitle>
                            <ItemDescription>
                                Access to all advanced features and priority support.
                            </ItemDescription>
                        </ItemContent>

                        <ItemActions>
                            <button
                                style={{
                                    padding: '6px 12px',
                                    borderRadius: 6,
                                    border: '1px solid #ccc',
                                }}
                            >
                                Select
                            </button>
                        </ItemActions>
                    </Item>

                    <ItemSeparator />

                    <Item variant="muted" size="sm">
                        <ItemMedia variant="icon">🔥</ItemMedia>

                        <ItemContent>
                            <ItemTitle>Starter Plan</ItemTitle>
                            <ItemDescription>
                                Basic features for personal use.
                            </ItemDescription>
                        </ItemContent>
                    </Item>

                    <Item variant="outline">
                        <ItemHeader>
                            <ItemTitle>Premium Plan</ItemTitle>
                            <span>$29</span>
                        </ItemHeader>

                        <ItemContent>
                            <ItemDescription>
                                Access to all advanced features.
                            </ItemDescription>
                        </ItemContent>

                        <ItemFooter>
                            <button>Select</button>
                        </ItemFooter>
                    </Item>

                </ItemGroup>
            </div>

            {/* Kbd */}
            <div style={{ margin: '2rem auto', maxWidth: 400 }}>
                <p>
                    Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open command palette
                </p>

                <KbdGroup>
                    <Kbd>Ctrl</Kbd>
                    <Kbd>Shift</Kbd>
                    <Kbd>P</Kbd>
                </KbdGroup>
            </div>

            {/* Menubar */}
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                        <MenubarGroup>
                            <MenubarItem>New</MenubarItem>
                            <MenubarItem>Open</MenubarItem>
                        </MenubarGroup>

                        <MenubarSeparator />

                        <MenubarCheckboxItem checked>
                            Auto Save
                        </MenubarCheckboxItem>

                        <MenubarRadioGroup value="1">
                            <MenubarRadioItem value="1">Option 1</MenubarRadioItem>
                            <MenubarRadioItem value="2">Option 2</MenubarRadioItem>
                        </MenubarRadioGroup>

                        <MenubarSub>
                            <MenubarSubTrigger>More</MenubarSubTrigger>
                            <MenubarSubContent>
                                <MenubarItem>Sub Item</MenubarItem>
                            </MenubarSubContent>
                        </MenubarSub>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>

            {/* Navigation-menu */}
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <NavigationMenuLink href="#">
                                Link
                            </NavigationMenuLink>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>

                <NavigationMenuIndicator />
            </NavigationMenu>
        </>
    )
}

export default App