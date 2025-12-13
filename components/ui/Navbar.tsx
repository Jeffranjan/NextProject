"use client";

import Link from "next/link";
import { ShoppingCart, Search, Menu, X, Laptop, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/app/context/CartContext";
import { CartDrawer } from "./CartDrawer";
import { SearchOverlay } from "./SearchOverlay";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import { usePathname } from "next/navigation";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { setIsCartOpen, cartCount } = useCart();
    const { user, signOut } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Global keyboard shortcut for search
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const isActive = (path: string) => pathname === path;

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
                    <div className="hidden md:flex items-center gap-4 lg:gap-8">
                        <Link
                            href="/"
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                isActive("/") ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            Home
                        </Link>
                        <Link
                            href="/products"
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                isActive("/products") ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            Laptops
                        </Link>

                        {/* Build Your Own PC - Featured Link */}
                        <Link href="/build-custom-pc" className="relative group">
                            <motion.div
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-bold transition-all duration-300",
                                    isActive("/build-custom-pc")
                                        ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(255,255,255,0.3)] dark:shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                                        : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                                )}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <span className="lg:hidden">Build PC</span>
                                    <span className="hidden lg:inline">Build Your Own PC</span>
                                    {isActive("/build-custom-pc") && (
                                        <motion.div
                                            layoutId="active-dot"
                                            className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"
                                        />
                                    )}
                                </span>
                            </motion.div>
                        </Link>

                        <Link
                            href="/about"
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                isActive("/about") ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                isActive("/contact") ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            Contact
                        </Link>
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-primary"
                            onClick={() => setIsSearchOpen(true)}
                        >
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
                    <div className="flex items-center gap-2 md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-primary"
                            onClick={() => setIsSearchOpen(true)}
                        >
                            <Search size={20} />
                        </Button>
                        <button
                            className="p-2 text-muted-foreground hover:text-primary"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
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
                                    className={cn(
                                        "text-sm font-medium py-2 border-b border-border/50",
                                        isActive("/") ? "text-primary" : "text-muted-foreground"
                                    )}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/products"
                                    className={cn(
                                        "text-sm font-medium py-2 border-b border-border/50",
                                        isActive("/products") ? "text-primary" : "text-muted-foreground"
                                    )}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Laptops
                                </Link>
                                <Link
                                    href="/build-custom-pc"
                                    className={cn(
                                        "text-sm font-bold py-2 border-b border-border/50 flex items-center justify-between",
                                        isActive("/build-custom-pc") ? "text-primary" : "text-muted-foreground"
                                    )}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Build Your Own PC
                                    <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">New</span>
                                </Link>
                                <Link
                                    href="/about"
                                    className={cn(
                                        "text-sm font-medium py-2 border-b border-border/50",
                                        isActive("/about") ? "text-primary" : "text-muted-foreground"
                                    )}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    About
                                </Link>
                                <Link
                                    href="/contact"
                                    className={cn(
                                        "text-sm font-medium py-2 border-b border-border/50",
                                        isActive("/contact") ? "text-primary" : "text-muted-foreground"
                                    )}
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
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}
