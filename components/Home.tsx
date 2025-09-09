"use client";
import Hero from "@/components/Home/Hero";
import SM from "@/components/Home/SM";

export default function Home() {
    return (
        <div className="min-h-screen text-white flex flex-col">
            <Hero />
            <SM />
        </div>
    );
}
