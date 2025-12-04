"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Laptop } from "@/lib/types";

const heroProducts = [
    {
        name: "MacBook Pro 16",
        brand: "Apple",
        price: 249900,
        category: "Creative",
        image: "/images/macbook-pro-16.png",
        description: "Experience uncompromised performance with the M3 Max chip. Designed for creators who demand the absolute best.",
        specs: {
            cpu: "M3 Max",
            ram: "128GB",
            storage: "2TB SSD",
            screen: "16-inch Liquid Retina XDR"
        }
    },
    {
        name: "Dell XPS 15",
        brand: "Dell",
        price: 189900,
        category: "Business",
        image: "/images/dell-xps-15.png",
        description: "Immersive 3.5K OLED display in a stunningly crafted chassis. The perfect balance of power and portability.",
        specs: {
            cpu: "Intel Core i9-13900H",
            ram: "32GB",
            storage: "1TB SSD",
            screen: "15.6-inch 3.5K OLED"
        }
    },
    {
        name: "ROG Zephyrus G14",
        brand: "Asus",
        price: 149900,
        category: "Gaming",
        image: "/images/rog-zephyrus-g14.png",
        description: "Dominate the competition with the world's most powerful 14-inch gaming laptop. Anime Matrix LED display included.",
        specs: {
            cpu: "AMD Ryzen 9 7940HS",
            ram: "16GB",
            storage: "1TB SSD",
            screen: "14-inch QHD+ 165Hz"
        }
    },
    {
        name: "ThinkPad X1 Carbon",
        brand: "Lenovo",
        price: 169900,
        category: "Business",
        image: "/images/thinkpad-x1.png",
        description: "Ultralight, ultrathin, and ultra-tough. The gold standard for business computing with military-grade durability.",
        specs: {
            cpu: "Intel Core i7-1365U",
            ram: "16GB",
            storage: "512GB SSD",
            screen: "14-inch WUXGA"
        }
    },
    {
        name: "Surface Laptop Studio",
        brand: "Microsoft",
        price: 209900,
        category: "Creative",
        image: "/images/surface-laptop-studio.png",
        description: "Seamlessly transition from laptop to studio mode. The ultimate canvas for digital artists and designers.",
        specs: {
            cpu: "Intel Core i7-11370H",
            ram: "32GB",
            storage: "1TB SSD",
            screen: "14.4-inch PixelSense Flow"
        }
    }
];

export default function SeedPage() {
    const [status, setStatus] = useState<string>("");
    const [insertedProducts, setInsertedProducts] = useState<any[]>([]);

    const handleSeed = async () => {
        setStatus("Seeding...");
        try {
            const response = await fetch("/api/seed", { method: "POST" });
            const data = await response.json();

            if (data.results) {
                setInsertedProducts(data.results);
                setStatus("Finished");
            } else {
                setStatus("Failed");
                console.error("Seed failed:", data);
            }
        } catch (error) {
            console.error("Error calling seed API:", error);
            setStatus("Failed");
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Seed Hero Products</h1>
            <p className="mb-4 text-muted-foreground">
                Click the button below to insert the 5 hero products into your database.
                After seeding, copy the IDs and update Hero.tsx.
            </p>

            <Button onClick={handleSeed} disabled={status === "Seeding..."}>
                {status === "Seeding..." ? "Seeding..." : "Start Seeding"}
            </Button>

            {status === "Finished" && (
                <div className="mt-8 space-y-4">
                    <h2 className="text-xl font-semibold">Results</h2>
                    <div className="bg-secondary/10 p-4 rounded-lg border border-border">
                        <pre className="whitespace-pre-wrap text-xs font-mono">
                            {JSON.stringify(insertedProducts, null, 2)}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
}
