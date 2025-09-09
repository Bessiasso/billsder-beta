"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    CheckCircle,
    Users,
    Globe,
    Zap,
    Code,
    Lightbulb,
    Rocket,
    ExternalLink,
    FileText,
    CreditCard,
    Calculator,
    Package,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Card } from "../ui/card";

const About = () => {
    const t = useTranslations("About");

    return (
        <div className="min-h-screen text-white overflow-hidden ">
            <div className="container mx-auto px-4 py-12 lg:py-24 relative">
                {/* Title and subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center mb-24"
                >
                    <h1 className="text-4xl lg:text-6xl font-bold mb-6 glow-text text-governor_bay dark:text-white">
                        {t("title")}
                    </h1>
                    <p className="text-xl lg:text-2xl text-wistful max-w-3xl mx-auto leading-relaxed">
                        {t("subtitle")}
                    </p>
                </motion.div>

                {/* Our mission */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <Card className=" rounded-3xl p-8">
                            <h2 className="text-3xl lg:text-5xl font-semibold text-governor_bay mb-6">
                                {t("our_mission")}
                            </h2>
                            <p className="text-lg text-governor_bay leading-relaxed mb-8">
                                {t("our_mission_description")}
                            </p>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link href="/">
                                    <Button className="bg-gradient-to-r from-[#54489e] to-[#6656a7] text-white hover:from-governor_bay hover:to-[#a8a7d1] text-lg px-8 py-3 transition-all duration-300 hover:shadow-lg hover:shadow-[#54489e]/20 h-15 w-full rounded-3xl">
                                        {t("sign_up_beta")}
                                    </Button>
                                </Link>
                            </motion.div>
                        </Card>
                    </motion.div>

                    {/* Our journey */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative"
                    >
                        <div className="h-64 sm:h-80 lg:h-100 overflow-hidden">
                            <Image
                                src="/billsder_about.svg"
                                alt="billsder logo"
                                layout="fill"
                                className="rounded-3xl object-cover"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Our story */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="relative mx-auto"
                    >
                        <div className="bg-gradient-to-br from-[#54489e] to-[#6656a7] w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl hover:shadow-3xl hover:shadow-[#54489e]/30 transition-all duration-300">
                            <Image
                                src="/ucbc_about.svg"
                                alt="Billsder journey"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-full"
                            />
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="space-y-8"
                    >
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                            <h2 className="text-3xl lg:text-4xl font-semibold text-governor_bay mb-6">
                                {t("our_story")}
                            </h2>
                            <p className="text-lg text-wistful leading-relaxed mb-6">
                                {t("story_1")}
                            </p>
                            <p className="text-lg text-wistful leading-relaxed">
                                {t("story_2")}
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* About ucodebyus */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-xl p-12 lg:p-16 space-y-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-semibold text-governor_bay mb-4">
                            {t("about_ucodebyus")}
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#54489e] to-[#6656a7] mx-auto rounded-full"></div>
                    </div>
                    <p className="text-lg text-wistful leading-relaxed text-center max-w-4xl mx-auto">
                        {t("about_ucodebyus_description")}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        {[
                            {
                                icon: Code,
                                title: t("ucodebyus_skill_title_1"),
                                description: t("ucodebyus_skill_description_1"),
                            },
                            {
                                icon: Lightbulb,
                                title: t("ucodebyus_skill_title_2"),
                                description: t("ucodebyus_skill_description_2"),
                            },
                            {
                                icon: Rocket,
                                title: t("ucodebyus_skill_title_3"),
                                description: t("ucodebyus_skill_description_3"),
                            },
                        ].map((feature, index) => (
                            // Skill card
                            <div
                                key={index}
                                className="flex flex-col items-center text-center space-y-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                            >
                                <div className="bg-gradient-to-br from-[#54489e] to-[#6656a7] p-4 rounded-2xl w-fit shadow-lg">
                                    <feature.icon className="h-12 w-12 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-governor_bay">
                                    {feature.title}
                                </h3>
                                <p className="text-base text-wistful leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        {/* Learn more button */}
                        <Link
                            href="https://www.ucodebyus.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                variant="outline"
                                className="bg-transparent border-2 border-governor_bay text-governor_bay hover:bg-governor_bay hover:text-white backdrop-blur-sm text-lg px-8 py-3 transition-all duration-300 hover:shadow-lg hover:shadow-[#54489e]/20"
                            >
                                {t("learn_more")}
                                <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
