"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type AnimatedGradientProps = {
    className?: string;
};

export default function AnimatedGradient({
    className = "",
}: AnimatedGradientProps) {
    const [isReduced, setIsReduced] = useState(false);

    useEffect(() => {
        // Check for reduced motion preference
        if (typeof window !== "undefined") {
            const mediaQuery = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            );
            setIsReduced(mediaQuery.matches);

            const handleChange = () => setIsReduced(mediaQuery.matches);
            mediaQuery.addEventListener("change", handleChange);
            return () => mediaQuery.removeEventListener("change", handleChange);
        }
    }, []);

    return (
        <motion.div
            className={`absolute inset-0 -z-10 overflow-hidden ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {!isReduced && (
                <>
                    <motion.div
                        className="absolute -top-[40%] -left-[10%] h-[350px] w-[350px] md:h-[500px] md:w-[500px] rounded-full bg-[#54489e]/20 blur-[100px]"
                        animate={{
                            x: [0, 30, 0],
                            y: [0, 20, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                        }}
                    />
                    <motion.div
                        className="absolute -bottom-[40%] -right-[10%] h-[450px] w-[450px] md:h-[600px] md:w-[600px] rounded-full bg-[#a8a7d1]/20 blur-[100px]"
                        animate={{
                            x: [0, -30, 0],
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                        }}
                    />
                </>
            )}
        </motion.div>
    );
}
