"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, ServerCrash } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

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
        <div className="mb-6 flex size-20 items-center justify-center rounded-2xl border border-destructive/30 bg-destructive/5">
          <ServerCrash className="size-10 text-destructive" />
        </div>

        {/* Error Code */}
        <p className="mb-2 font-mono text-5xl font-bold tracking-tighter text-foreground">
          500
        </p>

        {/* Title */}
        <h1 className="mb-3 text-xl font-semibold text-foreground text-balance">
          Eroare interna a serverului
        </h1>

        {/* Description */}
        <p className="mb-2 max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">
          A aparut o eroare neasteptata in aplicatie. Echipa tehnica a fost
          notificata. Va rugam sa incercati din nou.
        </p>

        {/* Error Digest (for debugging) */}
        {error.digest && (
          <p className="mb-6 font-mono text-xs text-muted-foreground/60">
            {'Cod eroare: '}{error.digest}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button size="lg" onClick={reset}>
            Reincearca
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/dashboard">Inapoi la Dashboard</Link>
          </Button>
        </div>

        {/* Footer */}
        <p className="mt-12 text-xs text-muted-foreground">
          AMiCUS - Platforma de Gestionare a Voluntarilor
        </p>
      </div>
    </div>
  );
}
