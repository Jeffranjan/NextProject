"use client";

import { useEffect, useState } from "react";
import { AdminSliderList } from "@/components/admin/AdminSliderList";
import { Button } from "@/components/ui/Button";
import { Plus, Info } from "lucide-react";
import Link from "next/link";

export default function AdminSlidersPage() {
    const [sliderCount, setSliderCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const res = await fetch("/api/sliders");
                if (res.ok) {
                    const data = await res.json();
                    setSliderCount(data.length);
                }
            } catch (error) {
                console.error("Failed to fetch sliders count", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCount();
    }, []);

    const isLimitReached = sliderCount >= 5;

    return (
        <div className="space-y-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Sliders Management</h1>
                    <p className="text-muted-foreground mt-2">Manage homepage hero sliders.</p>
                </div>
                {isLimitReached ? (
                    <div className="flex flex-col items-end gap-1">
                        <Button disabled className="flex items-center gap-2 opacity-50 cursor-not-allowed">
                            <Plus size={16} /> Add Slider
                        </Button>
                        <p className="text-xs text-amber-500 font-medium flex items-center gap-1">
                            <Info size={12} /> Limit reached (Max 5)
                        </p>
                    </div>
                ) : (
                    <Link href="/dashboard/sliders/add">
                        <Button className="flex items-center gap-2">
                            <Plus size={16} /> Add Slider
                        </Button>
                    </Link>
                )}
            </div>
            <AdminSliderList />
        </div>
    );
}
