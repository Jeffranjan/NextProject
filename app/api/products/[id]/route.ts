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
        const formData = await request.formData();
        const serviceSupabase = getServiceSupabase();

        // Extract data
        const name = formData.get("name") as string;
        const brand = formData.get("brand") as string;
        const price = formData.get("price") as string;
        const category = formData.get("category") as string;
        const description = formData.get("description") as string;
        const specsString = formData.get("specs") as string;
        const specs = specsString ? JSON.parse(specsString) : {};

        let image = formData.get("existingImage") as string;
        const newImageFile = formData.get("image") as File;

        // Handle new image upload if present
        if (newImageFile && newImageFile.size > 0) {
            const fileExt = newImageFile.name.split(".").pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const arrayBuffer = await newImageFile.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);

            const { error: uploadError } = await serviceSupabase.storage
                .from("products")
                .upload(filePath, buffer, {
                    contentType: newImageFile.type,
                    upsert: false
                });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = serviceSupabase.storage
                .from("products")
                .getPublicUrl(filePath);

            image = publicUrl;
        }

        // Update product
        const { data, error } = await serviceSupabase
            .from("products")
            .update({
                name,
                brand,
                price: parseFloat(price),
                category,
                description,
                image,
                specs,
            })
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
