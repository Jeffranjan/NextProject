"use client";

import { usePCBuilder } from "@/context/PCBuilderContext";
import { CATEGORIES } from "@/lib/pc-parts";
import { motion } from "framer-motion";

export function MobileStepIndicator() {
    const { activeCategory } = usePCBuilder();

    const currentIndex = CATEGORIES.findIndex(c => c.id === activeCategory);
    const totalSteps = CATEGORIES.length;
    const progress = ((currentIndex + 1) / totalSteps) * 100;
    const currentCat = CATEGORIES[currentIndex];

    if (!currentCat) return null;

    const Icon = currentCat.icon;

    return (
        <div className="lg:hidden bg-background border-b sticky top-14 z-20 pb-0">
            {/* Progress Bar */}
            <div className="h-1 w-full bg-secondary">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="h-full bg-primary origin-left"
                />
            </div>

            <div className="px-4 py-3 flex items-center justify-between">
                <div>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                        Step {currentIndex + 1} of {totalSteps}
                    </span>
                    <h2 className="text-lg font-bold flex items-center gap-2 mt-0.5">
                        <span className="p-1 rounded-md bg-primary/10 text-primary">
                            <Icon size={16} />
                        </span>
                        {currentCat.name}
                    </h2>
                </div>

                {/* Optional: Mini list of next up or simple text */}
                <div className="text-right hidden sm:block">
                    <span className="text-xs text-muted-foreground">
                        Next: {CATEGORIES[currentIndex + 1]?.name || "Review"}
                    </span>
                </div>
            </div>
        </div>
    );
}
