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
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const About = () => {
    const t = useTranslations("About");

    return (
        <div className="min-h-screen text-white overflow-hidden">
            <div className="container mx-auto px-4 py-12 lg:py-24 relative">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center mb-24"
                >
                    <h1 className="text-6xl lg:text-8xl font-bold mb-6 ">
                        {t("title")}
                    </h1>
                    <p className="text-2xl lg:text-3xl text-[#d7f6e5] max-w-3xl mx-auto">
                        {t("subtitle")}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <h2 className="text-4xl lg:text-5xl font-semibold text-white">
                            {t("our_mission")}
                        </h2>
                        <p className="text-xl text-[#d7f6e5] leading-relaxed ">
                            {t("our_mission_description")}
                        </p>
                        <Link href="/">
                            <Button className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm text-lg px-8 py-3  mt-6">
                                {t("sign_up_beta")}
                            </Button>
                        </Link>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative bg-[#a8a7d1] h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <Image
                            src="/billsder_about.svg"
                            alt="billsder logo"
                            layout="fill"
                            className="rounded-3xl"
                        />
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mb-32"
                >
                    <h2 className="text-4xl lg:text-5xl font-semibold text-center text-white mb-16">
                        {t("why_billsder")}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: CheckCircle,
                                title: t("why_title_1"),
                                description: t("why_description_1"),
                            },
                            {
                                icon: Users,
                                title: t("why_title_2"),
                                description: t("why_description_2"),
                            },
                            {
                                icon: Globe,
                                title: t("why_title_3"),
                                description: t("why_description_3"),
                            },
                            {
                                icon: Zap,
                                title: t("why_title_4"),
                                description: t("why_description_4"),
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.8 + index * 0.1,
                                }}
                                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <feature.icon className="h-12 w-12 text-purple-200 mb-4" />
                                <h3 className="text-2xl font-semibold text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-lg text-purple-100">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="relative bg-[#a8a7d1] w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl mx-auto"
                    >
                        <Image
                            src="/ucbc_about.svg"
                            alt="Billsder journey"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="space-y-8"
                    >
                        <h2 className="text-4xl lg:text-5xl font-semibold text-white">
                            {t("our_story")}
                        </h2>
                        <p className="text-xl text-[#d7f6e5] leading-relaxed">
                            {t("story_1")}
                        </p>
                        <p className="text-xl text-[#d7f6e5] leading-relaxed">
                            {t("story_2")}
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="bg-white/10 backdrop-blur-md rounded-3xl shadow-xl p-12 lg:p-16 space-y-8"
                >
                    <h2 className="text-4xl lg:text-5xl font-semibold text-white">
                        {t("about_ucodebyus")}
                    </h2>
                    <p className="text-xl text-purple-100 leading-relaxed">
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
                            <div
                                key={index}
                                className="flex flex-col items-center text-center space-y-4"
                            >
                                <feature.icon className="h-14 w-14 text-purple-200" />
                                <h3 className="text-2xl font-semibold text-white">
                                    {feature.title}
                                </h3>
                                <p className="text-lg text-purple-100">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link
                            href="https://www.ucodebyus.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                variant="outline"
                                className="bg-white/10 text-black hover:bg-white/20 backdrop-blur-sm text-lg px-8 py-3 "
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
