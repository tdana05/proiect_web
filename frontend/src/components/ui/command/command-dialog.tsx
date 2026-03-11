'use client'

import * as React from 'react'
import { Command } from './command-root'
import {
    AlertDialog as Dialog,
    AlertDialogContent as DialogContent,
    AlertDialogDescription as DialogDescription,
    AlertDialogHeader as DialogHeader,
    AlertDialogTitle as DialogTitle,
} from '../alert-dialog'

type CommandDialogProps = {
    open?: boolean
    onOpenChange?: (open: boolean) => void
    title?: string
    description?: string
    children: React.ReactNode
}

function CommandDialog({
                           open,
                           onOpenChange,
                           title = 'Command Palette',
                           description = 'Search for a command to run...',
                           children,
                       }: CommandDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <Command>
                    {children}
                </Command>
            </DialogContent>
        </Dialog>
    )
}

export { CommandDialog }