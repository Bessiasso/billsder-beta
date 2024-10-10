'use client';
import Hero from "./Hero";
import Footer from "./Footer";
import SM from "./SM";

export default function Subscription() {
    return (
        <div className="min-h-screen text-white flex flex-col">
            <Hero />
            <SM />
            <Footer />
        </div>
    );
}
