"use client";

import { usePCBuilder } from "@/context/PCBuilderContext";
import { PartCard } from "./PartCard";
import { motion } from "framer-motion";

export function PartSelectionGrid() {
    const { activeCategory, selectedParts, selectPart, availableParts, isLoading } = usePCBuilder();

    // Filter parts by active category
    const parts = availableParts.filter((part) => part.category === activeCategory);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-[300px] bg-secondary/50 animate-pulse rounded-2xl" />
                ))}
            </div>
        );
    }

    if (parts.length === 0) {
        return (
            <div className="text-center py-12 bg-secondary/20 rounded-xl border border-dashed">
                <p className="text-muted-foreground">No parts found for this category.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {parts.map((part) => (
                <motion.div
                    key={part.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <PartCard
                        part={part}
                        isSelected={selectedParts[activeCategory]?.id === part.id}
                        onSelect={() => selectPart(activeCategory, part)}
                    />
                </motion.div>
            ))}
        </div>
    );
}
