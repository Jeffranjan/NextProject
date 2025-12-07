"use client";

import AddPCPartForm from "@/components/admin/AddPCPartForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ADMIN_EMAIL = "ranjanguptajeff@gmail.com";

export default function AddPartPage() {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                router.push("/auth");
            } else if (user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
                router.push("/dashboard");
            }
        }
    }, [user, isLoading, router]);

    if (isLoading || !user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 container mx-auto">
            <AddPCPartForm />
        </div>
    );
}
