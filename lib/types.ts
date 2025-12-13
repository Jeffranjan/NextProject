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
