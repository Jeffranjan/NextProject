"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cpu, Zap, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "./Button";

export function PCBuilderPromo() {
    return (
        <section className="py-24 relative overflow-hidden bg-zinc-950 text-white">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

                    {/* Content */}
                    <div className="flex-1 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6 border border-blue-500/20">
                                <Settings size={14} />
                                <span>Custom Configuration</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                                Build Your Dream <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Battle Station</span>
                            </h2>
                            <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
                                Select from top-tier components to craft a machine that matches your performance needs.
                                Our compatibility engine ensures every part fits perfectly.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap gap-4"
                        >
                            <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl">
                                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                                    <Cpu size={24} />
                                </div>
                                <div>
                                    <div className="font-semibold">Latest Gen</div>
                                    <div className="text-xs text-zinc-500">Components</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl">
                                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                                    <Zap size={24} />
                                </div>
                                <div>
                                    <div className="font-semibold">Pro Assembly</div>
                                    <div className="text-xs text-zinc-500">Included</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            <Link href="/build-custom-pc">
                                <Button size="lg" className="bg-white text-black hover:bg-zinc-200">
                                    Start Building <ArrowRight size={18} className="ml-2" />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Visual / Graphic */}
                    <div className="flex-1 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", duration: 1.5 }}
                            className="relative z-10"
                        >
                            {/* 
                  Ideally, we'd use a real image here. 
                  For now, I'll create a stylized abstract "PC Case" abstraction using CSS shapes if no image is available,
                  but a placeholder helps.
               */}
                            <div className="relative aspect-square max-w-md mx-auto bg-gradient-to-br from-zinc-800 to-black rounded-3xl border border-zinc-800 shadow-2xl p-2">
                                <div className="absolute inset-0 bg-blue-500/5 blur-3xl" />

                                {/* Inner Case Representation */}
                                <div className="h-full w-full bg-zinc-950 rounded-2xl relative overflow-hidden flex items-center justify-center border border-zinc-800/50">

                                    {/* Animated Grid Lines inside case */}
                                    <div className="absolute inset-0 grid grid-cols-2 gap-2 p-6 opacity-30">
                                        <motion.div
                                            animate={{ opacity: [0.2, 0.5, 0.2] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                            className="bg-zinc-800 rounded-lg col-span-2 h-32"
                                        /> {/* GPU Placeholder */}
                                        <div className="bg-zinc-800 rounded-lg h-24" /> {/* Cooler */}
                                        <div className="bg-zinc-800 rounded-lg h-24" /> {/* RAM */}
                                        <div className="bg-zinc-800 rounded-lg col-span-2 h-20 mt-auto" /> {/* PSU */}
                                    </div>

                                    <div className="relative z-10 text-center">
                                        <span className="text-zinc-700 font-mono text-sm">SYSTEM VISUALIZER</span>
                                    </div>
                                </div>

                                {/* Floating Badges */}
                                <motion.div
                                    animate={{ y: [-10, 10, -10] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-6 -right-6 bg-zinc-900 border border-zinc-800 p-3 rounded-xl shadow-xl flex items-center gap-2"
                                >
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-xs font-medium text-zinc-300">RTX 4090 Compatible</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
