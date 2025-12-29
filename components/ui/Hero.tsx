"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "./Button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Cpu, Zap, Battery, ChevronLeft, ChevronRight, Star, Shield, Laptop as LaptopIcon, Tablet, Monitor, Mouse, Keyboard } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import { Laptop } from "@/lib/types";

const iconMap: Record<string, any> = {
    Cpu, Zap, Battery, Star, Shield, Laptop: LaptopIcon, Tablet, Monitor, Mouse, Keyboard
};

interface HeroProps {
    sliders: Laptop[];
}

export function Hero({ sliders = [] }: HeroProps) {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);
    const { addItem } = useCart();
    const router = useRouter();
    const [isPaused, setIsPaused] = useState(false);

    const handleShopNow = () => {
        const currentSlide = sliders[current];
        addItem(currentSlide);
    };

    const handleViewSpecs = () => {
        router.push("/products");
    };

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % sliders.length);
    }, [sliders.length]);

    const prevSlide = () => {
        setDirection(-1);
        setCurrent((prev) => (prev - 1 + sliders.length) % sliders.length);
    };

    const goToSlide = (index: number) => {
        setDirection(index > current ? 1 : -1);
        setCurrent(index);
    };

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(nextSlide, 6000);
        return () => clearInterval(timer);
    }, [nextSlide, isPaused]);

    if (!sliders || sliders.length === 0) return null;

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    const currentSlide = sliders[current];

    // Map Laptop fields to Hero display fields
    const display = {
        title: currentSlide.hero_title || currentSlide.name,
        highlight: currentSlide.hero_subtitle || currentSlide.brand,
        description: currentSlide.description,
        tag: "New Arrival",
        accent: "bg-primary",
        image: currentSlide.hero_image_url || currentSlide.image,
        specs: currentSlide.hero_highlight_specs || [
            { icon: "Cpu", label: "CPU", value: currentSlide.specs.cpu },
            { icon: "Zap", label: "RAM", value: currentSlide.specs.ram },
            { icon: "Monitor", label: "Screen", value: currentSlide.specs.screen },
        ]
    };

    return (
        <section
            className="relative h-[100dvh] flex flex-col pt-20 lg:pt-24 overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Background Ambient Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none transition-colors duration-1000">
                <div className={`absolute -top-[20%] -right-[10%] w-[50vh] h-[50vh] lg:w-[600px] lg:h-[600px] rounded-full blur-[100px] opacity-20 transition-colors duration-1000 ${display.accent.replace('bg-', 'bg-')}`} />
                <div className={`absolute top-[40%] -left-[10%] w-[40vh] h-[40vh] lg:w-[500px] lg:h-[500px] rounded-full blur-[100px] opacity-10 transition-colors duration-1000 ${display.accent.replace('bg-', 'bg-')}`} />
            </div>

            <div className="container mx-auto px-4 relative z-10 flex flex-col h-full">
                {/* Main Content Area - Flex Grow to take available space */}
                <div className="flex-grow grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-0">

                    {/* Left Column: Text Content */}
                    <div className="relative flex flex-col justify-center h-full order-2 lg:order-1 pt-4 lg:pt-0">
                        <AnimatePresence initial={false} mode="wait" custom={direction}>
                            <motion.div
                                key={current}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                className="relative w-full"
                            >
                                <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border/50 text-xs font-medium text-muted-foreground mx-auto lg:mx-0">
                                        <span className="relative flex h-2 w-2">
                                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${display.accent}`}></span>
                                            <span className={`relative inline-flex rounded-full h-2 w-2 ${display.accent}`}></span>
                                        </span>
                                        {display.tag}
                                    </div>

                                    <h1 className="font-bold tracking-tight leading-none">
                                        <span className="block text-[clamp(2rem,4vw,3.5rem)] mb-2">{display.title}</span>
                                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-gray-500 text-[clamp(1.25rem,2.5vw,2.5rem)] pb-2">
                                            {display.highlight}
                                        </span>
                                    </h1>

                                    <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed line-clamp-3">
                                        {display.description}
                                    </p>

                                    {/* Mobile Image (Visible < lg) */}
                                    <div className="relative w-full h-[25vh] max-h-[300px] lg:hidden my-4 block">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Image
                                                src={display.image}
                                                alt={display.title}
                                                fill
                                                className="object-contain"
                                                priority={current === 0}
                                                sizes="(max-width: 1024px) 80vw, 400px"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center gap-4 justify-center lg:justify-start">
                                        <Button
                                            size="lg"
                                            className="h-10 sm:h-12 px-6 sm:px-8 text-sm sm:text-base group w-full sm:w-auto"
                                            onClick={handleShopNow}
                                        >
                                            {currentSlide.hero_cta_primary || "Shop Now"}
                                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="h-10 sm:h-12 px-6 sm:px-8 text-sm sm:text-base w-full sm:w-auto"
                                            onClick={handleViewSpecs}
                                        >
                                            {currentSlide.hero_cta_secondary || "View Specs"}
                                        </Button>
                                    </div>

                                    {/* Specs Grid */}
                                    <div className="grid grid-cols-3 gap-4 lg:gap-8 pt-4 lg:pt-8 border-t border-border/50">
                                        {display.specs?.map((spec, idx) => {
                                            const Icon = iconMap[spec.icon] || Star;
                                            return (
                                                <div key={idx} className="space-y-1 lg:space-y-2">
                                                    <Icon className={`w-5 h-5 lg:w-6 lg:h-6 mx-auto lg:mx-0 ${display.accent.replace('bg-', 'text-')}`} />
                                                    <h4 className="font-semibold text-sm lg:text-base truncate">{spec.value}</h4>
                                                    <p className="text-xs text-muted-foreground truncate">{spec.label}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Column: Desktop Image Area (Hidden < lg) */}
                    <div className="relative h-full hidden lg:flex items-center justify-center order-1 lg:order-2">
                        <AnimatePresence initial={false} mode="wait" custom={direction}>
                            <motion.div
                                key={current}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                className="absolute w-full h-[60vh] max-h-[600px] flex items-center justify-center"
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={display.image}
                                        alt={display.title}
                                        fill
                                        className="object-contain"
                                        priority={current === 0}
                                        sizes="(min-width: 1024px) 50vw, 800px"
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Navigation Controls - Always at bottom, relative height */}
                <div className="w-full flex items-center justify-center gap-4 py-4 lg:py-8 z-20 shrink-0">
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full w-8 h-8 lg:w-10 lg:h-10 bg-background/50 backdrop-blur-sm hover:bg-background"
                        onClick={prevSlide}
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>

                    <div className="flex gap-2">
                        {sliders.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => goToSlide(idx)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${current === idx
                                    ? `w-6 lg:w-8 ${display.accent}`
                                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                                    }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full w-8 h-8 lg:w-10 lg:h-10 bg-background/50 backdrop-blur-sm hover:bg-background"
                        onClick={nextSlide}
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
