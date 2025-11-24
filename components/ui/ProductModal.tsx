"use client";

import { Laptop } from "@/lib/data";
import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingCart, Check } from "lucide-react";
import Image from "next/image";
import { Button } from "./Button";
import { useCart } from "@/app/context/CartContext";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ProductModalProps {
    product: Laptop;
    isOpen: boolean;
    onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
    const { addItem } = useCart();
    const [isAdded, setIsAdded] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleAddToCart = () => {
        addItem(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full max-w-3xl bg-background rounded-2xl shadow-2xl overflow-hidden border border-border flex flex-col max-h-[90vh]"
                    >
                        <div className="grid md:grid-cols-2 h-full overflow-y-auto md:overflow-hidden">
                            {/* Image Section */}
                            <div className="relative h-64 md:h-auto bg-secondary/30 min-h-[300px]">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Content Section */}
                            <div className="p-6 flex flex-col h-full overflow-y-auto">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground font-medium">{product.category}</p>
                                        <h2 className="text-2xl font-bold">{product.name}</h2>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={onClose} className="-mr-2 -mt-2">
                                        <X size={20} />
                                    </Button>
                                </div>

                                <div className="space-y-4 flex-1">
                                    <p className="text-muted-foreground">{product.description}</p>

                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div className="p-3 bg-secondary/50 rounded-lg">
                                            <span className="block text-xs text-muted-foreground">CPU</span>
                                            <span className="font-medium">{product.specs.cpu}</span>
                                        </div>
                                        <div className="p-3 bg-secondary/50 rounded-lg">
                                            <span className="block text-xs text-muted-foreground">RAM</span>
                                            <span className="font-medium">{product.specs.ram}</span>
                                        </div>
                                        <div className="p-3 bg-secondary/50 rounded-lg">
                                            <span className="block text-xs text-muted-foreground">Storage</span>
                                            <span className="font-medium">{product.specs.storage}</span>
                                        </div>
                                        <div className="p-3 bg-secondary/50 rounded-lg">
                                            <span className="block text-xs text-muted-foreground">Screen</span>
                                            <span className="font-medium">{product.specs.screen}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-border flex items-center justify-between gap-4">
                                    <div className="text-2xl font-bold">
                                        ₹{product.price.toLocaleString()}
                                    </div>
                                    <Button onClick={handleAddToCart} className="flex-1 md:flex-none gap-2" disabled={isAdded}>
                                        {isAdded ? <Check size={18} /> : <ShoppingCart size={18} />}
                                        {isAdded ? "Added to Cart" : "Add to Cart"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
