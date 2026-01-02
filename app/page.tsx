
import { Hero } from "@/components/ui/Hero";
import { ProductCard } from "@/components/ui/ProductCard";
import { getFeaturedProducts, getHeroSliders } from "@/lib/products";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { Testimonials } from "@/components/ui/Testimonials";
import { PCBuilderPromo } from "@/components/ui/PCBuilderPromo";

import { RepairShowcase } from "@/components/ui/RepairShowcase";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const sliders = await getHeroSliders();

  return (
    <main className="min-h-screen bg-background">
      <Hero sliders={sliders} />
      <RepairShowcase />

      {/* Featured Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Laptops</h2>
            <p className="text-muted-foreground">Top picks for this season</p>
          </div>
          <Link href="/products" className="text-primary font-medium hover:underline flex items-center gap-1">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index === 0} />
          ))}
        </div>
      </section>



      {/* PC Builder Promo */}
      <PCBuilderPromo />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Features Grid */}
      <section className="py-24 bg-secondary/30 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center space-y-4 p-6 bg-background rounded-2xl border border-border shadow-sm">
              <div className="p-4 bg-primary/5 rounded-full text-primary">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-semibold">Free Express Shipping</h3>
              <p className="text-muted-foreground">On all orders over $1000. Global delivery available.</p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 bg-background rounded-2xl border border-border shadow-sm">
              <div className="p-4 bg-primary/5 rounded-full text-primary">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-semibold">2 Year Warranty</h3>
              <p className="text-muted-foreground">Comprehensive coverage for peace of mind.</p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 bg-background rounded-2xl border border-border shadow-sm">
              <div className="p-4 bg-primary/5 rounded-full text-primary">
                <RefreshCw size={32} />
              </div>
              <h3 className="text-xl font-semibold">30 Day Returns</h3>
              <p className="text-muted-foreground">Not satisfied? Return it within 30 days, no questions asked.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (Simple version for now) */}
      <footer className="py-12 border-t border-border bg-background">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>&copy; 2024 Mahadev Computers. All rights reserved.</p>
        </div>
      </footer>
    </main >
  );
}