import React from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Logo from "./Logo";
import LocaleSwitcherToggler from "./LocaleSwitcherToggler";
import MobileNav from "@/components/MobileNav";

const Header = () => {
    return (
        <header className="sticky top-0 z-30 transition-all backdrop-blur-xl py-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-16 ">
                <div className="flex justify-between items-center">
                    <div className="w-40 sm:w-auto">
                        <Logo />
                    </div>
                    <div className="hidden md:flex items-center gap-x-6">
                        <Navigation containerStyles="" />
                        <LocaleSwitcherToggler className="py-1 w-12 h-12" />
                    </div>
                    <div className="md:hidden">
                        <div className="fixed top-8 right-[95px] z-40">
                            <LocaleSwitcherToggler className="h-10 w-10" />
                        </div>

                        <MobileNav />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
