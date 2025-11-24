"use client";

import { Navbar } from "@/components/ui/Navbar";
import { ProductCard } from "@/components/ui/ProductCard";
import { laptops } from "@/lib/data";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const categories = ["All", "Gaming", "Ultrabook", "Business", "Creative"];

export default function ProductsPage() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredLaptops =
        activeCategory === "All"
            ? laptops
            : laptops.filter((laptop) => laptop.category === activeCategory);

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <div className="pt-24 pb-12 container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight mb-2">All Laptops</h1>
                        <p className="text-muted-foreground">
                            Browse our collection of high-performance machines.
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={activeCategory === category ? "default" : "outline"}
                                size="sm"
                                onClick={() => setActiveCategory(category)}
                                className={cn(
                                    "rounded-full",
                                    activeCategory === category && "shadow-md"
                                )}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredLaptops.map((laptop) => (
                        <ProductCard key={laptop.id} product={laptop} />
                    ))}
                </div>

                {filteredLaptops.length === 0 && (
                    <div className="text-center py-24 text-muted-foreground">
                        No laptops found in this category.
                    </div>
                )}
            </div>
        </main>
    );
}
