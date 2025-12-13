"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BuildSummary } from "./BuildSummary";
import { X } from "lucide-react";
import { useEffect } from "react";

interface MobileSummaryDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileSummaryDrawer({ isOpen, onClose }: MobileSummaryDrawerProps) {
    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-50 lg:hidden backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-2xl shadow-2xl lg:hidden flex flex-col max-h-[85vh]"
                    >
                        {/* Drag Handle / Header */}
                        <div className="flex items-center justify-between p-4 border-b">
                            <h3 className="font-bold text-lg">Build Summary</h3>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-secondary rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="overflow-y-auto p-4 flex-1">
                            {/* We pass specific classes to override default BuildSummary styles */}
                            <BuildSummary
                                className="border-0 shadow-none p-0 sticky-0"
                                onClose={onClose}
                            />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
