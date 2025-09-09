"use client";
import React from "react";
import {
    Instagram,
    ArrowRight,
    CheckCircle,
    Pen,
    Globe,
    Users,
    FileText,
    CreditCard,
    Calculator,
    Package,
} from "lucide-react";
import { motion } from "framer-motion";
import Form from "@/components/Home/Form";
import { useTranslations } from "next-intl";
import { Card } from "../ui/card";

const Hero = () => {
    const t = useTranslations("Hero");
    const features = [
        {
            icon: FileText,
            title: t("feature_title_1"),
            description: t("feature_description_1"),
        },
        {
            icon: CreditCard,
            title: t("feature_title_2"),
            description: t("feature_description_2"),
        },
        {
            icon: Calculator,
            title: t("feature_title_3"),
            description: t("feature_description_3"),
        },
        {
            icon: Package,
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
                    className="text-center mb-8 lg:mb-5"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl glow-text text-governor_bay dark:text-white mb-8">
                        {t("title")}
                    </h2>
                    <p className="text-2xl text-wistful mb-4">
                        {t("subtitle")}
                    </p>
                    <p className="text-lg text-governor_bay dark:text-wistful max-w-4xl mx-auto mb-8 leading-relaxed">
                        {t("description")}
                    </p>
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        variants={itemVariants}
                    >
                        <motion.a
                            href="https://billsder.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-governor_bay dark:border-wistful text-governor_bay dark:text-wistful rounded-2xl font-semibold hover:bg-governor_bay hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-governor_bay/20"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Globe className="w-5 h-5 mr-2" />
                            {t("learn_more")}
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* Beta Seats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mb-5"
                >
                    <div className="max-w-4xl mx-auto">
                        <h3 className="text-2xl lg:text-6xl font-semibold text-governor_bay dark:text-white mb-4 text-center">
                            {t("beta_seats_title")}
                        </h3>
                    </div>
                    <div className="max-w-4xl mx-auto mt-10">
                        <p className="text-xl text-governor_bay dark:text-wistful leading-relaxed text-left">
                            {t("beta_seats_description")}
                        </p>
                    </div>
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
                            <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-governor_bay dark:text-white">
                                {t("key_features")}
                            </p>
                        </motion.div>
                        <motion.div
                            className="space-y-6"
                            variants={containerVariants}
                        >
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="group relative"
                                    variants={itemVariants}
                                >
                                    <div className="relative border-b-2 border-dashed border-governor_bay/30 group-hover:border-governor_bay transition-all duration-300 pb-4">
                                        <div className="flex items-start space-x-6">
                                            <div className="flex-shrink-0">
                                                <div className="bg-gradient-to-br from-[#54489e] to-[#6656a7] p-3 rounded-3xl shadow-md group-hover:shadow-lg group-hover:shadow-[#54489e]/30 transition-all duration-300">
                                                    <feature.icon className="h-8 w-8 text-white" />
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-xl font-semibold text-governor_bay/80 dark:text-white mb-2 group-hover:text-governor_bay transition-colors duration-300">
                                                    {feature.title}
                                                </h3>
                                                <p className="text-wistful dark:text-wistful/50 text-base leading-relaxed group-hover:text-governor_bay dark:group-hover:text-wistful transition-colors duration-300">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="w-full lg:w-1/2"
                        variants={itemVariants}
                    >
                        <Card className="p-15 rounded-3xl border-2 border-dashed border-governor_bay/30 hover:border-governor_bay transition-all duration-300">
                            <Form />
                        </Card>
                    </motion.div>
                </motion.div>
            </main>
        </motion.section>
    );
};

export default Hero;
