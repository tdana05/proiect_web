'use client'

import '../../types'
import * as React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

function AlertDialog(
    props: React.ComponentProps<typeof AlertDialogPrimitive.Root>,
) {
    return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger(
    props: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>,
) {
    return (
        <AlertDialogPrimitive.Trigger
            data-slot="alert-dialog-trigger"
            {...props}
        />
    )
}

function AlertDialogPortal(
    props: React.ComponentProps<typeof AlertDialogPrimitive.Portal>,
) {
    return (
        <AlertDialogPrimitive.Portal
            data-slot="alert-dialog-portal"
            {...props}
        />
    )
}

export { AlertDialog, AlertDialogTrigger, AlertDialogPortal }
