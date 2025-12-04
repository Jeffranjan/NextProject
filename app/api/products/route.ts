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

        // 3. Parse FormData
        const formData = await request.formData();
        const imageFile = formData.get("image") as File;
        const name = formData.get("name") as string;
        const brand = formData.get("brand") as string;
        const price = formData.get("price") as string;
        const category = formData.get("category") as string;
        const description = formData.get("description") as string;

        // Parse specs from JSON string
        const specsString = formData.get("specs") as string;
        const specs = specsString ? JSON.parse(specsString) : {};

        if (!imageFile) {
            return NextResponse.json({ error: "Image is required" }, { status: 400 });
        }

        // 4. Upload Image using Service Role (Bypass Storage RLS)
        const serviceSupabase = getServiceSupabase();
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        // Convert File to ArrayBuffer for upload
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        const { error: uploadError } = await serviceSupabase.storage
            .from("products")
            .upload(filePath, buffer, {
                contentType: imageFile.type,
                upsert: false
            });

        if (uploadError) {
            console.error("Upload error:", uploadError);
            return NextResponse.json({ error: "Failed to upload image: " + uploadError.message }, { status: 500 });
        }

        const { data: { publicUrl } } = serviceSupabase.storage
            .from("products")
            .getPublicUrl(filePath);

        // 5. Insert Product using Service Role (Bypass DB RLS)
        const { data, error } = await serviceSupabase
            .from("products")
            .insert({
                name,
                brand,
                price: parseFloat(price),
                category,
                description,
                image: publicUrl,
                specs,
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
