
import { NextRequest, NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const supabase = getServiceSupabase();

        // Basic validation could go here

        const { error } = await supabase
            .from("pc_parts")
            .insert(body);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Error creating part:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
