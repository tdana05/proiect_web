"use client";

import { LockKeyhole } from "lucide-react";
import { ErrorPage } from "@/components/error-page";

export default function Unauthorized401Page() {
  return (
    <ErrorPage
      code="401"
      title="Neautorizat"
      description="Nu sunteti autentificat. Pentru a accesa aceasta pagina, trebuie sa va conectati cu contul dumneavoastra AMiCUS."
      icon={LockKeyhole}
      iconClassName="text-destructive"
      primaryAction={{
        label: "Conectare",
        href: "/",
      }}
    />
  );
}
