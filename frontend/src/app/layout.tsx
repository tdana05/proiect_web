import type { Metadata } from 'next'
import { Inter, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-space-mono" });

export const metadata: Metadata = {
    title: 'AMiCUS - Platforma de Gestionare a Voluntarilor',
    description: 'Platforma web pentru gestionarea voluntarilor din organizatia de tineret AMiCUS, Chisinau, Republica Moldova',
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="ro">
        <body className={`${_inter.variable} ${_spaceMono.variable} font-sans antialiased`}>
        {children}
        <Toaster richColors position="top-right" />
        <Analytics />
        </body>
        </html>
    )
}
