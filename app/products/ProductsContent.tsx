"use client";

import { ProductCard } from "@/components/ui/ProductCard";
import { Laptop } from "@/lib/types";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const categories = ["All", "Gaming", "Ultrabook", "Business", "Creative"];

interface ProductsContentProps {
    products: Laptop[];
}

export function ProductsContent({ products }: ProductsContentProps) {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProducts =
        activeCategory === "All"
            ? products
            : products.filter((product) => product.category === activeCategory);

    return (
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
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-24 text-muted-foreground">
                    No laptops found in this category.
                </div>
            )}
        </div>
    );
}
