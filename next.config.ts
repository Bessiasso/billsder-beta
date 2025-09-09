import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

/** @type {import("next").NextConfig} */
const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "cdn.pixabay.com" },
            { protocol: "https", hostname: "images.unsplash.com" },
            {
                protocol: "https",
                hostname: "**.public.blob.vercel-storage.com",
            },
        ],
    },
};

export default withNextIntl(nextConfig);
