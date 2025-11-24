export interface Laptop {
    id: string;
    name: string;
    brand: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
    specs: {
        processor: string;
        ram: string;
        storage: string;
        display: string;
        graphics: string;
    };
    image: string;
    description: string;
}

export const laptops: Laptop[] = [
    {
        id: '1',
        name: 'MacBook Pro 16"',
        brand: 'Apple',
        price: 209990,
        originalPrice: 229990,
        rating: 4.9,
        reviews: 128,
        specs: {
            processor: 'M3 Max',
            ram: '36GB',
            storage: '1TB SSD',
            display: '16.2" Liquid Retina XDR',
            graphics: '40-core GPU'
        },
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80&w=1000',
        description: 'The most powerful MacBook Pro ever is here. With the blazing-fast M3 Max chip, incredible battery life, and a stunning Liquid Retina XDR display, it’s a pro laptop without equal.'
    },
    {
        id: '2',
        name: 'Dell XPS 15',
        brand: 'Dell',
        price: 159990,
        originalPrice: 184990,
        rating: 4.7,
        reviews: 85,
        specs: {
            processor: 'Intel Core i9-13900H',
            ram: '32GB DDR5',
            storage: '1TB NVMe',
            display: '15.6" 3.5K OLED',
            graphics: 'RTX 4060'
        },
        image: 'https://images.unsplash.com/photo-1593642632823-8f78536788c6?auto=format&fit=crop&q=80&w=1000',
        description: 'Immersive display, premium craftsmanship, and powerful performance. The Dell XPS 15 is the perfect balance of power and portability for creators.'
    },
    {
        id: '3',
        name: 'ROG Zephyrus G14',
        brand: 'ASUS',
        price: 134990,
        originalPrice: 151990,
        rating: 4.8,
        reviews: 210,
        specs: {
            processor: 'AMD Ryzen 9 7940HS',
            ram: '16GB DDR5',
            storage: '1TB PCIe 4.0',
            display: '14" 165Hz Mini LED',
            graphics: 'RTX 4070'
        },
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=1000',
        description: 'The world’s most powerful 14-inch gaming laptop. Dominate the competition with the latest AMD Ryzen processor and NVIDIA GeForce RTX graphics.'
    },
    {
        id: '4',
        name: 'ThinkPad X1 Carbon',
        brand: 'Lenovo',
        price: 124990,
        originalPrice: 169990,
        rating: 4.6,
        reviews: 95,
        specs: {
            processor: 'Intel Core i7-1365U',
            ram: '16GB LPDDR5',
            storage: '512GB SSD',
            display: '14" WUXGA IPS',
            graphics: 'Intel Iris Xe'
        },
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=1000',
        description: 'Ultralight, ultra-powerful. The ThinkPad X1 Carbon Gen 11 is the ultimate business laptop, featuring military-grade durability and all-day battery life.'
    },
    {
        id: '5',
        name: 'Razer Blade 16',
        brand: 'Razer',
        price: 279990,
        originalPrice: 299990,
        rating: 4.5,
        reviews: 42,
        specs: {
            processor: 'Intel Core i9-13950HX',
            ram: '32GB DDR5',
            storage: '1TB SSD',
            display: '16" Dual Mode Mini-LED',
            graphics: 'RTX 4090'
        },
        image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=1000',
        description: 'Experience insane performance and ultra-portability with the Razer Blade 16. Featuring the world’s first dual-mode Mini-LED display.'
    },
    {
        id: '6',
        name: 'Surface Laptop Studio 2',
        brand: 'Microsoft',
        price: 199990,
        originalPrice: 209990,
        rating: 4.4,
        reviews: 38,
        specs: {
            processor: 'Intel Core i7-13700H',
            ram: '32GB LPDDR5x',
            storage: '1TB SSD',
            display: '14.4" PixelSense Flow',
            graphics: 'RTX 4050'
        },
        image: 'https://images.unsplash.com/photo-1531297461136-82lw9z2917?auto=format&fit=crop&q=80&w=1000',
        description: 'Built for performance and versatility. The Surface Laptop Studio 2 transitions seamlessly from a powerful laptop to a creative studio.'
    }
];
