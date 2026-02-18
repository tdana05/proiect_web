"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Heart, AlertCircle, Eye, EyeOff } from "lucide-react";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email.trim()) {
            setError("Introduceti adresa de email.");
            return;
        }
        if (!password.trim()) {
            setError("Introduceti parola.");
            return;
        }

        setIsLoading(true);
        // Simulate network delay
        setTimeout(() => {
            const user = login(email, password);
            if (user) {
                router.push("/dashboard");
            } else {
                setError("Email sau parola incorecta. Incercati din nou.");
            }
            setIsLoading(false);
        }, 600);
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="mb-8 flex flex-col items-center gap-3">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-primary">
                        <Heart className="size-7 text-primary-foreground" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                            AMiCUS
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Organizatia de Tineret
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Chisinau, Republica Moldova
                        </p>
                    </div>
                </div>

                <Card className="border-border/50 shadow-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="text-lg">Autentificare</CardTitle>
                        <CardDescription>
                            Conectati-va la platforma de gestionare a voluntarilor
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            {error && (
                                <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3">
                                    <AlertCircle className="size-4 shrink-0 text-destructive" />
                                    <p className="text-sm text-destructive">{error}</p>
                                </div>
                            )}

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="exemplu@amicus.md"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="password">Parola</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Introduceti parola"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="current-password"
                                        className="pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        aria-label={showPassword ? "Ascunde parola" : "Arata parola"}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="size-4" />
                                        ) : (
                                            <Eye className="size-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <Button type="submit" className="mt-2 w-full" disabled={isLoading}>
                                {isLoading ? "Se conecteaza..." : "Conectare"}
                            </Button>
                        </form>

                        {/* Demo credentials */}
                        <div className="mt-6 rounded-lg border border-border/50 bg-muted/50 p-4">
                            <p className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Conturi demo
                            </p>
                            <div className="flex flex-col gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEmail("admin@amicus.md");
                                        setPassword("admin123");
                                        setError("");
                                    }}
                                    className="flex flex-col gap-0.5 rounded-md border border-border/50 bg-card p-3 text-left transition-colors hover:bg-accent/10"
                                >
                                    <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                      ADMIN
                    </span>
                                        <span className="text-xs font-medium text-foreground">
                      admin@amicus.md
                    </span>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground font-mono">
                    parola: admin123
                  </span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEmail("maria@amicus.md");
                                        setPassword("user123");
                                        setError("");
                                    }}
                                    className="flex flex-col gap-0.5 rounded-md border border-border/50 bg-card p-3 text-left transition-colors hover:bg-accent/10"
                                >
                                    <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-md bg-accent/20 px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">
                      VOLUNTAR
                    </span>
                                        <span className="text-xs font-medium text-foreground">
                      maria@amicus.md
                    </span>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground font-mono">
                    parola: user123
                  </span>
                                </button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <p className="mt-6 text-center text-xs text-muted-foreground">
                    AMiCUS - Platforma de Gestionare a Voluntarilor v1.0
                </p>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <AuthProvider>
            <LoginForm />
        </AuthProvider>
    );
}
