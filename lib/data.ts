export interface Laptop {
    id: string;
    name: string;
    brand: string;
    price: number;
    specs: {
        cpu: string;
        ram: string;
        storage: string;
        screen: string;
    };
    image: string;
    description: string;
    category: "Gaming" | "Ultrabook" | "Business" | "Creative";
}

export const laptops: Laptop[] = [
    {
        id: "1",
        name: "Blade 16",
        brand: "Razer",
        price: 2999,
        specs: {
            cpu: "Intel Core i9-14900HX",
            ram: "32GB DDR5",
            storage: "1TB SSD",
            screen: "16\" QHD+ 240Hz OLED",
        },
        image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1000&auto=format&fit=crop",
        description: "The ultimate gaming machine with the world's first dual-mode mini-LED display.",
        category: "Gaming",
    },
    {
        id: "2",
        name: "MacBook Pro 16",
        brand: "Apple",
        price: 2499,
        specs: {
            cpu: "M3 Max",
            ram: "36GB Unified",
            storage: "1TB SSD",
            screen: "16.2\" Liquid Retina XDR",
        },
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?q=80&w=1000&auto=format&fit=crop",
        description: "Mind-blowing performance. Longest battery life ever in a Mac.",
        category: "Creative",
    },
    {
        id: "3",
        name: "XPS 15",
        brand: "Dell",
        price: 1899,
        specs: {
            cpu: "Intel Core i7-13700H",
            ram: "16GB DDR5",
            storage: "512GB SSD",
            screen: "15.6\" 3.5K OLED Touch",
        },
        image: "https://images.unsplash.com/photo-1593642632823-8f78536788c6?q=80&w=1000&auto=format&fit=crop",
        description: "Immersive display, powerful performance, and premium design.",
        category: "Business",
    },
    {
        id: "4",
        name: "Zephyrus G14",
        brand: "ASUS",
        price: 1599,
        specs: {
            cpu: "AMD Ryzen 9 7940HS",
            ram: "16GB DDR5",
            storage: "1TB SSD",
            screen: "14\" QHD+ 165Hz Mini-LED",
        },
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1000&auto=format&fit=crop",
        description: "The world's most powerful 14-inch gaming laptop.",
        category: "Gaming",
    },
];
