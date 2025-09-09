"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

type ThemeTogglerProps = {
    className?: string;
    size?: "sm" | "md" | "lg";
};

const ThemeToggler = ({ className, size = "md" }: ThemeTogglerProps) => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    // Size mappings
    const sizeMap = {
        sm: {
            button: "h-8 w-8 px-3 text-sm",
            icon: 14,
        },
        md: {
            button: "h-10 w-10 px-4 text-base",
            icon: 16,
        },
        lg: {
            button: "h-12 w-12 px-5 text-lg",
            icon: 20,
        },
    };

    // Only show the appropriate icon after mounting to prevent hydration mismatch
    if (!mounted) {
        return (
            <Button
                variant="outline"
                size="icon"
                className={`${sizeMap[size].button} rounded-2xl opacity-0 ${className}`}
            >
                <span className="sr-only">Toggle theme</span>
            </Button>
        );
    }

    const isDark = theme === "dark";

    return (
        <motion.div
            className={`${className}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <Button
                variant="outline"
                onClick={toggleTheme}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`
                    ${sizeMap[size].button} 
                    relative 
                    overflow-hidden 
                    rounded-2xl
                    font-bold 
                    transition-all 
                    duration-300
                    border-2
                    ${
                        isDark
                            ? "border-[#a8a7d1] bg-[#a8a7d1]/10 text-white hover:bg-[#a8a7d1]/20"
                            : "border-[#54489e] bg-[#54489e]/10 text-[#54489e] hover:bg-[#54489e]/20"
                    }
                    shadow-lg
                    ${isDark ? "shadow-[#a8a7d1]/20" : "shadow-[#54489e]/20"}
                `}
            >
                {/* Glow effect */}
                <motion.div
                    className="absolute inset-0 opacity-0"
                    animate={{
                        opacity: isHovered ? 0.4 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                        background: isDark
                            ? "radial-gradient(circle at center, rgba(255, 255, 255, 0.8) 0%, rgba(168, 167, 209, 0) 70%)"
                            : "radial-gradient(circle at center, rgba(168, 167, 209, 0.8) 0%, rgba(84, 72, 158, 0) 70%)",
                        mixBlendMode: "soft-light",
                    }}
                />

                {/* Sun icon */}
                <motion.div
                    animate={{
                        rotate: isDark ? -90 : 0,
                        scale: isDark ? 0 : 1,
                        opacity: isDark ? 0 : 1,
                    }}
                    transition={{
                        duration: 0.5,
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                    }}
                    className={`absolute inset-0 flex items-center justify-center`}
                >
                    <Sun
                        size={sizeMap[size].icon}
                        className={`
                            ${isDark ? "text-white" : "text-[#54489e]"}
                            ${isHovered ? "drop-shadow-md" : ""}
                        `}
                    />
                </motion.div>

                {/* Moon icon */}
                <motion.div
                    animate={{
                        rotate: isDark ? 0 : 90,
                        scale: isDark ? 1 : 0,
                        opacity: isDark ? 1 : 0,
                    }}
                    transition={{
                        duration: 0.5,
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                    }}
                    className={`absolute inset-0 flex items-center justify-center`}
                >
                    <Moon
                        size={sizeMap[size].icon}
                        className={`
                            ${isDark ? "text-white" : "text-[#54489e]"}
                            ${isHovered ? "drop-shadow-md" : ""}
                        `}
                    />
                </motion.div>

                <span className="sr-only">Toggle theme</span>
            </Button>
        </motion.div>
    );
};

export default ThemeToggler;
