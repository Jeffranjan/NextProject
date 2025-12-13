"use client";

import { CATEGORIES } from "@/lib/pc-parts";
import { usePCBuilder } from "@/context/PCBuilderContext";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import { useRef, useEffect } from "react";

export function CategorySelector() {
    const { activeCategory, setActiveCategory, selectedParts } = usePCBuilder();
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Scroll active category into view on mobile
    useEffect(() => {
        if (activeCategory && scrollContainerRef.current) {
            const activeBtn = scrollContainerRef.current.querySelector<HTMLElement>(`button[data-id="${activeCategory}"]`);
            if (activeBtn) {
                activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, [activeCategory]);

    return (
        <div
            ref={scrollContainerRef}
            className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-1 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 snap-x"
        >
            {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected = !!selectedParts[cat.id];
                const isActive = activeCategory === cat.id;

                return (
                    <button
                        key={cat.id}
                        data-id={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={cn(
                            "flex items-center gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3 rounded-lg border transition-all text-sm font-medium relative whitespace-nowrap md:whitespace-normal snap-start flex-shrink-0 md:flex-shrink",
                            isActive
                                ? "bg-primary text-primary-foreground border-primary shadow-md"
                                : "bg-background hover:bg-secondary border-transparent hover:border-border text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <span className={cn(
                            "p-1.5 md:p-2 rounded-md transition-colors flex items-center justify-center",
                            isActive ? "bg-primary-foreground/10 text-primary-foreground" : "bg-secondary text-foreground group-hover:bg-background"
                        )}>
                            <Icon size={14} className="md:w-4 md:h-4" />
                        </span>

                        <span className="flex flex-col items-start min-w-0 flex-1 text-left">
                            <span className="font-medium text-xs md:text-sm">{cat.name}</span>
                            {isSelected && (
                                <span className={cn(
                                    "text-[9px] md:text-[10px] truncate w-full block opacity-80 max-w-[100px] md:max-w-none",
                                    isActive ? "text-primary-foreground/90" : "text-green-600"
                                )}>
                                    {selectedParts[cat.id]?.title}
                                </span>
                            )}
                        </span>

                        {isSelected && (
                            <span className={cn(
                                "flex-shrink-0 ml-1 md:ml-2",
                                isActive ? "text-primary-foreground" : "text-green-500"
                            )}>
                                <CheckCircle2 size={14} className="md:w-4 md:h-4" />
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
