"use client";

import { useState, useEffect } from "react";
import { Laptop } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Edit, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function AdminProductList() {
    const [products, setProducts] = useState<Laptop[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            // Reusing the public getProducts logic but fetching client-side for freshness
            // Or we can just hit the API if we had a GET endpoint there.
            // For now, let's use the server action wrapper or just fetch from supabase client directly
            // since reading is public.
            const { createClient } = await import("@/lib/supabase/client");
            const supabase = createClient();
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;

            // Parse specs if needed (though supabase client might handle json automatically)
            const parsedData = data.map((p: any) => ({
                ...p,
                specs: typeof p.specs === 'string' ? JSON.parse(p.specs) : p.specs
            }));

            setProducts(parsedData as Laptop[]);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            const response = await fetch(`/api/products/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete");

            setProducts(products.filter(p => p.id !== id));
            router.refresh();
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product");
        }
    };

    if (isLoading) return <div>Loading products...</div>;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Product Management</h2>
                <Link href="/dashboard/add-product">
                    <Button className="flex items-center gap-2">
                        <Plus size={16} /> Add Product
                    </Button>
                </Link>
            </div>

            <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground font-medium">
                        <tr>
                            <th className="p-4">Image</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Category</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-muted/20 transition-colors">
                                <td className="p-4">
                                    <div className="relative w-12 h-12 rounded-md overflow-hidden bg-secondary">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </td>
                                <td className="p-4 font-medium">{product.name}</td>
                                <td className="p-4">₹{product.price.toLocaleString()}</td>
                                <td className="p-4">
                                    <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    <Link href={`/dashboard/edit-product/${product.id}`}>
                                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                            <Edit size={14} />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="h-8 w-8 p-0"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        <Trash2 size={14} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
