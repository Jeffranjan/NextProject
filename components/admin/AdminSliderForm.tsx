"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Slider } from "@/lib/types";
import { ArrowLeft, Plus, X, Upload } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface AdminSliderFormProps {
    initialData?: Slider;
    isEditing?: boolean;
    hideTitle?: boolean;
}

export function AdminSliderForm({ initialData, isEditing = false, hideTitle = false }: AdminSliderFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);

    // Default Tech Specs
    const defaultTechSpecs = {
        cpu: "",
        ram: "",
        storage: "",
        screen: "",
    };

    const [formData, setFormData] = useState<Partial<Slider>>({
        title: initialData?.title || "",
        tag: initialData?.tag || "",
        description: initialData?.description || "",
        highlight: initialData?.highlight || "",
        brand: initialData?.brand || "",
        price: initialData?.price || 0,
        active: initialData?.active ?? true,
        image: initialData?.image || "",
        accent: initialData?.accent || "bg-blue-500",
        order: initialData?.order || 0,
        // @ts-ignore
        specs: initialData?.specs || [
            { icon: "Cpu", label: "Processor", value: "" },
            { icon: "Zap", label: "Memory", value: "" },
            { icon: "Battery", label: "Battery", value: "" }
        ],
        technical_specs: initialData?.technical_specs || defaultTechSpecs
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleTechSpecChange = (field: keyof typeof defaultTechSpecs, value: string) => {
        setFormData(prev => ({
            ...prev,
            technical_specs: {
                ...prev.technical_specs!,
                [field]: value
            }
        }));
    };

    const handleSpecChange = (index: number, field: "icon" | "label" | "value", value: string) => {
        const newSpecs = [...(formData.specs || [])];
        newSpecs[index] = { ...newSpecs[index], [field]: value };
        setFormData(prev => ({ ...prev, specs: newSpecs }));
    };

    const addSpecRow = () => {
        setFormData(prev => ({
            ...prev,
            specs: [...(prev.specs || []), { icon: "Star", label: "", value: "" }]
        }));
    };

    const removeSpecRow = (index: number) => {
        setFormData(prev => ({
            ...prev,
            specs: prev.specs?.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.image) {
            toast.error("Please upload an image");
            return;
        }

        setIsSubmitting(true);

        try {
            const url = isEditing && initialData?.id
                ? `/api/sliders/${initialData.id}`
                : "/api/sliders";

            const method = isEditing ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Failed to save slider");
            }

            toast.success("Slider saved successfully!");
            router.push("/dashboard?tab=sliders");
            router.refresh();
        } catch (error: any) {
            console.error("Error saving slider:", error);
            toast.error(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                {!hideTitle && <h1 className="text-2xl font-bold mb-6">{isEditing ? "Edit Slider" : "Add New Slider"}</h1>}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Title</label>
                                <Input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. MacBook Pro 16"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Highlight Subtitle</label>
                                <Input
                                    name="highlight"
                                    value={formData.highlight}
                                    onChange={handleChange}
                                    placeholder="e.g. M3 Max Powerhouse"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Tag Badge</label>
                                <Input
                                    name="tag"
                                    value={formData.tag}
                                    onChange={handleChange}
                                    placeholder="e.g. New Release"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Brand</label>
                                <Input
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    placeholder="e.g. Apple"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Price</label>
                                <Input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="249900"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Display Order</label>
                                <Input
                                    type="number"
                                    name="order"
                                    value={formData.order}
                                    onChange={handleChange}
                                    placeholder="0"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Accent Color Class</label>
                                <Input
                                    name="accent"
                                    value={formData.accent}
                                    onChange={handleChange}
                                    placeholder="bg-blue-500"
                                />
                                <p className="text-xs text-muted-foreground">Tailwind class (e.g. bg-blue-500)</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Slider description..."
                            required
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Hero Image</label>
                        <div className="flex items-center gap-4">
                            <div className="relative w-40 h-32 bg-secondary/30 rounded-lg border border-dashed border-border flex items-center justify-center overflow-hidden">
                                {imagePreview ? (
                                    <Image
                                        src={imagePreview}
                                        alt="Preview"
                                        fill
                                        className="object-contain p-2"
                                    />
                                ) : (
                                    <div className="text-center p-2">
                                        <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
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
                                        setImagePreview(publicUrl);
                                        setFormData(prev => ({ ...prev, image: publicUrl }));
                                    }}
                                    className="cursor-pointer"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Upload transparent PNG for best results.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Technical Specs (Fixed) */}
                    <div className="space-y-4 pt-4 border-t">
                        <h3 className="font-semibold text-lg">Technical Specifications</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {Object.keys(defaultTechSpecs).map((key) => (
                                <div key={key} className="space-y-2">
                                    <label className="text-sm font-medium capitalize">{key}</label>
                                    <Input
                                        value={formData.technical_specs?.[key as keyof typeof defaultTechSpecs] || ""}
                                        onChange={(e) => handleTechSpecChange(key as keyof typeof defaultTechSpecs, e.target.value)}
                                        placeholder={`Enter ${key}...`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Feature Specs (Dynamic) */}
                    <div className="space-y-4 pt-4 border-t">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg">Feature Highlights (Icons)</h3>
                            <Button type="button" variant="outline" size="sm" onClick={addSpecRow}>
                                <Plus size={14} className="mr-1" /> Add Highlight
                            </Button>
                        </div>
                        <div className="space-y-3">
                            {formData.specs?.map((spec, index) => (
                                <div key={index} className="flex gap-3">
                                    <Input
                                        placeholder="Icon Name (e.g. Cpu)"
                                        value={spec.icon}
                                        onChange={(e) => handleSpecChange(index, "icon", e.target.value)}
                                        className="w-1/4"
                                    />
                                    <Input
                                        placeholder="Label (e.g. Processor)"
                                        value={spec.label}
                                        onChange={(e) => handleSpecChange(index, "label", e.target.value)}
                                        className="w-1/3"
                                    />
                                    <Input
                                        placeholder="Value (e.g. M3 Max)"
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
                            <p className="text-xs text-muted-foreground">Supported Icons: Cpu, Zap, Battery, Star, Shield, Laptop, etc.</p>
                        </div>
                    </div>

                    <div className="pt-6">
                        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save Slider"}
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
}
