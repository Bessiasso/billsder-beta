"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Loading() {
    const [dots, setDots] = useState(".");

    // Animate the loading dots
    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="text-center">
                <motion.div
                    initial={{ opacity: 0.6, scale: 0.95 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: [0, 2, 0, -2, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                    }}
                    className="w-24 h-24 mx-auto mb-6"
                >
                    <svg
                        viewBox="0 0 92.05 105.82"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full"
                        aria-hidden="true"
                    >
                        <defs>
                            <style>{`.cls-1{fill:#58519f;}`}</style>
                        </defs>
                        <path
                            className="cls-1"
                            d="M70.05,50.59a5.68,5.68,0,0,0-4.38,1.89,5.79,5.79,0,0,0-4.12-2.43,6,6,0,0,0-4.83,2.37,6,6,0,0,0-4.5-3c-2-.13-4,1.07-5.37,3.07-1.17-2.17-2.92-3.59-5-3.72S37.83,50,36.4,52.07c-1.17-2.28-3-3.8-5.06-3.93s-4.33,1.32-5.78,3.7c-1.14-2.55-3-4.26-5.27-4.4l1.54-24.72a2.51,2.51,0,0,1,2.65-2.36l44.78,2.83a2.52,2.52,0,0,1,2.33,2.68Z"
                        />
                        <path
                            className="cls-1"
                            d="M63.22,58.8a5.73,5.73,0,0,0,4.27-2.16,5.71,5.71,0,0,0,4.26,2.16V83.13a2.51,2.51,0,0,1-2.5,2.52H24.39a2.51,2.51,0,0,1-2.5-2.52V58.8c2.24,0,4.23-1.58,5.53-4,1.3,2.47,3.29,4,5.54,4s4-1.39,5.29-3.6c1.3,2.21,3.18,3.6,5.29,3.6s3.87-1.31,5.17-3.4c1.29,2.09,3.12,3.4,5.17,3.4a5.94,5.94,0,0,0,4.67-2.66A5.94,5.94,0,0,0,63.22,58.8Z"
                        />
                    </svg>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-xl font-medium text-[#58519f] dark:text-[#a8a7d1]">
                        Chargement{dots}
                    </p>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Veuillez patienter pendant que nous préparons votre
                        espace
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
