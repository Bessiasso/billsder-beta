"use client";
import React, { useCallback, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/navigation";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { locales } from "@/config";

type LocaleSwitcherTogglerProps = {
    className?: string;
};

export default function LocaleSwitcherToggler({
    className,
}: LocaleSwitcherTogglerProps) {
    const t = useTranslations("LocaleSwitcher");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const [isPending, startTransition] = useTransition();

    const toggleLocale = useCallback(() => {
        const currentIndex = locales.indexOf(locale as "en" | "fr");
        const nextIndex = (currentIndex + 1) % locales.length;
        const nextLocale = locales[nextIndex];

        startTransition(() => {
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                { pathname, params },
                { locale: nextLocale }
            );
        });
    }, [locale, router, pathname, params]);

    return (
        <div className={className}>
            <Button
                variant="outline"
                size="sm"
                onClick={toggleLocale}
                className={`text-black dark:text-white text-md font-bold rounded-full ${className}`}
                disabled={isPending}
            >
                {isPending ? "..." : t("locale", { locale })}
            </Button>
        </div>
    );
}
