"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Fuse from "fuse.js";
import { Laptop } from "@/lib/types";
import { getProducts } from "@/lib/products";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [query, setQuery] = useState("");
    const [products, setProducts] = useState<Laptop[]>([]);
    const [results, setResults] = useState<Laptop[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const resultContainerRef = useRef<HTMLDivElement>(null);

    // Fetch products on mount
    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    // Fuse.js configuration
    const fuse = new Fuse(products, {
        keys: ["name", "brand", "category"],
        threshold: 0.3, // Fuzzy match sensitivity
    });

    // Handle search
    useEffect(() => {
        if (query.trim() === "") {
            setResults([]);
            setSelectedIndex(-1);
            return;
        }

        const searchResults = fuse.search(query).map((result) => result.item);
        setResults(searchResults.slice(0, 5)); // Limit to top 5 results
        setSelectedIndex(-1);
    }, [query, products]);

    // Handle keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev > -1 ? prev - 1 : prev));
            } else if (e.key === "Enter" && selectedIndex > -1) {
                // Navigate to product
                const selectedProduct = results[selectedIndex];
                if (selectedProduct) {
                    window.location.href = `/products/${selectedProduct.id}`;
                    onClose();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, results, selectedIndex, onClose]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        } else {
            setQuery("");
        }
    }, [isOpen]);

    // Scroll selected item into view
    useEffect(() => {
        if (selectedIndex > -1 && resultContainerRef.current) {
            const selectedElement = resultContainerRef.current.children[selectedIndex] as HTMLElement;
            if (selectedElement) {
                selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
        }
    }, [selectedIndex]);


    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 overflow-hidden"
                        onClick={onClose}
                    />

                    {/* Search Container */}
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 flex flex-col items-center pt-24 px-4 sm:px-6 pointer-events-none"
                    >
                        <div className="w-full max-w-3xl bg-card border border-border shadow-2xl rounded-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[80vh]">
                            {/* Input Header */}
                            <div className="flex items-center p-4 border-b border-border gap-4">
                                <Search className="text-muted-foreground w-6 h-6" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Search laptops, gear..."
                                    className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground text-foreground h-12"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={onClose}
                                    className="shrink-0"
                                >
                                    <span className="sr-only">Close</span>
                                    <kbd className="hidden sm:inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                        ESC
                                    </kbd>
                                    <X className="sm:hidden w-5 h-5" />
                                </Button>
                            </div>

                            {/* Results */}
                            <div className="overflow-y-auto" ref={resultContainerRef}>
                                {results.length > 0 ? (
                                    <div className="py-2">
                                        {results.map((product, index) => (
                                            <Link
                                                key={product.id}
                                                href={`/products/${product.id}`}
                                                className={cn(
                                                    "flex items-center gap-4 px-4 py-3 mx-2 rounded-lg transition-colors group",
                                                    selectedIndex === index
                                                        ? "bg-primary/10"
                                                        : "hover:bg-muted/50"
                                                )}
                                                onClick={onClose}
                                                onMouseEnter={() => setSelectedIndex(index)}
                                            >
                                                <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted shrink-0 border border-border">
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                                                        {product.name}
                                                    </h4>
                                                    <div className="flex items-center text-xs text-muted-foreground gap-2">
                                                        <span className="bg-secondary px-1.5 py-0.5 rounded text-secondary-foreground">
                                                            {product.brand}
                                                        </span>
                                                        <span>•</span>
                                                        <span>{product.category}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right shrink-0">
                                                    <span className="font-bold text-primary">
                                                        ₹{product.price.toLocaleString()}
                                                    </span>
                                                </div>
                                                <ChevronRight className={cn("w-4 h-4 text-muted-foreground opacity-0 -translate-x-2 transition-all duration-200",
                                                    selectedIndex === index ? "opacity-100 translate-x-0" : "group-hover:opacity-100 group-hover:translate-x-0"
                                                )} />
                                            </Link>
                                        ))}
                                    </div>
                                ) : query.trim() !== "" ? (
                                    <div className="py-12 text-center text-muted-foreground">
                                        <p>No results found for "{query}"</p>
                                    </div>
                                ) : (
                                    <div className="py-12 px-8">
                                        <p className="text-sm font-medium text-muted-foreground mb-4">Popular Suggestions</p>
                                        <div className="flex flex-wrap gap-2">
                                            {["Gaming", "MacBook", "Ultrabook", "RTX 4060"].map((suggestion) => (
                                                <Button
                                                    key={suggestion}
                                                    variant="outline"
                                                    size="sm"
                                                    className="rounded-full"
                                                    onClick={() => setQuery(suggestion)}
                                                >
                                                    {suggestion}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer hint */}
                            {results.length > 0 && (
                                <div className="p-2 border-t border-border bg-muted/30 text-xs text-muted-foreground flex justify-between px-4">
                                    <span>
                                        Products found: {results.length}
                                    </span>
                                    <span className="hidden sm:inline-flex items-center gap-1">
                                        Use <kbd className="inline-flex h-4 items-center gap-1 rounded border bg-background px-1 font-mono font-medium opacity-100">↑</kbd> <kbd className="inline-flex h-4 items-center gap-1 rounded border bg-background px-1 font-mono font-medium opacity-100">↓</kbd> to navigate, <kbd className="inline-flex h-4 items-center gap-1 rounded border bg-background px-1 font-mono font-medium opacity-100">↵</kbd> to select
                                    </span>
                                </div>
                            )}

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
