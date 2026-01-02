import { createClient } from "@/lib/supabase/server";
import { getServiceSupabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

const ADMIN_EMAIL = "ranjanguptajeff@gmail.com";

// Helper to verify admin
async function verifyAdmin() {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) return false;
    return user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const isAdmin = await verifyAdmin();
        if (!isAdmin) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const { id } = await params;
        const serviceSupabase = getServiceSupabase();

        // Delete the product
        const { error } = await serviceSupabase
            .from("products")
            .delete()
            .eq("id", id);

        if (error) throw error;

        return NextResponse.json({ message: "Product deleted" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const isAdmin = await verifyAdmin();
        if (!isAdmin) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const { id } = await params;
        const serviceSupabase = getServiceSupabase();

        // Check Content-Type to determine how to parse
        const contentType = request.headers.get("content-type") || "";
        let body: any = {};

        if (contentType.includes("application/json")) {
            body = await request.json();
        } else {
            // Fallback for FormData (legacy/manual upload support) mechanism
            // Ideally we move completely to client-side upload + JSON
            const formData = await request.formData();
            body = Object.fromEntries(formData);

            // Handle Specs JSON
            if (typeof body.specs === 'string') {
                try {
                    body.specs = JSON.parse(body.specs);
                } catch (e) { }
            }
            // Handle Numbers
            if (body.price) body.price = parseFloat(body.price);

            // Handle Images manually if passed as files (Basic support for single image old flow)
            const newImageFile = formData.get("image") as File;
            if (newImageFile && newImageFile.size > 0) {
                // ... (Keep existing upload logic if absolutely needed, but for now assuming we leverage client-side upload)
                const fileExt = newImageFile.name.split(".").pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;
                const arrayBuffer = await newImageFile.arrayBuffer();
                const buffer = new Uint8Array(arrayBuffer);
                const { error: uploadError } = await serviceSupabase.storage.from("products").upload(filePath, buffer, { contentType: newImageFile.type, upsert: false });
                if (!uploadError) {
                    const { data: { publicUrl } } = serviceSupabase.storage.from("products").getPublicUrl(filePath);
                    body.image = publicUrl;
                    body.images = [publicUrl]; // Reset to single if uploading new file via legacy
                }
            }
        }

        const { name, brand, price, category, description, image, images, specs, is_featured } = body;

        // Ensure consistency
        let finalImages = images;
        if (!finalImages && image) {
            finalImages = [image];
        }
        const finalImage = image || (finalImages && finalImages.length > 0 ? finalImages[0] : null);

        const updateData: any = {
            name,
            brand,
            price,
            category,
            description,
            image: finalImage,
            images: finalImages,
            specs,
            is_featured: Boolean(is_featured),
            is_hero_slider: Boolean(body.is_hero_slider),
            hero_slider_order: body.hero_slider_order ? parseInt(body.hero_slider_order) : null,
            hero_title: body.hero_title || null,
            hero_subtitle: body.hero_subtitle || null,
            hero_cta_primary: body.hero_cta_primary || null,
            hero_cta_secondary: body.hero_cta_secondary || null,
            hero_highlight_specs: body.hero_highlight_specs || null,
            hero_image_url: body.hero_image_url || null,
        };

        const { data, error } = await serviceSupabase
            .from("products")
            .update(updateData)
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Error updating product:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const isAdmin = await verifyAdmin();
        if (!isAdmin) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const { id } = await params;
        const body = await request.json();
        const serviceSupabase = getServiceSupabase();

        // Validate body keys to ensure only allowed fields are updated
        // For now, we trust the admin, but ideally we should validate

        const { data, error } = await serviceSupabase
            .from("products")
            .update(body)
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
