import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("sliders")
            .select("*")
            .order("order", { ascending: true })
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching sliders:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Internal Server Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const supabase = await createClient();


        // Basic validation
        if (!body.title || !body.image) {
            return NextResponse.json({ error: "Title and Image are required" }, { status: 400 });
        }

        // Check slider limit (Max 5)
        const { count, error: countError } = await supabase
            .from("sliders")
            .select("*", { count: "exact", head: true });

        if (countError) {
            console.error("Error checking slider count:", countError);
            return NextResponse.json({ error: countError.message }, { status: 500 });
        }

        if (count && count >= 5) {
            return NextResponse.json({ error: "Maximum limit of 5 sliders reached. Please delete an existing slider to add a new one." }, { status: 400 });
        }

        const { data, error } = await supabase
            .from("sliders")
            .insert(body)
            .select()
            .single();

        if (error) {
            console.error("Error creating slider:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Internal Server Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
