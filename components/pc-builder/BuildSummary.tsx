"use client";

import { usePCBuilder } from "@/context/PCBuilderContext";
import { CATEGORIES } from "@/lib/pc-parts";
import { ShoppingCart, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils"; // Added cn for class merging

import { useCart } from "@/app/context/CartContext";
import { Laptop } from "@/lib/types";

interface BuildSummaryProps {
    className?: string;
    onClose?: () => void; // Optional callback for when actions are taken (e.g. valid for drawer)
}

export function BuildSummary({ className, onClose }: BuildSummaryProps) {
    const { selectedParts, removePart, totalPrice } = usePCBuilder();
    const { addItem } = useCart();
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);

    const searchParams = useSearchParams(); // Get search params
    const editId = searchParams.get("edit"); // Get edit ID

    const handleSaveBuild = async () => {
        if (selectedCount === 0) return;
        setIsSaving(true);

        try {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                // Redirect to login if not authenticated
                // State is automatically saved to localStorage by PCBuilderContext
                const next = "/build-custom-pc";
                router.push(`/auth?next=${next}`);
                return;
            }

            let error;

            if (editId) {
                // UPDATE existing build
                const { error: updateError } = await supabase
                    .from("saved_builds")
                    .update({
                        name: `Custom PC - ${new Date().toLocaleDateString()}`,
                        total_cost: totalPrice,
                        components: selectedParts,
                        created_at: new Date().toISOString() // Update timestamp
                    })
                    .eq("id", editId)
                    .eq("user_id", user.id); // Security check

                error = updateError;
            } else {
                // INSERT new build
                const { error: insertError } = await supabase
                    .from("saved_builds")
                    .insert({
                        user_id: user.id,
                        name: `Custom PC - ${new Date().toLocaleDateString()}`,
                        total_cost: totalPrice,
                        components: selectedParts
                    });

                error = insertError;
            }

            if (error) throw error;

            alert(editId ? "Build updated successfully!" : "Build saved successfully!");
            if (onClose) onClose();
            if (onClose) onClose();
        } catch (error) {
            console.error("Error saving build:", error);
            alert("Failed to save build. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const selectedCount = Object.keys(selectedParts).length;
    const totalCategories = CATEGORIES.length;

    const handleAddToCart = () => {
        if (selectedCount === 0) return;

        // Construct a "Laptop" object that represents this custom build
        // We map the PC parts to the expected Laptop schema
        const customBuild: Laptop = {
            id: `custom-pc-${Date.now()}`,
            name: "Custom PC Build",
            brand: "Custom",
            price: totalPrice,
            description: "Custom configuration with selected components.",
            category: "Gaming",
            image: selectedParts['case']?.image || "/images/parts/case-1.png",
            specs: {
                cpu: selectedParts['cpu']?.title || "N/A",
                ram: selectedParts['ram']?.title || "N/A",
                storage: selectedParts['storage']?.title || "N/A",
                screen: "Custom Configuration"
            }
        };

        addItem(customBuild);
        if (onClose) onClose();
    };

    return (
        <div className={cn("bg-card border rounded-xl p-6 shadow-sm sticky top-24", className)}>
            <h3 className="text-xl font-bold mb-4">Your Build</h3>

            {/* Progress Bar */}
            <div className="w-full bg-secondary h-2 rounded-full mb-6 overflow-hidden">
                <div
                    className="bg-primary h-full transition-all duration-500"
                    style={{ width: `${(selectedCount / totalCategories) * 100}%` }}
                />
            </div>

            {/* Selected Parts List */}
            <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {selectedCount === 0 && (
                    <p className="text-muted-foreground text-sm text-center py-8">No parts selected yet.</p>
                )}

                {Object.entries(selectedParts).map(([category, part]) => {
                    const categoryName = CATEGORIES.find(c => c.id === category)?.name;
                    if (!part) return null;

                    return (
                        <div key={category} className="flex gap-3 group">
                            <div className="w-12 h-12 bg-zinc-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-zinc-100 overflow-hidden relative">

                                <div className="text-[10px] text-zinc-400 font-bold">IMG</div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <p className="text-xs text-muted-foreground">{categoryName}</p>
                                    <button
                                        onClick={() => removePart(category)}
                                        className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                                <p className="font-medium text-sm truncate" title={part.title}>{part.title}</p>
                                <p className="text-sm font-bold mt-1">₹{part.price.toLocaleString("en-IN")}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-end">
                    <span className="text-muted-foreground">Total</span>
                    <span className="text-3xl font-bold tracking-tight">₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>

                <Button
                    className="w-full"
                    size="lg"
                    disabled={selectedCount === 0}
                    onClick={handleAddToCart}
                >
                    <ShoppingCart size={18} className="mr-2" /> Add to Cart
                </Button>

                <Button
                    variant="outline"
                    className="w-full"
                    disabled={selectedCount === 0 || isSaving}
                    onClick={handleSaveBuild}
                >
                    {isSaving ? (
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2 inline-block"></span>
                    ) : (
                        <Save size={18} className="mr-2" />
                    )}
                    {isSaving ? "Saving..." : (editId ? "Update Build" : "Save Build")}
                </Button>
            </div>
        </div>
    );
}
