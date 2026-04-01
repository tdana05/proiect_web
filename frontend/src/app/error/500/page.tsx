import { ServerCrash } from "lucide-react";
import { ErrorPage } from "../../../components/errorPage";

export default function InternalServerError500Page() {
    return (
        <ErrorPage
            code="500"
            title="Eroare interna a serverului"
            description="A aparut o eroare neasteptata in aplicatie."
            icon={ServerCrash}
            iconClassName="text-destructive"
        />
    );
}