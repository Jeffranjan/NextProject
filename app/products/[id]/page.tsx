import { Navbar } from "@/components/ui/Navbar";
import { Button } from "@/components/ui/Button";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { laptops } from "@/lib/data";
import { ArrowLeft, Check, Shield, Truck, Star } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const product = laptops.find((l) => l.id === id);

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <div className="pt-24 pb-12 container mx-auto px-4">
                <Link
                    href="/products"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
                >
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Laptops
                </Link>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Product Image Placeholder */}
                    <div className="space-y-4">
                        <div className="aspect-[4/3] bg-secondary/50 rounded-2xl overflow-hidden relative flex items-center justify-center border border-border">
                            <div className="text-6xl font-bold text-muted-foreground/20">
                                {product.brand}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-black/5" />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="aspect-square bg-secondary/30 rounded-lg border border-border cursor-pointer hover:border-primary transition-colors"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-primary px-3 py-1 bg-primary/10 rounded-full">
                                    {product.category}
                                </span>
                                <div className="flex items-center gap-1 text-amber-500 text-sm font-medium">
                                    <Star size={16} fill="currentColor" />
                                    4.8 (124 reviews)
                                </div>
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight mb-4">
                                {product.name}
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        <div className="flex items-baseline gap-4 pb-6 border-b border-border">
                            <span className="text-4xl font-bold">
                                ₹{product.price.toLocaleString()}
                            </span>
                            <span className="text-muted-foreground line-through text-lg">
                                ₹{(product.price * 1.1).toFixed(0).toLocaleString()}
                            </span>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Tech Specs</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(product.specs).map(([key, value]) => (
                                    <div
                                        key={key}
                                        className="p-3 rounded-lg bg-secondary/30 border border-border"
                                    >
                                        <span className="text-xs text-muted-foreground uppercase font-semibold block mb-1">
                                            {key}
                                        </span>
                                        <span className="font-medium">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 pt-4">
                            <AddToCartButton product={product} />
                            <p className="text-xs text-center text-muted-foreground">
                                Free shipping worldwide • 30-day return policy
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/20">
                                <Truck className="text-primary" />
                                <div className="text-sm">
                                    <p className="font-medium">Fast Delivery</p>
                                    <p className="text-muted-foreground">2-3 business days</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/20">
                                <Shield className="text-primary" />
                                <div className="text-sm">
                                    <p className="font-medium">Warranty</p>
                                    <p className="text-muted-foreground">2 years included</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
