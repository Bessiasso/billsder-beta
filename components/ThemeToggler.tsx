"use client";
import React from "react";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

type ThemeTogglerProps = {
    className?: string;
};

const ThemeToggler = ({ className }: ThemeTogglerProps): JSX.Element => {
    const { theme, setTheme } = useTheme();
    const isDarkTheme = theme === "dark";

    return (
        <div className={`w-10 h-10 ${className}`}>
            <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-ucbu_black dark:text-white w-10 h-10 rounded-full"
            >
                {isDarkTheme ? (
                    <>
                        <MoonIcon className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all" />
                    </>
                ) : (
                    <>
                        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    </>
                )}
                {/* <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className=" h-[1.5rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> */}
            </Button>
        </div>
    );
};

export default ThemeToggler;
