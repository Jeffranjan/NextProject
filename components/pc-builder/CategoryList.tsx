"use client";

import { CATEGORIES } from "@/lib/pc-parts";
import { usePCBuilder } from "@/context/PCBuilderContext";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

export function CategorySelector() {
    const { activeCategory, setActiveCategory, selectedParts } = usePCBuilder();

    return (
        <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide">
            {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected = !!selectedParts[cat.id];
                const isActive = activeCategory === cat.id;

                return (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg border transition-all text-sm font-medium relative whitespace-nowrap md:whitespace-normal",
                            isActive
                                ? "bg-primary text-primary-foreground border-primary shadow-md"
                                : "bg-background hover:bg-secondary border-transparent hover:border-border text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <div className={cn(
                            "p-2 rounded-md transition-colors",
                            isActive ? "bg-primary-foreground/10 text-primary-foreground" : "bg-secondary text-foreground group-hover:bg-background"
                        )}>
                            <Icon size={16} />
                        </div>

                        <div className="flex flex-col items-start min-w-0 flex-1">
                            <span className="font-medium">{cat.name}</span>
                            {isSelected && (
                                <span className={cn(
                                    "text-[10px] truncate w-full block opacity-80",
                                    isActive ? "text-primary-foreground/90" : "text-green-600"
                                )}>
                                    {selectedParts[cat.id]?.title}
                                </span>
                            )}
                        </div>

                        {isSelected && (
                            <div className={cn(
                                "flex-shrink-0 ml-2",
                                isActive ? "text-primary-foreground" : "text-green-500"
                            )}>
                                <CheckCircle2 size={16} />
                            </div>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
