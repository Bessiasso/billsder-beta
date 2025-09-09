"use client";

import * as React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    BarChart3,
    Users,
    Package,
    Briefcase,
    Building2,
    UserCircle,
    DollarSign,
    Menu,
    X,
    FileText,
    Settings,
    ChevronLeft,
    ChevronRight,
    Building,
    Wallet,
    ClipboardList,
    Calendar,
    User,
    CreditCard,
    HelpCircle,
    Lock,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMobile } from "@/hooks/use-mobile";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItem {
    title: string;
    href: string;
    icon: React.ReactNode;
    category: string;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const router = useRouter();
    const pathname = usePathname();
    const isMobile = useMobile();
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(!isMobile);
    const [isAccountSetupComplete, setIsAccountSetupComplete] = useState(false);
    const [isUserComplete, setIsUserComplete] = useState(false);
    const [isCompanyComplete, setIsCompanyComplete] = useState(false);
    const [isEmployeeComplete, setIsEmployeeComplete] = useState(false);
    const [isSidebarDisabled, setIsSidebarDisabled] = useState(false);
    const totalSteps = 3; // Total number of steps

    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    const logoSrc = isDark ? "/pictograme.svg" : "/pictograme.svg";

    useEffect(() => {
        const checkAccountCompletion = async () => {
            if (!session?.user) return;

            let stepsCompleted = 0;

            // 1. Check User Completion (always true)
            setIsUserComplete(true);
            stepsCompleted++;

            // 2. Check Company Completion
            const hasCompanyId =
                !!session?.user?.id_company && session.user.id_company !== "";
            setIsCompanyComplete(hasCompanyId);
            if (hasCompanyId) {
                stepsCompleted++;
            }

            // 3. Check Employee Completion
            const hasEmployeeId =
                !!session?.user?.id_employee && session.user.id_employee !== "";
            setIsEmployeeComplete(hasEmployeeId);
            if (hasEmployeeId) {
                stepsCompleted++;
            }
            // Set overall account completion status
            const isComplete = stepsCompleted === totalSteps;
            setIsAccountSetupComplete(isComplete);
        };
        checkAccountCompletion();
    }, [session?.user.id_company]);

    const navItems: NavItem[] = [
        {
            title: "Dashboard",
            href: `/app/dashboard`,
            icon: <BarChart3 className="h-4 w-4" />,
            category: "Overview",
        },
        {
            title: "Profile",
            href: `/app/profile`,
            icon: <User className="h-4 w-4" />,
            category: "Overview",
        },
        {
            title: "Invoices",
            href: `/app/invoices`,
            icon: <FileText className="h-4 w-4" />,
            category: "Finance",
        },
        {
            title: "Estimates",
            href: `/app/estimates`,
            icon: <ClipboardList className="h-4 w-4" />,
            category: "Finance",
        },
        {
            title: "Payments",
            href: `/app/payments`,
            icon: <CreditCard className="h-4 w-4" />,
            category: "Finance",
        },
        {
            title: "Accounting",
            href: `/app/accounting`,
            icon: <DollarSign className="h-4 w-4" />,
            category: "Finance",
        },
        {
            title: "Expenses",
            href: `/app/expenses`,
            icon: <Wallet className="h-4 w-4" />,
            category: "Finance",
        },
        {
            title: "Products",
            href: `/app/products`,
            icon: <Package className="h-4 w-4" />,
            category: "Inventory",
        },
        {
            title: "Services",
            href: `/app/services`,
            icon: <Briefcase className="h-4 w-4" />,
            category: "Inventory",
        },
        {
            title: "Suppliers",
            href: `/app/suppliers`,
            icon: <Building className="h-4 w-4" />,
            category: "Inventory",
        },
        {
            title: "Customers",
            href: `/app/crm`,
            icon: <Users className="h-4 w-4" />,
            category: "Management",
        },
        {
            title: "Employees",
            href: `/app/employees`,
            icon: <UserCircle className="h-4 w-4" />,
            category: "Management",
        },
        {
            title: "Company",
            href: `/app/company`,
            icon: <Building2 className="h-4 w-4" />,
            category: "Management",
        },
        {
            title: "Agenda",
            href: `/app/agenda`,
            icon: <Calendar className="h-4 w-4" />,
            category: "Management",
        },
        {
            title: "Settings",
            href: `/app/settings`,
            icon: <Settings className="h-4 w-4" />,
            category: "System",
        },
    ];

    const groupedNavItems = navItems.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {} as Record<string, NavItem[]>);

    // Helper function to check if a nav item is active
    const isNavItemActive = (itemHref: string) => {
        // If there's no session or pathname, return false
        if (!pathname || !itemHref) return false;

        // For exact matches
        if (pathname === itemHref) return true;

        // For nested routes, we need to be more specific to avoid false positives
        // Extract the page name from the item href (e.g., "dashboard" from "/username/dashboard")
        const itemPathParts = itemHref.split("/");
        const pageName = itemPathParts[itemPathParts.length - 1];

        // Extract the page name from the current pathname
        const pathnameParts = pathname.split("/");
        const currentPageName = pathnameParts[pathnameParts.length - 1];

        // Check if the current pathname starts with the nav item's href
        // This ensures sub-pages will also highlight the parent nav item
        //return pathname.startsWith(itemHref);

        // Check if the current page name matches the item's page name
        return currentPageName === pageName;
    };

    // Handle navigation with profile check
    const handleNavigation = (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        href: string
    ) => {
        e.preventDefault();

        if (isAccountSetupComplete) {
            router.push(href);
        } else {
            // If profile is not complete, redirect to profile page
            return;
        }
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader className="border-b h-16 ">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={"/app/dashboard"}>
                                <div className="flex items-center">
                                    <Image
                                        src={logoSrc}
                                        alt="Logo"
                                        width={40}
                                        height={40}
                                    />
                                    <h1 className="font-bold text-2xl ml-2">
                                        billsder
                                    </h1>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {Object.entries(groupedNavItems).map(([category, items]) => (
                    <SidebarGroup key={category}>
                        <SidebarGroupLabel className="text-md text-governor_bay dark:text-wistful">
                            {category}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            className="h-8 rounded-2xl"
                                        >
                                            <Link
                                                href=""
                                                onClick={(e) =>
                                                    handleNavigation(
                                                        e,
                                                        item.href
                                                    )
                                                }
                                                className={cn(
                                                    "flex items-center gap-3 px-5 text-md transition-all duration-400 font-medium rounded-2xl w-full",
                                                    isNavItemActive(item.href)
                                                        ? "bg-governor_bay/90 dark:bg-governor_bay text-white font-bold"
                                                        : "text-black dark:text-white hover:bg-wistful hover:text-white ",
                                                    !isOpen &&
                                                        "justify-center px-0",
                                                    !isAccountSetupComplete &&
                                                        "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-current"
                                                )}
                                                aria-current={
                                                    isNavItemActive(item.href)
                                                        ? "page"
                                                        : undefined
                                                }
                                            >
                                                {item.icon}
                                                {isOpen && (
                                                    <>
                                                        <span>
                                                            {item.title}
                                                        </span>
                                                        {!isAccountSetupComplete && (
                                                            <Lock className="ml-auto h-4 w-4 text-gray-500" />
                                                        )}
                                                    </>
                                                )}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/support">
                                <HelpCircle className="h-4 w-4" />
                                <span>Support</span>
                                <ChevronRight className="ml-auto h-4 w-4" />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
