"use client";

import { Button } from "./Button";
import { useCart } from "@/app/context/CartContext";
import { Laptop } from "@/lib/data";

interface AddToCartButtonProps {
    product: Laptop;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addItem } = useCart();

    return (
        <Button
            size="lg"
            className="w-full text-lg h-14"
            onClick={() => addItem(product)}
        >
            Add to Cart - ${product.price.toLocaleString()}
        </Button>
    );
}
