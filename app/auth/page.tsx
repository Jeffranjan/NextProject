"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

function AuthForm() {
    const [view, setView] = useState<"login" | "signup" | "forgot_password">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const supabase = createClient();

    useEffect(() => {
        const errorParam = searchParams.get("error");
        if (errorParam) {
            setError(decodeURIComponent(errorParam));
        }
    }, [searchParams]);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            if (view === "forgot_password") {
                const { error } = await supabase.auth.resetPasswordForEmail(email, {
                    redirectTo: `${location.origin}/auth/callback?next=/auth/update-password`,
                });
                if (error) throw error;
                setMessage("Check your email for the password reset link.");
            } else if (view === "login") {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;

                const next = searchParams.get("next") || "/dashboard";
                router.push(next);
                router.refresh();
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;

                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                    const next = searchParams.get("next") || "/dashboard";
                    router.push(next);
                    router.refresh();
                } else {
                    setMessage("Please check your email for the confirmation link.");
                }
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-card border border-border rounded-xl p-8 shadow-lg"
            >
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold mb-2">
                        {view === "login" && "Welcome Back"}
                        {view === "signup" && "Create Account"}
                        {view === "forgot_password" && "Reset Password"}
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        {view === "login" && "Enter your credentials to access your account"}
                        {view === "signup" && "Sign up to get started with Mahadev Computers"}
                        {view === "forgot_password" && "Enter your email to receive a reset link"}
                    </p>
                </div>

                {view !== "forgot_password" && (
                    <div className="flex gap-2 p-1 bg-muted rounded-lg mb-8">
                        <button
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${view === "login"
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                            onClick={() => setView("login")}
                            type="button"
                        >
                            Sign In
                        </button>
                        <button
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${view === "signup"
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                            onClick={() => setView("signup")}
                            type="button"
                        >
                            Sign Up
                        </button>
                    </div>
                )}

                <form onSubmit={handleAuth} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium mb-1 block">Email</label>
                        <Input
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {view !== "forgot_password" && (
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className="text-sm font-medium block">Password</label>
                                {view === "login" && (
                                    <button
                                        type="button"
                                        onClick={() => setView("forgot_password")}
                                        className="text-xs text-primary hover:underline text-blue-500"
                                    >
                                        Forgot Password?
                                    </button>
                                )}
                            </div>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                        </div>
                    )}

                    {error && (
                        <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-md border border-red-500/20">
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="p-3 text-sm text-green-500 bg-green-500/10 rounded-md border border-green-500/20">
                            {message}
                        </div>
                    )}

                    <Button className="w-full" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            <>
                                {view === "login" && "Sign In"}
                                {view === "signup" && "Sign Up"}
                                {view === "forgot_password" && "Send Reset Link"}
                            </>
                        )}
                    </Button>

                    {view === "forgot_password" && (
                        <button
                            type="button"
                            onClick={() => setView("login")}
                            className="w-full text-sm text-muted-foreground hover:text-foreground mt-4"
                        >
                            Back to Sign In
                        </button>
                    )}
                </form>
            </motion.div>
        </div>
    );
}

export default function AuthPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthForm />
        </Suspense>
    );
}
