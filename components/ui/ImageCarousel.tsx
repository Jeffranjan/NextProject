"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
    images: string[];
    alt: string;
}

export function ImageCarousel({ images, alt }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Filter out invalid images
    const validImages = images.filter((img) => img && img.length > 0);
    const hasMultiple = validImages.length > 1;

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % validImages.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
    };

    if (validImages.length === 0) {
        return (
            <div className="relative h-64 md:h-auto bg-secondary/30 min-h-[300px] flex items-center justify-center text-muted-foreground">
                No Image Available
            </div>
        );
    }

    return (
        <div className="relative h-64 md:h-full bg-secondary/30 min-h-[300px] group overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={validImages[currentIndex]}
                        alt={`${alt} - Image ${currentIndex + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={currentIndex === 0}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {hasMultiple && (
                <>
                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 focus:outline-none"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 focus:outline-none"
                    >
                        <ChevronRight size={20} />
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            {hasMultiple && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {validImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={cn(
                                "w-2 h-2 rounded-full transition-all shadow-sm",
                                index === currentIndex ? "bg-white w-4" : "bg-white/50 hover:bg-white/80"
                            )}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
