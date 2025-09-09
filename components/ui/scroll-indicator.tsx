"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function ScrollIndicator() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    // Couleurs adaptées au thème
    const primaryColor = isDark ? "#ffffff" : "#54489e";
    const secondaryColor = isDark ? "#a8a7d1" : "#7667b3";

    return (
        <motion.div
            className="flex flex-col items-center pb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 1,
                delay: 2,
                ease: "easeOut",
            }}
        >
            {/* Souris avec molette */}
            <motion.div
                className="relative"
                initial={{ y: 0 }}
                animate={{ y: [0, 5, 0] }}
                transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                }}
            >
                {/* Corps de la souris */}
                <motion.svg
                    width="28"
                    height="44"
                    viewBox="0 0 28 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Contour de la souris */}
                    <rect
                        x="1"
                        y="1"
                        width="26"
                        height="42"
                        rx="13"
                        stroke={primaryColor}
                        strokeWidth="2"
                        fill="transparent"
                    />

                    {/* Séparation des boutons */}
                    <line
                        x1="14"
                        y1="1"
                        x2="14"
                        y2="16"
                        stroke={primaryColor}
                        strokeWidth="1"
                        strokeDasharray="2 2"
                    />

                    {/* Molette de la souris */}
                    <motion.rect
                        x="11"
                        y="10"
                        width="6"
                        height="6"
                        rx="3"
                        fill={secondaryColor}
                        initial={{ y: 0 }}
                        animate={{ y: [0, 8, 0] }}
                        transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                            repeatDelay: 0.5,
                        }}
                    />

                    {/* Flèche de défilement */}
                    <motion.path
                        d="M14 36 L18 30 L10 30 Z"
                        fill={secondaryColor}
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                        }}
                    />
                </motion.svg>

                {/* Effet de brillance */}
                <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                    }}
                    style={{
                        background: `radial-gradient(circle, ${secondaryColor}40 0%, transparent 70%)`,
                        borderRadius: "13px",
                    }}
                />
            </motion.div>
        </motion.div>
    );
}
