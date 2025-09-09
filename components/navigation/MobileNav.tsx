import React, { useEffect, useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import { usePathname } from "next/navigation";
import ThemeToggler from "@/components/theme/ThemeToggler";
import Navigation from "./Navigation";
import Logo from "../Logo";
import Socials from "@/components/Socials";
//import LocaleSwitcher from "@/components/LocaleSwitcher";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import LocaleSwitcherToggler from "../locale/LocaleSwitcherToggler";

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
                <AlignJustify size={30} />
            </SheetTrigger>
            <SheetContent className="w-[250px]">
                <VisuallyHidden asChild>
                    <SheetTitle>Mobile Navigation</SheetTitle>
                </VisuallyHidden>
                <div className="flex flex-col items-center justify-between h-full py-8">
                    <div className="flex flex-col items-center gap-y-12">
                        <Logo />
                        <Navigation containerStyles="flex flex-col items-center gap-y-3" />
                    </div>
                    <div className="space-y-3">
                        {/* <LocaleSwitcher /> */}
                        <ThemeToggler />
                        <LocaleSwitcherToggler />
                    </div>
                    <Socials
                        containerStyles="flex gap-x-6 mx-auto xl:mx-0 mb-4"
                        iconesStyles="text-primary dark:text-white/70 text-[20px] hover:text-secondary dark:hover:text-primary transition-all"
                    />
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;
