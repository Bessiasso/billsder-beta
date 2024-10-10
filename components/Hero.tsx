"use client";
import React from "react";
import {
    Instagram,
    ArrowRight,
    CheckCircle,
    Pen,
    Globe,
    Users,
} from "lucide-react";
import { motion } from "framer-motion";
import Form from "./Form";
import { useTranslations } from "next-intl";

const Hero = () => {
    const t = useTranslations("Hero");
    const features = [
        {
            icon: Pen,
            title: t("feature_title_1"),
            description: t("feature_description_1"),
        },
        {
            icon: CheckCircle,
            title: t("feature_title_2"),
            description:
                t("feature_description_2"),
        },
        {
            icon: Globe,
            title: t("feature_title_3"),
            description: t("feature_description_3"),
        },
        {
            icon: Users,
            title: t("feature_title_4"),
            description: t("feature_description_4"),
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    return (
        <motion.section
            className="flex flex-col text-white"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <main className="flex-grow container mx-auto px-4 py-8 lg:p-16 flex flex-col gap-16">
                <motion.div
                    className="text-center mb-8 lg:mb-16"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-6xl md:text-8xl lg:text-[70px] font-bold mt-5 lg:mt-10 mb-4 lg:mb-6">
                        {t("title")}
                    </h2>
                    <p className="text-xl md:text-2xl lg:text-3xl text-[#d7f6e5]">
                        {t("subtitle")}s
                    </p>
                </motion.div>
                <motion.div
                    className="flex flex-col lg:flex-row items-start justify-between gap-12 md:gap-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        delay: 0.5,
                        delayChildren: 0.2,
                        staggerChildren: 0.1,
                    }}
                >
                    <motion.div
                        className="w-full lg:w-1/2 space-y-8 md:space-y-12"
                        variants={itemVariants}
                    >
                        <motion.div variants={itemVariants}>
                            <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#d7f6e5]">
                                {t("key_features")}
                            </p>
                        </motion.div>
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
                            variants={containerVariants}
                        >
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-start space-x-4  rounded-xl p-4 md:p-6"
                                    variants={itemVariants}
                                >
                                    <div className="bg-[#00b37d] p-2 md:p-3 rounded-full flex-shrink-0">
                                        <feature.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg md:text-xl lg:text-2xl">
                                            {feature.title}
                                        </h3>
                                        <p className="text-[#d7f6e5] text-sm md:text-base lg:text-lg">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="w-full lg:w-1/2"
                        variants={itemVariants}
                    >
                        <motion.div
                            className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl"
                            variants={itemVariants}
                        >
                            <Form />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </main>
        </motion.section>
    );
};

export default Hero;
