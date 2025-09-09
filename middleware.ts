import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const intlMiddleware = createMiddleware({
    locales: routing.locales,
    defaultLocale: routing.defaultLocale,
    localePrefix: "always",
});

export async function middleware(request: NextRequest) {
    /// Allow the request to continue to the intl middleware
    return intlMiddleware(request);
}

export const config = {
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
