"use client";

import { PCBuilderProvider, usePCBuilder } from "@/context/PCBuilderContext";
import { CategorySelector } from "@/components/pc-builder/CategoryList";
import { PartSelectionGrid } from "@/components/pc-builder/PartSelectionGrid";
import { BuildSummary } from "@/components/pc-builder/BuildSummary";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function PCBuilderPage() {
    return (
        <PCBuilderProvider>
            <BuilderContent />
        </PCBuilderProvider>
    );
}

function BuilderContent() {
    const { setParts, totalPrice } = usePCBuilder();
    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");
    const [isLoadingBuild, setIsLoadingBuild] = useState(false);

    useEffect(() => {
        if (!editId) return;

        async function fetchSavedBuild() {
            setIsLoadingBuild(true);
            try {
                const supabase = createClient();
                const { data, error } = await supabase
                    .from("saved_builds")
                    .select("components")
                    .eq("id", editId)
                    .single();

                if (error) throw error;
                if (data?.components) {
                    setParts(data.components);
                    console.log("Build hydrated:", data.components);
                }
            } catch (error) {
                console.error("Error fetching saved build:", error);
                // Optionally show error toast
            } finally {
                setIsLoadingBuild(false);
            }
        }

        fetchSavedBuild();
    }, [editId, setParts]);

    if (isLoadingBuild) {
        return (
            <div className="min-h-screen bg-background pt-24 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-16">
            {/* Header - Stacks below Global Navbar (h-16) */}
            <header className="border-b bg-card sticky top-16 z-30 shadow-sm">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 hover:bg-secondary rounded-full transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-xl font-bold tracking-tight">Custom PC Builder</h1>
                    </div>

                    <div className="text-sm text-muted-foreground hidden sm:block">
                        Build your dream machine. One part at a time.
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-12 gap-6 items-start">

                    {/* Left Sidebar: Categories (Desktop) */}
                    <div className="hidden lg:block lg:col-span-2 lg:sticky lg:top-36 h-fit">
                        <h2 className="text-xs font-bold text-muted-foreground mb-4 uppercase tracking-wider px-2">Components</h2>
                        <CategorySelector />
                    </div>

                    {/* Top Bar: Categories (Mobile) */}
                    <div className="lg:hidden sticky top-32 z-20 bg-background/80 backdrop-blur-md pb-2 -mx-4 px-4 shadow-sm">
                        <CategorySelector />
                    </div>

                    {/* Middle Column: Parts */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-card/30 border rounded-xl p-6 mb-6">
                            <h2 className="text-2xl font-bold mb-2">Select Component</h2>
                            <p className="text-muted-foreground text-sm">Choose the best part for your needs.</p>
                        </div>
                        <PartSelectionGrid />
                    </div>

                    {/* Right Column: Build Summary */}
                    <div className="hidden lg:block lg:col-span-3 lg:sticky lg:top-36 h-fit">
                        <BuildSummary />
                    </div>
                </div>
            </main>

            {/* Mobile Sticky Footer Summary Trigger */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-card border-t z-40">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-xs text-muted-foreground block">Total Estimated Price</span>
                        <span className="font-bold text-lg">₹{totalPrice.toLocaleString("en-IN")}</span>
                    </div>
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium">
                        View Summary
                    </button>
                </div>
            </div>
        </div>
    );
}
