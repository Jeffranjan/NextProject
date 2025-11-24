"use client";

import { Button } from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 text-center shadow-lg">
                <div className="flex justify-center mb-6">
                    <div className="h-20 w-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                        <CheckCircle size={48} />
                    </div>
                </div>

                <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
                <p className="text-muted-foreground mb-6">
                    Thank you for your purchase. Your order has been confirmed.
                </p>

                {orderId && (
                    <div className="bg-secondary/50 rounded-lg p-4 mb-8">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Order ID</p>
                        <p className="font-mono font-medium">{orderId}</p>
                    </div>
                )}

                <Link href="/">
                    <Button className="w-full" size="lg">
                        Continue Shopping
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
