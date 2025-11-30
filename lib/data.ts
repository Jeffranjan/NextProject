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
        image: "/images/blade-16.png",
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
        image: "/images/macbook-pro-16.png",
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
        image: "/images/dell-xps-15.png",
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
        image: "/images/rog-zephyrus-g14.png",
        description: "The world's most powerful 14-inch gaming laptop.",
        category: "Gaming",
    },
];