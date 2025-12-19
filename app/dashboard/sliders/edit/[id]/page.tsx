
"use client";

import { AdminSliderForm } from "@/components/admin/AdminSliderForm";
import { Slider } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function EditSliderPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [slider, setSlider] = useState<Slider | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchSlider = async () => {
            try {
                // Fetch all sliders and find the one with the matching ID


                const res = await fetch("/api/sliders");
                const data: Slider[] = await res.json();
                const found = data.find((s) => s.id === id);

                if (found) {
                    setSlider(found);
                } else {
                    router.push("/dashboard/sliders");
                }
            } catch (error) {
                console.error("Error fetching slider:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSlider();
    }, [id, router]);

    if (isLoading) return <div>Loading...</div>;
    if (!slider) return <div>Slider not found</div>;

    return (
        <div className="space-y-8 pt-24 max-w-5xl mx-auto px-6">
            <div className="flex flex-col gap-4">
                {/* Breadcrumb / Back Navigation */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
                    <span>/</span>
                    <Link href="/dashboard/sliders" className="hover:text-primary transition-colors">Sliders</Link>
                    <span>/</span>
                    <span className="text-foreground font-medium">Edit Slider</span>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Edit Slider</h1>
                        <p className="text-muted-foreground mt-1">Update slider details and hero image.</p>
                    </div>
                </div>
            </div>

            <AdminSliderForm initialData={slider || undefined} isEditing hideTitle />
        </div>
    );
}

