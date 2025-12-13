"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import PCPartForm from "@/components/admin/PCPartForm";
import { useAuth } from "@/context/AuthContext";
import { Part } from "@/lib/pc-parts";

const ADMIN_EMAIL = "ranjanguptajeff@gmail.com";

export default function EditPartPage() {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [part, setPart] = useState<Part | null>(null);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                router.push("/auth");
            } else if (user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
                router.push("/dashboard");
            }
        }
    }, [user, isLoading, router]);

    useEffect(() => {
        if (id) {
            fetchPart();
        }
    }, [id]);

    const fetchPart = async () => {
        try {
            const { data, error } = await supabase
                .from("pc_parts")
                .select("*")
                .eq("id", id)
                .single();

            if (error) throw error;
            setPart(data as Part);
        } catch (error) {
            console.error("Error fetching part:", error);
            alert("Part not found");
            router.push("/dashboard");
        } finally {
            setFetching(false);
        }
    };

    if (isLoading || fetching) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) return null;

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 container mx-auto">
            {part && <PCPartForm mode="edit" initialData={part} />}
        </div>
    );
}
