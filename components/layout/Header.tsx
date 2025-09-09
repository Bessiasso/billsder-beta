"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import Navigation from "@/components/navigation/Navigation";
import ThemeToggler from "@/components/theme/ThemeToggler";
import LocaleSwitcherToggler from "@/components/locale/LocaleSwitcherToggler";
import MobileNav from "@/components/navigation/MobileNav";

const Header = () => {
    const [header, setHeader] = useState<boolean>(false);
    const pathname = usePathname();

    useEffect(() => {
        const scrollYPosListener = () => {
            window.scrollY > 50 ? setHeader(true) : setHeader(false);
        };

        window.addEventListener("scroll", scrollYPosListener);

        return () => {
            window.removeEventListener("scroll", scrollYPosListener);
        };
    }, []);

    return (
        <header
            className={`${
                header ? "py-2  shadow-lg " : "py-4 dark:bg-transparent"
            } sticky top-0 z-30 transition-all ${
                pathname === "/" ? "bg-white" : ""
            }`}
        >
            {/* Background motif layer */}
            <div className="absolute inset-0 bg-motif z-0 pointer-events-none" />
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo // on the left*/}
                    <div className="w-32 sm:w-auto">
                        <Logo />
                    </div>

                    {/* Desktop navigation // in the center */}
                    <div className="hidden md:flex items-center grow justify-center mr-5">
                        <Navigation containerStyles="flex gap-x-10 items-center" />
                    </div>
                    {/* Sign-in button  // left */}
                    <div className="hidden md:flex items-center space-x-4">
                        <ThemeToggler />
                        <LocaleSwitcherToggler />
                    </div>

                    <div className="flex grow justify-end space-x-5 md:hidden">
                        <MobileNav />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
