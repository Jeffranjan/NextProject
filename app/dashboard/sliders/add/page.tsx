"use client";

import { AdminSliderForm } from "@/components/admin/AdminSliderForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AddSliderPage() {
    return (
        <div className="space-y-6">
            <Link
                href="/dashboard/sliders"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors"
            >
                <ArrowLeft size={16} className="mr-2" />
                Back to Sliders
            </Link>
            <AdminSliderForm />
        </div>
    );
}
