"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const ADMIN_EMAIL = "ranjanguptajeff@gmail.com";

export default function AddProductPage() {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const supabase = createClient();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        price: "",
        category: "Gaming",
        description: "",
        cpu: "",
        ram: "",
        storage: "",
        screen: "",
    });

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                router.push("/auth");
            } else if (user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
                router.push("/dashboard");
            }
        }
    }, [user, isLoading, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!imageFile) {
            alert("Please upload an image");
            return;
        }

        setIsSubmitting(true);

        try {
            // Create FormData to send file + data to server
            const formDataToSend = new FormData();
            formDataToSend.append("image", imageFile);
            formDataToSend.append("name", formData.name);
            formDataToSend.append("brand", formData.brand);
            formDataToSend.append("price", formData.price);
            formDataToSend.append("category", formData.category);
            formDataToSend.append("description", formData.description);

            // Serialize specs to JSON string
            const specs = {
                cpu: formData.cpu,
                ram: formData.ram,
                storage: formData.storage,
                screen: formData.screen,
            };
            formDataToSend.append("specs", JSON.stringify(specs));

            // Send to API
            const response = await fetch("/api/products", {
                method: "POST",
                body: formDataToSend,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to create product");
            }

            alert("Product added successfully!");
            router.push("/dashboard");
            router.refresh();
        } catch (error: any) {
            console.error("Error adding product:", error);
            alert("Error adding product: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading || !user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 container mx-auto max-w-3xl">
            <Link
                href="/dashboard"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
            >
                <ArrowLeft size={16} className="mr-2" />
                Back to Dashboard
            </Link>

            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Product Name</label>
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Blade 16"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Brand</label>
                            <Input
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                placeholder="e.g. Razer"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Price (₹)</label>
                            <Input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="99999"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="Gaming">Gaming</option>
                                <option value="Ultrabook">Ultrabook</option>
                                <option value="Business">Business</option>
                                <option value="Creative">Creative</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Product description..."
                            required
                        />
                    </div>

                    {/* Specs */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Technical Specifications</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">CPU</label>
                                <Input
                                    name="cpu"
                                    value={formData.cpu}
                                    onChange={handleChange}
                                    placeholder="e.g. Intel Core i9"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">RAM</label>
                                <Input
                                    name="ram"
                                    value={formData.ram}
                                    onChange={handleChange}
                                    placeholder="e.g. 32GB DDR5"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Storage</label>
                                <Input
                                    name="storage"
                                    value={formData.storage}
                                    onChange={handleChange}
                                    placeholder="e.g. 1TB SSD"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Screen</label>
                                <Input
                                    name="screen"
                                    value={formData.screen}
                                    onChange={handleChange}
                                    placeholder="e.g. 16 inch OLED"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Product Image</label>
                        <div className="flex items-center gap-4">
                            <div className="relative w-32 h-32 bg-secondary/30 rounded-lg border border-dashed border-border flex items-center justify-center overflow-hidden">
                                {imagePreview ? (
                                    <Image
                                        src={imagePreview}
                                        alt="Preview"
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <Upload className="text-muted-foreground" />
                                )}
                            </div>
                            <div className="flex-1">
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="cursor-pointer"
                                />
                                <p className="text-xs text-muted-foreground mt-2">
                                    Recommended: 800x600px or larger. Max 5MB.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Creating Product..." : "Create Product"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
