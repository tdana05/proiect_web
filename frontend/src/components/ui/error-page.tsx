"use client";

import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
type Action = {
    label: string;
    onClick: () => void;
};

type ErrorPageProps = {
    code: string;
    title: string;
    description: string;
    icon: LucideIcon;
    iconClassName?: string;
    primaryAction?: Action;
    secondaryAction?: Action;
};

export function ErrorPage({
                              code,
                              title,
                              description,
                              icon: Icon,
                              iconClassName,
                              primaryAction,
                              secondaryAction,
                          }: ErrorPageProps) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center text-center gap-6 p-6">
            <Icon className={`h-16 w-16 ${iconClassName}`} />
            <h1 className="text-6xl font-bold">{code}</h1>
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="max-w-md text-muted-foreground">{description}</p>

            <div className="flex gap-4">
                {primaryAction && (
                    <Button onClick={primaryAction.onClick}>
                        {primaryAction.label}
                    </Button>
                )}
                {secondaryAction && (
                    <Button variant="outline" onClick={secondaryAction.onClick}>
                        {secondaryAction.label}
                    </Button>
                )}
            </div>
        </div>
    );
}