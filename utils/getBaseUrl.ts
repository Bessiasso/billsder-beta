export function getBaseUrl() {
    if (typeof window !== "undefined") {
        // Client-side
        return window.location.origin;
    }
    // Server-side
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }
    // Fallback for local development
    return `http://localhost:${process.env.PORT || 3000}`;
}
