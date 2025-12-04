"use client";

import Link from "next/link";
import { ShoppingCart, Search, Menu, X, Laptop, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/app/context/CartContext";
import { CartDrawer } from "./CartDrawer";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { setIsCartOpen, cartCount } = useCart();
    const { user, signOut } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b border-transparent",
                    isScrolled
                        ? "bg-background/80 backdrop-blur-md border-border/50 shadow-sm"
                        : "bg-transparent"
                )}
            >
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="p-2 bg-primary rounded-lg text-primary-foreground group-hover:scale-105 transition-transform">
                            <Laptop size={20} />
                        </div>
                        <span className="text-xl font-bold tracking-tight">Mahadev Computers</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/products"
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            Laptops
                        </Link>
                        <Link
                            href="/about"
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            Contact
                        </Link>
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                            <Search size={20} />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative text-muted-foreground hover:text-primary"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <ShoppingCart size={20} />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center text-[10px] font-bold bg-primary text-primary-foreground rounded-full ring-2 ring-background">
                                    {cartCount}
                                </span>
                            )}
                        </Button>

                        {user ? (
                            <div className="flex items-center gap-2">
                                <Link href="/dashboard">
                                    <Button variant="ghost" size="icon">
                                        <User size={20} />
                                    </Button>
                                </Link>
                                <Button onClick={() => signOut()} variant="outline">Sign Out</Button>
                            </div>
                        ) : (
                            <Link href="/auth">
                                <Button>Get Started</Button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-muted-foreground hover:text-primary"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-background border-b border-border"
                        >
                            <div className="flex flex-col p-4 gap-4">
                                <Link
                                    href="/"
                                    className="text-sm font-medium py-2 border-b border-border/50"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/products"
                                    className="text-sm font-medium py-2 border-b border-border/50"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Laptops
                                </Link>
                                <Link
                                    href="/about"
                                    className="text-sm font-medium py-2 border-b border-border/50"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    About
                                </Link>
                                <Link
                                    href="/contact"
                                    className="text-sm font-medium py-2 border-b border-border/50"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Contact
                                </Link>
                                <div className="flex gap-4 pt-2">
                                    {user ? (
                                        <Button className="w-full" onClick={() => {
                                            signOut();
                                            setIsMobileMenuOpen(false);
                                        }}>Sign Out</Button>
                                    ) : (
                                        <Link href="/auth" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                                            <Button className="w-full">Get Started</Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
            <CartDrawer />
        </>
    );
}
