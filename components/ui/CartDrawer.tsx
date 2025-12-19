"use client";

import { useCart } from "@/app/context/CartContext";
import { Button } from "./Button";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";

export function CartDrawer() {
    const { isCartOpen, setIsCartOpen, items, removeItem, addItem, cartTotal } = useCart();


    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isCartOpen]);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-background border-l border-border shadow-2xl flex flex-col"
                    >
                        <div className="flex items-center justify-between p-4 border-b border-border">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <ShoppingBag size={20} />
                                Your Cart
                            </h2>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsCartOpen(false)}
                            >
                                <X size={20} />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
                                    <ShoppingBag size={48} className="opacity-20" />
                                    <p>Your cart is empty</p>
                                    <Button variant="outline" onClick={() => setIsCartOpen(false)}>
                                        Continue Shopping
                                    </Button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-4 p-3 rounded-lg border border-border bg-secondary/10"
                                    >
                                        <div className="relative w-20 h-20 bg-secondary/30 rounded-md overflow-hidden flex items-center justify-center text-xs text-muted-foreground">
                                            {item.image ? (
                                                <NextImage
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-contain p-2"
                                                />
                                            ) : (
                                                <span>{item.brand}</span>
                                            )}
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-medium line-clamp-1">{item.name}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    ₹{item.price.toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => {
                                                            if (item.quantity > 1) {
                                                                removeItem(item.id);
                                                            }
                                                        }}
                                                        className="p-1 hover:bg-secondary rounded"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="text-sm w-4 text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => addItem(item)}
                                                        className="p-1 hover:bg-secondary rounded"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-xs text-red-500 hover:underline"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {items.length > 0 && (
                            <div className="p-4 border-t border-border space-y-4 bg-secondary/5">
                                <div className="flex items-center justify-between font-medium">
                                    <span>Subtotal</span>
                                    <span>₹{cartTotal.toLocaleString()}</span>
                                </div>
                                <p className="text-xs text-muted-foreground text-center">
                                    Shipping and taxes calculated at checkout.
                                </p>
                                <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                                    <Button className="w-full h-12 text-base">
                                        Checkout
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
