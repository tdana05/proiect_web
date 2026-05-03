"use client";

import { ServerCrash } from "lucide-react";
import { ErrorPage } from "@/components/error-page";

export default function InternalServerError500Page() {
  return (
    <ErrorPage
      code="500"
      title="Eroare interna a serverului"
      description="A aparut o eroare neasteptata in aplicatie. Echipa tehnica a fost notificata. Va rugam sa incercati din nou sau sa reveniti mai tarziu."
      icon={ServerCrash}
      iconClassName="text-destructive"
      primaryAction={{
        label: "Inapoi la Dashboard",
        href: "/dashboard",
      }}
      secondaryAction={{
        label: "Pagina principala",
        href: "/",
      }}
    />
  );
}
