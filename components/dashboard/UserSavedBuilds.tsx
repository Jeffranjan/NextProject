"use client";

import { useState, useEffect } from "react";
import { SavedBuild } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { Cpu, Edit, Trash2, ShoppingCart, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/app/context/CartContext";
import { Laptop } from "@/lib/types";
import { useRouter } from "next/navigation";

export function UserSavedBuilds() {
    const [builds, setBuilds] = useState<SavedBuild[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchBuilds();
    }, []);

    const { addItem } = useCart();
    const router = useRouter();

    const handleBuy = (build: SavedBuild) => {
        // Convert SavedBuild to Laptop (CartItem structure)
        const customBuild: Laptop = {
            id: build.id, // Use build ID or generate unique one
            name: build.name,
            brand: "Custom",
            price: build.total_cost,
            description: "Custom configuration from saved builds.",
            category: "Gaming", // Default or could be dynamic
            image: build.components['case']?.image || "/images/parts/case-1.png",
            specs: {
                cpu: build.components['cpu']?.title || "N/A",
                ram: build.components['ram']?.title || "N/A",
                storage: build.components['storage']?.title || "N/A",
                screen: "Custom Configuration"
            }
        };

        addItem(customBuild);
        router.push("/checkout");
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this build?")) return;

        try {
            const supabase = createClient();
            const { error } = await supabase
                .from("saved_builds")
                .delete()
                .eq("id", id);

            if (error) throw error;

            setBuilds(builds.filter(build => build.id !== id));
        } catch (error) {
            console.error("Error deleting build:", error);
            alert("Failed to delete build");
        }
    };

    const fetchBuilds = async () => {
        try {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) return;

            const { data, error } = await supabase
                .from("saved_builds")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching saved builds:", error);
                setBuilds([]);
            } else {
                setBuilds(data as SavedBuild[]);
            }
        } catch (error) {
            console.error("Error fetching saved builds:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (builds.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center p-12 bg-card border border-border rounded-xl text-center space-y-4"
            >
                <div className="p-4 bg-muted/50 rounded-full">
                    <Cpu className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">No saved builds yet</h3>
                    <p className="text-muted-foreground max-w-sm mt-1">
                        Start building your custom PC and save it to view it here.
                    </p>
                </div>
                <Link href="/build-custom-pc">
                    <Button>Build Your PC</Button>
                </Link>
            </motion.div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {builds.map((build) => (
                <BuildCard key={build.id} build={build} onDelete={handleDelete} onBuy={handleBuy} />
            ))}
        </div>
    );
}

function BuildCard({ build, onDelete, onBuy }: { build: SavedBuild, onDelete: (id: string) => void, onBuy: (build: SavedBuild) => void }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const components = Object.entries(build.components);
    // Prioritize showing important components first if needed, but default order is usually okay.
    // We'll show first 5 items initially.
    const INITIAL_VISIBLE_COUNT = 5;
    const visibleComponents = isExpanded ? components : components.slice(0, INITIAL_VISIBLE_COUNT);
    const hiddenCount = components.length - INITIAL_VISIBLE_COUNT;

    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm flex flex-col transition-all duration-200 hover:shadow-md">
            <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4 pb-4 border-b border-border/50">
                    <div>
                        <h3 className="font-semibold text-lg line-clamp-1" title={build.name}>{build.name}</h3>
                        <p className="text-xs text-muted-foreground">
                            {new Date(build.created_at).toLocaleDateString()}
                        </p>
                    </div>
                    <span className="font-bold text-primary bg-primary/10 px-2 py-1 rounded text-sm">
                        ₹{build.total_cost.toLocaleString()}
                    </span>
                </div>

                <div className="space-y-3">
                    <AnimatePresence initial={false}>
                        {visibleComponents.map(([category, part]: [string, any]) => (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex justify-between items-center text-sm gap-2"
                            >
                                <span className="text-muted-foreground capitalize text-xs font-medium min-w-[80px] shrink-0">
                                    {category}
                                </span>
                                <span className="truncate text-foreground/90 font-medium text-right" title={part.title || part.name}>
                                    {part.title || part.name}
                                </span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {hiddenCount > 0 && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full mt-4 flex items-center justify-center gap-1 text-xs text-primary font-medium hover:underline p-1 transition-colors"
                    >
                        {isExpanded ? (
                            <>Show Less <ChevronUp size={14} /></>
                        ) : (
                            <>View full build (+{hiddenCount} more) <ChevronDown size={14} /></>
                        )}
                    </button>
                )}
            </div>

            <div className="p-4 bg-muted/30 border-t border-border flex gap-2">
                <Link href={`/build-custom-pc?edit=${build.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full gap-2">
                        <Edit size={14} /> Edit
                    </Button>
                </Link>
                <Button size="sm" className="flex-1 gap-2" onClick={() => onBuy(build)}>
                    <ShoppingCart size={14} /> Buy
                </Button>
                <Button
                    variant="destructive"
                    size="sm"
                    className="px-3"
                    onClick={() => onDelete(build.id)}
                >
                    <Trash2 size={14} />
                </Button>
            </div>
        </div>
    );
}
