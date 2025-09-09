"use client";

import { useEffect, useState } from "react";
import {
    ArrowBigDownDash,
    ArrowDown,
    ArrowDown10,
    ArrowDownIcon,
    Bell,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    CreditCard,
    LogOut,
    Menu,
    Package,
    Search,
    Settings,
    User,
    Users,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ThemeToggler from "@/components/theme/ThemeToggler";
import LocaleSwitcherToggler from "@/components/locale/LocaleSwitcherToggler";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Separator } from "../ui/separator";
import { useTheme } from "next-themes";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { useSessionData } from "@/lib/fetchUserData";
import { countries } from "@/lib/countries";

interface DashboardHeaderProps {
    breadcrumbs?: Array<{
        label: string;
        href?: string;
    }>;
}

interface DeviceInfo {
    userAgent: string;
    platform: string;
    isMobile: boolean;
}

export function DashboardHeader({ breadcrumbs }: DashboardHeaderProps) {
    const router = useRouter();
    const session = useSessionData();

    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    const logoSrc = isDark ? "/pictograme.svg" : "/pictograme.svg";

    const [notifications] = useState([
        {
            id: 1,
            title: "New invoice created",
            time: "2 min ago",
            unread: true,
        },
        { id: 2, title: "Payment received", time: "1 hour ago", unread: true },
        {
            id: 3,
            title: "Customer updated profile",
            time: "3 hours ago",
            unread: false,
        },
    ]);

    const [currentTime, setCurrentTime] = useState("");
    const [userCountry, setUserCountry] = useState("");
    const [countryFlag, setCountryFlag] = useState("");
    const [countryCode, setCountryCode] = useState("unknown");
    const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);

    useEffect(() => {
        if (!session) {
            router.push("/auth/login");
        }
    }, [session, router]);

    useEffect(() => {
        // Update time every second
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(
                now.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                })
            );
        };

        updateTime();
        const timeInterval = setInterval(updateTime, 1000);

        // Get Device info
        const getDeviceInfo = () => {
            setDeviceInfo({
                platform: navigator.platform,
                userAgent: navigator.userAgent,
                isMobile: /Mobi|Android/i.test(navigator.userAgent),
            });
        };

        // Get user's country
        const getUserLocation = async () => {
            if (!navigator.geolocation) {
                console.warn("no geolocation.");
                return;
            }

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                        );
                        const data = await response.json();
                        if (data.address.country && data.address.country_code) {
                            setUserCountry(data.address.country);
                            setCountryCode(
                                data.address.country_code.toLowerCase()
                            );
                            setCountryFlag(
                                `https://flagcdn.com/w320/${data.address.country_code.toLowerCase()}.png`
                            );
                        } else {
                            console.warn("Country data not found");
                        }
                    } catch (error) {
                        console.error("Failed to fetch country data", error);
                    }
                },
                (error) => {
                    console.error("Geolocation error:", error);
                }
            );
        };

        getDeviceInfo();
        getUserLocation();

        return () => clearInterval(timeInterval);
    }, []);

    const { open } = useSidebar();
    const unreadCount = notifications.filter((n) => n.unread).length;

    const handleSignOut = async () => {
        if (!session) return; // Should not happen, but just in case
        const email = session.email;

        // Call the API to update the user status to Inactif
        try {
            await signOut({ callbackUrl: "/" });

            toast.success("Vous êtes déconnecté");

            // Wait few seconds before redirecting to avoid session issues
            setTimeout(() => {
                router.push("/");
            }, 2000);
        } catch (error) {
            console.error("Failed to sign out", error);
        }
    };

    return (
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b px-5  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {/* Animated Sidebar Trigger */}
            <SidebarTrigger>
                <div className="relative h-4 w-4">
                    <ChevronLeft
                        className={`absolute h-4 w-4 transition-all duration-300 ${
                            open
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-2"
                        }`}
                    />
                    <ChevronRight
                        className={`absolute h-4 w-4 transition-all duration-300 ${
                            open
                                ? "opacity-0 translate-x-2"
                                : "opacity-100 translate-x-0"
                        }`}
                    />
                </div>
            </SidebarTrigger>
            <Separator orientation="vertical" className="mr-2 h-4" />

            {/* Logo for mobile */}
            <div className="md:hidden mx-auto flex items-center">
                <Image
                    src={logoSrc}
                    alt="Billsder Logo"
                    width={32}
                    height={32}
                    className="mr-2"
                />
                <span className="font-bold text-xl">billsder</span>
            </div>

            {/* Time and Country Flag */}
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                {countryFlag && (
                    <img
                        src={countryFlag || "/placeholder.svg"}
                        alt={userCountry}
                        className="w-6 h-4 rounded-sm"
                    />
                )}
                <span className="font-medium">{currentTime}</span>
                {/* {userCountry && (
                    <span className="text-xs">({userCountry})</span>
                )} */}
            </div>

            {/* Breadcrumbs - hide on mobile */}
            {breadcrumbs && breadcrumbs.length > 0 && (
                <div className="hidden md:block">
                    <Breadcrumb>
                        <BreadcrumbList>
                            {breadcrumbs.map((crumb, index) => (
                                <div key={index} className="flex items-center">
                                    {index > 0 && <BreadcrumbSeparator />}
                                    <BreadcrumbItem>
                                        {crumb.href ? (
                                            <BreadcrumbLink href={crumb.href}>
                                                {crumb.label}
                                            </BreadcrumbLink>
                                        ) : (
                                            <BreadcrumbPage>
                                                {crumb.label}
                                            </BreadcrumbPage>
                                        )}
                                    </BreadcrumbItem>
                                </div>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            )}

            {/* Spacer to push content to the right */}
            <div className="flex-1" />

            <div className="flex items-center gap-2">
                {/* Theme toggler */}
                <ThemeToggler />

                {/* Local toggler button */}
                <LocaleSwitcherToggler />

                {/* Notifications */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                variant="ghost"
                                className={`h-10 w-10 relative border-2  rounded-2xl shadow-lg
                                    ${
                                        isDark
                                            ? "border-[#a8a7d1] bg-[#a8a7d1]/10 text-white hover:bg-[#a8a7d1]/20"
                                            : "border-[#54489e] bg-[#54489e]/10 text-[#54489e] hover:bg-[#54489e]/20"
                                    }
                                    ${
                                        isDark
                                            ? "shadow-[#a8a7d1]/20"
                                            : "shadow-[#54489e]/20"
                                    }
                                `}
                            >
                                <Bell className="h-4 w-4" />
                                {unreadCount > 0 && (
                                    <Badge
                                        variant="destructive"
                                        className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
                                    >
                                        {unreadCount}
                                    </Badge>
                                )}
                            </Button>
                        </motion.div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        className={`w-80 rounded-2xl `}
                    >
                        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {notifications.map((notification) => (
                            <DropdownMenuItem
                                key={notification.id}
                                className="flex flex-col items-start p-3"
                            >
                                <div className="flex w-full items-center justify-between">
                                    <span className="font-medium">
                                        {notification.title}
                                    </span>
                                    {notification.unread && (
                                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                                    )}
                                </div>
                                <span className="text-xs text-muted-foreground">
                                    {notification.time}
                                </span>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link
                                href="/app/notifications"
                                className="w-full text-center"
                            >
                                View all notifications
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* User menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                variant="ghost"
                                className={`flex items-center gap-2 px-2 h-10 border rounded-2xl shadow-lg 
                                    ${
                                        isDark
                                            ? "border-[#a8a7d1] bg-[#a8a7d1]/10 text-white hover:bg-[#a8a7d1]/20"
                                            : "border-[#54489e] bg-[#54489e]/10 text-[#54489e] hover:bg-[#54489e]/20"
                                    }
                                    ${
                                        isDark
                                            ? "shadow-[#a8a7d1]/20"
                                            : "shadow-[#54489e]/20"
                                    }
                                `}
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarImage
                                        src="https://github.com/shadcn.png"
                                        alt="User"
                                    />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <span className="font-semibold text-sm hidden sm:inline-block">
                                    {session?.username || "John Doe"}
                                </span>
                            </Button>
                        </motion.div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-56 border-2 rounded-2xl p-2"
                        align="end"
                        forceMount
                    >
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-bold text-governor_bay dark:text-wistful leading-none">
                                    {session?.username || "John Doe"}
                                </p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {session?.email || "John Doe"}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild className="rounded-2xl">
                            <Link href="/app/profile">
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="rounded-2xl">
                            <Link href="/app/settings">
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="rounded-2xl">
                            <Link href="/app/billing">
                                <CreditCard className="mr-2 h-4 w-4" />
                                <span>Billing</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="rounded-2xl">
                            <Link href="/app/team">
                                <Users className="mr-2 h-4 w-4" />
                                <span>Team</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onSelect={handleSignOut}
                            className="rounded-2xl"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
