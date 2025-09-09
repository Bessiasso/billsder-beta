import type React from "react";
import { cn } from "@/utils/cn";

interface LabelInputContainerProps {
    children: React.ReactNode;
    className?: string;
}

export const LabelInputContainer: React.FC<LabelInputContainerProps> = ({
    children,
    className,
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
