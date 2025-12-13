"use client";

import { useState, useEffect, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AdminProductList } from "@/components/admin/AdminProductList";
import { AdminPCPartsList } from "@/components/admin/AdminPCPartsList";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { UserPurchaseHistory } from "@/components/dashboard/UserPurchaseHistory";
import { UserSavedBuilds } from "@/components/dashboard/UserSavedBuilds";
import { LayoutDashboard, Laptop, Cpu, LogOut, History, Save } from "lucide-react";

type Tab = "overview" | "products" | "parts" | "history" | "builds";

function DashboardContent() {
    const { user, signOut, isLoading } = useAuth();
    const router = useRouter();
    const isAdmin = user?.email?.toLowerCase() === "ranjanguptajeff@gmail.com";
    // const isAdmin = false; // TEMPORARY FOR VERIFICATION
    const [activeTab, setActiveTab] = useState<Tab>(isAdmin ? "overview" : "history");

    const searchParams = useSearchParams();
    const activeTabParam = searchParams.get("tab");

    useEffect(() => {
        if (activeTabParam && ["overview", "products", "parts", "history", "builds"].includes(activeTabParam)) {
            setActiveTab(activeTabParam as Tab);
        }
    }, [activeTabParam]);

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

    if (!user) return null;

    const adminTabs = [
        { id: "overview", label: "Overview", icon: LayoutDashboard },
        { id: "products", label: "Laptops", icon: Laptop },
        { id: "parts", label: "PC Components", icon: Cpu },
    ];

    const userTabs = [
        { id: "history", label: "Purchase History", icon: History },
        { id: "builds", label: "Saved Builds", icon: Save },
    ];

    const tabs = isAdmin ? adminTabs : userTabs;

    return (
        <div className="min-h-screen pt-24 px-4 container mx-auto pb-12">

            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{isAdmin ? "Admin Dashboard" : "Dashboard"}</h1>
                    <p className="text-muted-foreground mt-1">
                        {isAdmin ? "Manage your store, products, and inventory." : "Check Your Purchases and Builds"}
                    </p>
                </div>

                <div className="flex items-center gap-4 bg-muted/50 p-2 rounded-xl border border-border">
                    <div className="flex flex-col items-end px-2">
                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Logged in as</span>
                        <span className="text-sm font-semibold">{user.email}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={signOut} className="text-muted-foreground hover:text-destructive">
                        <LogOut size={20} />
                    </Button>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-1">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as Tab)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2.5 rounded-t-lg transition-all relative font-medium text-sm md:text-base",
                                isActive
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            )}
                        >
                            <Icon size={18} />
                            {tab.label}
                            {isActive && (
                                <motion.div
                                    layoutId="activeTabBorder"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === "overview" && (
                        <div className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
                                    <h3 className="font-semibold mb-2 text-muted-foreground uppercase text-xs">Account Status</h3>
                                    <p className="text-2xl font-bold text-green-500">Active</p>
                                </div>
                                <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
                                    <h3 className="font-semibold mb-2 text-muted-foreground uppercase text-xs">User ID</h3>
                                    <p className="text-sm font-mono truncate bg-secondary/50 p-2 rounded">{user.id}</p>
                                </div>
                                <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
                                    <h3 className="font-semibold mb-2 text-muted-foreground uppercase text-xs">Last Sign In</h3>
                                    <p className="text-2xl font-bold">
                                        {new Date(user.last_sign_in_at || "").toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "products" && isAdmin && (
                        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                            <AdminProductList />
                        </div>
                    )}

                    {activeTab === "parts" && isAdmin && (
                        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                            <AdminPCPartsList />
                        </div>
                    )}

                    {activeTab === "history" && !isAdmin && (
                        <UserPurchaseHistory />
                    )}

                    {activeTab === "builds" && !isAdmin && (
                        <UserSavedBuilds />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        }>
            <DashboardContent />
        </Suspense>
    );
}
