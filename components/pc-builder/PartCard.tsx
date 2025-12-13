"use client";

import { Part } from "@/lib/pc-parts";
import { cn } from "@/lib/utils";
import { Check, Plus } from "lucide-react";
import Image from "next/image";

interface PartCardProps {
    part: Part;
    isSelected: boolean;
    onSelect: () => void;
}

export function PartCard({ part, isSelected, onSelect }: PartCardProps) {
    return (
        <div
            onClick={onSelect}
            className={cn(
                "group relative bg-card border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col",
                isSelected ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background" : "border-border hover:border-primary/50"
            )}
        >
            {/* Selection Badge */}
            <div className={cn(
                "absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all bg-primary text-primary-foreground shadow-sm",
                isSelected ? "opacity-100 scale-100" : "opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
            )}>
                {isSelected ? <Check size={12} className="sm:w-[14px] sm:h-[14px]" /> : <Plus size={12} className="sm:w-[14px] sm:h-[14px]" />}
            </div>

            <div className="aspect-[4/3] sm:aspect-[4/3] bg-gradient-to-br from-zinc-50 to-zinc-100 p-4 sm:p-6 relative flex items-center justify-center overflow-hidden flex-shrink-0">
                {part.image ? (
                    <Image
                        src={part.image}
                        alt={part.title}
                        fill
                        className="object-contain p-2 sm:p-4 transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-white shadow-inner flex items-center justify-center text-zinc-300 font-bold text-sm sm:text-lg border border-zinc-100 relative z-10">
                        IMG
                    </div>
                )}

                {/* Background Glow */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
            </div>

            <div className="p-3 sm:p-5 flex flex-col flex-1">
                <div className="mb-2 sm:mb-3">
                    <span className="text-[10px] font-bold tracking-wider text-primary/60 uppercase bg-primary/5 px-2 py-0.5 sm:py-1 rounded-full">{part.branch}</span>
                </div>

                <h3 className="font-semibold text-xs sm:text-sm line-clamp-2 min-h-[32px] sm:min-h-[40px] mb-2 group-hover:text-primary transition-colors">{part.title}</h3>

                <div className="mt-auto">
                    <div className="flex items-end justify-between">
                        <div>
                            <span className="text-sm sm:text-lg font-bold">₹{part.price.toLocaleString("en-IN")}</span>
                        </div>
                    </div>

                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-dashed border-border grid grid-cols-2 gap-y-1 gap-x-2">
                        {Object.entries(part.specs).slice(0, 4).map(([key, value]) => (
                            <div key={key} className="flex flex-col">
                                <span className="text-[9px] sm:text-[10px] text-muted-foreground capitalize">{key.replace('_', ' ')}</span>
                                <span className="text-[10px] sm:text-xs font-medium truncate">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
