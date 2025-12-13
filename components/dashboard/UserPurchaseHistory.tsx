"use client";

import { useState, useEffect } from "react";
import { Order } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { ShoppingBag, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export function UserPurchaseHistory() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) return;

            const { data, error } = await supabase
                .from("orders")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });

            if (error) {

                console.error("Error fetching orders:", error);
                setOrders([]);
            } else {
                setOrders(data as Order[]);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center p-12 bg-card border border-border rounded-xl text-center space-y-4"
            >
                <div className="p-4 bg-muted/50 rounded-full">
                    <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">No purchases yet</h3>
                    <p className="text-muted-foreground max-w-sm mt-1">
                        When you purchase items, they will appear here.
                    </p>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="space-y-4">
            {orders.map((order) => (
                <div key={order.id} className="bg-card border border-border rounded-xl p-6 shadow-sm hover:border-primary/50 transition-colors">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-border pb-4 mb-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Order ID</p>
                            <p className="font-mono text-sm font-medium">{order.id}</p>
                        </div>
                        <div className="flex gap-8">
                            <div>
                                <p className="text-sm text-muted-foreground">Date</p>
                                <p className="font-medium">{new Date(order.created_at).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total</p>
                                <p className="font-medium">₹{order.total_amount.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Status</p>
                                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize mt-1">
                                    {order.status}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-medium text-sm mb-2 text-muted-foreground">Items</h4>
                        <ul className="space-y-2">
                            {order.items.map((item, index) => (
                                <li key={index} className="flex justify-between text-sm">
                                    <span>{item.quantity}x {item.name}</span>
                                    <span>₹{item.price.toLocaleString()}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
}
