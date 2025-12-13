"use client";

import { usePCBuilder } from "@/context/PCBuilderContext";
import { CATEGORIES } from "@/lib/pc-parts";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileWorkflowControlsProps {
    onOpenSummary: () => void;
}

export function MobileWorkflowControls({ onOpenSummary }: MobileWorkflowControlsProps) {
    const { activeCategory, setActiveCategory, totalPrice, selectedParts } = usePCBuilder();

    const currentIndex = CATEGORIES.findIndex(c => c.id === activeCategory);
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === CATEGORIES.length - 1;

    const handleNext = () => {
        if (!isLast) {
            setActiveCategory(CATEGORIES[currentIndex + 1].id);
        } else {
            onOpenSummary();
        }
    };

    const handlePrev = () => {
        if (!isFirst) {
            setActiveCategory(CATEGORIES[currentIndex - 1].id);
        }
    };

    const isCurrentSelected = !!selectedParts[activeCategory];

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-xl border-t z-40 pb-safe">
            <div className="flex items-center gap-3">
                {/* Back Button */}
                <button
                    onClick={handlePrev}
                    disabled={isFirst}
                    className={cn(
                        "p-3 rounded-full border bg-card transition-colors",
                        isFirst ? "opacity-30 cursor-not-allowed" : "hover:bg-accent active:bg-accent/80"
                    )}
                >
                    <ChevronLeft size={20} />
                </button>

                {/* Price Display */}
                <div onClick={onOpenSummary} className="flex-1 flex flex-col items-center cursor-pointer active:scale-95 transition-transform">
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Total Build</span>
                    <span className="font-bold text-lg text-primary">₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>

                {/* Next / Review Button */}
                <button
                    onClick={handleNext}
                    className={cn(
                        "px-6 py-3 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2 transition-all active:scale-95",
                        isLast
                            ? "bg-green-600 text-white shadow-green-500/20"
                            : "bg-primary text-primary-foreground shadow-primary/20"
                    )}
                >
                    {isLast ? (
                        <>Review <ShoppingBag size={16} /></>
                    ) : (
                        <>Next <ChevronRight size={16} /></>
                    )}
                </button>
            </div>
        </div>
    );
}
