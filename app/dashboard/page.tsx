"use client";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
    const { user, signOut, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/auth");
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect via useEffect
    }

    return (
        <div className="min-h-screen pt-24 px-4 container mx-auto">
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
                        <p className="text-muted-foreground">
                            Welcome back, {user.email}
                        </p>
                    </div>
                    <Button variant="outline" onClick={signOut}>
                        Sign Out
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="p-6 bg-muted/50 rounded-lg border border-border">
                        <h3 className="font-semibold mb-2">Account Status</h3>
                        <p className="text-sm text-muted-foreground">Active</p>
                    </div>
                    <div className="p-6 bg-muted/50 rounded-lg border border-border">
                        <h3 className="font-semibold mb-2">User ID</h3>
                        <p className="text-sm text-muted-foreground font-mono truncate">
                            {user.id}
                        </p>
                    </div>
                    <div className="p-6 bg-muted/50 rounded-lg border border-border">
                        <h3 className="font-semibold mb-2">Last Sign In</h3>
                        <p className="text-sm text-muted-foreground">
                            {new Date(user.last_sign_in_at || "").toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
