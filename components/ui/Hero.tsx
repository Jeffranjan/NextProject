"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "./Button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Cpu, Zap, Battery, ChevronLeft, ChevronRight, Star, Shield, Laptop } from "lucide-react";

// Slide Data
const slides = [
    {
        id: 1,
        tag: "New Release",
        title: "MacBook Pro 16",
        highlight: "M3 Max Powerhouse",
        description: "Experience uncompromised performance with the M3 Max chip. Designed for creators who demand the absolute best.",
        specs: [
            { icon: Cpu, label: "M3 Max", value: "16-Core" },
            { icon: Zap, label: "Memory", value: "128GB" },
            { icon: Battery, label: "Battery", value: "22 Hrs" },
        ],
        color: "from-blue-500/20 to-purple-500/20",
        accent: "bg-blue-500",
    },
    {
        id: 2,
        tag: "Best Seller",
        title: "Dell XPS 15",
        highlight: "InfinityEdge Display",
        description: "Immersive 3.5K OLED display in a stunningly crafted chassis. The perfect balance of power and portability.",
        specs: [
            { icon: Star, label: "Display", value: "3.5K OLED" },
            { icon: Cpu, label: "Intel", value: "i9-13900H" },
            { icon: Zap, label: "Graphics", value: "RTX 4070" },
        ],
        color: "from-green-500/20 to-emerald-500/20",
        accent: "bg-green-500",
    },
    {
        id: 3,
        tag: "Gaming Beast",
        title: "ROG Zephyrus G14",
        highlight: "Ultra-Portable Gaming",
        description: "Dominate the competition with the world's most powerful 14-inch gaming laptop. Anime Matrix LED display included.",
        specs: [
            { icon: Zap, label: "Refresh", value: "165Hz" },
            { icon: Cpu, label: "Ryzen", value: "9 7940HS" },
            { icon: Shield, label: "Cooling", value: "Vapor" },
        ],
        color: "from-red-500/20 to-orange-500/20",
        accent: "bg-red-500",
    },
    {
        id: 4,
        tag: "Business Pro",
        title: "ThinkPad X1 Carbon",
        highlight: "Legendary Reliability",
        description: "Ultralight, ultrathin, and ultra-tough. The gold standard for business computing with military-grade durability.",
        specs: [
            { icon: Shield, label: "Build", value: "Carbon" },
            { icon: Battery, label: "Weight", value: "1.12kg" },
            { icon: Laptop, label: "Keyboard", value: "Premium" },
        ],
        color: "from-gray-500/20 to-slate-500/20",
        accent: "bg-gray-500",
    },
    {
        id: 5,
        tag: "Creator's Choice",
        title: "Surface Laptop Studio",
        highlight: "Transform Your Workflow",
        description: "Seamlessly transition from laptop to studio mode. The ultimate canvas for digital artists and designers.",
        specs: [
            { icon: Star, label: "Screen", value: "Touch" },
            { icon: Cpu, label: "Mode", value: "3-in-1" },
            { icon: Zap, label: "Pen", value: "Haptic" },
        ],
        color: "from-indigo-500/20 to-pink-500/20",
        accent: "bg-indigo-500",
    },
];

export function Hero() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % slides.length);
    }, []);

    const prevSlide = () => {
        setDirection(-1);
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index: number) => {
        setDirection(index > current ? 1 : -1);
        setCurrent(index);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 6000);
        return () => clearInterval(timer);
    }, [nextSlide]);

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

    return (
        <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background">
            {/* Background Ambient Glow - Changes with slide */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none transition-colors duration-1000">
                <div className={`absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full blur-[100px] opacity-20 transition-colors duration-1000 ${slides[current].accent.replace('bg-', 'bg-')}`} />
                <div className={`absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-10 transition-colors duration-1000 ${slides[current].accent.replace('bg-', 'bg-')}`} />
            </div>

            <div className="container mx-auto px-4 relative z-10 h-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center h-full">

                    {/* Text Content Area */}
                    <div className="relative h-[500px] flex flex-col justify-center">
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
                                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${slides[current].accent}`}></span>
                                            <span className={`relative inline-flex rounded-full h-2 w-2 ${slides[current].accent}`}></span>
                                        </span>
                                        {slides[current].tag}
                                    </div>

                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                                        {slides[current].title}
                                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-gray-500 text-3xl md:text-5xl mt-2">
                                            {slides[current].highlight}
                                        </span>
                                    </h1>

                                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                        {slides[current].description}
                                    </p>

                                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                                        <Button size="lg" className="h-12 px-8 text-base group">
                                            Shop Now
                                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                        <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                                            View Specs
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50">
                                        {slides[current].specs.map((spec, idx) => (
                                            <div key={idx} className="space-y-2">
                                                <spec.icon className={`w-6 h-6 mx-auto lg:mx-0 ${slides[current].accent.replace('bg-', 'text-')}`} />
                                                <h4 className="font-semibold">{spec.value}</h4>
                                                <p className="text-sm text-muted-foreground">{spec.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Visual/Image Area */}
                    <div className="relative h-[400px] lg:h-[600px] flex items-center justify-center">
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
                                    {/* Main Card */}
                                    <div className={`absolute inset-0 bg-gradient-to-tr ${slides[current].color} rounded-2xl shadow-2xl border border-white/10 flex items-center justify-center overflow-hidden backdrop-blur-sm`}>
                                        {/* Laptop Representation */}
                                        <div className="w-[80%] h-[60%] bg-gray-900 rounded-lg shadow-2xl transform -rotate-x-12 rotate-y-12 rotate-z-2 transition-transform hover:rotate-0 duration-500 flex flex-col relative group">
                                            <div className="flex-1 bg-gray-800 rounded-t-lg relative overflow-hidden border-4 border-gray-900 border-b-0">
                                                <div className={`absolute inset-0 bg-gradient-to-br ${slides[current].color} opacity-50`} />
                                                {/* Screen Reflection */}
                                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
                                            </div>
                                            <div className="h-4 bg-gray-700 rounded-b-lg border-4 border-gray-900 border-t-0 relative">
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-1 bg-gray-600 rounded-full" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating Badge */}
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute -bottom-6 -left-6 bg-background/80 backdrop-blur-md p-4 rounded-xl border border-border shadow-xl"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${slides[current].accent.replace('bg-', 'bg-').replace('500', '100')} ${slides[current].accent.replace('bg-', 'text-').replace('500', '600')}`}>
                                                <Star size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">Featured</p>
                                                <p className="font-bold">{slides[current].tag}</p>
                                            </div>
                                        </div>
                                    </motion.div>
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
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => goToSlide(idx)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${current === idx
                                        ? `w-8 ${slides[current].accent}`
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
