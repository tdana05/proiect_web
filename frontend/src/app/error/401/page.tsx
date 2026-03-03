import { LockKeyhole } from "lucide-react";
import { ErrorPage } from "../../../components/errorPage";

export default function Unauthorized401Page() {
    return (
        <ErrorPage
            code="401"
            title="Neautorizat"
            description="Nu sunteti autentificat..."
            icon={LockKeyhole}
            iconClassName="text-destructive"
        />
    );
}