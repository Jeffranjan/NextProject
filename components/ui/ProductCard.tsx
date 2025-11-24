"use client";

import { Laptop } from "@/lib/data";
import { Button } from "./Button";
import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
import { ProductModal } from "./ProductModal";

interface ProductCardProps {
    product: Laptop;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <motion.div
                whileHover={{ y: -5 }}
                className="group relative bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
                {/* Image Area */}
                <div className="relative aspect-[16/10] bg-secondary/50 overflow-hidden">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />

                    <div className="absolute top-3 right-3">
                        <Button
                            size="icon"
                            variant="secondary"
                            className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => addItem(product)}
                        >
                            <ShoppingCart size={16} />
                        </Button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-medium text-muted-foreground">{product.category}</p>
                            <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                                <button onClick={() => setIsModalOpen(true)} className="text-left hover:underline">
                                    {product.name}
                                </button>
                            </h3>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-medium">
                            <Star size={12} fill="currentColor" />
                            4.8
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <div className="bg-secondary/50 px-2 py-1 rounded">{product.specs.cpu}</div>
                        <div className="bg-secondary/50 px-2 py-1 rounded">{product.specs.ram}</div>
                        <div className="bg-secondary/50 px-2 py-1 rounded">{product.specs.screen.split(" ")[0]}</div>
                        <div className="bg-secondary/50 px-2 py-1 rounded">{product.specs.storage}</div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                        <div className="font-bold text-xl">
                            ₹{product.price.toLocaleString()}
                        </div>
                        <Button
                            size="sm"
                            variant="outline"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => setIsModalOpen(true)}
                        >
                            View Details
                        </Button>
                    </div>
                </div>
            </motion.div>

            <ProductModal
                product={product}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
