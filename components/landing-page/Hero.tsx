"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import AnimatedGradient from "@/components/motion/animated-gradient";
import HeroDashboardIllustration from "@/components/illustrations/HeroDashboardIllustration";
import ScrollIndicator from "@/components/ui/scroll-indicator";

// Custom hook to detect mobile devices
const useIsMobile = () => {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return isMobile;
};

const Hero = () => {
    const t = useTranslations("Hero");
    const isMobile = useIsMobile();

    // Animation variants based on device type
    const fadeIn = isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 };

    const fadeInRight = isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 };

    const buttonHover = isMobile ? {} : { scale: 1.05 };

    const buttonTap = isMobile ? {} : { scale: 0.95 };

    const arrowAnimation = isMobile
        ? {}
        : {
              x: [0, 5, 0],
              transition: {
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop" as const,
              },
          };

    return (
        <section className="relative w-full py-10 md:py-28 lg:py-20 hero-gradient overflow-hidden">
            {!isMobile && <AnimatedGradient />}
            <div className="container mx-auto px-4 md:px-6 relative">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12">
                    {/* Contenu textuel à gauche */}
                    <motion.div
                        className="w-full md:w-1/2 text-center md:text-left"
                        initial={fadeIn}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl glow-text text-governor_bay dark:text-white mb-6">
                            {t("title")}
                        </h1>
                        <p className="text-xl text-[#a8a7d1] max-w-[600px] mx-auto md:mx-0 mb-8">
                            {t("subtitle")}
                        </p>

                        {/* Animated CTA Button */}
                        <motion.div
                            className="inline-block"
                            whileHover={buttonHover}
                            whileTap={buttonTap}
                        >
                            <Button
                                asChild
                                size="lg"
                                className="bg-[#54489e] hover:bg-[#6656a7] text-white px-8 py-7 text-lg rounded-2xl shadow-lg shadow-[#54489e]/30 relative overflow-hidden group"
                            >
                                <Link
                                    href="/coming-soon"
                                    className="flex items-center"
                                >
                                    <span className="relative z-10">
                                        {t("cta")}
                                    </span>
                                    <motion.div
                                        className="relative z-10 ml-2"
                                        animate={arrowAnimation}
                                    >
                                        <ArrowRight className="h-5 w-5" />
                                    </motion.div>
                                    {!isMobile && (
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-[#54489e] to-[#6656a7] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            initial={{ x: "-100%" }}
                                            whileHover={{ x: 0 }}
                                            transition={{
                                                duration: 0.5,
                                                ease: "easeOut",
                                            }}
                                        />
                                    )}
                                </Link>
                            </Button>
                        </motion.div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-8">
                            {[
                                { text: t("features.trial"), delay: 0.6 },
                                { text: t("features.first_month"), delay: 0.7 },
                                { text: t("features.support"), delay: 0.8 },
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-center"
                                    initial={
                                        isMobile
                                            ? { opacity: 1, y: 0 }
                                            : { opacity: 0, y: 20 }
                                    }
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: feature.delay }}
                                >
                                    <CheckCircle2 className="mr-2 h-5 w-5 text-[#a8a7d1]" />
                                    <span className="text-[#a8a7d1]">
                                        {feature.text}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Illustration à droite */}
                    <motion.div
                        className="w-full md:w-1/2 mt-12 md:mt-0"
                        initial={fadeInRight}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.2,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        <div className="relative h-[400px] md:h-[450px] lg:h-[500px] mb-20 md:mb-0">
                            <HeroDashboardIllustration />
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="h-18" />

            {/* Scroll Indicator */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center">
                {!isMobile && <ScrollIndicator />}
            </div>
        </section>
    );
};

export default Hero;
