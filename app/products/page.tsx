import { Navbar } from "@/components/ui/Navbar";
import { getProducts } from "@/lib/products";
import { ProductsContent } from "./ProductsContent";
import { Suspense } from "react";

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <Suspense fallback={<div className="container mx-auto px-4 pt-24 text-center">Loading products...</div>}>
                <ProductsContent products={products} />
            </Suspense>
        </main>
    );
}
