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
