import { createClient } from "@/lib/supabase/client";
import { Laptop } from "@/lib/types";

export async function getProducts(): Promise<Laptop[]> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching products:", error);
        return [];
    }

    return data.map((product: any) => ({
        ...product,
        specs: typeof product.specs === 'string' ? JSON.parse(product.specs) : product.specs,
    })) as Laptop[];
}

export async function getProduct(id: string): Promise<Laptop | null> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching product:", error);
        return null;
    }

    return {
        ...data,
        specs: typeof data.specs === 'string' ? JSON.parse(data.specs) : data.specs,
    } as Laptop;
}

export async function getFeaturedProducts(): Promise<Laptop[]> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .limit(4)
        .order("rating", { ascending: false });

    if (error) {
        console.error("Error fetching featured products:", error);
        return [];
    }

    return data.map((product: any) => ({
        ...product,
        specs: typeof product.specs === 'string' ? JSON.parse(product.specs) : product.specs,
    })) as Laptop[];
}
