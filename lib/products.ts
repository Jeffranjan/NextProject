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
        .eq("is_featured", true)
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

export async function updateProductFeaturedStatus(id: string, isFeatured: boolean) {
    const supabase = createClient();
    const { error } = await supabase
        .from("products")
        .update({ is_featured: isFeatured })
        .eq("id", id);

    if (error) {
        console.error("Error updating featured status:", error);
        throw error;
    }
}

export async function getHeroSliders(): Promise<Laptop[]> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_hero_slider", true)
        .order("hero_slider_order", { ascending: true });

    if (error) {
        console.error("Error fetching hero sliders:", error);
        return [];
    }

    return data.map((product: any) => ({
        ...product,
        specs: typeof product.specs === 'string' ? JSON.parse(product.specs) : product.specs,
        hero_highlight_specs: typeof product.hero_highlight_specs === 'string' ? JSON.parse(product.hero_highlight_specs) : product.hero_highlight_specs
    })) as Laptop[];
}
