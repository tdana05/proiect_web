import { ShieldAlert } from "lucide-react";
import { ErrorPage } from "../../../components/errorPage";

export default function Forbidden403Page() {
    return (
        <ErrorPage
            code="403"
            title="Acces interzis"
            description="Nu aveti permisiunea..."
            icon={ShieldAlert}
            iconClassName="text-warning"
        />
    );
}