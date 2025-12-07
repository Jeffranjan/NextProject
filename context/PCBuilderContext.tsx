"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Part } from "@/lib/pc-parts";
import { supabase } from "@/lib/supabase";

interface PCBuilderContextType {
    selectedParts: { [key: string]: Part | null };
    selectPart: (category: string, part: Part) => void;
    removePart: (category: string) => void;
    totalPrice: number;
    activeCategory: string;
    setActiveCategory: (category: string) => void;
    availableParts: Part[];
    isLoading: boolean;
}

const PCBuilderContext = createContext<PCBuilderContextType | undefined>(undefined);

export function PCBuilderProvider({ children }: { children: React.ReactNode }) {
    const [selectedParts, setSelectedParts] = useState<{ [key: string]: Part | null }>({});
    const [activeCategory, setActiveCategory] = useState("cpu");
    const [totalPrice, setTotalPrice] = useState(0);
    const [availableParts, setAvailableParts] = useState<Part[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch parts from Supabase on mount
    useEffect(() => {
        async function fetchParts() {
            try {
                const { data, error } = await supabase
                    .from('pc_parts')
                    .select('*');

                if (error) throw error;

                if (data) {
                    setAvailableParts(data as Part[]);
                }
            } catch (error) {
                console.error("Error fetching PC parts:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchParts();
    }, []);

    useEffect(() => {
        const total = Object.values(selectedParts).reduce((sum, part) => sum + (part?.price || 0), 0);
        setTotalPrice(total);
    }, [selectedParts]);

    const selectPart = (category: string, part: Part) => {
        setSelectedParts((prev) => ({ ...prev, [category]: part }));
    };

    const removePart = (category: string) => {
        setSelectedParts((prev) => {
            const newState = { ...prev };
            delete newState[category];
            return newState;
        });
    };

    return (
        <PCBuilderContext.Provider
            value={{
                selectedParts,
                selectPart,
                removePart,
                totalPrice,
                activeCategory,
                setActiveCategory,
                availableParts,
                isLoading
            }}
        >
            {children}
        </PCBuilderContext.Provider>
    );
}

export function usePCBuilder() {
    const context = useContext(PCBuilderContext);
    if (context === undefined) {
        throw new Error("usePCBuilder must be used within a PCBuilderProvider");
    }
    return context;
}
