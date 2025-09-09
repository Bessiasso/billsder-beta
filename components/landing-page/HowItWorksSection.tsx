"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, FileText, Settings, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from "@/components/motion/scroll-reveal";

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

export default function HowItWorksSection() {
    const t = useTranslations("HowItWorks");
    const isMobile = useIsMobile();

    // Référence pour les animations au défilement
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Valeurs de transformation pour les effets parallax - disabled on mobile
    const lineProgress = useTransform(
        scrollYProgress,
        [0, 0.8],
        isMobile ? [0, 0] : [0, 1]
    );

    // Animation variants based on device type
    const iconHover = isMobile
        ? {}
        : {
              scale: 1.05,
              boxShadow: "0 0 20px rgba(84, 72, 158, 0.3)",
              borderColor: "rgba(84, 72, 158, 0.5)",
              transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
              },
          };

    const iconRotate = isMobile
        ? {}
        : {
              rotate: 5,
              scale: 1.1,
              transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
              },
          };

    const helpCardHover = isMobile
        ? {}
        : {
              y: -5,
              boxShadow: "0 20px 40px -15px rgba(84, 72, 158, 0.3)",
              borderColor: "rgba(84, 72, 158, 0.5)",
              transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
              },
          };

    const helpIconHover = isMobile
        ? {}
        : {
              scale: 1.05,
              rotate: 5,
              transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
              },
          };

    const arrowAnimation = isMobile
        ? {}
        : {
              x: [0, 5, 0],
              transition: {
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop" as const,
                  ease: "easeInOut",
              },
          };

    // Les étapes du processus
    const steps = [
        {
            number: 1,
            title: t("steps.create_account.title"),
            description: t("steps.create_account.description"),
            icon: (
                <FileText className="h-10 w-10 text-governor_bay dark:text--[#a8a7d1]" />
            ),
        },
        {
            number: 2,
            title: t("steps.customize.title"),
            description: t("steps.customize.description"),
            icon: (
                <Settings className="h-10 w-10 text-governor_bay dark:text-[#a8a7d1]" />
            ),
        },
        {
            number: 3,
            title: t("steps.start_managing.title"),
            description: t("steps.start_managing.description"),
            icon: (
                <Zap className="h-10 w-10 text-governor_bay dark:text-[#a8a7d1]" />
            ),
        },
    ];

    return (
        <section
            className="relative w-full py-12 overflow-hidden"
            ref={containerRef}
        >
            <div className="container px-4 md:px-6 mx-auto">
                <ScrollReveal>
                    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                        <motion.span
                            className="text-sm font-medium text-governor_bay dark:text-[#a8a7d1] uppercase tracking-wider"
                            initial={
                                isMobile
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 10 }
                            }
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            {t("subtitle")}
                        </motion.span>
                        <motion.h2
                            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text"
                            initial={
                                isMobile
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 10 }
                            }
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            {t("title")}
                        </motion.h2>

                        <motion.p
                            className="mx-auto max-w-[700px] text-governor_bay dark:text-[#a8a7d1] md:text-xl"
                            initial={
                                isMobile
                                    ? { opacity: 1, y: 0 }
                                    : { opacity: 0, y: 10 }
                            }
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            {t("description")}
                        </motion.p>
                    </div>
                </ScrollReveal>

                {/* Timeline centrale avec animation */}
                <div className="relative max-w-6xl mx-auto">
                    {/* Étapes */}
                    <div className="relative z-10 space-y-32">
                        {steps.map((step, index) => (
                            <ScrollReveal key={index} delay={index * 0.1}>
                                <div className="relative">
                                    {/* Cercle numéroté sur la ligne */}
                                    <motion.div
                                        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                                        initial={
                                            isMobile
                                                ? { scale: 1 }
                                                : { scale: 0 }
                                        }
                                        whileInView={{ scale: 1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 20,
                                            delay: 0.2 + index * 0.1,
                                        }}
                                        viewport={{
                                            once: true,
                                            margin: "-100px",
                                        }}
                                    >
                                        <div className="relative">
                                            {/* Cercle extérieur pulsant - disabled on mobile */}
                                            {!isMobile && (
                                                <motion.div
                                                    className="absolute -inset-4 rounded-full bg-[#54489e]/20"
                                                    animate={{
                                                        scale: [0.7, 0.9, 0.7],
                                                        opacity: [
                                                            0.5, 0.3, 0.5,
                                                        ],
                                                    }}
                                                    transition={{
                                                        duration: 3,
                                                        repeat: Number.POSITIVE_INFINITY,
                                                        repeatType:
                                                            "loop" as const,
                                                    }}
                                                />
                                            )}

                                            {/* Cercle principal */}
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#54489e] to-[#6656a7] flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-[#54489e]/30 relative z-10">
                                                {step.number}
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Carte avec contenu */}
                                    <motion.div
                                        className="max-w-2xl mx-auto"
                                        initial={
                                            isMobile
                                                ? { opacity: 1, y: 0 }
                                                : { opacity: 0, y: 20 }
                                        }
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.3 + index * 0.1,
                                        }}
                                        viewport={{
                                            once: true,
                                            margin: "-100px",
                                        }}
                                    >
                                        <Card className="backdrop-blur-sm border-[#54489e]/30 hover:border-[#54489e] transition-all duration-500 shadow-xl shadow-[#54489e]/5 overflow-hidden rounded-3xl">
                                            <CardContent className="p-8">
                                                <div className="flex flex-col items-center text-center">
                                                    <motion.div
                                                        className="w-24 h-24 rounded-2xl bg-[#54489e]/10 border border-[#54489e]/20 flex items-center justify-center mb-6 mt-4 relative overflow-hidden"
                                                        whileHover={iconHover}
                                                    >
                                                        {/* Effet de brillance en arrière-plan - disabled on mobile */}
                                                        {!isMobile && (
                                                            <motion.div
                                                                className="absolute inset-0 bg-gradient-to-br from-[#54489e]/20 to-transparent rounded-2xl"
                                                                animate={{
                                                                    rotate: [
                                                                        0, 360,
                                                                    ],
                                                                    scale: [
                                                                        1, 1.2,
                                                                        1,
                                                                    ],
                                                                }}
                                                                transition={{
                                                                    duration: 10,
                                                                    repeat: Number.POSITIVE_INFINITY,
                                                                    repeatType:
                                                                        "loop" as const,
                                                                }}
                                                            />
                                                        )}
                                                        <motion.div
                                                            whileHover={
                                                                iconRotate
                                                            }
                                                            className="rounded-2xl"
                                                        >
                                                            {step.icon}
                                                        </motion.div>
                                                    </motion.div>

                                                    <motion.h3
                                                        className="text-2xl font-bold text-governor_bay dark:text-white mb-3 relative inline-block"
                                                        whileHover={
                                                            isMobile
                                                                ? {}
                                                                : {
                                                                      scale: 1.02,
                                                                  }
                                                        }
                                                    >
                                                        {step.title}
                                                        <motion.div
                                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#54489e] to-[#a8a7d1]"
                                                            initial={{
                                                                width: "0%",
                                                            }}
                                                            whileInView={{
                                                                width: "100%",
                                                            }}
                                                            transition={{
                                                                duration: 0.8,
                                                                delay:
                                                                    0.5 +
                                                                    index * 0.1,
                                                            }}
                                                            viewport={{
                                                                once: true,
                                                            }}
                                                        />
                                                    </motion.h3>

                                                    <p className="text-governor_bay dark:text-[#a8a7d1] leading-relaxed max-w-lg mx-auto text-lg">
                                                        {step.description}
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* Section d'aide */}
                    <ScrollReveal delay={0.6}>
                        <div className="flex justify-center mt-32 relative z-10">
                            <motion.div
                                className="backdrop-blur-sm border border-[#54489e]/30 rounded-2xl p-10 max-w-2xl text-center shadow-xl shadow-[#54489e]/5"
                                whileHover={helpCardHover}
                            >
                                <div className="flex flex-col items-center gap-6">
                                    <motion.div
                                        className="w-20 h-20 rounded-2xl bg-[#54489e]/20 border border-[#54489e]/30 flex items-center justify-center relative overflow-hidden"
                                        whileHover={helpIconHover}
                                    >
                                        {/* Effet de brillance en arrière-plan - disabled on mobile */}
                                        {!isMobile && (
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-br from-[#54489e]/20 to-transparent"
                                                animate={{
                                                    rotate: [0, 360],
                                                    scale: [1, 1.2, 1],
                                                }}
                                                transition={{
                                                    duration: 10,
                                                    repeat: Number.POSITIVE_INFINITY,
                                                    repeatType: "loop" as const,
                                                }}
                                            />
                                        )}
                                        <Users className="h-10 w-10 text-governor_bay dark:text-[#a8a7d1]" />
                                    </motion.div>

                                    <div>
                                        <h4 className="text-2xl font-bold text-governor_bay dark:text-white mb-4">
                                            {t("help.title")}
                                        </h4>
                                        <p className="text-governor_bay dark:text-[#a8a7d1] mb-8 max-w-lg mx-auto text-lg">
                                            {t("help.description")}
                                        </p>
                                        <motion.div
                                            whileHover={
                                                isMobile ? {} : { scale: 1.05 }
                                            }
                                            whileTap={
                                                isMobile ? {} : { scale: 0.95 }
                                            }
                                            className="inline-block"
                                        >
                                            <Button
                                                asChild
                                                size="lg"
                                                className="bg-gradient-to-r from-[#54489e] to-[#6656a7] hover:from-[#6656a7] hover:to-[#54489e] text-white px-8 py-6 text-lg shadow-lg shadow-[#54489e]/30 border-0 rounded-2xl"
                                            >
                                                <Link
                                                    href="/coming-soon"
                                                    className="flex items-center"
                                                >
                                                    {t("help.cta")}
                                                    <motion.div
                                                        animate={arrowAnimation}
                                                    >
                                                        <ArrowRight className="ml-2 h-5 w-5" />
                                                    </motion.div>
                                                </Link>
                                            </Button>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </ScrollReveal>

                    {/* Éléments décoratifs - disabled on mobile */}
                    {!isMobile && (
                        <div className="absolute inset-0 pointer-events-none">
                            {/* Orbes lumineux */}
                            <motion.div
                                className="absolute top-[10%] left-[5%] w-[300px] h-[300px] rounded-full bg-[#54489e]/10 blur-[80px]"
                                animate={{
                                    x: [0, 30, 0],
                                    y: [0, 20, 0],
                                }}
                                transition={{
                                    duration: 15,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "reverse" as const,
                                }}
                            />
                            <motion.div
                                className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-[#a8a7d1]/10 blur-[100px]"
                                animate={{
                                    x: [0, -40, 0],
                                    y: [0, -30, 0],
                                }}
                                transition={{
                                    duration: 20,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "reverse" as const,
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
