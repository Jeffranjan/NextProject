import { createClient } from "@/lib/supabase/server";
import { getServiceSupabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

const ADMIN_EMAIL = "ranjanguptajeff@gmail.com";

export async function POST(request: Request) {
    try {
        // 1. Verify User (Authentication)
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 2. Verify Admin (Authorization)
        if (user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
            return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
        }

        // 3. Parse JSON Body
        const body = await request.json();
        const { name, brand, price, category, description, image, images, specs, is_featured } = body;

        // Specs comes as stringified JSON from frontend, or we could send it as object.
        const parsedSpecs = typeof specs === 'string' ? JSON.parse(specs) : specs;

        if (!image && (!images || images.length === 0)) {
            return NextResponse.json({ error: "At least one image is required" }, { status: 400 });
        }

        // Prepare images array
        let finalImages = images || [];
        if (finalImages.length === 0 && image) {
            finalImages = [image];
        }
        // Ensure primary image is set
        const finalImage = image || finalImages[0];

        // 4. Insert Product using Service Role (Bypass DB RLS)
        const serviceSupabase = getServiceSupabase();

        const { data, error } = await serviceSupabase
            .from("products")
            .insert({
                name,
                brand,
                price: parseFloat(price),
                category,
                description,
                image: finalImage,
                images: finalImages,
                specs: parsedSpecs,
                is_featured: is_featured || false,
                is_hero_slider: body.is_hero_slider || false,
                hero_slider_order: body.hero_slider_order || null,
                hero_title: body.hero_title || null,
                hero_subtitle: body.hero_subtitle || null,
                hero_cta_primary: body.hero_cta_primary || null,
                hero_cta_secondary: body.hero_cta_secondary || null,
                hero_highlight_specs: body.hero_highlight_specs || null,
                hero_image_url: body.hero_image_url || null,
            })
            .select()
            .single();

        if (error) {
            console.error("Database error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        console.error("Server error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
