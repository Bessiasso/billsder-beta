import Header from "@/components/layout/Header";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SessionProvider } from "next-auth/react";
import { getMessages } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";
import "@/app/globals.css";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
    title: "billsder",
    description:
        "The accounting management software that simplifies your business life.",
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

type Props = {
    children: React.ReactNode;
    params: Promise<{
        locale: string;
    }>;
};

export default async function RootLayout({ children, params }: Props) {
    const { locale } = await params;
    const messages = await getMessages();

    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    return (
        <NextIntlClientProvider messages={messages} locale={locale}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <Header />
                {children}
                <Toaster />
                <Footer />
            </ThemeProvider>
        </NextIntlClientProvider>
    );
}
