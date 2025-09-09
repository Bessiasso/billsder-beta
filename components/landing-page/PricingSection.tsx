"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from "@/components/motion/scroll-reveal";
import StaggerChildren from "@/components/motion/stagger-children";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

const MotionCard = motion(Card);
const MotionBadge = motion(Badge);

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

export default function PricingSection() {
    const t = useTranslations("Pricing");
    const router = useRouter();
    const searchParams = useSearchParams();
    const isMobile = useIsMobile();
    const [hoveredTier, setHoveredTier] = useState<number | null>(null);
    const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
        "monthly"
    );
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [stripePrices, setStripePrices] = useState<any>(null);

    const basic_price = 24.99;
    const business_price = 49.99;
    const enterprise_price = 79.99;
    const annual_savings = 0.18;

    const getAnnualPriceWithSavings = (monthlyPrice: number) => {
        return (monthlyPrice * 12 - monthlyPrice * 12 * annual_savings).toFixed(
            2
        );
    };

    const getAnnualPrice = (monthlyPrice: number) => {
        return (monthlyPrice * 12).toFixed(2);
    };

    const getAnnualSavings = (monthlyPrice: number) => {
        return (monthlyPrice * 12 * annual_savings).toFixed(2);
    };

    const crossPriceLine =
        "relative after:content-[''] after:absolute after:left-0 after:top-1/2 after:w-full after:h-[3px] after:-translate-y-1/2 after:bg-red-500 after:dark:bg-red-400 after:rounded-full after:-rotate-12";

    // Forfaits de tarification
    const pricingTiers = [
        {
            name: t("tiers.momentum.name"),
            icon: "/plans/elan.svg",
            monthly: basic_price,
            annual: getAnnualPrice(basic_price),
            annual_with_savings: getAnnualPriceWithSavings(basic_price),
            annualSavings: getAnnualSavings(basic_price),
            description: t("tiers.momentum.description"),
            features: t.raw("tiers.momentum.features") as string[],
            cta: t("tiers.momentum.cta"),
            popular: false,
        },
        {
            name: t("tiers.mastery.name"),
            icon: "/plans/maitrise.svg",
            monthly: business_price,
            annual: getAnnualPrice(business_price),
            annual_with_savings: getAnnualPriceWithSavings(business_price),
            annualSavings: getAnnualSavings(business_price),
            description: t("tiers.mastery.description"),
            features: t.raw("tiers.mastery.features") as string[],
            cta: t("tiers.mastery.cta"),
            popular: true,
        },
        {
            name: t("tiers.odyssey.name"),
            icon: "/plans/odysee.svg",
            monthly: enterprise_price,
            annual: getAnnualPrice(enterprise_price),
            annual_with_savings: getAnnualPriceWithSavings(enterprise_price),
            annualSavings: getAnnualSavings(enterprise_price),
            description: t("tiers.odyssey.description"),
            features: t.raw("tiers.odyssey.features") as string[],
            cta: t("tiers.odyssey.cta"),
            popular: false,
        },
    ];

    useEffect(() => {
        setMounted(true);

        // Vérifier si c'est une redirection de Stripe
        const success = searchParams.get("success");
        const canceled = searchParams.get("canceled");
        const session_id = searchParams.get("session_id");

        if (success === "true" && session_id) {
            setSessionId(session_id);
            toast.success("Paiement réussi", {
                description: "Votre abonnement est actif",
                duration: 5000,
            });
        }

        if (canceled === "true") {
            toast.error("Paiement annulé", {
                description: "Veuillez réessayer",
                duration: 5000,
            });
        }

        // Nettoyer l'URL après avoir traité les paramètres
        if (success || canceled) {
            const url = new URL(window.location.href);
            url.searchParams.delete("success");
            url.searchParams.delete("canceled");
            url.searchParams.delete("session_id");
            window.history.replaceState({}, "", url.toString());
        }
    }, [searchParams]);

    // Animation variants based on device type
    const containerVariants = {
        hidden: isMobile ? { opacity: 1 } : { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const lineVariants = {
        hidden: { width: 0 },
        visible: {
            width: "80px",
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.6,
            },
        },
    };

    const badgeVariants = {
        hidden: isMobile ? { scale: 0.5 } : { scale: 0 },
        visible: {
            scale: 0.5,
            transition: {
                type: "spring",
                stiffness: 500,
                damping: 15,
                delay: 0.9,
            },
        },
        pulse: isMobile
            ? {}
            : {
                  scale: [0.9, 1, 0.9],
                  transition: {
                      duration: 3.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop" as const,
                  },
              },
    };

    const cardHover = isMobile
        ? {}
        : {
              y: -10,
              transition: {
                  duration: 0.3,
                  ease: "easeOut",
              },
          };

    const buttonHover = isMobile
        ? {}
        : {
              scale: 1.05,
              transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
              },
          };

    const buttonTap = isMobile
        ? {}
        : {
              scale: 0.95,
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

    return (
        <section className="relative w-full py-12 overflow-hidden">
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

            <ScrollReveal>
                <div className="container px-4 md:px-6 mx-auto">
                    <motion.div
                        className="flex flex-col items-center justify-center space-y-4 text-center mb-10 md:mb-18"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <motion.span
                            className="text-sm font-medium text-governor_bay dark:text-[#a8a7d1] uppercase tracking-wider"
                            variants={itemVariants}
                        >
                            {t("subtitle")}
                        </motion.span>
                        <motion.h2
                            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-governor_bay dark:text-white"
                            variants={itemVariants}
                        >
                            {t("title")}
                        </motion.h2>
                        <motion.div
                            className="h-1 bg-gradient-to-r from-[#54489e] to-[#a8a7d1] rounded-full"
                            variants={lineVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        />
                        <motion.p
                            className="mx-auto max-w-[700px] text-governor_bay dark:text-[#a8a7d1] md:text-xl mt-4"
                            variants={itemVariants}
                        >
                            {t("description")}
                        </motion.p>
                    </motion.div>

                    {/* Tabs */}
                    <Tabs
                        defaultValue="monthly"
                        value={billingCycle}
                        onValueChange={(value) =>
                            setBillingCycle(value as "monthly" | "annual")
                        }
                        className="w-full max-w-md relative mx-auto mb-10 md:mb-26"
                    >
                        <TabsList className="grid grid-cols-2 w-full p-1 h-10 bg-muted/80 backdrop-blur-sm rounded-2xl">
                            <TabsTrigger
                                value="monthly"
                                className="text-sm md:text-base rounded-xl"
                            >
                                {t("billing.monthly")}
                            </TabsTrigger>
                            <TabsTrigger
                                value="annual"
                                className="relative text-sm md:text-base rounded-xl"
                            >
                                {t("billing.annual")}
                                <MotionBadge
                                    variants={badgeVariants}
                                    initial="hidden"
                                    animate={["visible", "pulse"]}
                                    className="absolute -top-3 -right-3 bg-munsel text-white border-0 rounded-2xl"
                                >
                                    {t("billing.savings")}
                                </MotionBadge>
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="max-w-7xl mx-auto">
                        <StaggerChildren
                            className="flex flex-col md:flex-row justify-center gap-8 md:gap-6 lg:gap-8"
                            staggerDelay={0.15}
                        >
                            {/* Pricing tiers */}
                            {pricingTiers.map((tier, index) => (
                                <motion.div
                                    key={index}
                                    className={`pricing-card-container flex-1 max-w-md mx-auto w-full relative ${
                                        tier.popular ? "md:-mt-8 md:mb-4" : ""
                                    }`}
                                    onMouseEnter={() =>
                                        !isMobile && setHoveredTier(index)
                                    }
                                    onMouseLeave={() =>
                                        !isMobile && setHoveredTier(null)
                                    }
                                    whileHover={cardHover}
                                >
                                    {tier.popular && (
                                        <div className="absolute -top-9 inset-x-0 flex justify-center">
                                            <span className="bg-[#54489e] text-white text-md font-semibold px-8 py-3 rounded-2xl shadow-lg">
                                                {t("tiers.mastery.popular")}
                                            </span>
                                        </div>
                                    )}
                                    <Card
                                        className={`backdrop-blur-sm h-full transition-all duration-500 rounded-2xl ${
                                            tier.popular
                                                ? "border-[#54489e] shadow-xl shadow-[#54489e]/20 z-10"
                                                : "border-[#54489e]/50 hover:border-[#54489e]/60 shadow-lg shadow-[#54489e]/10"
                                        } ${
                                            hoveredTier === index
                                                ? "dark:border-[#54489e] border-governor_bay"
                                                : ""
                                        }`}
                                    >
                                        <CardContent className="p-8">
                                            <div className="text-center mb-8">
                                                <div className="flex items-center justify-center gap-3 mb-3">
                                                    <Image
                                                        src={tier.icon}
                                                        alt={`${tier.name} icon`}
                                                        width={80}
                                                        height={80}
                                                    />
                                                    <h3 className="text-3xl font-bold text-governor_bay dark:text-white">
                                                        {tier.name}
                                                    </h3>
                                                </div>
                                                <p className="text-governor_bay dark:text-[#a8a7d1] mb-6 min-h-[80px] ">
                                                    {tier.description}
                                                </p>
                                                {/* Price */}
                                                <motion.div
                                                    key={`${tier.name}-${billingCycle}`}
                                                    initial={
                                                        isMobile
                                                            ? {
                                                                  opacity: 1,
                                                                  y: 0,
                                                              }
                                                            : {
                                                                  opacity: 0,
                                                                  y: 10,
                                                              }
                                                    }
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                    }}
                                                    className="flex items-baseline justify-center mb-auto"
                                                >
                                                    <div className="h-[90px]">
                                                        <div className="flex items-baseline justify-center gap-2">
                                                            {billingCycle ===
                                                                "annual" && (
                                                                <span
                                                                    className={`font-bold text-5xl text-governor_bay dark:text-white ${crossPriceLine}`}
                                                                >
                                                                    {
                                                                        tier.annual
                                                                    }
                                                                </span>
                                                            )}
                                                            {billingCycle ===
                                                            "annual" ? (
                                                                <span className="text-2xl font-semibold text-munsel">
                                                                    {
                                                                        tier.annual_with_savings
                                                                    }
                                                                </span>
                                                            ) : (
                                                                <span className="text-5xl font-bold text-governor_bay dark:text-white">
                                                                    {
                                                                        tier.monthly
                                                                    }
                                                                </span>
                                                            )}

                                                            <span className="font-sans text-governor_bay dark:text-[#a8a7d1] ml-2 text-lg">
                                                                {billingCycle ===
                                                                "monthly"
                                                                    ? t(
                                                                          "billing.per_month"
                                                                      )
                                                                    : t(
                                                                          "billing.per_year"
                                                                      )}
                                                            </span>
                                                        </div>
                                                        {billingCycle ===
                                                            "annual" && (
                                                            <p className="text-sm text-muted-foreground font-medium mt-2 flex items-center justify-center">
                                                                <Sparkles className="h-3.5 w-3.5 mr-1" />
                                                                {t(
                                                                    "billing.save_amount",
                                                                    {
                                                                        amount: tier.annualSavings,
                                                                    }
                                                                )}
                                                            </p>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            </div>
                                            <div className="space-y-4 mb-8 min-h-[30px]">
                                                {tier.features.map(
                                                    (feature, i) => (
                                                        <div
                                                            key={i}
                                                            className="flex items-start"
                                                        >
                                                            <CheckCircle2 className="h-5 w-5 text-governor_bay dark:text-[#54489e] mr-3 flex-shrink-0 mt-0.5" />
                                                            <span className="text-governor_bay dark:text-[#a8a7d1]">
                                                                {feature}
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                            <motion.div
                                                whileHover={buttonHover}
                                                whileTap={buttonTap}
                                                className="mt-auto"
                                            >
                                                <Button
                                                    asChild
                                                    disabled
                                                    className={`w-full py-6 text-lg rounded-2xl ${
                                                        tier.popular
                                                            ? "bg-gradient-to-r from-[#54489e] to-[#6656a7] hover:from-[#6656a7] hover:to-[#54489e] text-white shadow-lg shadow-[#54489e]/20 opacity-50 cursor-not-allowed"
                                                            : "bg-transparent border border-[#54489e] text-governor_bay dark:text-[#a8a7d1] hover:bg-[#54489e]/10 opacity-50 cursor-not-allowed"
                                                    }`}
                                                >
                                                    <Link
                                                        href="/register"
                                                        className="flex items-center justify-center pointer-events-none"
                                                    >
                                                        {tier.cta}
                                                        {tier.popular && (
                                                            <motion.div
                                                                animate={
                                                                    arrowAnimation
                                                                }
                                                            >
                                                                <ArrowRight className="ml-2 h-5 w-5" />
                                                            </motion.div>
                                                        )}
                                                    </Link>
                                                </Button>
                                            </motion.div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </StaggerChildren>
                    </div>

                    <div className="text-center mt-20 max-w-3xl mx-auto">
                        <motion.div
                            className="backdrop-blur-sm border border-[#54489e]/30 rounded-2xl p-8"
                            whileHover={helpCardHover}
                        >
                            <h3 className="text-2xl font-bold text-governor_bay dark:text-white mb-4">
                                {t("help.title")}
                            </h3>
                            <p className="text-governor_bay dark:text-[#a8a7d1] mb-8 max-w-2xl mx-auto">
                                {t("help.description")}
                            </p>
                            <motion.div
                                whileHover={buttonHover}
                                whileTap={buttonTap}
                                className="inline-block"
                            >
                                <Button
                                    asChild
                                    size="lg"
                                    className="bg-[#54489e]/20 border border-[#54489e]/50 text-governor_bay dark:text-white hover:bg-[#54489e]/30 px-8 rounded-2xl"
                                >
                                    <Link
                                        href="https://www.ucodebyus.com/fr/contact"
                                        className="flex items-center"
                                    >
                                        {t("help.cta")}
                                        <motion.div animate={arrowAnimation}>
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </motion.div>
                                    </Link>
                                </Button>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
}
