"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "./Button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Cpu, Zap, Battery, ChevronLeft, ChevronRight, Star, Shield, Laptop as LaptopIcon } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import { Laptop } from "@/lib/types";

// Slide Data
// Slide Data
const slides = [
    {
        id: "1478f0ed-d71d-4b86-bd65-75a348467e59",
        tag: "New Release",
        title: "MacBook Pro 16",
        name: "MacBook Pro 16",
        brand: "Apple",
        price: 249900,
        category: "Creative",
        highlight: "M3 Max Powerhouse",
        description: "Experience uncompromised performance with the M3 Max chip. Designed for creators who demand the absolute best.",
        specs: [
            { icon: Cpu, label: "M3 Max", value: "16-Core" },
            { icon: Zap, label: "Memory", value: "128GB" },
            { icon: Battery, label: "Battery", value: "22 Hrs" },
        ],
        technicalSpecs: {
            cpu: "M3 Max",
            ram: "128GB",
            storage: "2TB SSD",
            screen: "16-inch Liquid Retina XDR"
        },
        color: "from-blue-500/20 to-purple-500/20",
        accent: "bg-blue-500",
        image: "/images/macbook-pro-16.png",
    },
    {
        id: "12c8fe1a-7d19-40f1-893e-f527cfcd606c",
        tag: "Best Seller",
        title: "Dell XPS 15",
        name: "Dell XPS 15",
        brand: "Dell",
        price: 189900,
        category: "Business",
        highlight: "InfinityEdge Display",
        description: "Immersive 3.5K OLED display in a stunningly crafted chassis. The perfect balance of power and portability.",
        specs: [
            { icon: Star, label: "Display", value: "3.5K OLED" },
            { icon: Cpu, label: "Intel", value: "i9-13900H" },
            { icon: Zap, label: "Graphics", value: "RTX 4070" },
        ],
        technicalSpecs: {
            cpu: "Intel Core i9-13900H",
            ram: "32GB",
            storage: "1TB SSD",
            screen: "15.6-inch 3.5K OLED"
        },
        color: "from-green-500/20 to-emerald-500/20",
        accent: "bg-green-500",
        image: "/images/dell-xps-15.png",
    },
    {
        id: "7182e7dc-00e0-452c-8fa2-8173d457d364",
        tag: "Gaming Beast",
        title: "ROG Zephyrus G14",
        name: "ROG Zephyrus G14",
        brand: "Asus",
        price: 149900,
        category: "Gaming",
        highlight: "Ultra-Portable Gaming",
        description: "Dominate the competition with the world's most powerful 14-inch gaming laptop. Anime Matrix LED display included.",
        specs: [
            { icon: Zap, label: "Refresh", value: "165Hz" },
            { icon: Cpu, label: "Ryzen", value: "9 7940HS" },
            { icon: Shield, label: "Cooling", value: "Vapor" },
        ],
        technicalSpecs: {
            cpu: "AMD Ryzen 9 7940HS",
            ram: "16GB",
            storage: "1TB SSD",
            screen: "14-inch QHD+ 165Hz"
        },
        color: "from-red-500/20 to-orange-500/20",
        accent: "bg-red-500",
        image: "/images/rog-zephyrus-g14.png",
    },
    {
        id: "da614d62-ccfd-492d-9393-9c063268397b",
        tag: "Business Pro",
        title: "ThinkPad X1 Carbon",
        name: "ThinkPad X1 Carbon",
        brand: "Lenovo",
        price: 169900,
        category: "Business",
        highlight: "Legendary Reliability",
        description: "Ultralight, ultrathin, and ultra-tough. The gold standard for business computing with military-grade durability.",
        specs: [
            { icon: Shield, label: "Build", value: "Carbon" },
            { icon: Battery, label: "Weight", value: "1.12kg" },
            { icon: LaptopIcon, label: "Keyboard", value: "Premium" },
        ],
        technicalSpecs: {
            cpu: "Intel Core i7-1365U",
            ram: "16GB",
            storage: "512GB SSD",
            screen: "14-inch WUXGA"
        },
        color: "from-gray-500/20 to-slate-500/20",
        accent: "bg-gray-500",
        image: "/images/thinkpad-x1.png",
    },
    {
        id: "ada36ca6-d9b2-4eba-96b1-542b554c9b87",
        tag: "Creator's Choice",
        title: "Surface Laptop Studio",
        name: "Surface Laptop Studio",
        brand: "Microsoft",
        price: 209900,
        category: "Creative",
        highlight: "Transform Your Workflow",
        description: "Seamlessly transition from laptop to studio mode. The ultimate canvas for digital artists and designers.",
        specs: [
            { icon: Star, label: "Screen", value: "Touch" },
            { icon: Cpu, label: "Mode", value: "3-in-1" },
            { icon: Zap, label: "Pen", value: "Haptic" },
        ],
        technicalSpecs: {
            cpu: "Intel Core i7-11370H",
            ram: "32GB",
            storage: "1TB SSD",
            screen: "14.4-inch PixelSense Flow"
        },
        color: "from-indigo-500/20 to-pink-500/20",
        accent: "bg-indigo-500",
        image: "/images/surface-laptop-studio.png",
    },
];

export function Hero() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);
    const { addItem } = useCart();
    const router = useRouter();

    const handleShopNow = () => {
        const currentSlide = slides[current];
        const product: Laptop = {
            id: currentSlide.id,
            name: currentSlide.name,
            brand: currentSlide.brand,
            price: currentSlide.price,
            category: currentSlide.category as any,
            image: currentSlide.image,
            description: currentSlide.description,
            specs: currentSlide.technicalSpecs
        };
        addItem(product);
    };

    const handleViewSpecs = () => {
        router.push(`/products/${slides[current].id}`);
    };

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

    const [isPaused, setIsPaused] = useState(false);

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

    return (
        <section
            className="relative min-h-[90vh] flex items-center pt-32 overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Background Ambient Glow - Changes with slide */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none transition-colors duration-1000">
                <div className={`absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full blur-[100px] opacity-20 transition-colors duration-1000 ${slides[current].accent.replace('bg-', 'bg-')}`} />
                <div className={`absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-10 transition-colors duration-1000 ${slides[current].accent.replace('bg-', 'bg-')}`} />
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
                                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${slides[current].accent}`}></span>
                                            <span className={`relative inline-flex rounded-full h-2 w-2 ${slides[current].accent}`}></span>
                                        </span>
                                        {slides[current].tag}
                                    </div>

                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                                        {slides[current].title}
                                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-gray-500 text-3xl md:text-5xl mt-4 pb-2">
                                            {slides[current].highlight}
                                        </span>
                                    </h1>

                                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                        {slides[current].description}
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
                                                src={slides[current].image}
                                                alt={slides[current].title}
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
