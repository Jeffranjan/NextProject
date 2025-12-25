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
        description: currentSlide.description, // Or allow hero specific description if added later
        tag: "New Arrival", // Default for now, or use category
        accent: "bg-primary", // Default accent
        image: currentSlide.hero_image_url || currentSlide.image,
        specs: currentSlide.hero_highlight_specs || [
            { icon: "Cpu", label: "CPU", value: currentSlide.specs.cpu },
            { icon: "Zap", label: "RAM", value: currentSlide.specs.ram },
            { icon: "Monitor", label: "Screen", value: currentSlide.specs.screen },
        ]
    };

    return (
        <section
            className="relative min-h-[90vh] flex flex-col pt-32 overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Background Ambient Glow - Changes with slide */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none transition-colors duration-1000">
                <div className={`absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full blur-[100px] opacity-20 transition-colors duration-1000 ${display.accent.replace('bg-', 'bg-')}`} />
                <div className={`absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-10 transition-colors duration-1000 ${display.accent.replace('bg-', 'bg-')}`} />
            </div>

            <div className="container mx-auto px-4 relative z-10 flex flex-col flex-grow h-full justify-center">
                <div className="grid lg:grid-cols-2 gap-12 items-center flex-grow min-h-[600px]">

                    {/* Text Content Area */}
                    <div className="relative h-full flex flex-col justify-center py-12 lg:py-0">
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
                                <div className="space-y-8 text-center lg:text-left">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border/50 text-xs font-medium text-muted-foreground">
                                        <span className="relative flex h-2 w-2">
                                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${display.accent}`}></span>
                                            <span className={`relative inline-flex rounded-full h-2 w-2 ${display.accent}`}></span>
                                        </span>
                                        {display.tag}
                                    </div>

                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                                        {display.title}
                                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-gray-500 text-3xl md:text-5xl mt-4 pb-2">
                                            {display.highlight}
                                        </span>
                                    </h1>

                                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                        {display.description}
                                    </p>

                                    {/* Mobile Only Image Injection */}
                                    <div className="relative w-full aspect-[4/3] max-h-[300px] block lg:hidden my-8">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Image
                                                src={display.image}
                                                alt={display.title}
                                                fill
                                                className="object-contain"
                                                priority={current === 0}
                                                sizes="(max-width: 768px) 100vw, 400px"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center gap-4 justify-center lg:justify-start">
                                        <Button
                                            size="lg"
                                            className="h-12 px-8 text-base group w-full sm:w-auto"
                                            onClick={handleShopNow}
                                        >
                                            {currentSlide.hero_cta_primary || "Shop Now"}
                                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="h-12 px-8 text-base w-full sm:w-auto"
                                            onClick={handleViewSpecs}
                                        >
                                            {currentSlide.hero_cta_secondary || "View Specs"}
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50">
                                        {display.specs?.map((spec, idx) => {
                                            const Icon = iconMap[spec.icon] || Star;
                                            return (
                                                <div key={idx} className="space-y-2">
                                                    <Icon className={`w-6 h-6 mx-auto lg:mx-0 ${display.accent.replace('bg-', 'text-')}`} />
                                                    <h4 className="font-semibold">{spec.value}</h4>
                                                    <p className="text-sm text-muted-foreground">{spec.label}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Visual/Image Area - Desktop Only */}
                    <div className="relative h-[400px] lg:h-[600px] hidden lg:flex items-center justify-center lg:translate-x-12">
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
                                className="absolute w-full max-w-xl"
                            >
                                <div className="relative aspect-[4/3] w-full">
                                    {/* Main Image Area - Floating */}
                                    <div className="absolute inset-0 flex items-center justify-center z-10">
                                        <div className="relative w-full h-full flex items-center justify-center">
                                            <Image
                                                src={display.image}
                                                alt={display.title}
                                                fill
                                                className="object-contain"
                                                priority={current === 0}
                                                sizes="(max-width: 1200px) 50vw, 600px"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Navigation Controls - Static, Below Content */}
                <div className="w-full flex items-center justify-center gap-4 py-8 z-20 mt-8 mb-4">
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full w-10 h-10 bg-background/50 backdrop-blur-sm hover:bg-background"
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
                                    ? `w-8 ${display.accent}`
                                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                                    }`}
                            />
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full w-10 h-10 bg-background/50 backdrop-blur-sm hover:bg-background"
                        onClick={nextSlide}
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
