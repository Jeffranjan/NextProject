import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

        if (!process.env.RAZORPAY_KEY_SECRET) {
            return NextResponse.json(
                { error: "Razorpay secret is missing" },
                { status: 500 }
            );
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            return NextResponse.json({ status: "success", message: "Payment verified" });
        } else {
            return NextResponse.json(
                { status: "failure", message: "Invalid signature" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        return NextResponse.json(
            { error: "Error verifying payment" },
            { status: 500 }
        );
    }
}
