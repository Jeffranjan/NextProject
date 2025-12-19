"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "./Button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Cpu, Zap, Battery, ChevronLeft, ChevronRight, Star, Shield, Laptop as LaptopIcon, Tablet, Monitor, Mouse, Keyboard } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import { Laptop, Slider } from "@/lib/types";


const iconMap: Record<string, any> = {
    Cpu, Zap, Battery, Star, Shield, Laptop: LaptopIcon, Tablet, Monitor, Mouse, Keyboard
};

interface HeroProps {
    sliders: Slider[];
}

export function Hero({ sliders = [] }: HeroProps) {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);
    const { addItem } = useCart();
    const router = useRouter();
    const [isPaused, setIsPaused] = useState(false);

    if (!sliders || sliders.length === 0) return null;

    const handleShopNow = () => {
        const currentSlide = sliders[current];

        const product: Laptop = {
            id: currentSlide.id,
            name: currentSlide.title,
            brand: currentSlide.brand,
            price: currentSlide.price,
            category: "Gaming",
            image: currentSlide.image,
            description: currentSlide.description,
            specs: {
                cpu: currentSlide.technical_specs?.cpu || "",
                ram: currentSlide.technical_specs?.ram || "",
                storage: currentSlide.technical_specs?.storage || "",
                screen: currentSlide.technical_specs?.screen || "",
            }
        };
        addItem(product);
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

    return (
        <section
            className="relative min-h-[90vh] flex items-center pt-32 overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Background Ambient Glow - Changes with slide */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none transition-colors duration-1000">
                <div className={`absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full blur-[100px] opacity-20 transition-colors duration-1000 ${currentSlide.accent.replace('bg-', 'bg-')}`} />
                <div className={`absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-10 transition-colors duration-1000 ${currentSlide.accent.replace('bg-', 'bg-')}`} />
            </div>

            <div className="container mx-auto px-4 relative z-10 h-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center h-full">

                    {/* Text Content Area */}
                    <div className="relative min-h-[500px] h-auto flex flex-col justify-center py-12 lg:py-0">
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
                                className="absolute w-full"
                            >
                                <div className="space-y-8 text-center lg:text-left">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border/50 text-xs font-medium text-muted-foreground">
                                        <span className="relative flex h-2 w-2">
                                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${currentSlide.accent}`}></span>
                                            <span className={`relative inline-flex rounded-full h-2 w-2 ${currentSlide.accent}`}></span>
                                        </span>
                                        {currentSlide.tag}
                                    </div>

                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                                        {currentSlide.title}
                                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-gray-500 text-3xl md:text-5xl mt-4 pb-2">
                                            {currentSlide.highlight}
                                        </span>
                                    </h1>

                                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                        {currentSlide.description}
                                    </p>

                                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                                        <Button
                                            size="lg"
                                            className="h-12 px-8 text-base group"
                                            onClick={handleShopNow}
                                        >
                                            Shop Now
                                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="h-12 px-8 text-base"
                                            onClick={handleViewSpecs}
                                        >
                                            View Specs
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50">
                                        {currentSlide.specs?.map((spec, idx) => {
                                            const Icon = iconMap[spec.icon] || Star;
                                            return (
                                                <div key={idx} className="space-y-2">
                                                    <Icon className={`w-6 h-6 mx-auto lg:mx-0 ${currentSlide.accent.replace('bg-', 'text-')}`} />
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

                    {/* Visual/Image Area */}
                    <div className="relative h-[400px] lg:h-[600px] flex items-center justify-center lg:translate-x-12">
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
                                                src={currentSlide.image}
                                                alt={currentSlide.title}
                                                fill
                                                className="object-contain"
                                                priority={current === 0}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Navigation Controls */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
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
                                    ? `w-8 ${currentSlide.accent}`
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
