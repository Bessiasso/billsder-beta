import createMiddleware from "next-intl/middleware";
import { pathnames, locales, localePrefix, defaultLocale } from "./config";
const intlMiddleware = createMiddleware({
    defaultLocale,
    locales,
    pathnames,
    localePrefix,
});

export default intlMiddleware

export const config = {
    // Match only internationalized pathnames
    matcher: [
        // Enable a redirect to a matching locale at the root
        "/",
        // Set a cookie to remember the previous locale for
        // all requests that have a locale prefix
        "/(fr|en)/:path*",
        // Enable redirects that add missing locales
        // (e.g. `/pathnames` -> `/en/pathnames`)
        "/((?!api|_next|_vercel|.*\\..*).*)",
    ],
};
