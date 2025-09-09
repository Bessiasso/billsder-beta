"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ChevronRight, Heart, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema, type NewsletterFormData } from "@/lib/schema";
import { toast } from "sonner";
import {
    FaXTwitter,
    FaWhatsapp,
    FaFacebookF,
    FaLinkedinIn,
    FaInstagram,
} from "react-icons/fa6";

type FooterLink = {
    text: string;
    href: string;
};

export default function Footer() {
    const t = useTranslations("Footer");
    const { resolvedTheme } = useTheme();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<
        "idle" | "success" | "error"
    >("idle");
    const [isHovered, setIsHovered] = useState(false);
    const isDark = resolvedTheme === "dark";

    const currentYear = new Date().getFullYear();

    // Footer links by category
    const footerLinks = {
        billsder: t.raw("links.billsder") as FooterLink[],
        bbpp: t.raw("links.bbpp") as FooterLink[],
    };

    // Social networks
    const socialLinks = [
        {
            name: "LinkedIn",
            icon: <FaLinkedinIn />,
            href: "https://www.linkedin.com/company/ucodebyus-crafting-innovative-software-for-smes/",
        },
        {
            name: "Facebook",
            icon: <FaFacebookF />,
            href: "https://www.facebook.com/share/1BvtuXGqYY/?mibextid=wwXIfr",
        },
        {
            name: "Instagram",
            icon: <FaInstagram />,
            href: "https://www.instagram.com/ucodebyus/",
        },
        {
            name: "X",
            icon: <FaXTwitter />,
            href: "https://x.com/ucodebyus?s=21",
        },
        {
            name: "WhatsApp",
            icon: <FaWhatsapp />,
            href: "https://whatsapp.com/channel/0029VasAlHbJ93wbig3RIG1D",
        },
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<NewsletterFormData>({
        resolver: zodResolver(newsletterSchema),
    });

    const onSubmit = async (data: NewsletterFormData) => {
        try {
            setIsSubmitting(true);
            setSubmitStatus("idle");

            const response = await fetch("/api/newsletter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to subscribe");
            }

            setSubmitStatus("success");
            reset();
            toast.success(t("newsletter.success"));
        } catch (error) {
            console.error("Newsletter subscription error:", error);
            setSubmitStatus("error");
            toast.error(t("newsletter.error"));
        } finally {
            setIsSubmitting(false);
        }
    };

    const textColor = isDark ? "text-[#a8a7d1]" : "text-[#54489e]/80";
    const headingColor = isDark ? "text-white" : "text-[#54489e]";
    const borderColor = isDark ? "border-[#2a2a2a]" : "border-[#54489e]/20";
    const hoverTextColor = isDark ? "hover:text-white" : "hover:text-[#54489e]";
    const inputBgColor = isDark ? "bg-[#1a1a1a]" : "bg-white";
    const inputBorderColor = isDark
        ? "border-[#2a2a2a]"
        : "border-[#54489e]/30";
    const socialBgColor = isDark ? "bg-white " : "bg-white";
    const socialBorderColor = isDark
        ? "border-[#54489e]/30"
        : "border-[#54489e]/30";
    const socialIconGlow = isDark
        ? "filter drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
        : "filter drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]";
    const socialTextColor = isDark ? "text-[#a8a7d1]" : "text-[#54489e]/80";

    return (
        <footer className={`w-full border-t ${borderColor} pt-16 pb-8`}>
            <div className="container px-4 md:px-6 mx-auto">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {/* Logo and contact information */}
                    <motion.div
                        className="lg:col-span-2"
                        variants={itemVariants}
                    >
                        <Logo className="h-8 mb-6" />
                        <p className={`${textColor} mb-6 max-w-md`}>
                            {t("description")}
                        </p>
                        <div className="space-y-3">
                            <div>
                                <Link
                                    href={`mailto:${t("contact.email")}`}
                                    className={`flex items-center space-x-3 ${textColor}`}
                                >
                                    <Mail size={16} className="flex-shrink-0" />
                                    <span>{t("contact.email")}</span>
                                </Link>
                            </div>
                            <div>
                                <Link
                                    href={`tel:${t("contact.phone")}`}
                                    className={`flex items-center space-x-3 ${textColor}`}
                                >
                                    <Phone
                                        size={16}
                                        className="flex-shrink-0"
                                    />
                                    <span>{t("contact.phone")}</span>
                                </Link>
                            </div>
                            <div
                                className={`flex items-center space-x-3 ${textColor}`}
                            >
                                <MapPin size={16} className="flex-shrink-0" />
                                <span>{t("contact.location")}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Footer links */}
                    <motion.div variants={itemVariants}>
                        <h4 className={`${headingColor} font-bold mb-4`}>
                            {t("categories.billsder")}
                        </h4>
                        <ul className="space-y-2">
                            {footerLinks.billsder.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className={`${textColor} ${hoverTextColor} transition-colors flex items-center group`}
                                    >
                                        <ChevronRight
                                            size={14}
                                            className="mr-1 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"
                                        />
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h4 className={`${headingColor} font-bold mb-4`}>
                            {t("categories.bbpp")}
                        </h4>
                        <ul className="space-y-2">
                            {footerLinks.bbpp.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className={`${textColor} ${hoverTextColor} transition-colors flex items-center group`}
                                    >
                                        <ChevronRight
                                            size={14}
                                            className="mr-1 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"
                                        />
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>

                {/* Newsletter */}
                <motion.div
                    id="newsletter"
                    className={`border-t border-b ${borderColor} py-10 my-10`}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <h4
                                className={`text-xl font-bold ${headingColor} mb-2`}
                            >
                                {t("newsletter.title")}
                            </h4>
                            <p className={textColor}>
                                {t("newsletter.description")}
                            </p>
                        </div>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col w-full max-w-md gap-4"
                        >
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="text"
                                    placeholder={t(
                                        "newsletter.namePlaceholder"
                                    )}
                                    className={`flex-1 px-4 py-2 ${inputBgColor} border ${inputBorderColor} rounded-2xl h-10 ${
                                        isDark ? "text-white" : "text-[#54489e]"
                                    } focus:outline-none focus:border-[#54489e]`}
                                    {...register("name")}
                                />
                                <input
                                    type="email"
                                    placeholder={t(
                                        "newsletter.emailPlaceholder"
                                    )}
                                    className={`flex-1 px-4 py-2 ${inputBgColor} border ${inputBorderColor} rounded-2xl h-10 ${
                                        isDark ? "text-white" : "text-[#54489e]"
                                    } focus:outline-none focus:border-[#54489e]`}
                                    {...register("email")}
                                />
                            </div>
                            {(errors.name || errors.email) && (
                                <div className="text-red-500 text-sm">
                                    {errors.name?.message ||
                                        errors.email?.message}
                                </div>
                            )}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full"
                            >
                                <Button
                                    type="submit"
                                    className="bg-[#54489e] hover:bg-[#6656a7] text-white rounded-2xl w-full h-10"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? t("newsletter.submitting")
                                        : t("newsletter.button")}
                                </Button>
                            </motion.div>
                            {submitStatus === "success" && (
                                <p className="text-green-600 dark:text-green-400 text-sm">
                                    {t("newsletter.success")}
                                </p>
                            )}
                            {submitStatus === "error" && (
                                <p className="text-red-600 dark:text-red-400 text-sm">
                                    {t("newsletter.error")}
                                </p>
                            )}
                        </form>
                    </div>
                </motion.div>

                {/* Bottom of page */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <motion.div
                            className="flex items-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <span className={textColor + " text-sm"}>
                                © {currentYear}
                            </span>
                            <motion.div
                                className="mx-2 flex items-center"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <span className={headingColor + " font-bold"}>
                                    billsder
                                </span>
                                <motion.span
                                    animate={{ scale: isHovered ? 1.2 : 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="mx-1"
                                >
                                    <X
                                        size={14}
                                        className={`${
                                            isHovered
                                                ? "text-red-500"
                                                : isDark
                                                ? "text-[#54489e]"
                                                : "text-[#a8a7d1]"
                                        } transition-colors duration-300`}
                                        fill={
                                            isHovered
                                                ? "#ef4444"
                                                : isDark
                                                ? "#54489e"
                                                : "#a8a7d1"
                                        }
                                    />
                                </motion.span>
                                <Link href="https://ucodebyus.com">
                                    <span
                                        className={headingColor + " font-bold"}
                                    >
                                        UCODEBYUS
                                    </span>
                                </Link>
                            </motion.div>
                        </motion.div>
                        <div
                            className={`h-4 border-l ${borderColor} hidden md:block`}
                        ></div>
                        {/* <div className="flex space-x-4">
                            {footerLinks.legal.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.href}
                                    className={`${textColor} ${hoverTextColor} transition-colors text-sm`}
                                >
                                    {link.text}
                                </Link>
                            ))}
                        </div> */}
                    </div>

                    {/* Social networks */}
                    <div className="flex space-x-4">
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-9 h-9 rounded-2xl ${socialBgColor} border ${socialBorderColor} flex items-center text-governor_bay dark:text-governor_bay justify-center ${socialTextColor} ${hoverTextColor} hover:border-[#54489e] transition-colors ${socialIconGlow}`}
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {social.icon}
                                <span className="sr-only">{social.name}</span>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
