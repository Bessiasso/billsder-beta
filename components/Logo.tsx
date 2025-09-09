"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

interface LogoProps {
    className?: string;
}

const Logo = ({ className }: LogoProps) => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    // Track if component is mounted to avoid hydration mismatch
    const [mounted, setMounted] = useState(false);

    // Only update the state client-side
    useEffect(() => {
        setMounted(true);
    }, []);

    //const logoSrc = isDark ? "/logo_dark.svg" : "/logo.svg";
    // During SSR and initial render, use a default logo
    // After mounting, use the theme-specific logo
    const logoSrc = !mounted
        ? "/logo.svg"
        : resolvedTheme === "dark"
        ? "/logo_dark.svg"
        : "/logo.svg";

    return (
        <Link href="/">
            <div>
                <Image
                    src={logoSrc}
                    alt="billsder"
                    priority
                    width={100}
                    height={50}
                    className={`w-auto h-auto ${className || ""}`}
                    style={{
                        cursor: "pointer",
                        width: "80%",
                        height: "auto",
                    }}
                />
            </div>
        </Link>
    );
};

export default Logo;
