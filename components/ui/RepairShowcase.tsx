"use client";

import { motion } from "framer-motion";
import { Wrench, Cpu, MonitorPlay, Zap, Microscope, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const repairServices = [
    {
        icon: Cpu,
        title: "Chip-Level Repair",
        description: "Expert diagnostics and soldering for complex motherboard issues.",
    },
    {
        icon: Microscope,
        title: "Precision Diagnostics",
        description: "Advanced tools to identify faults that others miss.",
    },
    {
        icon: Zap,
        title: "Power & Logic Fixes",
        description: "Resolving dead laptops, charging issues, and shorted circuits.",
    },
    {
        icon: MonitorPlay,
        title: "Screen & Display",
        description: "Replacement and repair for broken, flickering, or dim screens.",
    },
];

const images = [
    "/images/repair-1.jpg", // Placeholder - replace with real images later
    "/images/repair-2.jpg",
    "/images/repair-3.jpg",
];

export function RepairShowcase() {
    return (
        <section className="relative w-full py-20 overflow-hidden bg-neutral-950 text-white">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-neutral-800/20 via-neutral-950 to-neutral-950 pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex flex-col gap-6"
                    >
                        <div className="space-y-2">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                                Get Your Laptop & PC <span className="text-neutral-400">Repaired</span>
                            </h2>
                            <p className="text-lg md:text-xl font-medium text-blue-400">
                                Chip-Level Repairing – Only at Ganpati Computers
                            </p>
                        </div>

                        <p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-xl">
                            From motherboard faults to power issues, display problems, and performance failures — we fix it all with precision and care. Our lab is equipped with advanced diagnostic tools to ensure your device gets the expert attention it deserves.
                        </p>

                        {/* Highlights Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            {repairServices.map((service, idx) => (
                                <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                                    <service.icon className="w-8 h-8 text-blue-500 group-hover:text-blue-400 transition-colors shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-white">{service.title}</h4>
                                        <p className="text-sm text-neutral-400 leading-snug mt-1">{service.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4 mt-6">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
                            >
                                Get Your Device Repaired
                                <Wrench className="w-4 h-4 ml-2" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all hover:scale-105 active:scale-95"
                            >
                                Contact Repair Expert
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Visual Showcase */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-full min-h-[400px] md:min-h-[500px] w-full"
                    >
                        {/* Abstract Circuit / Tech Elements (Optional Decoration) */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />

                        {/* Main Image Grid - Asymmetric Layout */}
                        <div className="grid grid-cols-2 gap-4 h-full relative z-10">
                            <div className="col-span-2 relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                                <div className="absolute inset-0 bg-neutral-800 animate-pulse" /> {/* Placeholder Loading Skeleton */}
                                {/* Replace with actual image */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                <div className="absolute bottom-4 left-4 z-20">
                                    <span className="px-3 py-1 rounded-full bg-blue-600/90 text-xs font-bold text-white uppercase tracking-wider">Advanced Repair</span>
                                </div>
                                <Image
                                    src="/images/motherboard.jpeg" // Placeholder Unsplash Image
                                    alt="Motherboard Repair"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>

                            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-xl group lg:translate-x-4 lg:-translate-y-8">
                                <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
                                <Image
                                    src="/images/microscope_repair.jpg" // Placeholder
                                    alt="Microscope"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>

                            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-xl group lg:-translate-x-4 lg:translate-y-4">
                                <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
                                <Image
                                    src="/images/soldering.jpeg" // Placeholder
                                    alt="Soldering"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
