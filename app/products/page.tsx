import { Navbar } from "@/components/ui/Navbar";
import { getProducts } from "@/lib/products";
import { ProductsContent } from "./ProductsContent";

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <ProductsContent products={products} />
        </main>
    );
}
