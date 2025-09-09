"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import ParallaxSection from "../motion/parallax-section";
import ScrollReveal from "../motion/scroll-reveal";

// Custom hook to detect mobile devices
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return isMobile;
};

const CallToAction = () => {
    const t = useTranslations("CallToAction");
    const isMobile = useIsMobile();

    // Animation variants based on device type
    const glowAnimation = isMobile
        ? {}
        : {
              textShadow: [
                  "0 0 10px rgba(168, 167, 209, 0.3)",
                  "0 0 20px rgba(168, 167, 209, 0.5)",
                  "0 0 10px rgba(168, 167, 209, 0.3)",
              ],
              transition: {
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse" as const,
              },
          };

    const buttonHover = isMobile
        ? {}
        : {
              scale: 1.02,
              transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
              },
          };

    return (
        <section className="relative w-full py-24 px-3 bg-[#54489e] from-white to-white overflow-hidden">
            <div className="absolute inset-0 bg-motif z-0 pointer-events-none" />
            {!isMobile && (
                <ParallaxSection baseVelocity={0.05} reverse={true}>
                    <motion.div
                        className="absolute -top-[40%] -left-[10%] h-[500px] w-[500px] rounded-full bg-[#a8a7d1]/20 blur-[100px]"
                        animate={{
                            x: [0, 30, 0],
                            y: [0, 20, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse" as const,
                        }}
                    />
                    <motion.div
                        className="absolute -bottom-[40%] -right-[10%] h-[600px] w-[600px] rounded-full bg-[#a8a7d1]/20 blur-[100px]"
                        animate={{
                            x: [0, -30, 0],
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse" as const,
                        }}
                    />
                </ParallaxSection>
            )}

            <ScrollReveal>
                <div className="container px-4 md:px-6 relative z-10 mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-7xl mx-auto">
                        <div className="space-y-6 max-w-3xl">
                            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-6">
                                {t("subtitle")}
                            </span>
                            <motion.h2
                                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white dark:text-white glow-text"
                                animate={glowAnimation}
                            >
                                {t("title")}
                            </motion.h2>
                            <p className="text-xl text-white/80 leading-relaxed">
                                {t("description")}
                            </p>
                            <div className="flex flex-wrap gap-3 pt-2">
                                <div className="flex items-center space-x-2">
                                    <CheckCircle2 className="h-5 w-5 text-white" />
                                    <span className="text-white/90">
                                        {t("features.trial")}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle2 className="h-5 w-5 text-white" />
                                    <span className="text-white/90">
                                        {t("features.first_month")}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle2 className="h-5 w-5 text-white" />
                                    <span className="text-white/90">
                                        {t("features.support")}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 md:min-w-[300px]"
                            whileHover={buttonHover}
                        >
                            <Button className="bg-white/10 backdrop-blur-xs p-10 min-w-[300px] md:min-w-[400px] rounded-2xl border border-white/20 text-lg w-full shadow-lg shadow-black/10 text-white">
                                <Link
                                    href="/coming-soon"
                                    className="flex items-center justify-center"
                                >
                                    {t("cta")}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default CallToAction;
