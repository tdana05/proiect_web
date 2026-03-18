"use client";

import { useRouter } from "next/navigation";
import { FileQuestion } from "lucide-react";
import { ErrorPage } from "@/components/ui/error-page";

export default function NotFoundPage() {
    const router = useRouter();

    return (
        <ErrorPage
            code="404"
            title="Pagina nu a fost gasita"
            description="Pagina pe care o cautati nu exista sau a fost mutata. Verificati adresa URL sau navigati inapoi la pagina principala."
            icon={FileQuestion}
            iconClassName="text-muted-foreground"
            primaryAction={{
                label: "Inapoi la Dashboard",
                onClick: () => router.push("/dashboard"),
            }}
            secondaryAction={{
                label: "Pagina principala",
                onClick: () => router.push("/"),
            }}
        />
    );
}