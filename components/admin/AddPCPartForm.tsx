"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ArrowLeft, Plus, X } from "lucide-react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/pc-parts";

export default function AddPCPartForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        branch: "",
        price: "",
        category: "cpu",
        image: "/images/parts/cpu-intel.png", // Default placeholder
    });

    // Dynamic Specs State
    const [specs, setSpecs] = useState<{ key: string; value: string }[]>([
        { key: "base_clock", value: "" },
        { key: "cores", value: "" }
    ]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSpecChange = (index: number, field: "key" | "value", value: string) => {
        const newSpecs = [...specs];
        newSpecs[index][field] = value;
        setSpecs(newSpecs);
    };

    const addSpecRow = () => {
        setSpecs([...specs, { key: "", value: "" }]);
    };

    const removeSpecRow = (index: number) => {
        setSpecs(specs.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Convert specs array to object
            const specsObject = specs.reduce((acc, curr) => {
                if (curr.key.trim()) {
                    acc[curr.key.trim()] = curr.value;
                }
                return acc;
            }, {} as Record<string, string>);

            // Generate a random ID (or let Supabase handle it if default gen_random_uuid() was set, 
            // but our current schema defines ID as text and manual insert in seed.
            // Let's use crypto.randomUUID() for a unique string ID.
            const newId = `${formData.category}-${crypto.randomUUID().split('-')[0]}`;

            const { error } = await supabase.from("pc_parts").insert({
                id: newId,
                category: formData.category,
                title: formData.title,
                branch: formData.branch,
                price: parseFloat(formData.price),
                image: formData.image,
                specs: specsObject,
            });

            if (error) throw error;

            alert("Part added successfully!");
            router.push("/dashboard");
            router.refresh();
        } catch (error: any) {
            console.error("Error adding part:", error);
            alert("Error adding part: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Link
                href="/dashboard"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
                <ArrowLeft size={16} className="mr-2" />
                Back to Dashboard
            </Link>

            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                <h1 className="text-2xl font-bold mb-6">Add New PC Component</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Details */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Component Name</label>
                            <Input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Intel Core i5-13600K"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Brand</label>
                            <Input
                                name="branch"
                                value={formData.branch}
                                onChange={handleChange}
                                placeholder="e.g. Intel"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                {CATEGORIES.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Price (₹)</label>
                            <Input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="24999"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Product Image</label>
                        <div className="flex items-center gap-4">
                            <div className="relative w-32 h-32 bg-secondary/30 rounded-lg border border-dashed border-border flex items-center justify-center overflow-hidden">
                                {formData.image ? (
                                    <img
                                        src={formData.image}
                                        alt="Preview"
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <div className="text-center p-2">
                                        <div className="text-xs text-muted-foreground">No image</div>
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 space-y-2">
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;

                                        // 1. Get Presigned URL
                                        const res = await fetch("/api/upload/presign", {
                                            method: "POST",
                                            body: JSON.stringify({ fileName: file.name, fileType: file.type }),
                                        });
                                        const { uploadUrl, publicUrl } = await res.json();

                                        // 2. Upload to S3
                                        await fetch(uploadUrl, {
                                            method: "PUT",
                                            body: file,
                                            headers: { "Content-Type": file.type },
                                        });

                                        // 3. Set Image URL
                                        setFormData(prev => ({ ...prev, image: publicUrl }));
                                    }}
                                    className="cursor-pointer"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Uploads directly to Supabase Storage (S3).
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Specs Section */}
                    <div className="space-y-4 pt-4 border-t">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg">Specifications</h3>
                            <Button type="button" variant="outline" size="sm" onClick={addSpecRow}>
                                <Plus size={14} className="mr-1" /> Add Spec
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {specs.map((spec, index) => (
                                <div key={index} className="flex gap-3">
                                    <Input
                                        placeholder="Key (e.g. Cores)"
                                        value={spec.key}
                                        onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                                        className="flex-1"
                                    />
                                    <Input
                                        placeholder="Value (e.g. 16)"
                                        value={spec.value}
                                        onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                                        className="flex-1"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeSpecRow(index)}
                                        className="text-muted-foreground hover:text-destructive"
                                    >
                                        <X size={16} />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6">
                        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                            {isSubmitting ? "Adding Component..." : "Add Component"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
