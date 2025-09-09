import React from "react";

interface IllustrationProps {
    className?: string;
}

export const HeaderIllustration: React.FC<IllustrationProps> = ({
    className,
}) => {
    return (
        <svg viewBox="0 0 120 100" width="120" height="100">
            <circle cx="60" cy="30" r="15" fill="#0c0c0c" />
            <rect x="45" y="50" width="30" height="30" fill="#cfcfcf" rx="4" />
            <line
                x1="20"
                y1="80"
                x2="100"
                y2="80"
                stroke="#00b37d"
                strokeWidth="2"
            />
            <text x="60" y="95" fontSize="6" fill="#000" textAnchor="middle">
                Accompagnement
            </text>
        </svg>
    );
};
