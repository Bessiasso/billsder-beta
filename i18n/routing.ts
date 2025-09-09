import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    locales: ["en", "fr"],
    defaultLocale: "en",
   /*  pathnames: {
        "/": "/",
        "/pricing": {
            fr: "/prix",
            en: "/pricing",
        },
        "/contact": {
            fr: "/contact",
            en: "/contact",
        },
        "/auth": {
            fr: "/auth",
            en: "/auth",
        },
        "/auth/login": {
            fr: "/auth/connexion",
            en: "/auth/login",
        },
        "/auth/signup": {
            fr: "/auth/inscription",
            en: "/auth/signup",
        },
        "/about-us": {
            fr: "/a-propos",
            en: "/about-us",
        }
    }, */
});

//export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } =
    createNavigation(routing);
