"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import {
    BarChart3,
    PieChart,
    Activity,
    TrendingUp,
    Users,
    CreditCard,
    DollarSign,
} from "lucide-react";

export default function HeroDashboardIllustration() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const t = useTranslations("HeroDashboard");

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === "dark";

    // Couleurs adaptées au thème
    const primaryColor = isDark ? "#54489e" : "#54489e";
    const secondaryColor = isDark ? "#a8a7d1" : "#a8a7d1";
    const accentColor = isDark ? "#6656a7" : "#7667b3";
    const bgColor = isDark ? "#1E1A37" : "#f8f8fc";
    const cardBgColor = isDark ? "#121212" : "#ffffff";
    const textColor = isDark ? "#ffffff" : "#54489e";
    const borderColor = isDark
        ? "rgba(84, 72, 158, 0.3)"
        : "rgba(84, 72, 158, 0.2)";
    const gridColor = isDark
        ? "rgba(168, 167, 209, 0.1)"
        : "rgba(84, 72, 158, 0.1)";

    return (
        <div className="relative md:w-full md:h-full w-[350px] h-[350px] mx-auto">
            {/* Dashboard principal */}
            <motion.div
                className="relative rounded-xl overflow-hidden shadow-2xl shadow-[#54489e]/20 border border-[#54489e]/30 backdrop-blur-sm"
                style={{ backgroundColor: bgColor }}
                whileHover={{
                    y: -5,
                    boxShadow: "0 25px 50px -12px rgba(84, 72, 158, 0.4)",
                }}
                transition={{ duration: 0.3 }}
            >
                {/* Grille de fond */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px), 
                              linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
                        backgroundSize: "20px 20px",
                    }}
                />

                {/* Header du dashboard */}
                <div className="border-b border-[#54489e]/20 p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-md bg-[#54489e] flex items-center justify-center">
                            <BarChart3 size={18} className="text-white" />
                        </div>
                        <h3 className="font-bold" style={{ color: textColor }}>
                            {t("dashboard")}
                        </h3>
                    </div>
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-[#54489e]/40"></div>
                        <div className="w-3 h-3 rounded-full bg-[#54489e]/60"></div>
                        <div className="w-3 h-3 rounded-full bg-[#54489e]/80"></div>
                    </div>
                </div>

                {/* Contenu du dashboard */}
                <div className="p-4 grid grid-cols-2 gap-4">
                    {/* Graphique principal */}
                    <div className="col-span-2 h-40 bg-[#54489e]/10 rounded-lg p-3 border border-[#54489e]/20">
                        <div className="flex justify-between items-center mb-2">
                            <span
                                className="text-xs font-medium"
                                style={{ color: textColor }}
                            >
                                {t("performance")}
                            </span>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 rounded-full bg-[#54489e]"></div>
                                <span
                                    className="text-xs"
                                    style={{ color: textColor }}
                                >
                                    {t("sales")}
                                </span>
                                <div className="w-2 h-2 rounded-full bg-[#a8a7d1]"></div>
                                <span
                                    className="text-xs"
                                    style={{ color: textColor }}
                                >
                                    {t("customers")}
                                </span>
                            </div>
                        </div>
                        <div className="relative h-28">
                            <svg
                                width="100%"
                                height="100%"
                                viewBox="0 0 300 100"
                            >
                                {/* Ligne de base */}
                                <line
                                    x1="0"
                                    y1="90"
                                    x2="300"
                                    y2="90"
                                    stroke={borderColor}
                                    strokeWidth="1"
                                />

                                {/* Lignes de grille horizontales */}
                                {[30, 60].map((y, i) => (
                                    <line
                                        key={i}
                                        x1="0"
                                        y1={y}
                                        x2="300"
                                        y2={y}
                                        stroke={borderColor}
                                        strokeWidth="0.5"
                                        strokeDasharray="2 2"
                                    />
                                ))}

                                {/* Graphique linéaire 1 */}
                                <motion.path
                                    d="M0,80 C20,70 40,60 60,65 C80,70 100,40 120,35 C140,30 160,45 180,30 C200,15 220,25 240,20 C260,15 280,10 300,5"
                                    fill="none"
                                    stroke={primaryColor}
                                    strokeWidth="2"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, delay: 0.5 }}
                                />

                                {/* Graphique linéaire 2 */}
                                <motion.path
                                    d="M0,90 C20,85 40,80 60,75 C80,70 100,65 120,70 C140,75 160,60 180,55 C200,50 220,55 240,45 C260,35 280,40 300,30"
                                    fill="none"
                                    stroke={secondaryColor}
                                    strokeWidth="2"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, delay: 0.7 }}
                                />

                                {/* Points sur les lignes */}
                                {[
                                    { x: 60, y: 65, color: primaryColor },
                                    { x: 120, y: 35, color: primaryColor },
                                    { x: 180, y: 30, color: primaryColor },
                                    { x: 240, y: 20, color: primaryColor },
                                    { x: 60, y: 75, color: secondaryColor },
                                    { x: 120, y: 70, color: secondaryColor },
                                    { x: 180, y: 55, color: secondaryColor },
                                    { x: 240, y: 45, color: secondaryColor },
                                ].map((point, i) => (
                                    <motion.circle
                                        key={i}
                                        cx={point.x}
                                        cy={point.y}
                                        r="3"
                                        fill={point.color}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: 1 + i * 0.1,
                                        }}
                                    />
                                ))}
                            </svg>
                        </div>
                    </div>

                    {/* Cartes statistiques */}
                    <div className="bg-[#54489e]/10 rounded-lg p-3 border border-[#54489e]/20 flex flex-col justify-between">
                        <div className="flex justify-between items-center">
                            <span
                                className="text-xs font-medium"
                                style={{ color: textColor }}
                            >
                                {t("revenue")}
                            </span>
                            <DollarSign
                                size={14}
                                style={{ color: primaryColor }}
                            />
                        </div>
                        <div className="mt-2">
                            <motion.div
                                className="text-lg font-bold"
                                style={{ color: textColor }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                            >
                                45,6K FCFA
                            </motion.div>
                            <div className="flex items-center mt-1">
                                <TrendingUp
                                    size={12}
                                    className="text-green-500 mr-1"
                                />
                                <span className="text-xs text-green-500">
                                    +12.5%
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#54489e]/10 rounded-lg p-3 border border-[#54489e]/20 flex flex-col justify-between">
                        <div className="flex justify-between items-center">
                            <span
                                className="text-xs font-medium"
                                style={{ color: textColor }}
                            >
                                {t("orders")}
                            </span>
                            <CreditCard
                                size={14}
                                style={{ color: primaryColor }}
                            />
                        </div>
                        <div className="mt-2">
                            <motion.div
                                className="text-lg font-bold"
                                style={{ color: textColor }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.9 }}
                            >
                                156
                            </motion.div>
                            <div className="flex items-center mt-1">
                                <TrendingUp
                                    size={12}
                                    className="text-green-500 mr-1"
                                />
                                <span className="text-xs text-green-500">
                                    +8.2%
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Graphique à barres */}
                    <div className="col-span-2 h-32 bg-[#54489e]/10 rounded-lg p-3 border border-[#54489e]/20">
                        <div className="flex justify-between items-center mb-2">
                            <span
                                className="text-xs font-medium"
                                style={{ color: textColor }}
                            >
                                {t("sales_by_category")}
                            </span>
                            <PieChart
                                size={14}
                                style={{ color: primaryColor }}
                            />
                        </div>
                        <div className="flex items-end h-16 gap-2 mt-2">
                            {[60, 45, 75, 35, 55, 65, 40].map(
                                (height, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex-1 rounded-t"
                                        style={{
                                            backgroundColor:
                                                index % 2 === 0
                                                    ? primaryColor
                                                    : accentColor,
                                        }}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${height}%` }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 1 + index * 0.1,
                                        }}
                                    />
                                )
                            )}
                        </div>
                        <div className="flex justify-between mt-2">
                            <span
                                className="text-xs"
                                style={{ color: textColor }}
                            >
                                {t("days.mon")}
                            </span>
                            <span
                                className="text-xs"
                                style={{ color: textColor }}
                            >
                                {t("days.tue")}
                            </span>
                            <span
                                className="text-xs"
                                style={{ color: textColor }}
                            >
                                {t("days.wed")}
                            </span>
                            <span
                                className="text-xs"
                                style={{ color: textColor }}
                            >
                                {t("days.thu")}
                            </span>
                            <span
                                className="text-xs"
                                style={{ color: textColor }}
                            >
                                {t("days.fri")}
                            </span>
                            <span
                                className="text-xs"
                                style={{ color: textColor }}
                            >
                                {t("days.sat")}
                            </span>
                            <span
                                className="text-xs"
                                style={{ color: textColor }}
                            >
                                {t("days.sun")}
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Carte flottante - Clients actifs */}
            <motion.div
                className="absolute top-5 left-5 bg-[#121212] rounded-lg p-4 shadow-lg border border-[#54489e]/30 backdrop-blur-sm z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                whileHover={{
                    y: -5,
                    boxShadow: "0 15px 30px -10px rgba(84, 72, 158, 0.5)",
                    scale: 1.05,
                }}
            >
                <div className="flex items-center gap-2 mb-1">
                    <Users size={16} className="text-[#a8a7d1]" />
                    <p className="text-[#a8a7d1] text-sm font-medium">
                        {t("active_customers")}
                    </p>
                </div>
                <div className="flex items-end gap-2">
                    <span className="text-white text-3xl font-bold">1,248</span>
                    <span className="text-green-400 text-sm font-medium">
                        +24%
                    </span>
                </div>
                <p className="text-[#a8a7d1] text-xs mt-1">{t("this_month")}</p>
            </motion.div>

            {/* Carte flottante - Ventes mensuelles */}
            <motion.div
                className="absolute bottom-5 right-5 bg-[#121212] rounded-lg p-4 shadow-lg border border-[#54489e]/30 backdrop-blur-sm z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                whileHover={{
                    y: -5,
                    boxShadow: "0 15px 30px -10px rgba(84, 72, 158, 0.5)",
                    scale: 1.05,
                }}
            >
                <div className="flex items-center gap-2 mb-2">
                    <Activity size={16} className="text-[#a8a7d1]" />
                    <p className="text-[#a8a7d1] text-sm font-medium">
                        {t("monthly_sales")}
                    </p>
                </div>
                <div className="flex items-end h-12 gap-1">
                    {[35, 45, 38, 55, 60, 70, 65].map((height, index) => (
                        <motion.div
                            key={index}
                            className="w-4 bg-[#6656a7] rounded-sm"
                            style={{ height: `${height}%` }}
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{
                                duration: 0.5,
                                delay: 0.8 + index * 0.1,
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
