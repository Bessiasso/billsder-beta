"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface InteractiveIllustrationProps {
    children: ReactNode;
    className?: string;
}

export default function InteractiveIllustration2({
    children,
    className = "",
}: InteractiveIllustrationProps) {
    const [isHovered, setIsHovered] = useState(false);

    // Animation variants
    const containerVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } },
    };

    const glowVariants = {
        initial: { opacity: 0.3, scale: 1.2 },
        hover: {
            opacity: 0.7,
            scale: 1.4,
            filter: "blur(20px)",
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    const childVariants = {
        initial: { filter: "drop-shadow(0 0 0px rgba(84, 72, 158, 0))" },
        hover: {
            filter: "drop-shadow(0 0 8px rgba(84, 72, 158, 0.8))",
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    return (
        <div className="relative w-full h-full flex items-center justify-center ">
            <motion.div
                className="absolute inset-0 dark:bg-[#54489e]/20 bg-[#54489e]/10 rounded-full w-[100px] h-[100px] md:w-[450px] md:h-[450px]"
                variants={glowVariants}
                initial="hover"
                animate="hover"
            />
            <motion.div
                className={`relative z-10 ${className}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                variants={containerVariants}
                initial="hover"
                animate="hover"
            >
                <motion.div
                    variants={childVariants}
                    animate="hover"
                    className="w-[300px] h-[300px] md:w-[450px] md:h-[450px]"
                >
                    {children}
                </motion.div>
            </motion.div>
        </div>
    );
}
