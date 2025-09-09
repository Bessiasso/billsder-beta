"use client";

import type React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TransitionFormProps {
    children: React.ReactNode;
    isVisible?: boolean;
}

const TransitionForm: React.FC<TransitionFormProps> = ({
    children,
    isVisible = true,
}) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.8 }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TransitionForm;
