"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ErrorPageProps {
  code: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconClassName?: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
}

export function ErrorPage({
  code,
  title,
  description,
  icon: Icon,
  iconClassName = "text-muted-foreground",
  primaryAction = { label: "Pagina principala", href: "/" },
  secondaryAction,
}: ErrorPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        {/* Logo */}
        <Link
          href="/"
          className="mb-10 flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary">
            <Heart className="size-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-wide text-foreground">
            AMiCUS
          </span>
        </Link>

        {/* Error Icon */}
        <div className="mb-6 flex size-20 items-center justify-center rounded-2xl border border-border bg-muted/50">
          <Icon className={`size-10 ${iconClassName}`} />
        </div>

        {/* Error Code */}
        <p className="mb-2 font-mono text-5xl font-bold tracking-tighter text-foreground">
          {code}
        </p>

        {/* Title */}
        <h1 className="mb-3 text-xl font-semibold text-foreground text-balance">
          {title}
        </h1>

        {/* Description */}
        <p className="mb-8 max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">
          {description}
        </p>

        {/* Actions */}
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href={primaryAction.href}>{primaryAction.label}</Link>
          </Button>
          {secondaryAction && (
            <Button asChild variant="outline" size="lg">
              <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
            </Button>
          )}
        </div>

        {/* Footer */}
        <p className="mt-12 text-xs text-muted-foreground">
          AMiCUS - Platforma de Gestionare a Voluntarilor
        </p>
      </div>
    </div>
  );
}
