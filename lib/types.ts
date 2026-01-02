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
    images?: string[]; // Multiple images support
    description: string;
    category: "Gaming" | "Ultrabook" | "Business" | "Creative";
    is_featured?: boolean;

    // Hero Slider Fields
    is_hero_slider?: boolean;
    hero_slider_order?: number;
    hero_title?: string;
    hero_subtitle?: string;
    hero_cta_primary?: string;
    hero_cta_secondary?: string;
    hero_highlight_specs?: {
        icon: string; // key for iconMap
        label: string;
        value: string;
    }[];
    hero_image_url?: string;
}

export interface Order {
    id: string;
    created_at: string;
    total_amount: number;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    items: {
        product_id: string;
        name: string;
        quantity: number;
        price: number;
    }[];
}

export interface SavedBuild {
    id: string;
    name: string;
    created_at: string;
    total_cost: number;
    components: Record<string, any>;
}

