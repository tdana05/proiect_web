import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export function useAuthRedirect(redirectTo: string = "/") {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace(redirectTo);
        }
    }, [user, isLoading, router, redirectTo]);

    return { user, isLoading };
}