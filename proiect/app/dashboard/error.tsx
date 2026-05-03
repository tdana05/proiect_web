"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ServerCrash } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <div className="flex w-full max-w-md flex-col items-center text-center">
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
          Eroare interna
        </h1>

        {/* Description */}
        <p className="mb-2 max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">
          A aparut o eroare neasteptata in aceasta sectiune a aplicatiei.
          Va rugam sa incercati din nou sau sa reveniti la pagina principala.
        </p>

        {/* Error details */}
        {error.message && (
          <div className="mb-6 w-full rounded-lg border border-border bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">Detalii: </span>
              {error.message}
            </p>
            {error.digest && (
              <p className="mt-1 font-mono text-[10px] text-muted-foreground/60">
                {'Cod: '}{error.digest}
              </p>
            )}
          </div>
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
      </div>
    </div>
  );
}
