import { useTranslations } from "next-intl";
//import NavigationLink from "@/components/NavigationLink";
import Link from "next/link";
import NavigationLink from "./NavigationLink";

export default function Navigation({
    containerStyles,
}: {
    containerStyles: string;
}) {
    const t = useTranslations("Nav");

    return (
        <nav className={`${containerStyles}  text-lg sm:text-xl lg:text-2xl`}>
            {/* <NavigationLink href="/">Home</NavigationLink> */}
            <NavigationLink href="/">{t("home")}</NavigationLink>
            <NavigationLink href="https://billsder.com">
                {t("billsder")}
            </NavigationLink>
            <NavigationLink href="https://ucodebyus.com/contact">
                {t("ucodebyus")}
            </NavigationLink>
        </nav>
    );
}
