"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ThemeTransitionProps {
    togglerRef: React.RefObject<HTMLButtonElement | null>;
}

export function ThemeTransition({ togglerRef }: ThemeTransitionProps) {
    const { theme, resolvedTheme } = useTheme();
    const [prevTheme, setPrevTheme] = useState<string | undefined>(undefined);
    const [isAnimating, setIsAnimating] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (prevTheme && prevTheme !== resolvedTheme) {
            if (togglerRef.current) {
                const rect = togglerRef.current.getBoundingClientRect();
                setPosition({
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2,
                });
            }
            setIsAnimating(true);

            const timer = setTimeout(() => {
                setIsAnimating(false);
            }, 1000); // Animation duration

            return () => clearTimeout(timer);
        }

        setPrevTheme(resolvedTheme);
    }, [resolvedTheme, prevTheme, togglerRef]);

    if (!isAnimating) return null;

    const isDarkMode = resolvedTheme === "dark";

    return (
        <AnimatePresence>
            {isAnimating && (
                <motion.div
                    key="theme-transition"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={cn(
                        "fixed inset-0 z-[100] pointer-events-none overflow-hidden",
                        isDarkMode ? "bg-[#121212]" : "bg-transparent"
                    )}
                >
                    <motion.div
                        className={cn(
                            "absolute rounded-full transform -translate-x-1/2 -translate-y-1/2",
                            isDarkMode
                                ? "bg-[#121212] animate-theme-fade-in"
                                : "bg-[#f8f8fc] animate-theme-fade-out"
                        )}
                        style={{
                            left: `${position.x}px`,
                            top: `${position.y}px`,
                            width: isDarkMode ? "0" : "300vw",
                            height: isDarkMode ? "0" : "300vh",
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
