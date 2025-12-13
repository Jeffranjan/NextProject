"use client";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/app/context/CartContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import Image from "next/image";

// Define the Razorpay type on the window object
declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function CheckoutPage() {
    const { user, isLoading: isAuthLoading } = useAuth();
    const { items, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    // Check authentication
    useEffect(() => {
        if (!isAuthLoading && !user) {
            router.push("/auth?next=/checkout");
        }
    }, [user, isAuthLoading, router]);

    // Redirect if cart is empty (only if authenticated)
    useEffect(() => {
        if (!isAuthLoading && user && items.length === 0) {
            router.push("/");
        }
    }, [items, router, user, isAuthLoading]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    if (isAuthLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            // 1. Create Order
            const orderRes = await fetch("/api/razorpay/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: cartTotal,
                    currency: "INR",
                }),
            });

            const orderData = await orderRes.json();

            if (!orderRes.ok) {
                throw new Error(orderData.error || "Failed to create order");
            }

            // 2. Initialize Razorpay
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Mahadev Computers",
                description: "Purchase from Mahadev Computers",
                order_id: orderData.id,
                // image: "https://example.com/your_logo", // Add logo URL if available
                handler: async function (response: any) {
                    // Verify Payment
                    try {
                        const verifyRes = await fetch("/api/razorpay/verify", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            }),
                        });

                        const verifyData = await verifyRes.json();

                        if (verifyData.status === "success") {
                            clearCart();
                            router.push(`/success?orderId=${orderData.id}`);
                        } else {
                            alert("Payment verification failed. Please contact support.");
                        }
                    } catch (err) {
                        console.error("Verification Error:", err);
                        alert("An error occurred during payment verification.");
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone,
                },
                notes: {
                    address: "Mahadev Computers Corporate Office"
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp1 = new window.Razorpay(options);

            rzp1.on('payment.failed', function (response: any) {
                console.error("Razorpay Payment Failed:", response.error);

                const error = response.error || {};
                const metadata = error.metadata || {};

                alert(`Payment Failed Details:
Code: ${error.code || "N/A"}
Description: ${error.description || "Unknown Error"}
Source: ${error.source || "N/A"}
Step: ${error.step || "N/A"}
Reason: ${error.reason || "N/A"}
Order ID: ${metadata.order_id || "N/A"}
Payment ID: ${metadata.payment_id || "N/A"}`);
            });

            rzp1.open();

        } catch (error: any) {
            console.error("Payment Error:", error);
            alert(error.message || "Something went wrong. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (items.length === 0) {
        return null; // Or a loading spinner/empty state while redirecting
    }

    return (
        <div className="min-h-screen bg-background py-12">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Billing Details */}
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm h-fit">
                        <h2 className="text-xl font-semibold mb-6">Billing Details</h2>
                        <form onSubmit={handlePayment} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                                <Input
                                    id="name"
                                    name="name"
                                    required
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    placeholder="+91 98765 43210"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full mt-6 text-lg py-6"
                                disabled={isProcessing}
                            >
                                {isProcessing ? "Processing..." : `Pay ₹${cartTotal.toLocaleString()}`}
                            </Button>
                            <p className="text-xs text-muted-foreground text-center mt-4">
                                Secure payment via Razorpay. Cards, UPI, and Netbanking accepted.
                            </p>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-secondary/20 border border-border rounded-xl p-6 shadow-sm h-fit">
                        <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                        <div className="space-y-4 mb-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 items-center">
                                    <div className="relative w-16 h-16 bg-white rounded-md overflow-hidden border border-border shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium line-clamp-1">{item.name}</h3>
                                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="font-semibold">
                                        ₹{(item.price * item.quantity).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-border pt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>₹{cartTotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Shipping</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold pt-2 border-t border-border mt-2">
                                <span>Total</span>
                                <span>₹{cartTotal.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
