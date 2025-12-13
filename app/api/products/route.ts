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
        const { name, brand, price, category, description, image, specs } = body;

        // Specs comes as stringified JSON from frontend, or we could send it as object.
        const parsedSpecs = typeof specs === 'string' ? JSON.parse(specs) : specs;

        if (!image) {
            return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
        }

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
                image, // This is the public URL from S3
                specs: parsedSpecs,
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
