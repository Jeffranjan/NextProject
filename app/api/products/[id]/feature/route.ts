import { createClient } from "@/lib/supabase/server";
import { getServiceSupabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

const ADMIN_EMAIL = "ranjanguptajeff@gmail.com";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // 1. Verify User & Admin
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
            return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
        }

        const { id } = await params;
        const body = await request.json();
        const { is_featured } = body;

        // 2. Update using Service Role
        const serviceSupabase = getServiceSupabase();

        const { data, error } = await serviceSupabase
            .from("products")
            .update({ is_featured })
            .eq("id", id)
            .select()
            .single();

        if (error) {
            console.error("Database error:", error);
            throw error;
        }

        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Error updating featured status:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
