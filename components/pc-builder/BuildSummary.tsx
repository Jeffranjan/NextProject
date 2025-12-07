"use client";

import { usePCBuilder } from "@/context/PCBuilderContext";
import { CATEGORIES } from "@/lib/pc-parts";
import { ShoppingCart, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";

import { useCart } from "@/app/context/CartContext";
import { Laptop } from "@/lib/types";

export function BuildSummary() {
    const { selectedParts, removePart, totalPrice } = usePCBuilder();
    const { addItem } = useCart();

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
            image: selectedParts['case']?.image || "/images/parts/case-1.png", // Fallback or use specific case image
            specs: {
                cpu: selectedParts['cpu']?.title || "N/A",
                ram: selectedParts['ram']?.title || "N/A",
                storage: selectedParts['storage']?.title || "N/A",
                screen: "Custom Configuration"
            }
        };

        addItem(customBuild);
    };

    return (
        <div className="bg-card border rounded-xl p-6 shadow-sm sticky top-24">
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
                                {/* Ideally use part.image here */}
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

                <Button variant="outline" className="w-full" disabled={selectedCount === 0}>
                    <Save size={18} className="mr-2" /> Save Build
                </Button>
            </div>
        </div>
    );
}
