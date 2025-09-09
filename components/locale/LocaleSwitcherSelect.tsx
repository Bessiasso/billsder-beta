"use client";

import clsx from "clsx";
import { useParams } from "next/navigation";
import { ChangeEvent, ReactNode, useTransition } from "react";
import { Locale, usePathname, useRouter } from "@/i18n/routing";
import { Play } from "lucide-react";

type Props = {
    children: ReactNode;
    defaultValue: string;
    label: string;
};

export default function LocaleSwitcherSelect({
    children,
    defaultValue,
    label,
}: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const params = useParams();

    function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        const nextLocale = event.target.value as Locale;
        startTransition(() => {
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                { pathname, params },
                { locale: nextLocale }
            );
        });
    }

    return (
        <label
            className={clsx(
                "relative text-wd_white",
                isPending && "transition-opacity disabled:opacity-30"
            )}
        >
            <p className="sr-only">{label}</p>
            <select
                className="cursor-pointer inline-flex appearance-none bg-transparent lg:px-4 lg:py-2 text-governor_bay font-bold w-14 h-14 rounded-full text-lg text-center dark:text-white border dark:border-white border-governor_bay"
                defaultValue={defaultValue}
                disabled={isPending}
                onChange={onSelectChange}
            >
                {children}
            </select>
            {/*<span className="cursor-pointer absolute left-10 top-[6px]">
                 <Play
                    size={16}
                    className="rotate-90 text-wd_orange fill-wd_orange "
                /> 
            </span>*/}
        </label>
    );
}
