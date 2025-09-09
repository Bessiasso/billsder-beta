"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

export default function HeroBackgroundIllustration() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const t = useTranslations("HeroBackground");

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === "dark";

    // Couleurs adaptées au thème
    const primaryColor = isDark ? "#54489e" : "#54489e";
    const secondaryColor = isDark ? "#a8a7d1" : "#a8a7d1";
    const accentColor = isDark ? "#6656a7" : "#7667b3";
    const bgColor = isDark
        ? "rgba(30, 26, 55, 0.3)"
        : "rgba(248, 248, 252, 0.5)";
    const textColor = isDark ? "#ffffff" : "#54489e";
    const gridColor = isDark
        ? "rgba(168, 167, 209, 0.1)"
        : "rgba(84, 72, 158, 0.1)";

    return (
        <div className="absolute inset-0 md:w-full md:h-full w-1/2 h-1/2 overflow-hidden pointer-events-none z-0">
            {/* Grille de fond */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px), 
                            linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }}
            />
            {/* Cercles décoratifs */}
            <motion.div
                className="absolute top-[10%] left-[5%] rounded-full opacity-20"
                style={{ backgroundColor: primaryColor }}
                initial={{ width: 0, height: 0 }}
                animate={{ width: 300, height: 300 }}
                transition={{ duration: 1, delay: 0.2 }}
            />
            <motion.div
                className="absolute bottom-[10%] right-[5%] rounded-full opacity-20"
                style={{ backgroundColor: secondaryColor }}
                initial={{ width: 0, height: 0 }}
                animate={{ width: 400, height: 400 }}
                transition={{ duration: 1, delay: 0.4 }}
            />
            {/* Graphique à barres */}
            <motion.div
                className="absolute top-[20%] right-[15%] rounded-lg"
                style={{ backgroundColor: bgColor, width: 200, height: 150 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <div className="p-3">
                    <div
                        className="text-xs font-semibold mb-2"
                        style={{ color: textColor }}
                    >
                        {t("monthly_sales")}
                    </div>
                    <div className="flex items-end h-[80px] gap-2 pt-2">
                        {[40, 65, 45, 80, 60, 75, 50].map((height, index) => (
                            <motion.div
                                key={index}
                                className="flex-1 rounded-t"
                                style={{
                                    backgroundColor:
                                        index % 2 === 0
                                            ? primaryColor
                                            : accentColor,
                                    height: `${height}%`,
                                }}
                                initial={{ height: 0 }}
                                animate={{ height: `${height}%` }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.8 + index * 0.1,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
            {/* Graphique circulaire */}
            <motion.div
                className="absolute top-[60%] right-[25%] rounded-lg"
                style={{ backgroundColor: bgColor, width: 150, height: 150 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
            >
                <div className="p-3">
                    <div
                        className="text-xs font-semibold mb-2"
                        style={{ color: textColor }}
                    >
                        {t("distribution")}
                    </div>
                    <div className="relative h-[100px] w-[100px] mx-auto">
                        <svg width="100" height="100" viewBox="0 0 100 100">
                            <motion.circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                                stroke={primaryColor}
                                strokeWidth="20"
                                strokeDasharray="251.2"
                                strokeDashoffset="251.2"
                                initial={{ strokeDashoffset: 251.2 }}
                                animate={{ strokeDashoffset: 62.8 }}
                                transition={{ duration: 1.5, delay: 1 }}
                            />
                            <motion.circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                                stroke={secondaryColor}
                                strokeWidth="20"
                                strokeDasharray="251.2"
                                strokeDashoffset="62.8"
                                initial={{ strokeDashoffset: 0 }}
                                animate={{ strokeDashoffset: 188.4 }}
                                transition={{ duration: 1.5, delay: 1 }}
                            />
                        </svg>
                    </div>
                </div>
            </motion.div>
            {/* Tableau de données */}
            <motion.div
                className="absolute top-[30%] left-[10%] rounded-lg"
                style={{ backgroundColor: bgColor, width: 180, height: 120 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
            >
                <div className="p-3">
                    <div
                        className="text-xs font-semibold mb-2"
                        style={{ color: textColor }}
                    >
                        {t("inventory")}
                    </div>
                    <div className="space-y-2">
                        {[
                            { label: t("product_a"), value: "86%" },
                            { label: t("product_b"), value: "42%" },
                            { label: t("product_c"), value: "93%" },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="flex justify-between items-center text-xs"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 1.2 + index * 0.1,
                                }}
                            >
                                <span style={{ color: textColor }}>
                                    {item.label}
                                </span>
                                <span style={{ color: accentColor }}>
                                    {item.value}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
            {/* Ligne de tendance */}
            <motion.div
                className="absolute bottom-[30%] left-[20%] rounded-lg"
                style={{ backgroundColor: bgColor, width: 220, height: 120 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
            >
                <div className="p-3">
                    <div
                        className="text-xs font-semibold mb-2"
                        style={{ color: textColor }}
                    >
                        {t("growth")}
                    </div>
                    <div className="h-[70px] relative">
                        <svg width="200" height="70" viewBox="0 0 200 70">
                            <motion.path
                                d="M0,50 Q40,40 70,45 T120,30 T180,10"
                                fill="none"
                                stroke={primaryColor}
                                strokeWidth="3"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, delay: 1.2 }}
                            />
                            <motion.path
                                d="M0,50 Q40,40 70,45 T120,30 T180,10"
                                fill="none"
                                stroke={secondaryColor}
                                strokeWidth="6"
                                strokeOpacity="0.2"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, delay: 1.2 }}
                            />
                        </svg>
                    </div>
                </div>
            </motion.div>
            {/* Points d'accent */}
            {[
                { top: "15%", left: "40%", delay: 1.4, size: 8 },
                { top: "70%", left: "60%", delay: 1.6, size: 6 },
                { top: "40%", left: "75%", delay: 1.8, size: 10 },
                { top: "80%", left: "30%", delay: 2.0, size: 7 },
                { top: "25%", left: "65%", delay: 2.2, size: 9 },
            ].map((item, index) => (
                <motion.div
                    key={index}
                    className="absolute rounded-full"
                    style={{
                        top: item.top,
                        left: item.left,
                        width: item.size,
                        height: item.size,
                        backgroundColor:
                            index % 2 === 0 ? primaryColor : secondaryColor,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.7, scale: 1 }}
                    transition={{
                        duration: 0.6,
                        delay: item.delay,
                        type: "spring",
                        stiffness: 200,
                        damping: 10,
                    }}
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                            delay: index * 0.5,
                        }}
                    />
                </motion.div>
            ))}
            {/* Lignes de connexion */}
            <svg className="absolute inset-0 w-full h-full">
                {[
                    { x1: "25%", y1: "35%", x2: "40%", y2: "15%", delay: 2.4 },
                    { x1: "25%", y1: "35%", x2: "20%", y2: "70%", delay: 2.6 },
                    { x1: "75%", y1: "25%", x2: "65%", y2: "60%", delay: 2.8 },
                    { x1: "25%", y1: "70%", x2: "60%", y2: "70%", delay: 3.0 },
                ].map((line, index) => (
                    <motion.line
                        key={index}
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke={secondaryColor}
                        strokeWidth="1"
                        strokeDasharray="5,5"
                        initial={{ opacity: 0, pathLength: 0 }}
                        animate={{ opacity: 0.5, pathLength: 1 }}
                        transition={{ duration: 1.5, delay: line.delay }}
                    />
                ))}
            </svg>
        </div>
    );
}
