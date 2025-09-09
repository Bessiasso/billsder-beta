"use client";

import clsx from "clsx";
import { useSelectedLayoutSegment } from "next/navigation";
import { ComponentProps, use } from "react";
import { Link } from "@/i18n/routing";

interface NavigationLinkProps {
    disabled?: boolean;
}

export default function NavigationLink({
    disabled = false,
    href,
    ...rest
}: ComponentProps<typeof Link> & NavigationLinkProps) {
    const selectedLayoutSegment = useSelectedLayoutSegment();
    const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : "/";
    const isActive = pathname === href;

    const handleClick = (e: React.MouseEvent) => {
        if (disabled) {
            e.preventDefault();
        }
    };

    return (
        <Link
            aria-current={isActive ? "page" : undefined}
            className={clsx(
                "inline-block px-2 py-3 text-black items-center justify-center transition-all transform hover:-translate-y-1 duration-450",
                isActive
                    ? "text-governor_bay dark:text-wistful font-bold relative after:absolute after:inset-0 after:rounded-lg after:bg-governor_bay/20 after:blur-sm after:animate-pulse"
                    : "text-governor_bay font-bold dark:text-white dark:hover:text-granny_apple hover:text-governor_bay"
            )}
            onClick={handleClick}
            href={href}
            {...rest}
        />
    );
}
