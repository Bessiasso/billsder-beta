"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Menu } from "lucide-react";
import Navigation from "./Navigation";
import { useTranslations } from "next-intl";

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations("MobileNav");

    const toggleNav = () => setIsOpen(!isOpen);

    return (
        <>
            <Button
                onClick={toggleNav}
                className="fixed top-8 right-10 z-50 rounded-full h-10 w-10 bg-[#00b37d] hover:bg-[#009e6a] text-white"
                size="icon"
                aria-label={isOpen ? t("close_navigation") : t("open_navigation")}
            >
                {isOpen ? (
                    <X className="h-6 w-6" />
                ) : (
                    <Menu className="h-6 w-6" />
                )}
            </Button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ y: "-100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{
                            type: "spring",
                            bounce: 0,
                            duration: 0.4,
                        }}
                        className="fixed top-0 left-0 right-0 bg-[#3a3178] text-white p-4 rounded-b-3xl shadow-lg z-40"
                    >
                        <div className="mt-16">
                            <Navigation containerStyles="flex flex-col space-y-4" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MobileNav;
