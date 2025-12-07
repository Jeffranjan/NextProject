"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
    {
        id: 1,
        name: "Rahul Sharma",
        role: "Software Engineer",
        content:
            "The laptop I bought from Mahadev Computers is an absolute beast. Delivery was super fast, and the packaging was secure. Highly recommended!",
        rating: 5,
        initials: "RS",
    },
    {
        id: 2,
        name: "Priya Patel",
        role: "Graphic Designer",
        content:
            "I was looking for a specific high-spec model for my design work, and they had the best price. Customer support was very helpful in guiding me.",
        rating: 5,
        initials: "PP",
    },
    {
        id: 3,
        name: "Amit Verma",
        role: "Student",
        content:
            "Great deals on student laptops. I got a warranty extension as well. The laptop runs smooth and handles all my coding assignments perfectly.",
        rating: 4,
        initials: "AV",
    },
    {
        id: 4,
        name: "Sneha Reddy",
        role: "Content Creator",
        content:
            "Editing 4K videos is a breeze now. Loved the suggestion for the display specs. The color accuracy is spot on for my work.",
        rating: 5,
        initials: "SR",
    },
    {
        id: 5,
        name: "Vikram Singh",
        role: "Gamer",
        content:
            "Got the ROG Strix at an unbeatable price. The thermal performance is amazing. Best place for gaming laptops in the city.",
        rating: 5,
        initials: "VS",
    },
];

export function Testimonials() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Decorative gradient blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-30">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10 mb-12">
                <div className="text-center max-w-2xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold tracking-tight mb-4"
                    >
                        Trusted by Tech Enthusiasts
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground"
                    >
                        Don't just take our word for it. Here's what our community has to say about their experience.
                    </motion.p>
                </div>
            </div>

            {/* Infinite Scroll Container */}
            <div className="relative w-full overflow-hidden">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

                <motion.div
                    className="flex gap-6 w-max"
                    animate={{ x: "-50%" }}
                    transition={{
                        ease: "linear",
                        duration: 25,
                        repeat: Infinity,
                    }}
                >
                    {/* Render items twice for seamless loop */}
                    {[...testimonials, ...testimonials].map((testimonial, index) => (
                        <div
                            key={`${testimonial.id}-${index}`}
                            className="w-[350px] flex-shrink-0 bg-card border border-border/50 p-6 rounded-2xl shadow-sm relative group hover:border-primary/20 transition-colors"
                        >
                            <div className="absolute top-6 right-6 text-primary/10 group-hover:text-primary/20 transition-colors">
                                <Quote size={40} />
                            </div>

                            <div className="flex items-center gap-1 mb-4 text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        fill={i < testimonial.rating ? "currentColor" : "none"}
                                        className={i < testimonial.rating ? "" : "text-muted"}
                                    />
                                ))}
                            </div>

                            <p className="text-card-foreground/80 mb-6 relative z-10 text-sm leading-relaxed">
                                "{testimonial.content}"
                            </p>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                    {testimonial.initials}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
