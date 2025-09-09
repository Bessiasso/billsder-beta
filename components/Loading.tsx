"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Loading({ message = "Loading " }) {
    const [dots, setDots] = useState(1);

    useEffect(() => {
        // Simple dots animation
        const interval = setInterval(() => {
            setDots((dots) => (dots + 1) % 4);
        }, 400);

        return () => clearInterval(interval);
    }, []);

    // create loading dots
    const loadingDots = ".".repeat(dots);

    return (
        <div className="flex flex-col items-center justify-center min-h-[200px] w-full p-6">
            <div className="flex flex-col items-center space-y-1">
                {/* SVG with subtle pulse animation */}
                <div className="animate-pulse">
                    <Image
                        src="/pictograme.svg"
                        alt="Loading"
                        width={60}
                        height={70}
                    />
                </div>

                {/* Loading message */}
                <div className="text-center">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {message}
                        <span className="inline-block w-8 text-left">
                            {loadingDots}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
