import { Navbar } from "@/components/ui/Navbar";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ShieldCheck, TrendingDown, Clock } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        About <span className="text-primary">Mahadev Computers</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Your trusted destination for premium refurbished laptops in Bahadurgarh.
                        Quality you can trust, at prices you'll love.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold">Our Story</h2>
                        <p className="text-lg text-muted-foreground">
                            For over 6 years, Mahadev Computers has been serving the community of Bahadurgarh, Haryana.
                            We started with a simple mission: to make high-quality computing accessible to everyone.
                        </p>
                        <p className="text-lg text-muted-foreground">
                            We specialize in selling second-hand and refurbished laptops that look and perform like new.
                            Our rigorous testing process ensures that every device we sell meets our high standards of quality.
                        </p>
                        <div className="flex items-center gap-2 text-primary font-medium">
                            <MapPin />
                            <span>Bahadurgarh, Haryana</span>
                        </div>
                    </div>
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-border shadow-xl">
                        <Image
                            src="/images/mahadev_shop_front.png"
                            alt="Mahadev Computers Shop Front"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-24 md:flex-row-reverse">
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-border shadow-xl md:order-1">
                        <Image
                            src="/images/mahadev_shop_inside.png"
                            alt="Inside Mahadev Computers"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="space-y-6 md:order-2">
                        <h2 className="text-3xl font-bold">Why Choose Us?</h2>
                        <ul className="space-y-4">
                            <li className="flex gap-4">
                                <div className="p-2 bg-primary/10 rounded-lg h-fit text-primary">
                                    <TrendingDown size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Unbeatable Prices</h3>
                                    <p className="text-muted-foreground">Get top-notch laptops at 1/4th of their original market price.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="p-2 bg-primary/10 rounded-lg h-fit text-primary">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Quality Guarantee</h3>
                                    <p className="text-muted-foreground">Every laptop comes with a 1-month comprehensive warranty for your peace of mind.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="p-2 bg-primary/10 rounded-lg h-fit text-primary">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">6+ Years of Trust</h3>
                                    <p className="text-muted-foreground">We have been satisfying customers with our services for over 6 years.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-secondary/30 border-y border-border">
                <div className="container mx-auto px-4 text-center space-y-8">
                    <h2 className="text-3xl font-bold">Ready to find your next laptop?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Visit our store in Bahadurgarh or browse our collection online. We deliver quality right to your doorstep.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/products">
                            <Button size="lg" className="text-lg px-8">
                                Browse Laptops
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" size="lg" className="text-lg px-8">
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-border bg-background">
                <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
                    <p>&copy; 2024 Mahadev Computers. All rights reserved.</p>
                </div>
            </footer>
        </main>
    );
}
