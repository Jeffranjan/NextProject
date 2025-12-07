"use client";

import { useState, useEffect } from "react";
import { Part } from "@/lib/pc-parts";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Edit, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function AdminPCPartsList() {
    const [parts, setParts] = useState<Part[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchParts();
    }, []);

    const fetchParts = async () => {
        try {
            const { data, error } = await supabase
                .from("pc_parts")
                .select("*")
                .order("category", { ascending: true }); // Order by category first

            if (error) throw error;

            setParts(data as Part[]);
        } catch (error) {
            console.error("Error fetching parts:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this part?")) return;

        try {
            const { error } = await supabase
                .from("pc_parts")
                .delete()
                .eq("id", id);

            if (error) throw error;

            setParts(parts.filter(p => p.id !== id));
            router.refresh();
        } catch (error) {
            console.error("Error deleting part:", error);
            alert("Failed to delete part");
        }
    };

    if (isLoading) return <div>Loading PC parts...</div>;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">PC Parts Management</h2>
                <Link href="/dashboard/parts/add">
                    <Button className="flex items-center gap-2">
                        <Plus size={16} /> Add Part
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
                        {parts.map((part) => (
                            <tr key={part.id} className="hover:bg-muted/20 transition-colors">
                                <td className="p-4">
                                    <div className="relative w-12 h-12 rounded-md overflow-hidden bg-secondary">
                                        <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground font-bold bg-white">
                                            IMG
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 font-medium">{part.title}</td>
                                <td className="p-4">₹{part.price.toLocaleString("en-IN")}</td>
                                <td className="p-4">
                                    <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs uppercase font-bold">
                                        {part.category}
                                    </span>
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    <Link href={`/dashboard/parts/edit/${part.id}`}>
                                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                            <Edit size={14} />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="h-8 w-8 p-0"
                                        onClick={() => handleDelete(part.id)}
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
