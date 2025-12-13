"use client";

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { Part } from "@/lib/pc-parts";
import { createClient } from "@/lib/supabase/client";

interface PCBuilderContextType {
    selectedParts: { [key: string]: Part | null };
    selectPart: (category: string, part: Part) => void;
    removePart: (category: string) => void;
    totalPrice: number;
    activeCategory: string;
    setActiveCategory: (category: string) => void;
    availableParts: Part[];
    isLoading: boolean;
    setParts: (parts: { [key: string]: Part | null }) => void;
}

const PCBuilderContext = createContext<PCBuilderContextType | undefined>(undefined);

export function PCBuilderProvider({ children }: { children: React.ReactNode }) {
    const [selectedParts, setSelectedParts] = useState<{ [key: string]: Part | null }>({});
    const [activeCategory, setActiveCategory] = useState("cpu");
    const [totalPrice, setTotalPrice] = useState(0);
    const [availableParts, setAvailableParts] = useState<Part[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Create supabase client
    const supabase = createClient();

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

    // Load saved state from localStorage on mount
    useEffect(() => {
        const savedState = localStorage.getItem('pcBuilderState');
        if (savedState) {
            try {
                setSelectedParts(JSON.parse(savedState));
            } catch (e) {
                console.error("Failed to parse saved build state", e);
            }
        }
    }, []);

    // Save state to localStorage whenever it changes
    useEffect(() => {
        if (Object.keys(selectedParts).length > 0) {
            localStorage.setItem('pcBuilderState', JSON.stringify(selectedParts));
        }
    }, [selectedParts]);

    useEffect(() => {
        const total = Object.values(selectedParts).reduce((sum, part) => sum + (part?.price || 0), 0);
        setTotalPrice(total);
    }, [selectedParts]);

    const selectPart = useCallback((category: string, part: Part) => {
        setSelectedParts((prev) => ({ ...prev, [category]: part }));
    }, []);

    const removePart = useCallback((category: string) => {
        setSelectedParts((prev) => {
            const newState = { ...prev };
            delete newState[category];
            return newState;
        });
    }, []);

    const setParts = useCallback((parts: { [key: string]: Part | null }) => {
        setSelectedParts(parts);
    }, []);

    const value = useMemo(() => ({
        selectedParts,
        selectPart,
        removePart,
        totalPrice,
        activeCategory,
        setActiveCategory,
        availableParts,
        isLoading,
        setParts
    }), [
        selectedParts,
        selectPart,
        removePart,
        totalPrice,
        activeCategory,
        availableParts,
        isLoading,
        setParts
    ]);

    return (
        <PCBuilderContext.Provider value={value}>
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
