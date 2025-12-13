"use client";

import { PCBuilderProvider, usePCBuilder } from "@/context/PCBuilderContext";
import { CategorySelector } from "@/components/pc-builder/CategoryList";
import { PartSelectionGrid } from "@/components/pc-builder/PartSelectionGrid";
import { BuildSummary } from "@/components/pc-builder/BuildSummary";
import { MobileSummaryDrawer } from "@/components/pc-builder/MobileSummaryDrawer";
import { MobileStepIndicator } from "@/components/pc-builder/MobileStepIndicator"; // NEW
import { MobileWorkflowControls } from "@/components/pc-builder/MobileWorkflowControls"; // NEW
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { createClient } from "@/lib/supabase/client";

export default function PCBuilderPage() {
    return (
        <PCBuilderProvider>
            <Suspense fallback={
                <div className="min-h-screen bg-background pt-24 flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            }>
                <BuilderContent />
            </Suspense>
        </PCBuilderProvider>
    );
}

function BuilderContent() {
    const { setParts } = usePCBuilder();
    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");
    const [isLoadingBuild, setIsLoadingBuild] = useState(false);
    const [isSummaryOpen, setIsSummaryOpen] = useState(false);

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
        <div className="min-h-screen bg-background pt-16 pb-32 lg:pb-8">
            {/* Header - Stacks below Global Navbar (h-16) */}
            <header className="border-b bg-card hidden lg:block sticky top-16 z-30 shadow-sm">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 hover:bg-secondary rounded-full transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-xl font-bold tracking-tight">Custom PC Builder</h1>
                    </div>

                    <div className="text-sm text-muted-foreground">
                        Build your dream machine. One part at a time.
                    </div>
                </div>
            </header>

            {/* Mobile Header (Step Indicator) */}
            <MobileStepIndicator />

            <main className="container mx-auto px-4 lg:py-8 pt-4 pb-2">
                <div className="grid lg:grid-cols-12 gap-6 items-start">

                    {/* Left Sidebar: Categories (Desktop) */}
                    <div className="hidden lg:block lg:col-span-2 lg:sticky lg:top-36 h-fit">
                        <h2 className="text-xs font-bold text-muted-foreground mb-4 uppercase tracking-wider px-2">Components</h2>
                        <CategorySelector />
                    </div>

                    {/* NOTE: We HID the Mobile CategorySelector here to enforce the guided flow. */}
                    {/* If users want to jump, they can do so via Back/Next or we can add a 'Jump' menu later. */}

                    {/* Middle Column: Parts */}
                    <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                        {/* Desktop-only Header for Component Selection */}
                        <div className="hidden lg:block bg-card/30 border rounded-xl p-6 mb-6">
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

            {/* Mobile Summary Drawer Component */}
            <MobileSummaryDrawer isOpen={isSummaryOpen} onClose={() => setIsSummaryOpen(false)} />

            {/* Mobile Footer Controls */}
            <MobileWorkflowControls onOpenSummary={() => setIsSummaryOpen(true)} />
        </div>
    );
}
