"use client";

import { useState, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { routing, useRouter, usePathname } from "@/i18n/routing";

type LocaleSwitcherTogglerProps = {
    className?: string;
    size?: "sm" | "md" | "lg";
};

export default function LocaleSwitcherToggler({
    className,
    size = "md",
}: LocaleSwitcherTogglerProps) {
    // Mock locale state
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const [isHovered, setIsHovered] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Check for dark mode and set up observer for theme changes
    useEffect(() => {
        const updateTheme = () => {
            setIsDarkMode(document.documentElement.classList.contains("dark"));
        };

        // Initial check
        updateTheme();

        // Set up observer for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (
                    mutation.attributeName === "class" &&
                    mutation.target === document.documentElement
                ) {
                    updateTheme();
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect();
    }, []);

    // Size mappings
    const sizeMap = {
        sm: {
            button: "h-8 px-3 text-sm",
            icon: 14,
        },
        md: {
            button: "h-10 px-4 text-base",
            icon: 16,
        },
        lg: {
            button: "h-12 px-5 text-lg",
            icon: 20,
        },
    };

    const toggleLocale = () => {
        const currentIndex = routing.locales.indexOf(locale as "en" | "fr");
        const nextIndex = (currentIndex + 1) % routing.locales.length;
        const nextLocale = routing.locales[nextIndex] as "en" | "fr";
        

        // Toggle between EN and FR
        startTransition(() => {
            // This is the correct way to replace the route with a new locale in next-intl
            router.replace(pathname, { locale: nextLocale });
        });
    };

    // Get locale display text
    const getLocaleText = (locale: string) => {
        return locale.toUpperCase();
    };

    return (
        <motion.div
            className={className}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <Button
                variant="outline"
                onClick={toggleLocale}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                disabled={isPending}
                className={`
          ${sizeMap[size].button}
          relative
          overflow-hidden
          rounded-full
          font-bold
          transition-all
          duration-300
          border-2
          ${
              isDarkMode
                  ? "border-[#a8a7d1] bg-[#a8a7d1]/10 text-white hover:bg-[#a8a7d1]/20"
                  : "border-[#54489e] bg-[#54489e]/10 text-[#54489e] hover:bg-[#54489e]/20"
          }
          shadow-lg
          ${isDarkMode ? "shadow-[#a8a7d1]/20" : "shadow-[#54489e]/20"}
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
                        background: isDarkMode
                            ? "radial-gradient(circle at center, rgba(255, 255, 255, 0.8) 0%, rgba(168, 167, 209, 0) 70%)"
                            : "radial-gradient(circle at center, rgba(168, 167, 209, 0.8) 0%, rgba(84, 72, 158, 0) 70%)",
                        mixBlendMode: "soft-light",
                    }}
                />

                {/* Click ripple effect */}
                {!isPending && (
                    <motion.div
                        className="absolute"
                        initial={{ opacity: 0, scale: 0 }}
                        whileTap={{
                            opacity: 0.7,
                            scale: 3,
                        }}
                        transition={{ duration: 0.5 }}
                        style={{
                            background:
                                "radial-gradient(circle, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 70%)",
                            width: 50,
                            height: 50,
                            borderRadius: "50%",
                            left: "50%",
                            top: "50%",
                            x: "-50%",
                            y: "-50%",
                        }}
                    />
                )}

                {/* Text content with animation */}
                <motion.span className="relative z-10">
                    {isPending ? (
                        <motion.span
                            animate={{
                                opacity: [0.5, 1, 0.5],
                                scale: [0.95, 1.05, 0.95],
                            }}
                            transition={{
                                duration: 1.2,
                                repeat: Number.POSITIVE_INFINITY,
                                type: "tween",
                            }}
                        >
                            ...
                        </motion.span>
                    ) : (
                        <motion.span
                            initial={{ y: 0 }}
                            animate={{ y: isHovered ? -2 : 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 10,
                            }}
                        >
                            {getLocaleText(locale)}
                        </motion.span>
                    )}
                </motion.span>
            </Button>
        </motion.div>
    );
}
