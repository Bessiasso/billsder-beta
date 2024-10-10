import React from "react";
import Link from "next/link";
import Image from "next/image";
interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <Link href="/">
            <div>
                <Image
                    src="/logo_dark.svg"
                    width={200}
                    height={200}
                    priority
                    alt="UCODEBYUS Logo"
                    className={`w-auto h-auto ${className || ""}`}
                    style={{
                        width: "100%",
                        height: "auto",
                    }}
                />
            </div>
        </Link>
    );
};

export default Logo;
