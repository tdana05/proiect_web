"use client";

import { FileQuestion } from "lucide-react";
import { ErrorPage } from "@/components/error-page";

export default function NotFoundPage() {
  return (
    <ErrorPage
      code="404"
      title="Pagina nu a fost gasita"
      description="Pagina pe care o cautati nu exista sau a fost mutata. Verificati adresa URL sau navigati inapoi la pagina principala."
      icon={FileQuestion}
      iconClassName="text-muted-foreground"
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
