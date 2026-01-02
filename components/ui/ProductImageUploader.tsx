"use client";

import { useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Input } from "./Input";

interface ProductImageUploaderProps {
    images: string[];
    setImages: (images: string[]) => void;
    maxImages?: number;
}

export function ProductImageUploader({
    images,
    setImages,
    maxImages = 3,
}: ProductImageUploaderProps) {
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        if (images.length >= maxImages) {
            toast.error(`You can only upload up to ${maxImages} images.`);
            return;
        }

        setIsUploading(true);
        try {
            // 1. Get Presigned URL
            const res = await fetch("/api/upload/presign", {
                method: "POST",
                body: JSON.stringify({ fileName: file.name, fileType: file.type }),
            });

            if (!res.ok) throw new Error("Failed to get upload URL");

            const { uploadUrl, publicUrl } = await res.json();

            // 2. Upload to Supabase Storage
            const uploadRes = await fetch(uploadUrl, {
                method: "PUT",
                body: file,
                headers: { "Content-Type": file.type },
            });

            if (!uploadRes.ok) throw new Error("Failed to upload image");

            // 3. Update State
            setImages([...images, publicUrl]);
            toast.success("Image uploaded successfully");
        } catch (error: any) {
            console.error(error);
            toast.error("Upload failed: " + error.message);
        } finally {
            setIsUploading(false);
            // Reset input
            e.target.value = "";
        }
    };

    const removeImage = (indexToRemove: number) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="space-y-4">
            <label className="text-sm font-medium">Product Images ({images.length}/{maxImages})</label>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((url, index) => (
                    <div key={url} className="relative aspect-square group rounded-lg overflow-hidden border border-border bg-secondary/30">
                        <Image
                            src={url}
                            alt={`Product Image ${index + 1}`}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                        <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
                        >
                            <X size={14} />
                        </button>
                        {index === 0 && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] text-center py-1">
                                Main Image
                            </div>
                        )}
                    </div>
                ))}

                {images.length < maxImages && (
                    <div className="relative aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-colors bg-secondary/10 flex flex-col items-center justify-center cursor-pointer">
                        <div className="absolute inset-0 cursor-pointer">
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleUpload}
                                disabled={isUploading}
                                className="w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                        {isUploading ? (
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        ) : (
                            <>
                                <Upload className="mb-2 text-muted-foreground" size={24} />
                                <span className="text-xs text-muted-foreground font-medium">Upload Image</span>
                            </>
                        )}
                    </div>
                )}
            </div>
            <p className="text-xs text-muted-foreground">
                First image will be the main thumbnail. Supported formats: JPG, PNG, WEBP.
            </p>
        </div>
    );
}
