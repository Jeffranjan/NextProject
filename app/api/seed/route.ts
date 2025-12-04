import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const heroProducts = [
    {
        name: "MacBook Pro 16",
        brand: "Apple",
        price: 249900,
        category: "Creative",
        image: "/images/macbook-pro-16.png",
        description: "Experience uncompromised performance with the M3 Max chip. Designed for creators who demand the absolute best.",
        specs: JSON.stringify({
            cpu: "M3 Max",
            ram: "128GB",
            storage: "2TB SSD",
            screen: "16-inch Liquid Retina XDR"
        })
    },
    {
        name: "Dell XPS 15",
        brand: "Dell",
        price: 189900,
        category: "Business",
        image: "/images/dell-xps-15.png",
        description: "Immersive 3.5K OLED display in a stunningly crafted chassis. The perfect balance of power and portability.",
        specs: JSON.stringify({
            cpu: "Intel Core i9-13900H",
            ram: "32GB",
            storage: "1TB SSD",
            screen: "15.6-inch 3.5K OLED"
        })
    },
    {
        name: "ROG Zephyrus G14",
        brand: "Asus",
        price: 149900,
        category: "Gaming",
        image: "/images/rog-zephyrus-g14.png",
        description: "Dominate the competition with the world's most powerful 14-inch gaming laptop. Anime Matrix LED display included.",
        specs: JSON.stringify({
            cpu: "AMD Ryzen 9 7940HS",
            ram: "16GB",
            storage: "1TB SSD",
            screen: "14-inch QHD+ 165Hz"
        })
    },
    {
        name: "ThinkPad X1 Carbon",
        brand: "Lenovo",
        price: 169900,
        category: "Business",
        image: "/images/thinkpad-x1.png",
        description: "Ultralight, ultrathin, and ultra-tough. The gold standard for business computing with military-grade durability.",
        specs: JSON.stringify({
            cpu: "Intel Core i7-1365U",
            ram: "16GB",
            storage: "512GB SSD",
            screen: "14-inch WUXGA"
        })
    },
    {
        name: "Surface Laptop Studio",
        brand: "Microsoft",
        price: 209900,
        category: "Creative",
        image: "/images/surface-laptop-studio.png",
        description: "Seamlessly transition from laptop to studio mode. The ultimate canvas for digital artists and designers.",
        specs: JSON.stringify({
            cpu: "Intel Core i7-11370H",
            ram: "32GB",
            storage: "1TB SSD",
            screen: "14.4-inch PixelSense Flow"
        })
    }
];

export async function POST() {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        const results = [];

        for (const product of heroProducts) {
            // Check if product already exists to avoid duplicates (optional, but good practice)
            const { data: existing } = await supabase
                .from("products")
                .select("id")
                .eq("name", product.name)
                .single();

            if (existing) {
                results.push({ name: product.name, status: "Skipped (Exists)", id: existing.id });
                continue;
            }

            const { data, error } = await supabase
                .from("products")
                .insert([product])
                .select()
                .single();

            if (error) {
                console.error("Error inserting product:", product.name, error);
                results.push({ name: product.name, status: "Failed", error: error.message });
            } else {
                results.push({ name: product.name, status: "Success", id: data.id });
            }
        }

        return NextResponse.json({ results });
    } catch (error) {
        console.error("Seed error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
