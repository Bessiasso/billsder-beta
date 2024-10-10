import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";

const geistSans = localFont({
    src: "../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const myFont = localFont({
    src: "../fonts/Satoshi-Regular.woff2",
    display: "swap",
    variable: "--font-my-font",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "billsder beta",
    description: "Sign up for early access",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = await getLocale();

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body
                className={`${myFont.variable} font-sans   bg-gradient-to-br to-[#3a3178] via-[#54489e] from-[#a8a7d1]`}
            >
                <NextIntlClientProvider messages={messages} locale={locale}>
                    <Header />
                    {children}
                    <Toaster />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
