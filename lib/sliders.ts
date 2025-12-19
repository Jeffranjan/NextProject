import { createClient } from "@/lib/supabase/client";
import { Slider } from "@/lib/types";

export async function getActiveSliders(): Promise<Slider[]> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("sliders")
        .select("*")
        .eq("active", true)
        .order("order", { ascending: true })
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching sliders:", error);
        return [];
    }

    return data as Slider[];
}
