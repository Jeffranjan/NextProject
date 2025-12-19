"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/lib/types";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface AdminSliderListProps {
    onUpdate?: (count: number) => void;
}

export function AdminSliderList({ onUpdate }: AdminSliderListProps) {
    const [sliders, setSliders] = useState<Slider[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchSliders();
    }, []);

    const fetchSliders = async () => {
        try {
            const response = await fetch("/api/sliders");
            if (!response.ok) throw new Error("Failed to fetch sliders");
            const data = await response.json();
            setSliders(data);
            if (onUpdate) onUpdate(data.length);
        } catch (error) {
            console.error("Error fetching sliders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this slider?")) return;

        try {
            const response = await fetch(`/api/sliders/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete");

            const newSliders = sliders.filter(s => s.id !== id);
            setSliders(newSliders);
            if (onUpdate) onUpdate(newSliders.length);
            toast.success("Slider deleted successfully");
            router.refresh();
        } catch (error) {
            console.error("Error deleting slider:", error);
            toast.error("Failed to delete slider");
        }
    };

    const toggleActive = async (slider: Slider) => {
        try {
            const response = await fetch(`/api/sliders/${slider.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ active: !slider.active }),
            });

            if (!response.ok) throw new Error("Failed to update status");

            setSliders(sliders.map(s => s.id === slider.id ? { ...s, active: !s.active } : s));
            router.refresh();
        } catch (error) {
            console.error("Error updating slider:", error);
        }
    };

    if (isLoading) return <div>Loading sliders...</div>;

    return (
        <div className="border border-border rounded-xl overflow-hidden shadow-sm bg-card">
            <table className="w-full text-sm text-left">
                <thead className="bg-muted/40 text-muted-foreground font-medium border-b border-border">
                    <tr>
                        <th className="p-4 pl-6 w-[100px]">Image</th>
                        <th className="p-4 w-[250px]">Title</th>
                        <th className="p-4 text-center">Tag</th>
                        <th className="p-4 text-center">Status</th>
                        <th className="p-4 pr-6 text-right w-[100px]">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {sliders.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="p-8 text-center text-muted-foreground">
                                No sliders found. Create one to get started.
                            </td>
                        </tr>
                    ) : (
                        sliders.map((slider) => (
                            <tr key={slider.id} className="group hover:bg-muted/30 transition-all border-b border-border/50 last:border-0">
                                <td className="p-4 pl-6">
                                    <div className="relative w-20 h-12 rounded-lg overflow-hidden bg-secondary/50 border border-border/50">
                                        <Image
                                            src={slider.image}
                                            alt={slider.title}
                                            fill
                                            className="object-contain p-1"
                                        />
                                    </div>
                                </td>
                                <td className="p-4 font-medium text-foreground">{slider.title}</td>
                                <td className="p-4 text-center">
                                    {slider.tag ? (
                                        <span className="inline-block px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                            {slider.tag}
                                        </span>
                                    ) : (
                                        <span className="text-muted-foreground text-xs">-</span>
                                    )}
                                </td>
                                <td className="p-4 text-center">
                                    <button
                                        onClick={() => toggleActive(slider)}
                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${slider.active
                                            ? "bg-green-500/15 text-green-600 dark:text-green-400 hover:bg-green-500/25"
                                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                                            }`}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full ${slider.active ? "bg-green-500" : "bg-neutral-400"}`} />
                                        {slider.active ? "Active" : "Inactive"}
                                    </button>
                                </td>
                                <td className="p-4 pr-6 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/dashboard/sliders/edit/${slider.id}`}>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                                <Edit size={15} />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                            onClick={() => handleDelete(slider.id)}
                                        >
                                            <Trash2 size={15} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
