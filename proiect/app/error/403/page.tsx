"use client";

import { ShieldAlert } from "lucide-react";
import { ErrorPage } from "@/components/error-page";

export default function Forbidden403Page() {
  return (
    <ErrorPage
      code="403"
      title="Acces interzis"
      description="Nu aveti permisiunea de a accesa aceasta resursa. Contul dumneavoastra nu dispune de rolul sau drepturile necesare. Contactati administratorul organizatiei daca considerati ca este o eroare."
      icon={ShieldAlert}
      iconClassName="text-warning"
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
