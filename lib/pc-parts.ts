import { Zap, Monitor, Cpu, HardDrive, Smartphone, CircuitBoard } from "lucide-react";

export interface Part {
    id: string;
    category: string;
    title: string;
    branch: string;
    price: number;
    image: string;
    specs: {
        [key: string]: string | number;
    };
}

export const CATEGORIES = [
    { id: "cpu", name: "CPU", icon: Cpu },
    { id: "motherboard", name: "Motherboard", icon: CircuitBoard },
    { id: "gpu", name: "GPU", icon: Monitor },
    { id: "ram", name: "RAM", icon: HardDrive },
    { id: "storage", name: "Storage", icon: HardDrive },
    { id: "case", name: "Case", icon: Smartphone },
    { id: "psu", name: "Power Supply", icon: Zap },
];

export const PC_PARTS: Part[] = [
    // CPUs
    {
        id: "cpu-1",
        category: "cpu",
        title: "Intel Core i9-14900K",
        branch: "Intel",
        price: 49999,
        image: "/images/parts/cpu-intel.png",
        specs: { cores: 24, threads: 32, socket: "LGA1700", base_clock: "3.2GHz" },
    },
    {
        id: "cpu-2",
        category: "cpu",
        title: "AMD Ryzen 9 7950X",
        branch: "AMD",
        price: 45999,
        image: "/images/parts/cpu-amd.png",
        specs: { cores: 16, threads: 32, socket: "AM5", base_clock: "4.5GHz" },
    },
    {
        id: "cpu-3",
        category: "cpu",
        title: "Intel Core i7-14700K",
        branch: "Intel",
        price: 36999,
        image: "/images/parts/cpu-intel.png",
        specs: { cores: 20, threads: 28, socket: "LGA1700", base_clock: "3.4GHz" },
    },
    {
        id: "cpu-4",
        category: "cpu",
        title: "AMD Ryzen 7 7800X3D",
        branch: "AMD",
        price: 38999,
        image: "/images/parts/cpu-amd.png",
        specs: { cores: 8, threads: 16, socket: "AM5", base_clock: "4.2GHz" },
    },

    // Motherboards
    {
        id: "mobo-1",
        category: "motherboard",
        title: "ASUS ROG Maximus Z790 Hero",
        branch: "ASUS",
        price: 59999,
        image: "/images/parts/mobo-asus.png",
        specs: { socket: "LGA1700", form_factor: "ATX", memory: "DDR5" },
    },
    {
        id: "mobo-2",
        category: "motherboard",
        title: "MSI MPG B650 Edge WIFI",
        branch: "MSI",
        price: 24999,
        image: "/images/parts/mobo-msi.png",
        specs: { socket: "AM5", form_factor: "ATX", memory: "DDR5" },
    },

    // GPU
    {
        id: "gpu-1",
        category: "gpu",
        title: "NVIDIA GeForce RTX 4090",
        branch: "NVIDIA",
        price: 159999,
        image: "/images/parts/gpu-nvidia.png",
        specs: { vram: "24GB", length: "304mm" },
    },
    {
        id: "gpu-2",
        category: "gpu",
        title: "ASUS TUF Gaming RTX 4080 Super",
        branch: "ASUS",
        price: 99999,
        image: "/images/parts/gpu-asus.png",
        specs: { vram: "16GB", length: "348mm" },
    },
    {
        id: "gpu-3",
        category: "gpu",
        title: "MSI GeForce RTX 4070 Ti Slim",
        branch: "MSI",
        price: 79999,
        image: "/images/parts/gpu-msi.png",
        specs: { vram: "12GB", length: "307mm" },
    },

    // RAM
    {
        id: "ram-1",
        category: "ram",
        title: "Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz",
        branch: "Corsair",
        price: 13999,
        image: "/images/parts/ram-corsair.png",
        specs: { capacity: "32GB", speed: "6000MHz", type: "DDR5" },
    },
    {
        id: "ram-2",
        category: "ram",
        title: "G.Skill Trident Z5 RGB 64GB (2x32GB) DDR5 6400MHz",
        branch: "G.Skill",
        price: 24999,
        image: "/images/parts/ram-gskill.png",
        specs: { capacity: "64GB", speed: "6400MHz", type: "DDR5" },
    },

    // Storage
    {
        id: "storage-1",
        category: "storage",
        title: "Samsung 990 Pro 2TB NVMe SSD",
        branch: "Samsung",
        price: 17999,
        image: "/images/parts/storage-samsung.png",
        specs: { capacity: "2TB", type: "NVMe Gen4" },
    },
    {
        id: "storage-2",
        category: "storage",
        title: "WD Black SN850X 1TB NVMe SSD",
        branch: "Western Digital",
        price: 8999,
        image: "/images/parts/storage-wd.png",
        specs: { capacity: "1TB", type: "NVMe Gen4" },
    },

    // Case
    {
        id: "case-1",
        category: "case",
        title: "Lian Li O11 Dynamic EVO",
        branch: "Lian Li",
        price: 15499,
        image: "/images/parts/case-lianli.png",
        specs: { form_factor: "ATX", color: "Black" },
    },
    {
        id: "case-2",
        category: "case",
        title: "NZXT H9 Flow",
        branch: "NZXT",
        price: 15999,
        image: "/images/parts/case-nzxt.png",
        specs: { form_factor: "ATX", color: "White" },
    },

    // PSU
    {
        id: "psu-1",
        category: "psu",
        title: "Corsair RM1000e 1000W 80+ Gold",
        branch: "Corsair",
        price: 15999,
        image: "/images/parts/psu-corsair.png",
        specs: { wattage: "1000W", modular: "Fully Modular" },
    },
    {
        id: "psu-2",
        category: "psu",
        title: "MSI MPG A850G 850W 80+ Gold",
        branch: "MSI",
        price: 12999,
        image: "/images/parts/psu-msi.png",
        specs: { wattage: "850W", modular: "Fully Modular" },
    }
];
