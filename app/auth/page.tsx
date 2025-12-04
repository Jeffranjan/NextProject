"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                router.push("/dashboard");
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${location.origin}/auth/callback`,
                    },
                });
                if (error) throw error;
                // For simple email/password sign up without email verification requirement immediately blocking
                // or if auto-confirm is on. If email confirmation is required, you might want to show a message.
                // Assuming default Supabase config which might require email confirmation or auto-confirms.
                // For this demo, we'll assume we can redirect or show a success message.
                // If session is created immediately (auto-confirm), redirect.
                // Otherwise show check email message.

                // Let's check if we have a session
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                    router.push("/dashboard");
                } else {
                    setError("Please check your email for the confirmation link.");
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
                        {isLogin ? "Welcome Back" : "Create Account"}
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        {isLogin
                            ? "Enter your credentials to access your account"
                            : "Sign up to get started with Mahadev Computers"}
                    </p>
                </div>

                <div className="flex gap-2 p-1 bg-muted rounded-lg mb-8">
                    <button
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${isLogin
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                        onClick={() => setIsLogin(true)}
                    >
                        Sign In
                    </button>
                    <button
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${!isLogin
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                        onClick={() => setIsLogin(false)}
                    >
                        Sign Up
                    </button>
                </div>

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
                    <div>
                        <label className="text-sm font-medium mb-1 block">Password</label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                    </div>

                    {error && (
                        <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-md border border-red-500/20">
                            {error}
                        </div>
                    )}

                    <Button className="w-full" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : isLogin ? (
                            "Sign In"
                        ) : (
                            "Sign Up"
                        )}
                    </Button>
                </form>
            </motion.div>
        </div>
    );
}
